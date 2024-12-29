import React, {useEffect, useMemo, useState} from 'react';
import {Table, Avatar, Space, TableProps, Select, Tag, Typography} from 'antd';
import {getProductByStock, getTopSellingProduct} from "../../../services/StatisticalService";
import {IStatistical} from "../../../types/IStatistical";
import useOptionColor from "@/components/Admin/Color/hooks/useOptionColor";
const { Text } = Typography;

const TopSellingProductsTable: React.FC = () => {
    const [sortedInfo, setSortedInfo] = useState<any>({});
    const [pageSize, setPageSize] = useState<number>(5);
    const [topSellingProducts, setTopSellingProducts] = useState<IStatistical[]>([]);
    const [stockThreshold, setStockThreshold] = useState<number>(5);

    const { dataOptionColor = [], error: errorDataOptionColor, isLoading: isLoadingDataOptionColor } =
        useOptionColor(true);

    const colorMap = useMemo(() => {
        return new Map(dataOptionColor.map((item) => [item.label, item.code]));
    }, [dataOptionColor]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getTopSellingProduct(stockThreshold);
                if (response?.data?.items && Array.isArray(response.data.items)) {
                    setTopSellingProducts(response.data.items);
                } else {
                    console.error("API không trả về danh sách sản phẩm:", response);
                    setTopSellingProducts([]);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ API:", error);
                setTopSellingProducts([]);
            }
        };
        fetchProducts();
    }, [stockThreshold]);

    // Cập nhật thông tin sắp xếp
    const handleTableChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    // Thay đổi số lượng sản phẩm hiển thị trên bảng
    const handlePageSizeChange = (value: number) => {
        setPageSize(value);
    };

    // Thay đổi ngưỡng sản phẩm bán chạy
    const handleStockThresholdChange = (value: number) => {
        setStockThreshold(value);
    };

    // Định nghĩa các cột của bảng
    const columns = [
        {
            title: "STT",
            key: "stt",
            render: (_text, _record, index) => index + 1,
        },
        {
            title: "Ảnh",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl) => <Avatar shape="square" size={40} src={imageUrl} />,
        },
        {
            title: "Mã sản phẩm",
            dataIndex: "sku",
            key: "sku",
        },
        {
            title: "Tên sản phẩm",
            key: "productName",
            render: (record: IStatistical) => {
                const colorName = record?.colorName || "_";
                const colorCode = colorMap.get(record?.colorName) || "";
                const sizeName = record?.sizeName || "_";

                return (
                    <span>
                        <Text>{record.productName}</Text>
                        <Text type="secondary" style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginInlineEnd: 4 }}>{`Màu: ${colorName}`}</span>
                            {colorCode && <Tag className="custom-tag" color={colorCode} />} |
                            {` Kích cỡ: ${sizeName}`}
                        </Text>
                    </span>
                );
            },
        },
        {
            title: "Số lượng đã bán",
            dataIndex: "totalQuantitySold",
            key: "totalQuantitySold",
            sorter: (a, b) => a.totalQuantitySold - b.totalQuantitySold,
            sortOrder: sortedInfo.columnKey === "totalQuantitySold" ? sortedInfo.order : null,
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                <h3 className="text-lg text-center leading-6 font-medium text-gray-900">
                    Top sản phẩm bán chạy
                </h3>
                <Select defaultValue={stockThreshold} style={{ width: 100 }} onChange={handleStockThresholdChange}>
                    <Select.Option value={5}>Top 5</Select.Option>
                    <Select.Option value={10}>Top 10</Select.Option>
                    <Select.Option value={15}>Top 15</Select.Option>
                </Select>
            </div>
            <div className="overflow-x-auto">
                <Table
                    dataSource={topSellingProducts}
                    columns={columns}
                    pagination={{ pageSize }}
                    onChange={handleTableChange}
                    className="ant-table-wrapper"
                    rowKey="id"
                />
            </div>
        </div>
    );
};

const LowStockProductsTable: React.FC = () => {
    const [sortedInfo, setSortedInfo] = useState<any>({});
    const [pageSize, setPageSize] = useState<number>(5);
    const [products, setProducts] = useState<IStatistical[]>([]);
    const [stockThreshold, setStockThreshold] = useState<number>(10); // Giá trị ngưỡng số lượng tồn kho

    const { dataOptionColor = [], error: errorDataOptionColor, isLoading: isLoadingDataOptionColor } =
        useOptionColor(true);

    const colorMap = useMemo(() => {
        return new Map(dataOptionColor.map((item) => [item.label, item.code]));
    }, [dataOptionColor]);

    // Lấy dữ liệu sản phẩm dựa vào threshold
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductByStock(stockThreshold);
                if (response?.data?.items && Array.isArray(response.data.items)) {
                    setProducts(response.data.items);
                } else {
                    console.error("API không trả về danh sách sản phẩm:", response);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ API:", error);
                setProducts([]);
            }
        };
        fetchProducts();
    }, [stockThreshold]);

    // Cập nhật thông tin sắp xếp
    const handleTableChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    // Thay đổi số lượng sản phẩm hiển thị trên bảng
    const handlePageSizeChange = (value: number) => {
        setPageSize(value);
    };

    // Thay đổi ngưỡng số lượng tồn kho
    const handleStockThresholdChange = (value: number) => {
        setStockThreshold(value);
    };

    // Định nghĩa các cột của bảng
    const columns = [
        {
            title: "STT",
            key: "stt",
            render: (_text, _record, index) => index + 1,
        },
        {
            title: "Ảnh",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl) => <Avatar shape="square" size={40} src={imageUrl} />,
        },
        {
            title: "Mã sản phẩm",
            dataIndex: "sku",
            key: "sku",
        },
        {
            title: "Tên sản phẩm",
            key: "productName",
            render: (record: IStatistical) => {
                const colorName = record?.colorName || "_";
                const colorCode = colorMap.get(record?.colorName) || "";
                const sizeName = record?.sizeName || "_";

                return (
                    <span>
                        <Text>{record.productName}</Text>
                        <Text type="secondary" style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ marginInlineEnd: 4 }}>{`Màu: ${colorName}`}</span>
                            {colorCode && <Tag className="custom-tag" color={colorCode} />} |
                            {` Kích cỡ: ${sizeName}`}
                        </Text>
                    </span>
                );
            },
        },
        {
            title: "Số lượng còn lại",
            dataIndex: "quantityInStock",
            key: "quantityInStock",
            sorter: (a, b) => a.quantityInStock - b.quantityInStock,
            sortOrder: sortedInfo.columnKey === "quantityInStock" ? sortedInfo.order : null,
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                <h3 className="text-lg text-center leading-6 font-medium text-gray-900">
                    Sản phẩm sắp hết hàng
                </h3>
                <Select defaultValue={10} style={{ width: 100 }} onChange={handleStockThresholdChange}>
                    <Select.Option value={5}>Top 5</Select.Option>
                    <Select.Option value={10}>Top 10</Select.Option>
                    <Select.Option value={15}>Top 15</Select.Option>
                </Select>
            </div>
            <div className="overflow-x-auto">
                <Table
                    dataSource={products}
                    columns={columns}
                    pagination={{ pageSize }}
                    onChange={handleTableChange}
                    className="ant-table-wrapper"
                    rowKey="id"
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
