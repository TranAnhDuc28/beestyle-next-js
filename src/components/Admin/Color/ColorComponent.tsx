"use client"
import {Flex, Layout, notification, TableColumnsType, Tag, Tooltip} from "antd";
import useSWR from "swr";
import {EditTwoTone} from "@ant-design/icons";
import TablePagination from "@/components/Table/TablePagination";
import {getBrands} from "@/services/BrandService";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {STATUS} from "@/constants/Status";
import {URL_API_COLOR} from "@/services/ColorService";
import {IColor} from "@/types/IColor";
import CreateColor from "@/components/Admin/Color/CreateColor";
import UpdateColor from "@/components/Admin/Color/UpdateColor";
import HeaderMaterial from "@/components/Admin/Material/HeaderMaterial";
import HeaderColor from "@/components/Admin/Color/HeaderColor";
import ColorFilter from "@/components/Admin/Color/ColorFilter";

const {Content} = Layout;

const ColorComponent = () => {
    const [api, contextHolder] = notification.useNotification();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const {data, error, isLoading, mutate} =
        useSWR(
            `${URL_API_COLOR.get}${params.size !== 0 ? `?${params.toString()}` : ''}`,
            getBrands,
            {
                revalidateOnFocus: false,
            }
        );

    const columns: TableColumnsType<IColor> = [
        {title: 'Màu', dataIndex: 'colorName', key: 'colorName'},
        {title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt'},
        {title: 'Ngày sửa', dataIndex: 'updatedAt', key: 'updatedAt'},
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status',
            render(value: keyof typeof STATUS, record, index) {
                let color: string = value === 'ACTIVE' ? 'green' : 'default';
                return (
                    <Tag color={color} key={record.id}>{STATUS[value]}</Tag>
                );
            },
        },
        {
            title: 'Hành động', align: 'center', render: (record) => {
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

    useEffect(() => {
        if (error) {
            api.error({
                message: error?.message || "Error fetching colors",
                description: error?.response?.data?.message,
                showProgress: true,
                duration: 2,
                placement: "bottomRight"
            });
        }
    }, [error]);

    let result: any;
    if (!isLoading && data) {
        result = data?.data;
    }

    return (
        <>
            {contextHolder}
            <HeaderColor setIsCreateModalOpen={setIsCreateModalOpen}/>
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                <ColorFilter/>
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

            <CreateColor
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                mutate={mutate}
            />

            <UpdateColor
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                mutate={mutate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    )
}

export default ColorComponent;