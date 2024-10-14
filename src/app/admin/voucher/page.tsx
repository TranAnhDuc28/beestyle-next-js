"use client"
import {
    Dropdown,
    Layout,
    Select,
    Space,
    DatePicker,
    Typography
} from "antd";
import React, {useState, useEffect} from "react";
import TablePagination from "@/components/TablePagination/TablePagination";
import ColorButton from "@/components/Button/ColorButton";
import Search from "antd/es/input/Search";
import {PlusOutlined, MenuOutlined, CaretDownOutlined} from "@ant-design/icons";

const {Content} = Layout;
const {Title} = Typography;
const {RangePicker} = DatePicker;

interface Voucher {
    key: string;
    code: string;
    name: string;
    type: string;
    discount: string;
    quantity: number;
    startDate: string;
    endDate: string;
    status: string;
}

const VoucherPage = () => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const total = vouchers.length;

    // Fetch data from API
    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/vouchers');
                const data = await response.json();
                const formattedData = data.map((item: any, index: number) => ({
                    key: (index + 1).toString(),
                    code: item.voucherCode, // Mã phiếu
                    name: item.voucherName, // Tên phiếu
                    type: item.discountType, // Loại giảm giá (kiểu giảm giá)
                    discount: item.discountValue + '%', // Giá trị giảm giá
                    maxDiscount: item.maxDiscount, // Mức giảm tối đa
                    minOrderValue: item.minOrderValue, // Giá trị đơn hàng tối thiểu
                    quantity: item.usageLimit, // Giới hạn số lượng sử dụng
                    startDate: item.startDate, // Ngày bắt đầu
                    endDate: item.endDate, // Ngày kết thúc
                    status: item.status === 1 ? 'Đang diễn ra' : 'Kết thúc', // Trạng thái
                }));
                setVouchers(formattedData);
            } catch (error) {
                console.error('Failed to fetch vouchers:', error);
            }
        };

        fetchVouchers();
    }, []);

    const handlePageChange = (page: number, pageSize: number) => {
        console.log(`Page: ${page}, PageSize: ${pageSize}`);
        // Gọi API hoặc cập nhật dữ liệu ở đây nếu cần
    };

    const onSearch = (value: string) => {
        console.log("Tìm kiếm:", value);
    };

    // Hàm xử lý khi người dùng thay đổi bộ lọc
    const handleFilterChange = (filters: any) => {
        console.log("Lọc với các giá trị:", filters);
        // Thực hiện việc lọc dựa trên giá trị đã chọn
    };

    return (
        <div>
            {/* Phần header chứa tìm kiếm và nút thêm mới */}
            <Space direction="vertical" style={{width: '100%'}}>
                <Title level={3}>Phiếu giảm giá</Title>
                <Space direction="horizontal" style={{width: '100%'}} align="center">
                    {/* Tìm kiếm theo tên hoặc mã */}
                    <Search
                        placeholder="Tìm kiếm theo mã hoặc tên"
                        allowClear
                        onSearch={onSearch}
                        style={{width: 300}}
                    />

                    {/* Lọc theo Kiểu */}
                    <Select
                        placeholder="Chọn kiểu"
                        style={{width: 120}}
                        allowClear
                        options={[
                            {value: 'personal', label: 'Cá nhân'},
                            {value: 'public', label: 'Công khai'}
                        ]}
                    />

                    {/* Lọc theo Loại Giảm Giá */}
                    <Select
                        placeholder="Chọn loại giảm giá"
                        style={{width: 150}}
                        allowClear
                        options={[
                            {value: 'percent', label: 'Phần trăm'},
                            {value: 'amount', label: 'Số tiền'}
                        ]}
                    />

                    {/* Trạng Thái */}
                    <Select
                        placeholder="Chọn trạng thái"
                        style={{width: 150}}
                        allowClear
                        options={[
                            {value: 'ongoing', label: 'Đang diễn ra'},
                            {value: 'ended', label: 'Kết thúc'}
                        ]}
                    />

                    {/* Lọc theo khoảng ngày */}
                    <RangePicker
                        placeholder={['Từ ngày', 'Đến ngày']}
                        style={{width: 250}}
                        onChange={(dates, dateStrings) => {
                            console.log('Ngày bắt đầu:', dateStrings[0], 'Ngày kết thúc:', dateStrings[1]);
                        }}
                    />

                    {/* Nút thêm phiếu giảm giá */}
                    <ColorButton
                        bgColor="#00b96b"
                        type="primary"
                        icon={<PlusOutlined/>}
                    >
                        Thêm phiếu giảm giá
                    </ColorButton>
                </Space>
            </Space>

            {/* Phần bảng hiển thị dữ liệu */}
            <Content style={{marginTop: 20}}>
                <TablePagination
                    columns={[
                        {
                            title: 'STT',
                            dataIndex: 'key',
                            render: (text: string, record: Voucher, index: number) => (index + 1)
                        },
                        {title: 'Mã', dataIndex: 'code', render: (text: string) => <a>{text}</a>,},
                        {title: 'Tên', dataIndex: 'name',},
                        {
                            title: 'Giá trị giảm',
                            render: (text: string, record: Voucher) => (
                                `${record.type} - ${record.discount}`
                            )
                        },
                        // {title: 'Mức giảm tối đa', dataIndex: 'maxDiscount',},
                        // {title: 'Giá trị đơn hàng tối thiểu', dataIndex: 'minOrderValue',},
                        {title: 'Số lượng', dataIndex: 'quantity',},
                        {title: 'Ngày bắt đầu', dataIndex: 'startDate',},
                        {title: 'Ngày kết thúc', dataIndex: 'endDate',},
                        {
                            title: 'Trạng thái', dataIndex: 'status', render: (status: string) => (
                                <span style={{color: status === 'Đang diễn ra' ? 'green' : 'red'}}>
                    {status}
                </span>
                            ),
                        },
                    ]}
                    data={vouchers}
                    total={total}
                    onPageChange={handlePageChange}
                />

            </Content>
        </div>
    );
};

export default VoucherPage;
