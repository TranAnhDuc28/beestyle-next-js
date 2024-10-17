"use client"
import {Flex, Layout, notification, TableColumnsType, Tag, Tooltip} from "antd";
import useSWR from "swr";
import {IBrand} from "@/types/IBrand";
import {EditTwoTone} from "@ant-design/icons";
import TablePagination from "@/components/Table/TablePagination";
import {getBrands, URL_API_BRAND} from "@/services/BrandService";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {STATUS} from "@/constants/Status";
import CreateBrand from "@/components/Admin/Brand/CreateBrand";
import UpdateBrand from "@/components/Admin/Brand/UpdateBrand";

const {Content} = Layout;

const BrandComponent = () => {
    const [api, contextHolder] = notification.useNotification();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const {data, error, isLoading, mutate} =
        useSWR(
            `${URL_API_BRAND.get}${params.size !== 0 ? `?${params.toString()}` : ''}`,
            getBrands,
            {revalidateOnFocus: false, revalidateOnReconnect: false,}
        );

    const columns: TableColumnsType<IBrand> = [
        {title: 'Tên thương hiệu', dataIndex: 'brandName', key: 'brandName'},
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
                message: error?.message || "Error fetching materials",
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
        console.log(result);
    }

    return (
        <>
            {contextHolder}
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
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

            <CreateBrand
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                mutate={mutate}
            />

            <UpdateBrand
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                mutate={mutate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    )
}

export default BrandComponent;