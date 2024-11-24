import React, {memo, useCallback, useContext, useMemo, useRef, useState} from "react";
import {Card, Modal, Select, type SelectProps, Space, Table, TableColumnsType, TableProps, Tag, Typography} from "antd";
import {IProduct} from "@/types/IProduct";
import {IProductVariant} from "@/types/IProductVariant";
import useFilterProductVariant, {ParamFilterProductVariant} from "@/components/Admin/Product/Variant/hooks/useFilterProductVariant";
import useOptionColor from "@/components/Admin/Color/hooks/useOptionColor";
import useOptionSize from "@/components/Admin/Size/hooks/useOptionSize";
import ColorButton from "@/components/Button/ColorButton";
import {HandleCart} from "@/components/Admin/Sale/SaleComponent";
import type {DraggableData, DraggableEvent} from 'react-draggable';
import Draggable from 'react-draggable';

const {Text} = Typography;

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
            </Tag>
        );
    }
};

const defaultFilterParam: ParamFilterProductVariant = {
    page: 1,
    size: 7,
    colorIds: undefined,
    sizeIds: undefined,
    minPrice: undefined,
    maxPrice: undefined,
};

interface IProps {
    product?: IProduct;
    isOpenModalListProductVariant: boolean;
    setOpenModalListProductVariant: (value: boolean) => void;
}

const ModalListProductVariant: React.FC<IProps> = (props) => {
    const handleCart = useContext(HandleCart);
    const {product, isOpenModalListProductVariant, setOpenModalListProductVariant} = props;
    const [disabled, setDisabled] = useState(true);
    const [bounds, setBounds] = useState({left: 0, top: 0, bottom: 0, right: 0});
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggleRef = useRef<HTMLDivElement>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<IProductVariant[]>([]);

    const {dataOptionColor, error: errorDataOptionColor, isLoading: isLoadingDataOptionColor}
        = useOptionColor(isOpenModalListProductVariant);
    const {dataOptionSize, error: errorDataOptionSize, isLoading: isLoadingDataOptionSize}
        = useOptionSize(isOpenModalListProductVariant);

    const dataMap = new Map(dataOptionColor.map(item => [item.value, item.code]));
    const memoizedTagRender = useMemo(() => getTagRender(dataMap), [dataMap]);

    const [filterParam, setFilterParam] = useState<ParamFilterProductVariant>({...defaultFilterParam});
    const {dataOptionFilterProductVariant, isLoading} = useFilterProductVariant(product?.id.toString(), filterParam);

    const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    const onStop = (_event: DraggableEvent, uiData: DraggableData) => {
        setPosition({ x: uiData.x, y: uiData.y });
    };

    const handleCloseModal = () => {
        setOpenModalListProductVariant(false);
        setSelectedRowKeys([]);
        setSelectedRows([]);
        setFilterParam(defaultFilterParam);
        setPosition({ x: 0, y: 0 });
        setBounds({left: 0, top: 0, bottom: 0, right: 0})
    }

    const rowSelection: TableProps<IProductVariant>['rowSelection'] = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[], selectedRows: IProductVariant[]) => {
            console.log('selectedRowKeys: ', newSelectedRowKeys);
            console.log('selectedRows: ', selectedRows);
            setSelectedRowKeys(newSelectedRowKeys);
            setSelectedRows(selectedRows);
        }
    }

    const handleSelectedColorsChange = useCallback((value: string[]) => {
        console.log(`selected ${value}`);
        setFilterParam((prevState) => ({...prevState, colorIds: value}));
    }, []);

    const handleSelectedSizesChange = useCallback((value: string[]) => {
        console.log(`selected ${value}`);
        setFilterParam((prevState) => ({...prevState, sizeIds: value}));
    }, []);

    const onChangePagination = useCallback((pagination: any) => {
        setFilterParam((prevValue) => ({...prevValue, page: pagination?.current ?? 1}));
    }, []);

    const handleOkAndClose = () => {
        handleCart?.handleAddOrderItemCart(selectedRows);
        handleCloseModal();
    }

    const handleOkAndContinue = () => {
        handleCart?.handleAddOrderItemCart(selectedRows);
    }

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
            title={
                <div
                    style={{width: '100%', cursor: 'move'}}
                    onMouseOver={() => {
                        if (disabled) {
                            setDisabled(false);
                        }
                    }}
                    onMouseOut={() => {setDisabled(true);}}
                    onFocus={() => {}}
                    onBlur={() => {}}
                >
                    {product?.productName ?? "Sản phẩm"}
                </div>
            }
            maskClosable
            style={{top: 20}}
            open={isOpenModalListProductVariant}
            onCancel={handleCloseModal}
            onOk={() => handleOkAndClose()}
            width={1000}
            okText="Thêm vào giỏ"
            cancelText="Đóng"
            okButtonProps={{style: {background: "#00b96b"}}}
            footer={(_, {OkBtn, CancelBtn}) => (
                <>
                    <OkBtn/>
                    <ColorButton bgColor="#00b96b" type="primary" onClick={() => handleOkAndContinue()}>
                        Thêm vào giỏ và tiếp tục
                    </ColorButton>
                    <CancelBtn/>
                </>
            )}
            modalRender={(modal) => (
                <Draggable
                    disabled={disabled}
                    bounds={bounds}
                    nodeRef={draggleRef}
                    onStart={(event, uiData) => onStart(event, uiData)}
                    onStop={(event, uiData) => onStop(event, uiData)}
                    position={isOpenModalListProductVariant ? position : { x: 0, y: 0 }}
                >
                    <div ref={draggleRef}>{modal}</div>
                </Draggable>
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
                            value={filterParam.colorIds}
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
                            value={filterParam.sizeIds}
                            placeholder={isLoadingDataOptionSize ? "Đang tải..." : "Lọc theo kích thước"}
                            onChange={handleSelectedSizesChange}
                            options={dataOptionSize}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Space>
                </Card>
                <Card title="Danh sách sản phẩm" size="small">
                    <Table<IProductVariant>
                        rowKey={"id"}
                        loading={isLoading}
                        size="small"
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={dataOptionFilterProductVariant?.items}
                        onChange={onChangePagination}
                        pagination={{
                            position: ["bottomCenter"],
                            size: "default",
                            current: filterParam.page,
                            defaultPageSize: filterParam.size,
                            total: dataOptionFilterProductVariant?.totalElements,
                            showSizeChanger: false,
                            responsive: true,
                        }}
                    />
                </Card>
            </Space>
        </Modal>
    )
}
export default memo(ModalListProductVariant);