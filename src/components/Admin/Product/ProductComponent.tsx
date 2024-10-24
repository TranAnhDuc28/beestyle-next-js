"use client"
import {Flex, Layout, MenuProps, Select, Space, TableColumnsType, Tag, Tooltip, Typography, Image, FloatButton} from "antd";
import {SearchProps} from "antd/lib/input";
import TablePagination from "@/components/Table/TablePagination";
import HeaderProduct from "@/components/Admin/Product/HeaderProduct";
import useAppNotifications from "@/hooks/useAppNotifications";
import {useEffect, useState} from "react";
import ProductFilter from "@/components/Admin/Product/ProductFilter";
import {EditTwoTone, EyeTwoTone} from "@ant-design/icons";
import {useSearchParams} from "next/navigation";

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
    id: React.Key;
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
    {id: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
    {id: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
    {id: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park',},
    {id: '4', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park',},
    {id: '5', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
    {id: '6', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
    {id: '7', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park',},
    {id: '8', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park',},
    {id: '9', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
    {id: '10', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
    {id: '11', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park',},
    {id: '12', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park',},
    {id: '13', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park',},
    {id: '14', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park',},
    {id: '15', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park',},
    {id: '16', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park',},
    {id: '17', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park',},
];


const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const ProductComponent = () => {
    const {showNotification} = useAppNotifications();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    // const {data, error, isLoading, mutate} =
    //     useSWR(`${URL_API_MATERIAL.get}${params.size !== 0 ? `?${params.toString()}` : ''}`,
    //         getMaterials,
    //         {revalidateOnFocus: false, revalidateOnReconnect: false}
    //     );

    let result: any = [];
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Image', align: 'center', width: 100, render: (record) => {
                return (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            width={30}
                            height={30}
                            src="/img-test-product.png"
                            fallback="/fallback-image.png"
                        />
                    </div>
                );
            }
        },
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Age', dataIndex: 'age', key: 'age'},
        {title: 'Address', dataIndex: 'address', key: 'address'},
        // {title: 'Tên chất liệu', dataIndex: 'materialName', key: 'materialName'},
        // {title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt'},
        // {title: 'Ngày sửa', dataIndex: 'updatedAt', key: 'updatedAt'},
        // {
        //     title: 'Trạng thái', dataIndex: 'status', key: 'status',
        //     render(value: keyof typeof STATUS, record, index) {
        //         let color: string = value === 'ACTIVE' ? 'green' : 'default';
        //         return (
        //             <Tag color={color} key={record.id}>{STATUS[value]}</Tag>
        //         );
        //     },
        // },
        {
            title: 'Hành động', align: 'center', render: (record) => {
                return (
                    <>
                        <Tooltip placement="top" title="Xem chi tiết">
                            <EyeTwoTone
                                style={{
                                    cursor: "pointer", padding: "5px", border: "1px solid #1677FF", borderRadius: "5px",
                                    marginRight: 10
                                }}
                            />
                        </Tooltip>
                        <Tooltip placement="top" title="Chỉnh sửa">
                            <EditTwoTone
                                twoToneColor={"#f57800"}
                                style={{
                                    cursor: "pointer",
                                    padding: "5px",
                                    border: "1px solid #f57800",
                                    borderRadius: "5px"
                                }}
                                onClick={() => {
                                    setIsUpdateModalOpen(true);
                                    setDataUpdate(record);
                                }}
                            />
                        </Tooltip>
                    </>
                )
            }
        },
    ];

    // useEffect(() => {
    //     if (error) {
    //         showNotification("error",{
    //             message: error?.message, description: error?.response?.data?.message || "Error fetching products",
    //         });
    //     }
    // }, [error]);
    //
    // let result: any;
    // if (!isLoading && data) {
    //     result = data?.data;
    //     console.log(result);
    // }

    return (
        <>
            <HeaderProduct setIsCreateModalOpen={setIsCreateModalOpen}/>
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                <ProductFilter error={undefined}/>
                <Content
                    className="min-w-0 bg-white"
                    style={{
                        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                        flex: 1,
                        minWidth: 700,
                        borderRadius: '8px 8px 0px 0px'
                    }}
                >
                    <TablePagination
                        // loading={isLoading}
                        columns={columns}
                        // data={result?.items ? result.items : []}
                        data={data}
                        current={result?.pageNo}
                        pageSize={result?.pageSize}
                        total={result?.totalElements}
                    >
                    </TablePagination>
                </Content>
            </Flex>
        </>

    );
}

export default ProductComponent;