import React, {memo, useCallback, useMemo, useState} from "react";
import {
    Badge, Button,
    Card,
    Modal,
    Select,
    type, SelectProps,
    Space,
    Table,
    TableColumnsType,
    TableProps,
    Tag,
    Typography
} from "antd";
import {IProduct} from "@/types/IProduct";
import {IProductVariant} from "@/types/IProductVariant";
import useFilterProductVariant, {
    ParamFilterProductVariant
} from "@/components/Admin/Product/Variant/hooks/useFilterProductVariant";
import useOptionColor from "@/components/Admin/Color/hooks/useOptionColor";
import useOptionSize from "@/components/Admin/Size/hooks/useOptionSize";
import ColorButton from "@/components/Button/ColorButton";
import {PlusOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
type TagRender = SelectProps['tagRender'];

const getTagRender = (dataMap: Map<number, string | undefined>): TagRender => {
    return (props) => {
        const {label, value, closable, onClose} = props;
        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };

        const color = dataMap.get(value);

        return (
            <Tag
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineEnd: 4,
                    padding: "2px 8px",
                    backgroundColor: "#F0F0F0"
                }}
                bordered={false}
            >
                <Tag style={{height: 15, width: 15, borderRadius: "50%"}} color={color ?? "default"}/> {label}
                {/*<Badge color={color ?? "default"} text={label}/>*/}
            </Tag>
        );
    }
};

const defaultFilterParam: ParamFilterProductVariant = {
    page: 1,
    pageSize: 10,
    color: undefined,
    size: undefined,
    minPrice: undefined,
    maxPrice: undefined,
};

interface IProps {
    product?: IProduct;
    isOpenModalListProductVariant: boolean;
    setOpenModalListProductVariant: (value: boolean) => void;
}

const ModalListProductVariant: React.FC<IProps> = (props) => {
    const {product, isOpenModalListProductVariant, setOpenModalListProductVariant} = props;
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const {dataOptionColor, error: errorDataOptionColor, isLoading: isLoadingDataOptionColor}
        = useOptionColor(isOpenModalListProductVariant);
    const {dataOptionSize, error: errorDataOptionSize, isLoading: isLoadingDataOptionSize}
        = useOptionSize(isOpenModalListProductVariant);

    const dataMap = new Map(dataOptionColor.map(item => [item.value, item.code]));
    const memoizedTagRender = useMemo(() => getTagRender(dataMap), [dataMap]);

    const [filterParam, setFilterParam] = useState<ParamFilterProductVariant>({...defaultFilterParam});
    const {dataOptionFilterProductVariant, isLoading} = useFilterProductVariant(product?.id.toString(), filterParam)

    const handleCloseModal = () => {
        setOpenModalListProductVariant(false);
        setFilterParam(defaultFilterParam);
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<IProductVariant> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleSelectedColorsChange = useCallback((value: string[]) => {
        console.log(`selected ${value}`);
        setFilterParam((prevState) => ({...prevState, color: value}));
    }, []);

    const handleSelectedSizesChange = useCallback((value: string[]) => {
        console.log(`selected ${value}`);
        setFilterParam((prevState) => ({...prevState, size: value}));
    }, []);

    const columns: TableColumnsType<IProductVariant> = [
        {title: 'SKU', dataIndex: 'sku', key: 'sku', width: 150},
        {
            title: 'Tên', key: 'productVariantName',
            render(record: IProductVariant) {
                const colorName = record?.colorName ? record.colorName : "_";
                const colorCode = record?.colorCode ? record.colorCode : "";
                const sizeName = record?.sizeName ? record.sizeName : "_";

                return (
                    <span>
                        <Text>{record.productName}</Text> <br/>
                        <Text type="secondary" style={{display: "flex", alignItems: "center"}}>
                            <span style={{marginInlineEnd: 4}}>
                                {`Màu: ${colorName}`}
                            </span>
                            {colorCode ? <Tag className="custom-tag" color={colorCode}/> : ""} |
                            {` Kích cỡ: ${sizeName}`}
                        </Text>
                    </span>
                );
            }
        },
        {title: 'Giá bán', dataIndex: 'salePrice', key: 'salePrice', width: 120},
        {title: 'Tồn kho', dataIndex: 'quantityInStock', key: 'quantityInStock', width: 100},
    ];


    return (
        <Modal
            title={product?.productName ?? "Sản phẩm"}
            maskClosable
            style={{top: 50}}
            open={isOpenModalListProductVariant}
            onCancel={handleCloseModal}
            width={1000}
            okText="Xác nhận"
            okButtonProps={{style: {background: "#00b96b"}}}
            footer={(_, {OkBtn, CancelBtn }) => (
                <>
                    <ColorButton bgColor="#00b96b" type="primary">Xác nhận và tiếp tục</ColorButton>
                    <OkBtn/>
                    <CancelBtn />
                </>
            )}
        >
            <Space direction="vertical" style={{width: "100%"}}>
                <Card size="small">
                    <Space direction="vertical" style={{width: "50%"}}>
                        <Select
                            showSearch
                            allowClear
                            mode="multiple"
                            maxTagCount={3}
                            style={{width: '100%'}}
                            value={filterParam.color}
                            placeholder={isLoadingDataOptionColor ? "Đang tải..." : "Lọc theo màu sắc"}
                            onChange={handleSelectedColorsChange}
                            options={dataOptionColor}
                            tagRender={memoizedTagRender}
                            optionRender={(option) => (
                                <div className="flex align-middle">
                                    <Tag className="custom-tag" color={option.data.code}/> {option.data.label}
                                </div>
                            )}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />

                        <Select
                            showSearch
                            allowClear
                            mode="multiple"
                            maxTagCount={6}
                            style={{width: '100%'}}
                            value={filterParam.size}
                            placeholder={isLoadingDataOptionSize ? "Đang tải..." : "Lọc theo kích thước"}
                            onChange={handleSelectedSizesChange}
                            options={dataOptionSize}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Space>
                </Card>
                <Card title="Danh sách sản phẩm">
                    <Table
                        rowKey={"id"}
                        loading={isLoading}
                        size="small"
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={dataOptionFilterProductVariant?.items}
                        pagination={{
                            position: ["bottomCenter"],
                            size: "default",
                            defaultPageSize: 10,
                            showSizeChanger: false
                        }}
                    />
                </Card>
            </Space>
        </Modal>
    )
}
export default memo(ModalListProductVariant);