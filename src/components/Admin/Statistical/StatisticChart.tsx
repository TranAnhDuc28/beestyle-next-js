import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from 'antd';
import StatisticalDateFilter from './StatisticalDateFilter';

const dataHoaDon = [
    {
        name: 'Page A',
        hoadon: 40,
    },
    {
        name: 'Page B',
        hoadon: 30,
    },
    {
        name: 'Page C',
        hoadon: 20,
    },
    {
        name: 'Page D',
        hoadon: 27,
    },
    {
        name: 'Page E',
        hoadon: 18,
    },
    {
        name: 'Page F',
        hoadon: 23,
    },
    {
        name: 'Page G',
        hoadon: 34,
    },
];

const dataDoanhThu = [
    {
        name: 'Page A',
        doanhthu: 1200000,
    },
    {
        name: 'Page B',
        doanhthu: 900000,
    },
    {
        name: 'Page C',
        doanhthu: 600000,
    },
    {
        name: 'Page D',
        doanhthu: 810000,
    },
    {
        name: 'Page E',
        doanhthu: 540000,
    },
    {
        name: 'Page F',
        doanhthu: 690000,
    },
    {
        name: 'Page G',
        doanhthu: 1020000,
    },
];

const dataSanPham = [
    {
        name: 'Sản phẩm X',
        soluong: 55,
    },
    {
        name: 'Sản phẩm Y',
        soluong: 42,
    },
    {
        name: 'Sản phẩm Z',
        soluong: 31,
    },
    {
        name: 'Sản phẩm A',
        soluong: 28,
    },
    {
        name: 'Sản phẩm B',
        soluong: 35,
    },
];

const CustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={0} textAnchor="end" fill="#666">
                {payload.value.toLocaleString('vi-VN')}
                <tspan x={8} dy={0}></tspan>
            </text>
        </g>
    );
};

//Hoá đơn
const InvoiceChart = () => (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataHoaDon}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hoadon" fill="#4096FF" name="Hoá đơn" barSize={15} />
        </BarChart>
    </ResponsiveContainer>
);

//Doanh thu
const RevenueChart = () => (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataDoanhThu}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
                tickFormatter={(value) => value}
                tick={<CustomYAxisTick />}
            />
            <Legend />
            <Bar dataKey="doanhthu" fill="#4096FF" name="Doanh thu" barSize={15} />
        </BarChart>
    </ResponsiveContainer>
);

//Sản phẩm
const ProductChart = () => (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataSanPham}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="soluong" fill="#4096FF" name="Số lượng" barSize={15} />
        </BarChart>
    </ResponsiveContainer>
);

const StatisticChart = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const renderChart = () => {
        switch (currentPage) {
            case 1:
                return <InvoiceChart />;
            case 2:
                return <RevenueChart />;
            case 3:
                return <ProductChart />;
            default:
                return <InvoiceChart />;
        }
    };

    return (
        <div className="container mx-auto p-2">
            <div className='flex justify-between items-center mb-5'>
                <div className="flex space-x-2">
                    <Button type={currentPage === 1 ? 'primary' : 'default'} onClick={() => setCurrentPage(1)}>
                        Thống kê Hoá đơn
                    </Button>
                    <Button type={currentPage === 2 ? 'primary' : 'default'} onClick={() => setCurrentPage(2)}>
                        Thống kê Doanh thu
                    </Button>
                    <Button type={currentPage === 3 ? 'primary' : 'default'} onClick={() => setCurrentPage(3)}>
                        Thống kê Sản phẩm
                    </Button>
                </div>
                <StatisticalDateFilter />
            </div>
            <div className="w-full h-[460px] float-start">
                {renderChart()}
            </div>
        </div>
    );
};

export default StatisticChart;
