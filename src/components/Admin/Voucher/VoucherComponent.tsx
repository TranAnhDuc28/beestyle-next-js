"use client";

import { Flex, Layout, notification, TableColumnsType, Tooltip, Modal, Tag } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import type { IVoucher } from "@/types/IVoucher";
import TablePagination from "@/components/Table/TablePagination";
import { getVouchers, URL_API_VOUCHER } from "@/services/VoucherService";
import useSWR from "swr";
import { useEffect, useState } from "react";
import CreateVoucher from "./CreateVoucher";
import UpdateVoucher from "./UpdateVoucher";
import HeaderVoucher from "@/components/Admin/Voucher/HeaderVoucher";
import { DatePicker, Typography } from "antd";
import { deleteVoucher } from '@/services/VoucherService';
import { useSearchParams } from "next/navigation"; // Thêm dòng này
import useAppNotifications from "../../../hooks/useAppNotifications";
import {STATUS} from "@/constants/Status";
import {DISCOUNTTYPE} from "@/constants/DiscountType";
import VoucherFilter from "./VoucherFilter";
import CreateMaterial from "../Material/CreateMaterial";
import UpdateMaterial from "../Material/UpdateMaterial";

const { Content } = Layout;
const { Title } = Typography;

const VoucherComponent = () => {
    const [api, contextHolder] = notification.useNotification();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IVoucher | null>(null);
    const [vouchers, setVouchers] = useState<any[]>([]);

    const {showNotification} =useAppNotifications();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    console.log("Params to be sent:", params.toString());

    const { data, error, isLoading, mutate } = useSWR(
        `${URL_API_VOUCHER.get}${params.toString() ? `?${params.toString()}` : ''}`,
        getVouchers,
        { revalidateOnFocus: false }
    );

    useEffect(() => {
        if (error) {
            showNotification("error",{
                message: error?.message, description: error?.response?.data?.message || "Error fetching vouchers",
            });
        }
    }, [error]);

    let result: any;
    if (!isLoading && data) {
        result = data?.data;
        console.log(result);
    }
    const handleDeleteVoucher = async (id: number) => {
        try {
            const result = await deleteVoucher(id);
            if (result.code === 200) {
                showNotification("success",{message: 'Xóa thành công!', description: result.message,});

                mutate(); // Gọi lại dữ liệu sau khi xóa
            } else {
                showNotification("error",{message: 'Xóa không thành công!',
                    description: result.message || 'Không có thông tin thêm.',});
            }
        } catch (error) {
            showNotification("error",{message: 'Có lỗi xảy ra!',
                description: error.message,});
        }
    };

    const onDelete = (record: IVoucher) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa phiếu giảm giá này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => {
                handleDeleteVoucher(record.id); // Gọi hàm xóa record
            }
        });
    };
    useEffect(() => {
        console.log("Updated vouchers:", vouchers);
    }, [vouchers]);

    const columns: TableColumnsType<IVoucher> = [

        {
            title: 'Mã',
            dataIndex: 'voucherCode',
            render: (text: string) => <a>{text}</a>
        },
        {
            title: 'Tên',
            dataIndex: 'voucherName'
        },
        {
            title: 'Loại giảm',
            render: (text: string, record: IVoucher) => (
                `${record.discountValue} ${DISCOUNTTYPE[record.discountType]}`
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'usageLimit'
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
            title: 'Trạng thái', dataIndex: 'status', key: 'status',
            render(value: keyof typeof STATUS, record, index) {
                let color: string = value === 'ACTIVE' ? 'green' : 'red';
                return (
                    <Tag color={color} key={record.id}>{STATUS[value]}</Tag>
                );
            },
        },
        {
            title: 'Hành động',
            align: 'center',
            render: (record: IVoucher) => (
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
                            onClick={() => onDelete(record)}
                        />
                    </Tooltip>
                </>
            )
        }
    ];

    return (
        <>
            <HeaderVoucher
                setIsCreateModalOpen={setIsCreateModalOpen}
                setVouchers={setVouchers}
            />
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                <VoucherFilter error={error}/>
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

            <CreateVoucher
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                mutate={mutate}
            />

            <UpdateVoucher
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                mutate={mutate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    )
};

export default VoucherComponent;
