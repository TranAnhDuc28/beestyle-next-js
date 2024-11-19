"use client"
import {
    AutoComplete, AutoCompleteProps, Button, Col, Flex, Layout,
    Pagination, PaginationProps, Row, Segmented, Space, Table, TableProps, theme, Tooltip, Typography
} from "antd";
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import CheckoutComponent from "@/components/Admin/Sale/CheckoutComponent";
import {
    AppstoreOutlined, BarsOutlined, DeleteOutlined, FilterOutlined, PlusOutlined, SearchOutlined, UnorderedListOutlined
} from "@ant-design/icons";
import useFilterProduct, {ParamFilterProduct} from "@/components/Admin/Product/hooks/useFilterProduct";
import SubLoader from "@/components/Loader/SubLoader";
import FilterProduct from "@/components/Admin/Sale/FilterProduct";
import ProductCardView from "@/components/Admin/Sale/TypeDisplayList/ProductCardView";

const {Content} = Layout;
const {Text, Paragraph, Title} = Typography;

type DrawerOpen = "checkout" | "filter";

const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
});

interface DataType {
    key: string;
    productName: string;
    quantity: number;
    price: number;
}

const dataTbl: DataType[] = [
    {key: '1', productName: 'John Brown', quantity: 32, price: 1000,},
    {key: '2', productName: 'Jim Green', quantity: 42, price: 1000,},
    {key: '3', productName: 'Joe Black', quantity: 32, price: 2000,},
    {key: '4', productName: 'John Brown', quantity: 32, price: 1000,},
    {key: '5', productName: 'Jim Green', quantity: 42, price: 1000,},
    {key: '6', productName: 'John Brown', quantity: 32, price: 1000,},
];

const defaultFilterParam: ParamFilterProduct = {
    page: 1,
    size: 20,
    category: undefined,
    gender: undefined,
    brand: undefined,
    material: undefined,
    minPrice: undefined,
    maxPrice: undefined,
};

interface IProps {

}

