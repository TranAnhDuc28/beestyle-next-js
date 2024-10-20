"use client";

import {Flex, Layout, notification, TableColumnsType, Tooltip, Modal} from "antd";
import {EditTwoTone, DeleteTwoTone} from "@ant-design/icons";
import type {IVoucher} from "@/types/IVoucher";
import TablePagination from "@/components/Table/TablePagination";
import {getVouchers, URL_API_VOUCHER} from "@/services/VoucherService";
import useSWR from "swr";
import {useEffect, useState} from "react";
import CreateVoucher from "./CreateVoucher";
import UpdateVoucher from "./UpdateVoucher";
import VoucherFilter from "@/components/Admin/Voucher/VoucherFilter";
import {useSearchParams} from "next/navigation";
import HeaderVoucher from "@/components/Admin/Voucher/HeaderVoucher";
import {DatePicker, Space, Typography, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import ColorButton from "@/components/Button/ColorButton";
import React from "react";
import {deleteVoucher} from '@/services/VoucherService';

const {Content} = Layout;
const {Title} = Typography;
const {RangePicker} = DatePicker;

const VoucherComponent = () => {
    const [api, contextHolder] = notification.useNotification();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IVoucher | null>(null);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const {data, error, isLoading, mutate} =
        useSWR(`${URL_API_VOUCHER.get}${params.size !== 0 ? `?${params.toString()}` : ''}`,
            getVouchers,
            {
                revalidateOnFocus: false,
            }
        );
    console.log("Dữ liệu trả về:", data);
    useEffect(() => {
        if (error) {
            api.error({
                message: error?.message || "Error fetching vouchers",
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
    const handleDeleteVoucher = async (id: number) => {
        try {
            const result = await deleteVoucher(id);
            console.log(result);
            console.log('Đang xóa phiếu giảm giá với ID:', id);


            if (result.code === 200) {
                notification.success({
                    message: 'Xóa thành công!',
                    description: result.message,
                });
                mutate();
            } else {
                notification.error({
                    message: 'Xóa không thành công!',
                    description: result.message || 'Không có thông tin thêm.',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: error.message,
            });
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
                console.log(`Đang xóa phiếu giảm giá với ID: ${record.id}`); // Kiểm tra ID
                handleDeleteVoucher(record.id); // Gọi hàm xóa record
            }
        });
    };

    const columns: TableColumnsType<IVoucher> = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: (text: string, record: IVoucher, index: number) => (index + 1)
        },
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
                `${record.discountValue} ${record.discountType}`
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
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: number) => (
                <span style={{color: status === 1 ? 'green' : 'red'}}>
                    {status === 1 ? 'Đang diễn ra' : 'Kết thúc'}
                </span>
            )
        },
        {
            title: 'Hành động',
            align: 'center',
            render: (record: IVoucher) => {
                return (
                    <>
                        {/* Nút chỉnh sửa */}
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

                        {/* Nút xóa */}
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
                );
            }
        }

    ];


    return (
        <>
            {contextHolder}
            <HeaderVoucher setIsCreateModalOpen={setIsCreateModalOpen} />

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
                    data={result?.items ? result.items : []}
                    current={result?.pageNo}
                    pageSize={result?.pageSize}
                    total={result?.totalElements}
                >
                </TablePagination>
            </Content>
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
    );

};

export default VoucherComponent;
