'use client';
import {Col, Flex, Layout, Row, TableColumnsType, TabsProps, Tag, Tooltip} from "antd";
import useSWR from "swr";
import {IOrder} from "@/types/IOrder";
import TablePagination from "@/components/Table/TablePagination";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {getOrdersById, URL_API_ORDER} from "@/services/OrderService";
import useAppNotifications from "@/hooks/useAppNotifications";
import HeaderOrder from "@/components/Admin/Order/HeaderOrder";
import TabsOrder from "@/components/Admin/Order/TabsOrder";
import InvoiceDetail from "@/components/Admin/Order/OrderDetail";
import dayjs from "dayjs";
import {PAYMENT_METHOD} from "@/constants/PaymentMethod";
import {ORDER_CHANEL} from "@/constants/OrderChanel";
import {CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone, EyeTwoTone} from "@ant-design/icons";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";
import {ORDER_STATUS, ORDER_STATUS_COLOR} from "@/constants/OrderStatus";

const {Content} = Layout;

const getOrderStatusTagColor = (status: keyof typeof ORDER_STATUS) => {
    const statusName = ORDER_STATUS[status];
    const color = ORDER_STATUS_COLOR[status] || 'default';
    return <Tag color={color}>{statusName}</Tag>;
};

const OrderComponent: React.FC = () => {
    const {showNotification} = useAppNotifications();
    const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const {data: orders, error, isLoading} = useSWR(
        `${URL_API_ORDER.get}${params.size !== 0 ? `?${params.toString()}` : ''}`,
        getOrdersById,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    const columns: TableColumnsType<IOrder> = [
        {title: 'Mã đơn hàng', dataIndex: 'orderTrackingNumber', key: 'orderTrackingNumber'},
        {
            title: 'Kênh bán hàng', dataIndex: 'orderChannel', key: 'orderChannel', align: 'center',
            render(value: keyof typeof ORDER_CHANEL, record) {
                let color: string = value === 'ONLINE' ? 'green' : 'orange';
                return (<Tag color={color}>{ORDER_CHANEL[value]}</Tag>);
            }
        },
        {
            title: 'Trạng thái', dataIndex: 'orderStatus', key: 'orderStatus', align: 'center',
            render(value: keyof typeof ORDER_STATUS, record) {
                return getOrderStatusTagColor(value);
            }
        },
        {title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName'},
        {title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber'},
        {
            title: 'Loại thanh toán', dataIndex: 'paymentMethod', key: 'paymentMethod',
            render(value: keyof typeof PAYMENT_METHOD, record) {
                return (<span>{PAYMENT_METHOD[value]}</span>);
            },
        },
        {
            title: 'Tổng tiền', dataIndex: 'totalAmount', key: 'totalAmount', align: 'left',
            render: (_, record) => {
                return `${record.totalAmount}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',');
            }
        },
        {
            title: 'Ngày thanh toán', dataIndex: 'paymentDate', key: 'paymentDate',
            render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: 'Hành động', align: 'center', width: 100,
            render: (value, record, index) => {
                return (
                    record.orderChannel == 'OFFLINE' ?
                        <span></span>
                        :
                        <Row gutter={[8, 8]} justify="center" align="middle">
                            <Col>
                                <Tooltip placement="top" title="Chấp nhận">
                                    <CheckCircleTwoTone
                                        twoToneColor={"#52c41a"}
                                        style={{
                                            cursor: "pointer",
                                            padding: "5px",
                                            border: "1px solid #52c41a",
                                            borderRadius: "5px"
                                        }}
                                    />
                                </Tooltip>
                            </Col>
                            <Col>
                                <Tooltip placement="top" title="Từ chối">
                                    <CloseCircleTwoTone
                                        twoToneColor={"red"}
                                        style={{
                                            cursor: "pointer",
                                            padding: "5px",
                                            border: "1px solid red",
                                            borderRadius: "5px",
                                        }}
                                    />
                                </Tooltip>
                            </Col>
                        </Row>
                )
            }
        },
    ];

    useEffect(() => {
        if (error) {
            showNotification("error", {
                message: error?.message || "Error fetching brands", description: error?.response?.data?.message,
            });
        }
    }, [error]);

    let result: any;
    if (!isLoading && orders) result = orders?.data;

    const dataItems = Array.isArray(result?.items) ? result.items : [];

    const onRowClick = (record: IOrder) => {
        const newExpandedRowKeys = expandedRowKeys.includes(record.id) ? [] : [record.id];
        setExpandedRowKeys(newExpandedRowKeys);
    };

    const expandedRowRender = (record: IOrder) => <InvoiceDetail record={record}/>;

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
                    expandedRowKeys={expandedRowKeys}
                />
            ),
        },
        {key: '2', label: 'Chờ xác nhận', children: 'Content of Tab Pane 2',},
        {key: '3', label: 'Đang giao hàng', children: 'Content of Tab Pane 3',},
        {key: '4', label: 'Hoàn thành', children: 'Content of Tab Pane 4',},
        {key: '5', label: 'Đã huỷ', children: 'Content of Tab Pane 5',}
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

                    <HeaderOrder/>

                    <TabsOrder
                        items={items}
                        onChange={(key) => console.log(key)}
                    />
                </Content>
            </Flex>
        </>
    )
}

export default OrderComponent;