const NormalSaleTab: React.FC<IProps> = (props) => {
    const {} = props;
    const [dataCart, setDataCart] = useState<DataType[]>(dataTbl);
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();
    const [openDrawer, setOpenDrawer] = useState({
        checkout: false, filter: false,});

    const [editableStr, setEditableStr] = useState('Ghi chú đơn hàng.');

    const [filerParam, setFilterParam] = useState<ParamFilterProduct>({...defaultFilterParam});
    const {dataOptionFilterProduct, isLoading} = useFilterProduct(filerParam);

    const handleDelete = useCallback((key: React.Key) => {
        setDataCart(prevCart => prevCart.filter(item => item.key !== key));
    }, []);

    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setFilterParam((prevValue) => ({...prevValue, page: page, size: pageSize}));
    }

    const showDrawer = useCallback((drawerType: DrawerOpen, isOpen: boolean) => {
        setOpenDrawer((prevDrawer) => ({...prevDrawer, [drawerType]: isOpen}));
    }, []);

    const onClose = useCallback((drawerType: DrawerOpen, isOpen: boolean) => {
        setOpenDrawer((prevDrawer) => ({...prevDrawer, [drawerType]: isOpen}));
    }, []);

    useEffect(() => console.log(dataCart), [dataCart]);

    const columns: TableProps<DataType>['columns'] = useMemo(() =>  [
        {
            title: '#', key: '#', align: "center", width: 50,
            render: (value, record, index) => <Text strong>{index + 1}</Text>,
        },
        {
            title: 'Sản phẩm', dataIndex: 'product', key: 'product', width: 250,
            render: (value, record, index) => {
                return (
                    <div className="ml-5">
                        <Text strong>{record.productName}</Text> <br/>
                        <Text type="secondary">Mã: {record.key}</Text>
                    </div>
                );
            }
        },
        {title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', align: "right", width: 100},
        {
            title: 'Đơn giá', dataIndex: 'price', key: 'price', align: "right", width: 130,
            render: (_, record) => {
                return `${record.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        },
        {
            title: 'Tổng giá', key: 'totalPrice', align: "right", width: 130,
            render: (_, record) => {
                return (
                    <Text strong>
                        {`${record.quantity * record.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                );
            }
        },
        {
            title: 'Action', key:
                'action', align:
                "center", width:
                70,
            render:
                (_, record) => (
                    <DeleteOutlined
                        style={{cursor: "pointer", padding: "5px", borderRadius: "5px"}}
                        onClick={() => handleDelete(record.key)}
                    />
                ),
        },
    ], [handleDelete]);

    return (
        <Layout className="px-1.5" style={{height: 785, backgroundColor: colorBgContainer}}>
            <Flex gap={10} style={{height: '100%'}}>
                <Space direction="vertical" style={{width: "60%", height: "100%"}}>
                    <Content
                        style={{
                            borderRadius: borderRadiusLG,
                            boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                            padding: 10,
                            overflow: "auto",
                            height: 715
                        }}
                    >
                        <Table<DataType>
                            size="small"
                            pagination={false}
                            columns={columns}
                            dataSource={dataCart}
                            scroll={{y: 'calc(100vh - 290px)', scrollToFirstRowOnChange: true}}
                        />
                    </Content>

                    <Content
                        style={{
                            boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                            borderRadius: borderRadiusLG,
                            padding: "10px 20px",
                            minHeight: 40,
                            height: 60
                        }}
                    >
                        <Paragraph>{editableStr}</Paragraph>
                    </Content>
                </Space>
                <Content
                    style={{
                        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                        borderRadius: borderRadiusLG,
                        padding: "10px 20px",
                        width: "40%",
                        overflow: "auto",
                    }}
                >
                    <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                        <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                            <div style={{display: "flex", width: "60%"}}>
                                <AutoComplete allowClear suffixIcon={<SearchOutlined/>} style={{width: "100%"}}
                                              options={options}
                                              // onSearch={}
                                              placeholder="Tìm khách hàng"
                                />
                                <Button icon={<PlusOutlined/>} type="text" shape="circle"/>
                            </div>
                            <Space direction="horizontal" wrap>
                                <Tooltip placement="top" title="Lọc sản phẩm">
                                    <Button icon={<FilterOutlined/>} type="text" shape="circle"
                                            onClick={() => showDrawer("filter", true)}
                                    />
                                </Tooltip>
                                <Segmented
                                    options={[
                                        { value: 'list', icon: <BarsOutlined /> },
                                        { value: 'kanban', icon: <AppstoreOutlined /> },
                                    ]}
                                />
                            </Space>
                        </Flex>

                        <div style={{height: 660, overflowY: "auto", padding: 5}}>
                            {isLoading ? (
                                <SubLoader size="small" spinning={isLoading}/>
                                ) : (
                                    <>
                                        {/*<ProductListView*/}
                                        {/*    dataSource={dataOptionFilterProduct?.items}*/}
                                        {/*    setOpenModalListProductVariant={setOpenModalListProductVariant}*/}
                                        {/*/>*/}

                                        <ProductCardView
                                            dataSource={dataOptionFilterProduct?.items}
                                        />
                                    </>
                                )
                            }
                        </div>
                        <Row gutter={[8, 8]} style={{display: "flex", alignItems: "center"}}>
                            <Col flex="1 1 200px">
                                <Pagination
                                    size="small"
                                    simple={{readOnly: true}}
                                    current={filerParam.page ?? 1}
                                    onChange={onChange}
                                    showSizeChanger={false}
                                    defaultPageSize={filerParam.size ?? 20}
                                    total={dataOptionFilterProduct?.totalElements}
                                />
                            </Col>
                            <Col flex="1 1 200px" style={{display: "flex", justifyContent: "flex-end"}}>
                                <Button size="large" type="primary" style={{width: "100%"}}
                                        onClick={() => showDrawer("checkout", true)}>
                                    TIẾN HÀNH THANH TOÁN
                                </Button>
                            </Col>
                        </Row>
                    </Space>
                </Content>
            </Flex>

            <CheckoutComponent
                open={openDrawer.checkout}
                onClose={() => onClose("checkout", false)}
            />

            <FilterProduct
                open={openDrawer.filter}
                onClose={() => onClose("filter", false)}
            />

        </Layout>
    )
};
export default memo(NormalSaleTab);