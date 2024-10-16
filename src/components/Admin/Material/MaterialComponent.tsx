"use client"
import { Flex, Layout, Menu, MenuProps, notification, Space, TableColumnsType, Tooltip, Typography } from "antd";
import { EditTwoTone, PlusOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import type { IMaterial } from "@/types/IMaterial";
import TablePagination from "@/components/TablePagination/TablePagination";
import ColorButton from "@/components/Button/ColorButton";
import { getMaterials, materialUrlEndpoint } from "@/services/MaterialService";
import { OptionsParams } from "@/utils/HttpInstance";
import useSWR from "swr";
import { useCallback, useEffect, useState } from "react";
import CreateMaterial from "./CreateMaterial";

const { Content } = Layout;
const { Title } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
    {
        key: '1',
        label: 'Trạng thái',
        children: [
            { key: '1.1', label: 'Item 1', },
            { key: '1.2', label: 'Item 1', },
            { key: '1.3', label: 'Item 1', },
            { key: '1.4', label: 'Item 1', },
        ]
    }
];


// const items: MenuProps['items'] = [
//     {label: '1st menu item', key: '0',},
//     {label: '2st menu item', key: '1',},
//     {label: '3rd menu item', key: '3',},
// ];

const columns: TableColumnsType<IMaterial> = [
    { title: 'Tên chất liệu', dataIndex: 'materialName', key: 'materialName' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Ngày sửa', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
        title: 'Hành động', align: 'center', render: (value, record, index) => {
            return (
                <>
                    <Tooltip placement="top" title="Chỉnh sửa">
                        <EditTwoTone
                            twoToneColor={"#f57800"}
                            style={{
                                cursor: "pointer",
                                padding: "5px",
                                border: "1px solid #f57800",
                                borderRadius: "5px"
                            }}
                        />
                    </Tooltip>
                </>
            )
        }
    },
];


const MaterialComponent = (props: any) => {
    console.log("Render component");
    const options: OptionsParams = props.options;
    const [api, contextHolder] = notification.useNotification();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const { data, error, isLoading, mutate } =
        useSWR([`admin/${materialUrlEndpoint}`, options], () => getMaterials(options),
            { revalidateOnFocus: false, revalidateOnReconnect: false, }
        );

    let result: any;
    useEffect(() => {
        if (error) {
            console.log(error);
            api.error({
                message: error?.message || "Error fetching materials",
                description: error?.response?.data?.message,
                showProgress: true,
                duration: 2
            });
        }
    }, [error]);

    if (!isLoading && data) {
        result = data?.data;
        console.log(result);
    }

    const renderHeader = () => {
        return (
            <Flex align={"flex-start"} justify={"flex-start"} gap={"small"}>
                <Title level={3} style={{ margin: '0px 0px 20px 12px', minWidth: 256, flexGrow: 1 }}>Chất liệu</Title>
                <div className="w-full">
                    <Flex justify={'space-between'} align={'center'}>
                        <div className="flex-grow max-w-96">
                            <Search
                                placeholder="input search text"
                                allowClear
                                // onSearch={() => {console.log("a")}}
                                style={{ width: '100%' }} />
                        </div>
                        <div>
                            <Space>
                                <ColorButton
                                    bgColor="#00b96b"
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsCreateModalOpen(true)}
                                >
                                    Thêm chất liệu
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
        )
    }

    const renderSidebar = () => {
        return (
            <Space direction="vertical" style={{ minWidth: 256 }}>
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
        );
    }

    return (
        <>
            {contextHolder}
            {renderHeader()}
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                {renderSidebar()}
                <Content className="min-w-0 bg-white"
                    style={{
                        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                        flex: 1,
                        minWidth: 700,
                        borderRadius: '8px 8px 0px 0px'
                    }}
                >
                    <TablePagination
                        loading={isLoading}
                        columns={columns}
                        data={result?.items ? result.items : []}
                        current={result?.pageNo}
                        pageSize={result?.pageSize}
                        total={result?.totalElements}
                    >
                    </TablePagination>
                </Content>
            </Flex>

            <CreateMaterial
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                mutate={mutate}
            />

        </>
    )
}

export default MaterialComponent;