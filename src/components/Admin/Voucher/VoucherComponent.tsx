"use client";

import {DatePicker, Space, Typography, Select, Layout} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import useSWR from "swr";
// import { getVoucher } from "@/services/VoucherService";
import {getVoucher, vuocherUrlEndpoint as cacheKey} from "@/services/VoucherService";
import TablePagination from "@/components/TablePagination/TablePagination";
import ColorButton from "@/components/Button/ColorButton";
import {OptionsParams} from "@/utils/HttpInstance";
import React from "react";

const {Content} = Layout;
const {Title} = Typography;
const {RangePicker} = DatePicker;

interface Voucher {
    key: string;
    voucherCode: string;
    voucherName: string;
    discountType: string;
    discountValue: number;
    maxDiscount: number;
    minOrderValue: number;
    startDate: string;
    endDate: string;
    usageLimit: number;
    usagePerUser: number;
    status: number;
}


const VoucherPage: React.FC<any> = (props: any) => {
    const options: OptionsParams = props.options || {};

    const {data, error, isLoading} = useSWR([cacheKey, options], () => getVoucher(options), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000,
    });

    if (error) {
        return <div>{error?.response?.data?.message || "Error fetching vouchers"}</div>;
    }

    if (isLoading) {
        return <div>Loading..</div>;
    }

// Truy xuất items từ dữ liệu trả về
    const vouchers = data?.data?.items || [];
    const total = vouchers.length;

    console.log("Vouchers:", vouchers);
    const handlePageChange = (page: number, pageSize: number) => {
        console.log(`Page: ${page}, PageSize: ${pageSize}`);
    };

    const onSearch = (value: string) => {
        console.log("Tìm kiếm:", value);
    };

    const handleFilterChange = (filters: any) => {
        console.log("Lọc với các giá trị:", filters);
    };

    return (
        <div>

            <Space direction="vertical" style={{width: '100%'}}>
                <Title level={3}>Phiếu giảm giá</Title>
                <Space direction="horizontal" style={{width: '100%'}} align="center">

                    <Search
                        placeholder="Tìm kiếm theo mã hoặc tên"
                        allowClear
                        onSearch={onSearch}
                        style={{width: 300}}
                    />


                    <Select
                        placeholder="Chọn kiểu"
                        style={{width: 120}}
                        allowClear
                        options={[
                            {value: 'personal', label: 'Cá nhân'},
                            {value: 'public', label: 'Công khai'}
                        ]}
                    />


                    <Select
                        placeholder="Chọn loại giảm giá"
                        style={{width: 150}}
                        allowClear
                        options={[
                            {value: 'percent', label: 'Phần trăm'},
                            {value: 'amount', label: 'Số tiền'}
                        ]}
                    />


                    <Select
                        placeholder="Chọn trạng thái"
                        style={{width: 150}}
                        allowClear
                        options={[
                            {value: 'ongoing', label: 'Đang diễn ra'},
                            {value: 'ended', label: 'Kết thúc'}
                        ]}
                    />


                    <RangePicker
                        placeholder={['Từ ngày', 'Đến ngày']}
                        style={{width: 250}}
                        onChange={(dates, dateStrings) => {
                            console.log('Ngày bắt đầu:', dateStrings[0], 'Ngày kết thúc:', dateStrings[1]);
                        }}
                    />


                    <ColorButton
                        bgColor="#00b96b"
                        type="primary"
                        icon={<PlusOutlined/>}
                    >
                        Thêm phiếu giảm giá
                    </ColorButton>
                </Space>
            </Space>


            <Content style={{marginTop: 20}}>
                <TablePagination
                    columns={[
                        {
                            title: 'STT',
                            dataIndex: 'key',
                            render: (text: string, record: Voucher, index: number) => (index + 1)
                        },
                        {
                            title: 'Mã',
                            dataIndex: 'voucherCode',
                            render: (text: string) => <a>{text}</a>
                        },
                        {
                            title: 'Tên',
                            dataIndex: 'voucherName'
                        },
                        {
                            title: 'Loại giảm',
                            render: (text: string, record: Voucher) => (
                                `${record.discountValue} ${record.discountType}`
                            )
                        },

                        {
                            title: 'Số lượng',
                            dataIndex: 'usageLimit'
                        },

                        {
                            title: 'Ngày bắt đầu',
                            dataIndex: 'startDate',
                            render: (value: string) => new Date(value).toLocaleDateString('vi-VN')
                        },
                        {
                            title: 'Ngày kết thúc',
                            dataIndex: 'endDate',
                            render: (value: string) => new Date(value).toLocaleDateString('vi-VN')
                        },
                        {
                            title: 'Trạng thái',
                            dataIndex: 'status',
                            render: (status: number) => (
                                <span style={{color: status === 1 ? 'green' : 'red'}}>
                    {status === 1 ? 'Đang diễn ra' : 'Kết thúc'}
                </span>
                            )
                        }
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
