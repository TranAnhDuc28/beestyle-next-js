"use client"
import {
    AutoComplete, AutoCompleteProps, Avatar, Button, Card, Col, Flex, Layout, List,
    Pagination, PaginationProps, Row, Space, Table, TableProps, Tag, theme, Tooltip, Typography
} from "antd";
import React, {memo, useCallback, useState} from "react";
import CheckoutComponent from "@/components/Admin/Sale/CheckoutComponent";
import {
    AppstoreOutlined, DeleteOutlined, FilterOutlined, PlusOutlined, SearchOutlined, UnorderedListOutlined
} from "@ant-design/icons";
import Marquee from "react-fast-marquee";
import FilterProduct from "@/components/Admin/Sale/FilterProduct";

const {Content} = Layout;
const {Text, Paragraph, Title} = Typography;
const {Meta} = Card;

type DrawerOpen = "checkout" | "filter";

const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
});

interface IProps {

}

const data = Array.from({length: 125}).map((_, i) => ({
    id: i,
    productCode: `SP${Math.floor(Math.random() * 100000 + 99999)}`,
    productName: `Sản phẩm ${i}`,
    quantity: Math.floor(Math.random() * 100),
    price: Math.floor(Math.random() * 10000 + 9999),
}));

interface DataType {
    key: string;
    product: string;
    quantity: number;
    price: number;
}

const dataTbl: DataType[] = [
    {key: '1', product: 'John Brown', quantity: 32, price: 1000,},
    {key: '2', product: 'Jim Green', quantity: 42, price: 1000,},
    {key: '3', product: 'Joe Black', quantity: 32, price: 2000,},
    {key: '4', product: 'John Brown', quantity: 32, price: 1000,},
    {key: '5', product: 'Jim Green', quantity: 42, price: 1000,},
    {key: '6', product: 'John Brown', quantity: 32, price: 1000,},
    {key: '7', product: 'Jim Green', quantity: 42, price: 1000,},
    {key: '8', product: 'Joe Black', quantity: 32, price: 2000,},
    {key: '9', product: 'John Brown', quantity: 32, price: 1000,},
    {key: '10', product: 'Jim Green', quantity: 42, price: 1000,},
    {key: '11', product: 'John Brown', quantity: 32, price: 1000,},
    {key: '12', product: 'Jim Green', quantity: 42, price: 1000,},
    {key: '13', product: 'Joe Black', quantity: 32, price: 2000,},
    {key: '14', product: 'John Brown', quantity: 32, price: 1000,},
    {key: '15', product: 'Jim Green', quantity: 42, price: 1000,},
    {key: '16', product: 'John Brown', quantity: 32, price: 1000,},
    {key: '17', product: 'Jim Green', quantity: 42, price: 1000,},
    {key: '18', product: 'Joe Black', quantity: 32, price: 2000,},
    {key: '19', product: 'John Brown', quantity: 32, price: 1000,},
    {key: '20', product: 'Jim Green', quantity: 42, price: 1000,},
];

