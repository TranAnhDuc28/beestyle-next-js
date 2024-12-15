'use client';
import {Col, Flex, Layout, TableColumnsType, TablePaginationConfig, Tag, Tooltip} from "antd";
import {IOrder} from "@/types/IOrder";
import TablePagination from "@/components/Table/TablePagination";
import React, {useEffect, useState} from "react";
import useAppNotifications from "@/hooks/useAppNotifications";
import HeaderOrder from "@/components/Admin/Order/HeaderOrder";
import dayjs from "dayjs";
import {ORDER_CHANEL} from "@/constants/OrderChanel";
import {CheckCircleTwoTone, EyeTwoTone} from "@ant-design/icons";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";
import {ORDER_STATUS, ORDER_STATUS_COLOR} from "@/constants/OrderStatus";
import OrderFilter from "@/components/Admin/Order/OrderFilter";
import useFilterOrder, {ParamFilterOrder} from "@/components/Admin/Order/hooks/useFilterOrder";

const {Content} = Layout;

const defaultFilterParam: ParamFilterOrder = {
    page: 1,
    size: 10,
    keyword: undefined,
    startDate: undefined,
    endDate: undefined,
    month: undefined,
    year: undefined,
    orderStatus: undefined,
    orderChannel: undefined,
    paymentMethod: undefined,
};

const getOrderStatusTagColor = (status: keyof typeof ORDER_STATUS) => {
    const statusName = ORDER_STATUS[status].name;
    const color = ORDER_STATUS_COLOR.get(status) || 'default';
    return <Tag color={color}>{statusName}</Tag>;
};

const OrderComponent: React.FC = () => {
    const {showNotification} = useAppNotifications();

    const [filterParam, setFilterParam] = useState<ParamFilterOrder>({...defaultFilterParam});
    const {dataFilterOrder, error, isLoading} = useFilterOrder(filterParam);

    const onChangePagination = (pagination: TablePaginationConfig, filters: any, sorter: any, extra: any) => {
        setFilterParam((prevValue) => {
            return {
                ...prevValue,
                page: pagination.current ?? 1,
                size: pagination.pageSize ?? 10,
            }
        });
    };

    useEffect(() => {
        if (error) {
            showNotification("error", {
                message: error?.message || "Error fetching orders", description: error?.response?.data?.message,
            });
        }
    }, [error]);

    const columns: TableColumnsType<IOrder> = [
        {title: 'Mã đơn hàng', dataIndex: 'orderTrackingNumber', key: 'orderTrackingNumber'},
        {title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName'},
        {title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber'},
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
        {
            title: 'Tổng tiền', dataIndex: 'totalAmount', key: 'totalAmount', align: 'left',
            render: (_, record) => {
                return `${record.totalAmount}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',');
            }
        },
        {
            title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt',
            render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: 'Hành động', align: 'center', width: 100,
            render: (value, record, index) => {
                return (
                    <Col>
                        <Tooltip placement="top" title="Chi tiết">
                            <EyeTwoTone
                                style={{
                                    cursor: "pointer",
                                    padding: "5px",
                                    border: "1px solid #1677FF",
                                    borderRadius: "5px",
                                }}
                            />
                        </Tooltip>
                    </Col>
                )
            }
        },
    ];

    return (
        <>
            <HeaderOrder setFilterParam={setFilterParam}/>
            <Flex align={'flex-start'} justify={'flex-start'} gap="middle">
                <OrderFilter filterParam={filterParam} setFilterParam={setFilterParam}/>
                <Content
                    className="min-w-0 bg-white"
                    style={{
                        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                        flex: 1,
                        minWidth: 700,
                    }}
                >
                    <TablePagination
                        columns={columns}
                        data={dataFilterOrder?.items ? dataFilterOrder.items : []}
                        current={dataFilterOrder?.pageNo}
                        pageSize={dataFilterOrder?.pageSize}
                        total={dataFilterOrder?.totalElements}
                        onChangePagination={onChangePagination}
                    />
                </Content>
            </Flex>
        </>
    )
}
export default OrderComponent;