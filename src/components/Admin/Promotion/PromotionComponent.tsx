"use client";
import { Flex, Layout, notification, TableColumnsType, Tooltip, Modal, Tag } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import type { IPromotion } from "@/types/IPromotion";
import TablePagination from "@/components/Table/TablePagination";
import { getPromotions, URL_API_PROMOTION } from "@/services/PromotionService";
import useSWR from "swr";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import HeaderPromotion from "@/components/Admin/Promotion/HeaderPromotion";
import { DatePicker, Typography } from "antd";
// import { deletePromotion } from '@/services/VoucherPromotion';
import { useSearchParams } from "next/navigation";
import useAppNotifications from "../../../hooks/useAppNotifications";
// import CreatePromotion from "../Promotion/CreatePromotion";
// import UpdatePromotion from "../Promotion/UpdatePromotion";
// import CreatePromotion from "./CreatePromotion";
// import UpdatePromotion from "./UpdatePromotion";

const { Content } = Layout;
const { Title } = Typography;

const PromotionComponent: React.FC<any> = (props: any) => {

    const [api, contextHolder] = notification.useNotification();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IPromotion | null>(null);
    const [promotions, setPromotions] = useState<any[]>([]);

    const {showNotification} =useAppNotifications();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    const {data, error, isLoading, mutate} = useSWR(
        `${URL_API_PROMOTION.get}${params.toString() ? `?${params.toString()}` : ''}`,
        getPromotions,
        {revalidateOnFocus: false}
    );
    useEffect(() => {
        if (data) {
            console.log("Data received from API:", data);
            setPromotions(data.data.items || []); // Cập nhật vouchers
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            console.error("Error fetching promotions:", error);
            showNotification("error",{message: error?.message || "Error fetching promotions",
                description: error?.response?.data?.message || "Có lỗi xảy ra!",});

        }
    }, [error]);
    // Bảng dữ liệu
    const columns: TableColumnsType<IPromotion> = [
        { title: 'Tên chương trình', dataIndex: 'promotionName', key: 'promotionName' },
        {
            title: 'Giảm',
            render: (text: string, record: IPromotion) => (
                `${record.discountValue} ${record.discountType}`
            )
        },
        {
            title: 'Bắt đầu', dataIndex: 'startDate', key: 'startDate',
            render: (date: string) => dayjs(date).format('DD-MM-YYYY')
        },
        {
            title: 'Kết thúc', dataIndex: 'endDate', key: 'endDate',
            render: (date: string) => dayjs(date).format('DD-MM-YYYY')
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            render: (value: string) => new Date(value).toLocaleDateString('vi-VN')
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            render: (value: string) => new Date(value).toLocaleDateString('vi-VN')
        },

        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: number) => (
                <Tag style={{ color: status === 1 ? 'green' : 'red' }}>
                    {status === 1 ? 'Đang diễn ra' : 'Kết thúc'}
                </Tag>
            )
        },
        // { title: 'Mô tả', dataIndex: 'description', key: 'description', width: 200},
        {
            title: 'Hành động',
            align: 'center',
            render: (record: IPromotion) => (
                <>
                    <Tooltip placement="top" title="Chỉnh sửa">
                        <EditTwoTone
                            twoToneColor={"#f57800"}
                            style={{
                                cursor: "pointer",
                                padding: "5px",
                                border: "1px solid #f57800",
                                borderRadius: "5px",
                                marginRight: "8px"
                            }}
                            onClick={() => {
                                setIsUpdateModalOpen(true);
                                setDataUpdate(record);
                            }}
                        />
                    </Tooltip>
                    <Tooltip placement="top" title="Xóa">
                        <DeleteTwoTone
                            twoToneColor={"#ff4d4f"}
                            style={{
                                cursor: "pointer",
                                padding: "5px",
                                border: "1px solid #ff4d4f",
                                borderRadius: "5px"
                            }}
                            // onClick={() => onDelete(record)}
                        />
                    </Tooltip>
                </>
            )
        },
    ];
    return (
        <>
            {contextHolder}
            {/*<HeaderPromotion*/}
            {/*    setIsCreateModalOpen={setIsCreateModalOpen}*/}
            {/*    setVouchers={setVouchers}*/}
            {/*    mutate={mutate}*/}
            {/*/>*/}
            <Content
                className="min-w-0 bg-white"
                style={{
                    boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                    flex: 1,
                    minWidth: 700,
                    borderRadius: '8px 8px 0px 0px',
                }}
            >
                <TablePagination
                    loading={isLoading}
                    columns={columns}
                    data={promotions.length > 0 ? promotions : []}
                    current={data?.data.pageNo}
                    pageSize={data?.data.pageSize}
                    total={data?.data.totalElements}
                />
            </Content>
            {/*<CreatePromotion*/}
            {/*    isCreateModalOpen={isCreateModalOpen}*/}
            {/*    setIsCreateModalOpen={setIsCreateModalOpen}*/}
            {/*    mutate={mutate}*/}
            {/*/>*/}
            {/*<UpdatePromotion*/}
            {/*    isUpdateModalOpen={isUpdateModalOpen}*/}
            {/*    setIsUpdateModalOpen={setIsUpdateModalOpen}*/}
            {/*    mutate={mutate}*/}
            {/*    dataUpdate={dataUpdate}*/}
            {/*    setDataUpdate={setDataUpdate}*/}
            {/*/>*/}
        </>
    );


};

export default PromotionComponent;