const NormalSaleTab: React.FC<IProps> = (props) => {
    const {} = props;
    const [dataCart, setDataCart] = useState<DataType[]>(dataTbl);
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();
    const [openDrawer, setOpenDrawer] = useState({
        checkout: false,
        filter: false,
    });
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [editableStr, setEditableStr] = useState('Ghi chú đơn hàng.');

    const handleDelete = (key: React.Key) => {
        const newData = dataCart.filter((item) => item.key !== key);
        setDataCart(newData);
    };

    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    };

    const paginatedData = data.slice(
        (current - 1) * pageSize,
        current * pageSize
    );

    const getPanelValue = (searchText: string) =>
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

    const showDrawer = useCallback((drawerType: DrawerOpen, isOpen: boolean) => {
        setOpenDrawer((prevDrawer) => ({...prevDrawer, [drawerType]: isOpen}));
    }, []);

    const onClose = useCallback((drawerType: DrawerOpen, isOpen: boolean) => {
        setOpenDrawer((prevDrawer) => ({...prevDrawer, [drawerType]: isOpen}));
    }, []);

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '#', key: '#', align: "center", width: 50,
            render: (value, record, index) => <Text strong>{index + 1}</Text>,
        },
        {
            title: 'Sản phẩm', dataIndex: 'product', key: 'product', width: 250,
            render: (value, record, index) => {
                return (
                    <Card style={{flex: "1"}} styles={{body: {padding: 10}}}>
                        <Avatar shape="square" src="/BuiQuangLan.png"
                                size={{xs: 24, sm: 32, md: 40, lg: 48, xl: 56, xxl: 64}}
                        />
                    </Card>
                );
            }
        },
        {title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', align: "right", width: 100},
        {
            title: 'Đơn giá', dataIndex: 'price', key: 'price', align: "right", width: 150,
            render: (_, record) => {
                return `${record.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        },
        {
            title: 'Tổng giá', key: 'totalPrice', align: "right", width: 150,
            render: (_, record) => {
                return (
                    <Text strong>
                        {`${record.quantity * record.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                )
                    ;
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
    ];

    return (
        <Layout className="px-1.5" style={{height: 785, backgroundColor: colorBgContainer}}>
            <Flex gap={10} style={{height: '100%'}}>
                <Row style={{width: "60%", height: "100%"}}>
                    <Col span={24} style={{display: "flex", flexDirection: "column", height: "100%", gap: 10}}>
                        <Content
                            style={{
                                borderRadius: borderRadiusLG,
                                boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                                padding: 10,
                                overflow: "auto"
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
                                minHeight: 40
                            }}
                        >
                            <Paragraph>{editableStr}</Paragraph>
                        </Content>
                    </Col>
                </Row>
                <Content
                    style={{
                        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                        backgroundColor: "#BAE0FF",
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
                                              onSearch={(text) => setOptions(getPanelValue(text))}
                                              placeholder="Tìm khách hàng"
                                />
                                <Button icon={<PlusOutlined/>} type="text" shape="circle"/>
                            </div>
                            <div>
                                <Button icon={<UnorderedListOutlined/>} type="text" shape="circle"/>
                                <Tooltip placement="top" title="Lọc sản phẩm">
                                    <Button icon={<FilterOutlined/>} type="text" shape="circle"
                                            onClick={() => showDrawer("filter", true)}
                                    />
                                </Tooltip>
                                <Button icon={<AppstoreOutlined/>} type="text" shape="circle"/>
                            </div>
                        </Flex>

                        <div style={{height: 660, overflowY: "auto", padding: 5}}>
                            {/* List */}
                            <List
                                style={{width: "100%"}}
                                dataSource={paginatedData}
                                renderItem={(item, index) => (
                                    <List.Item style={{borderBottom: 'none', padding: "5px 0px"}}>
                                        <Card style={{flex: "1", cursor: "pointer"}} styles={{body: {padding: 10}}}
                                              onClick={() => console.log("ID: " + item.id)}
                                        >
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar shape="square" src="/BuiQuangLan.png"
                                                            size={{xs: 24, sm: 32, md: 40, lg: 48, xl: 56, xxl: 64}}
                                                    />
                                                }
                                                title={
                                                    <Flex align="center" justify="space-between">
                                                        {`${item.productCode} / ${item.productName}`}
                                                        <Title level={5}>
                                                            {`${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        </Title>
                                                    </Flex>
                                                }
                                                description={`Tổng số: ${item.quantity}`}
                                            />
                                        </Card>
                                    </List.Item>
                                )}
                            />

                            {/*  List Card  */}
                            {/*<List*/}
                            {/*    grid={{*/}
                            {/*        gutter: 8,*/}
                            {/*        xs: 1,*/}
                            {/*        sm: 2,*/}
                            {/*        md: 3,*/}
                            {/*        lg: 3,*/}
                            {/*        xl: 4,*/}
                            {/*        xxl: 5,*/}
                            {/*    }}*/}
                            {/*    dataSource={paginatedData}*/}
                            {/*    renderItem={(item) => (*/}
                            {/*        <List.Item>*/}
                            {/*            <Card*/}
                            {/*                hoverable*/}
                            {/*                style={{flex: "1", cursor: "pointer"}}*/}
                            {/*                styles={{body: {padding: 10}}}*/}
                            {/*                cover={<img alt="example" src="/BuiQuangLan.png"/>}*/}
                            {/*                onClick={() => console.log("ID: " + item.id)}*/}
                            {/*            >*/}
                            {/*                <Space direction="vertical">*/}
                            {/*                    <Marquee speed={30}>*/}
                            {/*                        <Text strong style={{ marginRight: 30 }}>*/}
                            {/*                            {`${item.productCode} / ${item.productName}`}*/}
                            {/*                        </Text>*/}
                            {/*                    </Marquee>*/}
                            {/*                    <Text strong>*/}
                            {/*                        {`${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}*/}
                            {/*                    </Text>*/}
                            {/*                    {`Tổng số: ${item.quantity}`}*/}
                            {/*                </Space>*/}
                            {/*            </Card>*/}
                            {/*        </List.Item>*/}
                            {/*    )}*/}
                            {/*/>*/}
                        </div>
                        <Row gutter={[8, 8]} style={{display: "flex", alignItems: "center"}}>
                            <Col flex="1 1 200px">
                                <Pagination
                                    size="small"
                                    simple={{readOnly: true}}
                                    current={current}
                                    pageSize={pageSize}
                                    onChange={onChange}
                                    showSizeChanger
                                    pageSizeOptions={[10, 15, 25, 30]}
                                    defaultPageSize={10}
                                    total={data.length}/>
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