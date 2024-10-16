"use client"
import { getBrands, brandUrlEndpoint as cacheKey } from "@/services/brand.service";
import { OptionsParams } from "@/utils/HttpInstance";
import { Flex, Layout, Menu, MenuProps, Space, TableColumnsType, Typography } from "antd";
import useSWR from "swr";
import { IBrand } from "@/types/IBrands";
import { PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import ColorButton from "@/components/Button/ColorButton";
import TablePagination from "@/components/TablePagination/TablePagination";


const {Content} = Layout;
const {Title} = Typography;
type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
    {
        key: '1',
        label: 'Trạng thái',
        children: [
            {key: '1.1', label: 'Item 1',},
            {key: '1.2', label: 'Item 1',},
            {key: '1.3', label: 'Item 1',},
            {key: '1.4', label: 'Item 1',},
        ]
    }
];


// const items: MenuProps['items'] = [
//     {label: '1st menu item', key: '0',},
//     {label: '2st menu item', key: '1',},
//     {label: '3rd menu item', key: '3',},
// ];

const columns: TableColumnsType<IBrand> = [
    {title: 'Tên thương liệu', dataIndex: 'brandName', key: 'brandName'},
    {title: 'Trạng thái', dataIndex: 'status', key: 'status'},
    {title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt'},
    {title: 'Ngày sửa', dataIndex: 'updatedAt', key: 'updatedAt'},
];


const BrandComponent = (props: any) =>{
    const options: OptionsParams = props.options;
    // console.log(options);

    const { data, error, isLoading } = useSWR([cacheKey, options], () => getBrands(options),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000
        }
    );

    if(error) {
        return (
            <div>
                {error?.response?.data?.message || "Error fetching materials"}
            </div>
        );
    }

    let result: any;
    if(!isLoading) result = data?.data;

    console.log(result?.items);
    
    return (
        <>
            <Flex align={"flex-start"} justify={"flex-start"} gap={"small"}>
                <Title level={3} style={{margin: '0px 0px 20px 12px', minWidth: 256, flexGrow: 1}}>Thương hiệu</Title>
                <div className="w-full">
                    <Flex justify={'space-between'} align={'center'}>
                        <div className="flex-grow max-w-96">
                            <Search
                                placeholder="input search text"
                                allowClear
                                // onSearch={() => {console.log("a")}}
                                style={{width: '100%'}}/>
                        </div>
                        <div>
                            <Space>
                                <ColorButton
                                    bgColor="#00b96b"
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                >
                                    Thêm thương hiệu
                                </ColorButton>
                                {/*<Dropdown menu={{items}} trigger={['click']}>*/}
                                {/*    <ColorButton*/}
                                {/*        bgColor="#00b96b"*/}
                                {/*        type="primary"*/}
                                {/*        icon={<MenuOutlined/>}*/}
                                {/*    >*/}
                                {/*        <CaretDownOutlined/>*/}
                                {/*    </ColorButton>*/}
                                {/*</Dropdown>*/}
                            </Space>
                        </div>
                    </Flex>
                </div>
            </Flex>
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                <Space direction="vertical" style={{minWidth: 256}}>
                    <Menu
                        className="w-full bg-white"
                        style={{
                            borderRadius: 8,
                            boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)'
                        }}
                        mode="inline"
                        items={menuItems}
                    />
                </Space>

                <Content className="min-w-0 bg-white"
                         style={{
                             boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                             flex: 1,
                             minWidth: 700,
                             borderRadius: '8px 8px 0px 0px'
                         }}
                >
                    <TablePagination
                        loading = {isLoading}
                        columns={columns}
                        data={result?.items ? result.items : []}
                        current={result?.pageNo}
                        pageSize={result?.pageSize}
                        total={result?.totalElements}
                    >
                    </TablePagination>
                </Content>
            </Flex>
        </>
    )
}

export default BrandComponent;