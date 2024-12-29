import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from 'antd';
import StatisticalDateFilter from './StatisticalDateFilter';



interface IProps{
    data: any
    dataOrderStatus: any
}   
        

const CustomYAxisTick = (props: any) => {
    
    const { x, y, payload} = props;

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
const InvoiceChart = ({data} : any) => (
    <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data?.items || []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalOderSuccess" fill="#4096FF" name="Hoá đơn" barSize={15} />
        <Bar dataKey="totalOderFailed" fill="#FF0000" name="Hoá đơn hủy" barSize={15} />
    </BarChart>
</ResponsiveContainer>
);

//Doanh thu
const RevenueChart = ({data} : any) => (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data?.items || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis
                tickFormatter={(value) => value}
                tick={<CustomYAxisTick />}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#4096FF" name="Doanh thu" barSize={15} />
        </BarChart>
    </ResponsiveContainer>
);

//Sản phẩm
const ProductChart = ({data} : any) => (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data?.items || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#4096FF" name="Số lượng" barSize={15} />
        </BarChart>
    </ResponsiveContainer>
);

const StatisticChart = (props:IProps) => {
    const {data,dataOrderStatus} = props;
    console.log(data);
    
    const [currentPage, setCurrentPage] = useState(1);
    const handleFilterChange = (value: string | { from: string; to: string } | null, type: 'day' | 'month' | 'year' | 'range') => {
        console.log("Filter changed:", value, type);
        // Xử lý thay đổi bộ lọc tại đây
    };

    const renderChart = () => {
        switch (currentPage) {
            case 1:
                return <InvoiceChart data={dataOrderStatus} />;
            case 2:
                return <RevenueChart data={data} />;
            case 3:
                return <ProductChart data={data}/>;
            default:
                return <InvoiceChart data={data} />;
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
                <StatisticalDateFilter onFilterChange={handleFilterChange}  />
            </div>
            <div className="w-full h-[460px] float-start">
                {renderChart()}
            </div>
        </div>
    );
};

export default StatisticChart;







