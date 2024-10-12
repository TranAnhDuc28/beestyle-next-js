"use client"
import {
    Dropdown,
    Flex,
    Layout,
    Menu,
    MenuProps,
    Select,
    Space, TableColumnsType,
    theme,
    Typography
} from "antd";
import React, {useState} from "react";
import TablePagination from "@/components/TablePagination/TablePagination";
import ColorButton from "@/components/Button/ColorButton";
import Search from "antd/es/input/Search";
import {SearchProps} from "antd/lib/input";
import {CaretDownOutlined, DownOutlined, MenuOutlined, PlusOutlined} from "@ant-design/icons";

const {Content} = Layout;
const {Title} = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
    {
        key: '1',
        label: 'Navigation One',
        children: [
            {key: '1.1', label: 'Item 1',},
            {key: '1.2', label: 'Item 1',},
            {key: '1.3', label: 'Item 1',},
            {key: '1.4', label: 'Item 1',},
        ]
    }
];

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {title: 'Name', dataIndex: 'name', render: (text: string) => <a>{text}</a>,},
    {title: 'Age', dataIndex: 'age',},
    {title: 'Address', dataIndex: 'address',},
];

const data: DataType[] = [
    {key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
    {key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
    {key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park',},
    {key: '4', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park',},
    {key: '5', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
    {key: '6', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
    {key: '7', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park',},
    {key: '8', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park',},
    {key: '9', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
    {key: '10', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
    {key: '11', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park',},
    {key: '12', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park',},
    {key: '13', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park',},
    {key: '14', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
    {key: '15', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
    {key: '16', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park',},
    {key: '17', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park',},
];

const items: MenuProps['items'] = [
    {label: '1st menu item', key: '0',},
    {label: '2st menu item', key: '1',},
    {label: '3rd menu item', key: '3',},
];

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const Product = () => {
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();

    const [dataState, setDataState] = useState<DataType[]>(data);
    const total = data.length; // Tổng số item


    const handlePageChange = (page: number, pageSize: number) => {
        console.log(`Page: ${page}, PageSize: ${pageSize}`);
        // Gọi API hoặc cập nhật dữ liệu ở đây nếu cần
    };

    return (
        <>
            <Flex align={"flex-start"} justify={"flex-start"} gap={"small"}>
                <Title level={3} style={{margin: '0px 0px 20px 12px', minWidth: 256, flexGrow: 1}}>Sản phẩm</Title>
                <div className="w-full">
                    <Flex justify={'space-between'} align={'center'}>
                        <div className="flex-grow max-w-96">
                            <Search
                                placeholder="input search text"
                                allowClear
                                onSearch={onSearch}
                                style={{width: '100%'}}/>
                        </div>
                        <div>
                            <Space>
                                <ColorButton
                                    bgColor="#00b96b"
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                >
                                    Thêm sản phẩm
                                </ColorButton>
                                <Dropdown menu={{items}} trigger={['click']}>
                                        <ColorButton
                                            bgColor="#00b96b"
                                            type="primary"
                                            icon={<MenuOutlined/>}
                                        >
                                            <CaretDownOutlined/>
                                        </ColorButton>
                                </Dropdown>
                            </Space>
                        </div>
                    </Flex>
                </div>
            </Flex>
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                <Space direction="vertical" style={{width: 256}}>
                    <div
                        className="w-full p-2.5 bg-white  border-solid border-gray"
                        style={{
                            borderRadius: borderRadiusLG,
                            boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)'
                        }}
                    >
                        <Title level={5} style={{width: 256, margin: '0px 0px 10px 0px'}}>Tiêu đề</Title>
                        <Select
                            className="w-full"
                            size="middle"
                            allowClear
                            options={[{value: 'lucy', label: 'Lucy'}]}
                            placeholder="select it"
                        />
                    </div>
                    <Menu
                        className="w-full bg-white"
                        style={{
                            borderRadius: borderRadiusLG,
                            boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)'
                        }}
                        mode="inline"
                        items={menuItems}
                    />
                </Space>

                <Content className="min-w-0 bg-white"
                         style={{
                             borderRadius: borderRadiusLG,
                             boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                             flex: 1,
                         }}
                >
                    <TablePagination
                        columns={columns}
                        data={dataState}
                        total={total}
                        onPageChange={handlePageChange}
                    />
                </Content>
            </Flex>
        </>

    );
}

export default Product;