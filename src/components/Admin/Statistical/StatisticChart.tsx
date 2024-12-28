import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Page A',
        hoadon: 40, // Số lượng hoá đơn
        doanhThu: 240, // Doanh thu
        sanPham: 100, // Số lượng sản phẩm
    },
    {
        name: 'Page B',
        hoadon: 30,
        doanhThu: 139,
        sanPham: 80,
    },
    {
        name: 'Page C',
        hoadon: 20,
        doanhThu: 398,
        sanPham: 120,
    },
    {
        name: 'Page D',
        hoadon: 27,
        doanhThu: 390,
        sanPham: 95,
    },
    {
        name: 'Page E',
        hoadon: 18,
        doanhThu: 480,
        sanPham: 110,
    },
    {
        name: 'Page F',
        hoadon: 23,
        doanhThu: 380,
        sanPham: 85,
    },
    {
        name: 'Page G',
        hoadon: 34,
        doanhThu: 430,
        sanPham: 105,
    },
];

const StatisticChart = () => {
    return (
        <ResponsiveContainer>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hoadon" fill="#8884d8" name="Hoá đơn" />
                <Bar dataKey="doanhThu" fill="#82ca9d" name="Doanh thu" />
                <Bar dataKey="sanPham" fill="#ffc658" name="Sản phẩm" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StatisticChart;
