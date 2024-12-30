import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import useSWR from "swr";
import { getRevenues, URL_API_STATISTICAL } from "@/services/StatisticalService";
import {getOrderStatus} from "../../../services/StatisticalService";

const SalesStatistics: React.FC = () => {
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [todayRevenue, setTodayRevenue] = useState<number>(0);
    const [soldProducts, setSoldProducts] = useState<number>(0);
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [todayOrders, setTodayOrders] = useState<number>(0);
    const { data: revuneData} = useSWR(
        `${URL_API_STATISTICAL.getRevenue}`,
        getRevenues,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );
    const { data: oderData} = useSWR(
        `${URL_API_STATISTICAL.getOrderStatus}`,
        getOrderStatus,
        { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    // Hàm tính doanh thu tháng này
    const calculateCurrentMonthRevenue = (data: any[]) => {
        return data.reduce((acc: number, item: any) => {
            const orderDate = new Date(item.period);
            const currentMonth = new Date().getMonth();
            if (orderDate.getMonth() === currentMonth) {
                return acc + item.revenue;
            }
            return acc;
        }, 0);
    };

    // Hàm tính doanh thu hôm nay
    const calculateTodayRevenue = (data: any[]) => {
        return data.reduce((acc: number, item: any) => {
            const orderDate = new Date(item.period);
            const today = new Date();
            if (
                orderDate.getDate() === today.getDate() &&
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear()
            ) {
                return acc + item.revenue;
            }
            return acc;
        }, 0);
    };

    // Hàm tính số lượng sản phẩm đã bán trong tháng này
    const calculateSoldProducts = (data: any[]) => {
        return data.reduce((acc: number, item: any) => {
            const orderDate = new Date(item.period);
            const currentMonth = new Date().getMonth();
            if (orderDate.getMonth() === currentMonth) {
                return acc + item.quantity;
            }
            return acc;
        }, 0);
    };

    // Hàm tính tổng hóa đơn tháng này
    const calculateTotalOrdersMonth = (data: any[]) => {
        return data.reduce((acc: number, item: any) => {
            const orderDate = new Date(item.period);
            const currentMonth = new Date().getMonth();
            if (orderDate.getMonth() === currentMonth) {
                return acc + item.totalOderSuccess + item.totalOderFailed; // Tổng cả hóa đơn thành công và thất bại
            }
            return acc;
        }, 0);
    };

    // Hàm tính tổng hóa đơn hôm nay
    const calculateTotalOrdersToday = (data: any[]) => {
        return data.reduce((acc: number, item: any) => {
            const orderDate = new Date(item.period);
            const today = new Date();
            if (
                orderDate.getDate() === today.getDate() &&
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear()
            ) {
                return acc + item.totalOderSuccess + item.totalOderFailed; // Tổng cả hóa đơn thành công và thất bại
            }
            return acc;
        }, 0);
    };

    useEffect(() => {
        if (revuneData && revuneData.data && Array.isArray(revuneData.data.items) &&
            oderData && oderData.data && Array.isArray(oderData.data.items)) {
            // Tính doanh thu tháng này
            const currentMonthRevenue = calculateCurrentMonthRevenue(revuneData.data.items);
            setTotalRevenue(currentMonthRevenue);

            // Tính doanh thu hôm nay
            const todayRevenue = calculateTodayRevenue(revuneData.data.items);
            setTodayRevenue(todayRevenue);

            // Tính số lượng sản phẩm đã bán
            const soldProducts = calculateSoldProducts(revuneData.data.items);
            setSoldProducts(soldProducts);

            // Tính tổng hóa đơn tháng này
            const totalOrdersMonth = calculateTotalOrdersMonth(oderData.data.items);
            setTotalOrders(totalOrdersMonth);

            // Tính tổng hóa đơn hôm nay
            const totalOrdersToday = calculateTotalOrdersToday(oderData.data.items);
            setTodayOrders(totalOrdersToday);
        }
    }, [revuneData, oderData]);



    // Hiển thị doanh thu
    return (
        <Row gutter={16}>
            <Col span={8}>
                <Card
                    title="Doanh số tháng này"
                    bodyStyle={{ padding: "12px 24px" }}
                    headStyle={{
                        fontSize: "18px",
                        minHeight: "40px",
                    }}
                >
                    <div>
                        <div style={{ fontSize: "18px", color: "#4096FF", fontWeight: "bold", marginBottom: "4px" }}>
                            <ArrowUpOutlined /> {totalOrders.toLocaleString()} Đơn hàng / {totalRevenue.toLocaleString()} VND
                        </div>

                    </div>
                </Card>
            </Col>
            <Col span={8}>
                <Card
                    title="Doanh số hôm nay"
                    bodyStyle={{ padding: "12px 24px" }}
                    headStyle={{
                        fontSize: "18px",
                        minHeight: "40px",
                    }}
                >
                    <div>
                        <div style={{ fontSize: "18px", color: "#4096FF", fontWeight: "bold", marginBottom: "4px" }}>
                            <ArrowUpOutlined /> {todayOrders.toLocaleString()} Đơn hàng / {todayRevenue.toLocaleString()} VND
                        </div>

                    </div>
                </Card>
            </Col>
            <Col span={8}>
                <Card
                    title="Sản phẩm bán được trong tháng này"
                    bodyStyle={{ padding: "12px 24px" }}
                    headStyle={{
                        fontSize: "18px",
                        minHeight: "40px",
                    }}
                >
                    <div>
                        <div style={{ fontSize: "18px", color: "#4096FF", fontWeight: "bold", marginBottom: "4px" }}>
                            <ArrowUpOutlined /> {soldProducts} Sản phẩm
                        </div>

                    </div>
                </Card>
            </Col>
        </Row>
    );
};

export default SalesStatistics;
