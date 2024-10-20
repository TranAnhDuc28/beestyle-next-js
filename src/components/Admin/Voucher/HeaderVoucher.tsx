import { Flex, Input, Typography, DatePicker, Select, Row, Col } from "antd";
import Search from "antd/es/input/Search";
import ColorButton from "@/components/Button/ColorButton";
import { PlusOutlined } from "@ant-design/icons";
import { memo, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Option } from "antd/es/mentions";
import { findVouchers,findVouchersByDate } from "@/services/VoucherService";

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface IProps {
    setIsCreateModalOpen: (value: boolean) => void;
    setVouchers: (vouchers: any[]) => void;
}

const HeaderVoucher = (props: IProps) => {
    const { setIsCreateModalOpen, setVouchers } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams.toString());

    const fetchVouchers = async () => {
        const searchTerm = params.get("searchTerm") || "";
        const page = params.get("page") || "0";

        if (!searchTerm) {
            setVouchers([]);
            return;
        }

        const data = await findVouchers(searchTerm, page);
        if (data && data.data) {
            const vouchersData = data.data.content || data.data.items || [];
            setVouchers(vouchersData.length > 0 ? vouchersData : []);
        } else {
            setVouchers([]);
        }
    };

    const onSearch = (value: string) => {
        params.set("searchTerm", value || "");
        params.set("page", "0");
        replace(`${pathname}?${params.toString()}`);
        fetchVouchers();
    };

    useEffect(() => {
        fetchVouchers();
    }, [searchParams]);

    const handleDateChange = async (dates: any, dateStrings: [string, string]) => {
        params.set("startDate", dateStrings[0]);
        params.set("endDate", dateStrings[1]);
        replace(`${pathname}?${params.toString()}`);
        await fetchVouchersByDate();
    };

    const fetchVouchersByDate = async () => {
        const startDate = params.get("startDate");
        const endDate = params.get("endDate");
        const page = params.get("page") || "0";

        const data = await findVouchersByDate(startDate, endDate, page);
        if (data && data.data) {
            const vouchersData = data.data.content || data.data.items || [];
            setVouchers(vouchersData);
        } else {
            setVouchers([]);
        }
    };


    const handleSelectChange = (value: string, key: string) => {
        params.set(key, value);
        replace(`${pathname}?${params.toString()}`);
        fetchVouchers(); // Gọi lại API khi thay đổi giá trị select
    };

    return (
        <div style={{ padding: '' }}>
            <Flex
                direction="column"
                style={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Row justify="center" style={{ marginBottom: 0 }}>
                    <Title level={3} style={{ margin: 0, textAlign: 'center' }}>
                        Phiếu giảm giá
                    </Title>
                </Row>
            </Flex>

            <div
                style={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    margin: '10px',
                }}
            >
                <Row gutter={[16, 16]} justify="start" align="middle">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Search
                            placeholder="Tìm phiếu giảm giá"
                            allowClear
                            onSearch={onSearch}
                            style={{ width: '100%' }}
                        />
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={6}>
                        <RangePicker
                            onChange={handleDateChange}
                            placeholder={['Từ ngày', 'Đến ngày']}
                            style={{ width: '100%' }}
                        />
                    </Col>

                    <Col xs={12} sm={8} md={6} lg={3}>
                        <Select
                            placeholder="Kiểu"
                            style={{ width: '100%' }}
                            onChange={(value) => handleSelectChange(value, "type")}
                        >
                            <Option value="percentage">Phần trăm</Option>
                            <Option value="fixed">Cố định</Option>
                        </Select>
                    </Col>

                    <Col xs={12} sm={8} md={6} lg={3}>
                        <Select
                            placeholder="Loại"
                            style={{ width: '100%' }}
                            onChange={(value) => handleSelectChange(value, "category")}
                        >
                            <Option value="discount">Giảm giá</Option>
                            <Option value="cashback">Hoàn tiền</Option>
                        </Select>
                    </Col>

                    <Col xs={12} sm={8} md={6} lg={3}>
                        <Select
                            placeholder="Trạng thái"
                            style={{ width: '100%' }}
                            onChange={(value) => handleSelectChange(value, "status")}
                        >
                            <Option value="active">Đang diễn ra</Option>
                            <Option value="inactive">Kết thúc</Option>
                        </Select>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={3}>
                        <ColorButton
                            bgColor="#00b96b"
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsCreateModalOpen(true)}
                            style={{ width: '100%' }}
                        >
                            Thêm phiếu
                        </ColorButton>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default memo(HeaderVoucher);
