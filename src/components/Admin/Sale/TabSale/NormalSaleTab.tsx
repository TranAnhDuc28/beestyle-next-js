"use client"
import {
    AutoComplete, AutoCompleteProps, Button, Col, Flex, Layout,
    Pagination, PaginationProps, Row, Segmented, Space, Table, TableProps, Tag, theme, Tooltip, Typography
} from "antd";
import React, {createContext, memo, useCallback, useContext, useEffect, useMemo, useState} from "react";
import CheckoutComponent from "@/components/Admin/Sale/CheckoutComponent";
import {
    AppstoreOutlined,
    BarsOutlined,
    DeleteOutlined,
    FilterOutlined,
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import useFilterProduct, {ParamFilterProduct} from "@/components/Admin/Product/hooks/useFilterProduct";
import SubLoader from "@/components/Loader/SubLoader";
import FilterProduct from "@/components/Admin/Sale/FilterProduct";
import ProductCardView from "@/components/Admin/Sale/TypeDisplayProductList/ProductCardView";
import AdminCart from "@/components/Admin/Sale/AdminCart";
import {HandleCart} from "@/components/Admin/Sale/SaleComponent";
import {mutate} from "swr";
import {URL_API_PRODUCT} from "@/services/ProductService";

const {Content} = Layout;
const {Text, Paragraph, Title} = Typography;

type DrawerOpen = "checkout" | "filter";

interface DataType {
    key: string;
    productName: string;
    quantity: number;
    price: number;
}

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
    const handleCart = useContext(HandleCart);
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const [openDrawer, setOpenDrawer] = useState({
        checkout: false, filter: false,
    });

    const [editableStr, setEditableStr] = useState('Ghi chú đơn hàng.');

    const [filerParam, setFilterParam] = useState<ParamFilterProduct>({...defaultFilterParam});
    const {dataOptionFilterProduct, isLoading} = useFilterProduct(filerParam);

    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setFilterParam((prevValue) => ({...prevValue, page: page, size: pageSize}));
    }

    const showDrawer = useCallback((drawerType: DrawerOpen, isOpen: boolean) => {
        setOpenDrawer((prevDrawer) => ({...prevDrawer, [drawerType]: isOpen}));
    }, []);

    const onClose = useCallback((drawerType: DrawerOpen, isOpen: boolean) => {
        setOpenDrawer((prevDrawer) => ({...prevDrawer, [drawerType]: isOpen}));
    }, []);

    return (
        <Layout className="px-1.5" style={{height: 785, backgroundColor: colorBgContainer}}>
            <Flex gap={10} style={{height: '100%'}}>
                <Space direction="vertical" style={{width: "60%", height: "100%"}}>

                    <AdminCart/>

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
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            <div style={{ flex: 1, display: 'flex', gap: 5, width: "100%" }}>
                                <AutoComplete allowClear suffixIcon={<SearchOutlined/>} style={{width: "100%"}}
                                              options={options}
                                    // onSearch={}
                                              placeholder="Tìm khách hàng"
                                />
                                <Button icon={<PlusOutlined/>} type="text" shape="circle"/>
                            </div >
                            <Space direction="horizontal">
                                <Tooltip placement="top" title="Tải danh sách sản phẩm">
                                    <Button icon={<ReloadOutlined/>} type="text" shape="circle"
                                            onClick={async () => {
                                                await mutate(key =>
                                                        typeof key === 'string' && key.startsWith(`${URL_API_PRODUCT.filter}`),
                                                    undefined,
                                                    {revalidate: true}
                                                )
                                            }}
                                    />
                                </Tooltip>
                                <Tooltip placement="top" title="Lọc sản phẩm">
                                    <Button icon={<FilterOutlined/>} type="text" shape="circle"
                                            onClick={() => showDrawer("filter", true)}
                                    />
                                </Tooltip>
                                <Segmented
                                    options={[
                                        {value: 'list', icon: <BarsOutlined/>},
                                        {value: 'kanban', icon: <AppstoreOutlined/>},
                                    ]}
                                />
                            </Space>
                        </div >

                        <div style={{height: 660, overflowY: "auto", padding: 5}}>
                            {
                                isLoading ? (
                                    <SubLoader size="small" spinning={isLoading}/>
                                ) : (
                                    <>
                                        {/*<ProductListView*/}
                                        {/*    dataSource={dataOptionFilterProduct?.items}*/}
                                        {/*    setOpenModalListProductVariant={setOpenModalListProductVariant}*/}
                                        {/*/>*/}

                                        <ProductCardView dataSource={dataOptionFilterProduct?.items}/>
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