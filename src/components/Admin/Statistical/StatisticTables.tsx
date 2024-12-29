import React, { useState } from 'react';
import { Table, Avatar, Space, TableProps, Select } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface TopSellingProduct {
    key: string | React.Key;
    image: string;
    name: string;
    sold: number;
}

interface LowStockProduct {
    key: string | React.Key;
    image: string;
    name: string;
    remaining: number;
}

interface TableSortState {
    order: 'ascend' | 'descend' | null;
    columnKey: string | null;
}

const topSellingProductsData: TopSellingProduct[] = [
    {
        key: '1',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm A',
        sold: 150,
    },
    {
        key: '2',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm B',
        sold: 120,
    },
    {
        key: '3',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm C',
        sold: 95,
    },
    {
        key: '4',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm D',
        sold: 80,
    },
    {
        key: '5',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm E',
        sold: 70,
    },
    {
        key: '6',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm F',
        sold: 60,
    },
    {
        key: '7',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm G',
        sold: 50,
    },
    {
        key: '8',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm H',
        sold: 40,
    },
    {
        key: '9',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm I',
        sold: 30,
    },
    {
        key: '10',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm J',
        sold: 20,
    },
];

const lowStockProductsData: LowStockProduct[] = [
    {
        key: '1',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm X',
        remaining: 15,
    },
    {
        key: '2',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm Y',
        remaining: 8,
    },
    {
        key: '3',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm Z',
        remaining: 5,
    },
    {
        key: '4',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm W',
        remaining: 3,
    },
    {
        key: '5',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm V',
        remaining: 2,
    },
    {
        key: '6',
        image: 'https://via.placeholder.com/50',
        name: 'Sản phẩm U',
        remaining: 1,
    },
];

const TopSellingProductsTable: React.FC = () => {
    const [sortedInfo, setSortedInfo] = useState<TableSortState>({});
    const [pageSize, setPageSize] = useState<number>(5);

    const handleChange: TableProps<TopSellingProduct>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter as TableSortState);
    };

    const handlePageSizeChange = (value: number) => {
        setPageSize(value);
    };

    const columns: TableProps<TopSellingProduct>['columns'] = [
        {
            title: 'STT',
            key: 'stt',
            sorter: (a, b) => Number(a.key) - Number(b.key),
            sortOrder: sortedInfo.columnKey === 'stt' ? sortedInfo.order : null,
            render: (text, record, index) => index + 1,
            showSorterTooltip: false,
            sortIcon: (filtered) =>
                filtered ? <ArrowUpOutlined /> : <Space><ArrowUpOutlined /><ArrowDownOutlined /></Space>,
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <Avatar shape="square" size={40} src={image} />,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            showSorterTooltip: false,
            sortIcon: (filtered) =>
                filtered ? <ArrowUpOutlined /> : <Space><ArrowUpOutlined /><ArrowDownOutlined /></Space>,
        },
        {
            title: 'Số lượng đã bán',
            dataIndex: 'sold',
            key: 'sold',
            sorter: (a, b) => a.sold - b.sold,
            sortOrder: sortedInfo.columnKey === 'sold' ? sortedInfo.order : null,
            showSorterTooltip: false,
            sortIcon: (filtered) =>
                filtered ? <ArrowUpOutlined /> : <Space><ArrowUpOutlined /><ArrowDownOutlined /></Space>,
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                <h3 className="text-lg text-center leading-6 font-medium text-gray-900">
                    Top sản phẩm bán chạy
                </h3>
                <Select defaultValue={5} style={{ width: 100 }} onChange={handlePageSizeChange}>
                    <Select.Option value={5}>Top 5</Select.Option>
                    <Select.Option value={10}>Top 10</Select.Option>
                    <Select.Option value={15}>Top 15</Select.Option>
                </Select>
            </div>
            <div className="overflow-x-auto">
                <Table
                    dataSource={topSellingProductsData}
                    columns={columns}
                    pagination={{ pageSize: pageSize }}
                    onChange={handleChange}
                    className="ant-table-wrapper"
                />
            </div>
        </div>
    );
};

const LowStockProductsTable: React.FC = () => {
    const [sortedInfo, setSortedInfo] = useState<TableSortState>({});
    const [pageSize, setPageSize] = useState<number>(5);

    const handleChange: TableProps<LowStockProduct>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter as TableSortState);
    };

    const handlePageSizeChange = (value: number) => {
        setPageSize(value);
    };

    const columns: TableProps<LowStockProduct>['columns'] = [
        {
            title: 'STT',
            key: 'stt',
            sorter: (a, b) => Number(a.key) - Number(b.key),
            sortOrder: sortedInfo.columnKey === 'stt' ? sortedInfo.order : null,
            render: (text, record, index) => index + 1,
            showSorterTooltip: false,
            sortIcon: (filtered) =>
                filtered ? <ArrowUpOutlined /> : <Space><ArrowUpOutlined /><ArrowDownOutlined /></Space>,
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <Avatar shape="square" size={40} src={image} />,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            showSorterTooltip: false,
            sortIcon: (filtered) =>
                filtered ? <ArrowUpOutlined /> : <Space><ArrowUpOutlined /><ArrowDownOutlined /></Space>,
        },
        {
            title: 'Số lượng còn lại',
            dataIndex: 'remaining',
            key: 'remaining',
            sorter: (a, b) => a.remaining - b.remaining,
            sortOrder: sortedInfo.columnKey === 'remaining' ? sortedInfo.order : null,
            showSorterTooltip: false,
            sortIcon: (filtered) =>
                filtered ? <ArrowDownOutlined /> : <Space><ArrowUpOutlined /><ArrowDownOutlined /></Space>,
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                <h3 className="text-lg text-center leading-6 font-medium text-gray-900">
                    Sản phẩm sắp hết hàng
                </h3>
                <Select defaultValue={5} style={{ width: 100 }} onChange={handlePageSizeChange}>
                    <Select.Option value={5}>Top 5</Select.Option>
                    <Select.Option value={10}>Top 10</Select.Option>
                    <Select.Option value={15}>Top 15</Select.Option>
                </Select>
            </div>
            <div className="overflow-x-auto">
                <Table
                    dataSource={lowStockProductsData}
                    columns={columns}
                    pagination={{ pageSize: pageSize }}
                    onChange={handleChange}
                    className="ant-table-wrapper"
                />
            </div>
        </div>
    );
};

const StatisticTables: React.FC = () => {
    return (
        <div className="w-full mx-auto bg-white rounded-lg p-4 mt-4">
            <div className='grid grid-cols-2 gap-5'>
                <TopSellingProductsTable />
                <LowStockProductsTable />
            </div>
        </div>
    );
};

export default StatisticTables;
