/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import {App, Flex, Layout, TableColumnsType, TabsProps, Tag} from "antd";
import useSWR from "swr";
import {IOrder} from "@/types/IOrder";
import TablePagination from "@/components/Table/TablePagination";
import {getBrands} from "@/services/BrandService";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {getOrdersById, URL_API_ORDER} from "@/services/OrderService";
import useAppNotifications from "@/hooks/useAppNotifications";
import HeaderOrder from "@/components/Admin/Order/HeaderOrder";
import TabsOrder from "@/components/Admin/Order/TabsOrder";
import InvoiceDetail from "@/components/Admin/Order/OrderDetail";
import httpInstance from "@/utils/HttpInstance";

const {Content} = Layout;

const OrderComponent: React.FC = () => {
    const {showNotification} = useAppNotifications();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isCategoryDisplayOrderModalOpen, setIsCategoryDisplayOrderModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]); // Trạng thái cho hàng mở rộng

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const {data, error, isLoading} = useSWR(
        `${URL_API_ORDER.get}${params.size !== 0 ? `?${params.toString()}` : ''}`,
        getBrands,
        {
            revalidateOnFocus: false,
        }
    );

    const fetcher = (url) => httpInstance.get(url).then((res) => res.data);

    const {data: orderItems, error: e, isLoading: isLoadingItems} = useSWR(
        fetcher,
        {revalidateOnFocus: false}
    );

    const columns: TableColumnsType<IOrder> = [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'orderTrackingNumber',
                key: 'trackingNumber'
            },
            {title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName'},
            {title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber'},
            {title: 'Phí vận chuyển', dataIndex: 'shippingFee', key: 'shippingFee'},
            {title: 'Tổng tiền', dataIndex: 'totalAmount', key: 'totalAmount'},
            {
                title: 'Hình thức',
                dataIndex: 'paymentMethod',
                key: 'paymentMethod',
                render: val => (
                    val === 'BANK_TRANSFER' ?
                        <Tag color={'geekblue'} key={'1'}>Chuyển khoản</Tag> :
                        <Tag color={'green'} key={'2'}>Tiền mặt</Tag>
                )
            },
            {
                title: 'Ngày tạo',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: val => (
                    val.toString().replace('T', ' ')
                )
            }
        ]
    ;

    useEffect(() => {
        if (error) {
            showNotification("error", {
                message: error?.message || "Error fetching brands", description: error?.response?.data?.message,
            });
        }
    }, [error]);

    let result: any;
    if (!isLoading && data) result = data?.data;

    const dataItems = Array.isArray(result?.items) ? result.items : [];

    const onRowClick = (record: IOrder) => {
        const newExpandedRowKeys = expandedRowKeys.includes(record.id) ? [] : [record.id];
        setExpandedRowKeys(newExpandedRowKeys);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Tất cả',
            children: (
                <TablePagination
                    loading={isLoading}
                    columns={columns}
                    data={dataItems}
                    current={result?.pageNo}
                    pageSize={result?.pageSize}
                    total={result?.totalElements}
                    onRow={(record) => ({
                        onClick: () => onRowClick(record),
                    })}
                    expandedRowKeys={expandedRowKeys} // Trạng thái hàng mở rộng
                    expandedRowRender={InvoiceDetail}
                />
            ),
        },
        {
            key: '2',
            label: 'Chờ xác nhận',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Đang giao hàng',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: 'Hoàn thành',
            children: 'Content of Tab Pane 4',
        },
        {
            key: '5',
            label: 'Đã huỷ',
            children: 'Content of Tab Pane 5',
        }
    ];

    return (
        <>
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                <Content
                    className="min-w-0 bg-white"
                    style={{
                        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                        flex: 1,
                        minWidth: 700,
                        borderRadius: '8px 8px 0px 0px',
                        padding: '25px'
                    }}
                >
                    <div>
                        <HeaderOrder
                            setIsCreateModalOpen={setIsCreateModalOpen}
                            setIsCategoryDisplayOrderModalOpen={setIsCategoryDisplayOrderModalOpen}
                        />
                    </div>
                    <TabsOrder
                        items={items}
                        onChange={(key) => console.log(key)} // Đảm bảo có hàm onChange
                    />
                </Content>
            </Flex>
        </>
    )
}

export default OrderComponent;
