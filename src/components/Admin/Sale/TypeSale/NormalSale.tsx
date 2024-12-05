"use client"
import {
    AutoComplete, AutoCompleteProps, Button, Col, Flex, Layout,
    Pagination, PaginationProps, Row, Segmented, Space, theme, Tooltip, Typography
} from "antd";
import React, {memo, useCallback, useContext, useState} from "react";
import CheckoutComponent from "@/components/Admin/Sale/CheckoutComponent";
import {
    AppstoreOutlined,
    BarsOutlined,
    FilterOutlined,
    PlusOutlined,
    ReloadOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import useFilterProduct, {ParamFilterProduct} from "@/components/Admin/Product/hooks/useFilterProduct";
import SubLoader from "@/components/Loader/SubLoader";
import FilterProduct from "@/components/Admin/Sale/FilterProductSale";
import AdminCart from "@/components/Admin/Sale/AdminCart";
import {mutate} from "swr";
import {URL_API_PRODUCT} from "@/services/ProductService";
import ProductListView from "@/components/Admin/Sale/TypeDisplayProductList/ProductListView";
import {HandleSale} from "@/components/Admin/Sale/SaleComponent";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";

const {Content} = Layout;
const {Text, Paragraph, Title} = Typography;

export const defaultFilterParam: ParamFilterProduct = {
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

const NormalSale: React.FC<IProps> = (props) => {
    const {} = props;
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();

    const handleSale = useContext(HandleSale);
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const [openDrawer, setOpenDrawer] = useState({
        checkout: false, filter: false,
    });

    const [filterParam, setFilterParam] = useState<ParamFilterProduct>({...defaultFilterParam});
    const {dataOptionFilterProduct, isLoading} = useFilterProduct(filterParam);

    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setFilterParam((prevValue) => ({...prevValue, page: page, size: pageSize}));
    }

    const showDrawer = useCallback((drawerType: "checkout" | "filter", isOpen: boolean) => {
        setOpenDrawer((prevDrawer) => ({...prevDrawer, [drawerType]: isOpen}));
    }, []);

    const onClose = useCallback((drawerType: "checkout" | "filter", isOpen: boolean) => {
        setOpenDrawer((prevDrawer) => ({...prevDrawer, [drawerType]: isOpen}));
    }, []);

    return (
        <Layout className="px-1.5" style={{backgroundColor: colorBgContainer}}>
            <Flex gap={10} style={{height: '100%'}}>
                <div style={{width: "60%", display: "flex", flexDirection: "column", gap: 10}}>
                    <Content
                        style={{
                            borderRadius: borderRadiusLG,
                            boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                            padding: "10px 10px 0px 10px",
                            overflow: "auto",
                            flexBasis: "80%",
                        }}
                    >
                        <AdminCart/>
                    </Content>

                    <Content
                        style={{
                            boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                            borderRadius: borderRadiusLG,
                            padding: "10px 20px",
                            minHeight: 40,
                            flexBasis: "10%",
                            overflowY: "auto"
                        }}
                    >
                        <Flex justify="space-between" align="end" style={{width: "100%"}} wrap>
                            <Text>Ghi chú đơn hàng</Text>
                            <Flex justify="space-between" align="center" wrap>
                                <Text>
                                    <span style={{marginInlineEnd: 15}}>Tổng tiền hàng</span>
                                    <Text strong>
                                        {`${handleSale?.totalQuantityCart}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                    </Text>
                                </Text>
                            </Flex>
                            <Text style={{fontSize: 20}} strong>
                                {`${handleSale?.orderCreateOrUpdate.totalAmount}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                            </Text>
                        </Flex>
                    </Content>
                </div>
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
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                            <div style={{flex: 1, display: 'flex', gap: 5, width: "100%"}}>
                                <AutoComplete allowClear suffixIcon={<SearchOutlined/>} style={{width: "100%"}}
                                              options={options}
                                    // onSearch={}
                                              placeholder="Tìm khách hàng"
                                />
                                <Button icon={<PlusOutlined/>} type="text" shape="circle"/>
                            </div>
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
                        </div>

                        <div style={{height: 'calc(100vh - 200px)', overflowY: "auto", padding: 5}}>
                            {
                                isLoading ? (
                                    <SubLoader size="small" spinning={isLoading}/>
                                ) : (
                                    <>
                                        <ProductListView dataSource={dataOptionFilterProduct?.items}/>

                                        {/*<ProductCardView dataSource={dataOptionFilterProduct?.items}/>*/}
                                    </>
                                )
                            }
                        </div>
                        <Row gutter={[8, 8]} style={{display: "flex", alignItems: "center"}}>
                            <Col flex="1 1 200px">
                                <Pagination
                                    size="small"
                                    simple={{readOnly: true}}
                                    current={filterParam.page ?? 1}
                                    onChange={onChange}
                                    showSizeChanger={false}
                                    defaultPageSize={filterParam.size ?? 20}
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
                onClose={onClose}
            />

            <FilterProduct
                open={openDrawer.filter}
                onClose={() => onClose("filter", false)}
                filterParam={filterParam}
                setFilterParam={setFilterParam}
            />

        </Layout>
    )
};
export default memo(NormalSale);