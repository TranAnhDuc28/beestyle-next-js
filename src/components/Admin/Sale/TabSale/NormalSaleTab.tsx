import {
    AutoComplete, AutoCompleteProps, Avatar, Button, Card, Col, Flex, Layout, List,
    Pagination, PaginationProps, Row, Space, Table, TableProps, Tag, theme
} from "antd";
import React, {memo, useState} from "react";
import CheckoutComponent from "@/components/Admin/Sale/CheckoutComponent";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

const {Content} = Layout;

const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
});

interface IProps {

}

const data = Array.from({length: 125}).map((_, i) => ({
    title: `ant design part ${i}`
}));

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Name', dataIndex: 'name', key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {title: 'Age', dataIndex: 'age', key: 'age',},
    {title: 'Address', dataIndex: 'address', key: 'address',},
    {
        title: 'Tags', key: 'tags', dataIndex: 'tags',
        render: (_, {tags}) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action', key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const dataTbl: DataType[] = [
    {key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', tags: ['nice', 'developer'],},
    {key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', tags: ['loser'],},
    {key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'],},
    {key: '4', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', tags: ['nice', 'developer'],},
    {key: '5', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', tags: ['loser'],},
    {key: '6', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'],},
    {key: '7', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', tags: ['nice', 'developer'],},
    {key: '8', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', tags: ['loser'],},
    {key: '9', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'],},
    {key: '10', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', tags: ['nice', 'developer'],},
    {key: '12', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', tags: ['loser'],},
    {key: '13', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park', tags: ['cool', 'teacher'],},

];

const NormalSaleTab: React.FC<IProps> = (props) => {
    const {} = props;
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);

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

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Layout className="px-1.5" style={{height: 785, backgroundColor: colorBgContainer}}>
            <Flex gap={10} style={{height: '100%'}}>
                <Row style={{width: "65%", height: "100%"}}>
                    <Col span={24} style={{display: "flex", flexDirection: "column", height: "100%", gap: 10}}>
                        <Content
                            style={{
                                borderRadius: borderRadiusLG,
                                boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                                padding: 10,
                                overflow: "auto",
                            }}
                        >
                            <Table<DataType>
                                pagination={false}
                                columns={columns}
                                dataSource={dataTbl}
                                scroll={{x: true, y: 'calc(100vh - 270px)', scrollToFirstRowOnChange: true }}
                            />
                        </Content>

                        <Content
                            style={{
                                boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                                borderRadius: borderRadiusLG,
                                padding: "10px 20px",
                                overflow: "auto",
                                height: 50
                            }}
                        >

                        </Content>
                    </Col>
                </Row>
                <Content
                    style={{
                        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                        backgroundColor: "#BAE0FF",
                        borderRadius: borderRadiusLG,
                        padding: "10px 20px",
                        width: "35%",
                        overflow: "auto",
                    }}
                >
                    <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                        <Flex justify="space-between" align="center">
                            <Flex style={{
                                borderRadius: borderRadiusLG,
                                width: "350px",
                                maxWidth: "70%"
                            }}>
                                <AutoComplete
                                    options={options}
                                    style={{width: "100%"}}
                                    onSearch={(text) => setOptions(getPanelValue(text))}
                                    placeholder="Tìm khách hàng"
                                    allowClear
                                    suffixIcon={<SearchOutlined/>}
                                />
                                <Button icon={<PlusOutlined/>} type="text"/>
                            </Flex>
                        </Flex>

                        <div style={{height: 660, overflowY: "auto", padding: 5}}>
                            {/* List */}
                            <List
                                style={{width: "100%"}}
                                dataSource={paginatedData}
                                renderItem={(item, index) => (
                                    <List.Item style={{borderBottom: 'none', padding: "5px 0px"}}>
                                        <Card style={{flex: "1"}}>
                                            <List.Item.Meta
                                                avatar={<Avatar
                                                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>}
                                                title={<a href="https://ant.design">{item.title}</a>}
                                                description="Ant Design, a design language for background applications"
                                            />
                                        </Card>
                                    </List.Item>
                                )}
                            />

                            {/*  List Card  */}
                            {/*    <List*/}
                            {/*        grid={{*/}
                            {/*            gutter: 8,*/}
                            {/*            xs: 1,*/}
                            {/*            sm: 2,*/}
                            {/*            md: 3,*/}
                            {/*            lg: 3,*/}
                            {/*            xl: 4,*/}
                            {/*            xxl: 4,*/}
                            {/*        }}*/}
                            {/*        dataSource={paginatedData}*/}
                            {/*        renderItem={(item) => (*/}
                            {/*            <List.Item>*/}
                            {/*                <Card title={item.title}>Card content</Card>*/}
                            {/*            </List.Item>*/}
                            {/*        )}*/}
                            {/*    />*/}
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
                                    pageSizeOptions={[10, 15, 25, 35, 50]}
                                    defaultPageSize={10}
                                    total={data.length}/>
                            </Col>
                            <Col flex="1 1 200px" style={{display: "flex", justifyContent: "flex-end"}}>
                                <Button size="large" type="primary" onClick={showDrawer} style={{width: "100%"}}>
                                    TIẾN HÀNH THANH TOÁN
                                </Button>
                            </Col>
                        </Row>
                    </Space>
                </Content>
            </Flex>
            <CheckoutComponent
                title="Checkout regular sale"
                open={open}
                onClose={onClose}
            />
        </Layout>
    )
};
export default memo(NormalSaleTab);