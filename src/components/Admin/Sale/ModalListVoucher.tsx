import React, {useState, useEffect, memo} from "react";
import {Modal, List, Card, Avatar, Space, Typography, Button, Checkbox, Pagination} from "antd";
import {findVouchersByTotalAmount} from "@/services/VoucherService";
import {DISCOUNT_TYPE} from "../../../constants/DiscountType";

const {Text, Title} = Typography;

const ModalListVoucher = ({
                              isModalOpen,
                              setIsModalOpen,
                              totalAmount,
                              onVoucherSelect,
                          }) => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedVouchers = vouchers.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const fetchVouchers = async () => {
        try {
            setLoading(true);
            const data = await findVouchersByTotalAmount(totalAmount);

            const sortedData = data.sort((a, b) => {
                const discountValueA =
                    a.discountType === "PERCENTAGE"
                        ? Math.min((a.discountValue * totalAmount) / 100, a.maxDiscount)
                        : Math.min(a.discountValue, a.maxDiscount);
                const discountValueB =
                    b.discountType === "PERCENTAGE"
                        ? Math.min((b.discountValue * totalAmount) / 100, b.maxDiscount)
                        : Math.min(b.discountValue, b.maxDiscount);
                return discountValueB - discountValueA;
            });

            setVouchers(sortedData);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách voucher:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (isModalOpen) {
            fetchVouchers();
        }
    }, [isModalOpen]);

    const handleVoucherSelection = (checked, voucher) => {
        setSelectedVoucher(checked ? voucher : null);
    };

    const handleOk = () => {
        if (selectedVoucher) {
            onVoucherSelect(selectedVoucher);
            setIsModalOpen(false);
        }
        // if (selectedVoucher) {
        //     let discountAmount;
        //
        //     if (selectedVoucher.discountType === "PERCENTAGE") {
        //         discountAmount = (totalAmount * selectedVoucher.discountValue) / 100;
        //         if (discountAmount > selectedVoucher.maxDiscount) {
        //             discountAmount = selectedVoucher.maxDiscount;
        //         }
        //     } else if (selectedVoucher.discountType === "CASH") {
        //         discountAmount = Math.min(selectedVoucher.discountValue, selectedVoucher.maxDiscount);
        //     }
        //
        //     onVoucherSelect(discountAmount);
        //     setIsModalOpen(false);
        // }
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Chọn Voucher"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={600}
            footer={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={vouchers.length}
                        onChange={handlePageChange}
                        style={{
                            margin: 0,
                        }}
                    />
                    <div>
                        <Button key="cancel" onClick={handleCancel}>
                            Hủy
                        </Button>
                        <Button key="ok" type="primary" onClick={handleOk} style={{marginLeft: "10px"}}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            }
            style={{
                top: "50px",
            }}
            styles={{
                body: {
                    maxHeight: "400px",
                    minHeight: "400px",
                    overflowY: "auto",
                }
            }}

        >
            {loading ? (
                <div style={{textAlign: "center", padding: "20px"}}>Đang tải...</div>
            ) : (
                <List
                    style={{width: "100%"}}
                    dataSource={paginatedVouchers}
                    renderItem={(item) => (
                        <List.Item style={{borderBottom: "none", padding: "5px 0px"}}>
                            <Card
                                style={{flex: "1", cursor: "pointer"}}
                                styles={{body: {padding: 8}}}
                                onClick={() => handleVoucherSelection(false, item)}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            shape="square"
                                            src={item.image || "/red-gift-square-box.png"}
                                            size={{xs: 64, sm: 64, md: 64, lg: 64, xl: 72, xxl: 72}}
                                        />
                                    }
                                    title={
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text strong>{item.voucherName}</Text>
                                            <div style={{textAlign: "right", marginLeft: "auto"}}>
                                                <Title level={5} style={{margin: 0}}>
                                                    {item.discountValue
                                                        ? `${item.discountValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                        : 0}{" "}
                                                    {item.discountType === "PERCENTAGE" ? "%" : "VND"}
                                                </Title>
                                            </div>
                                        </div>
                                    }
                                    description={
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div>
                                                <span>Mã: {item.voucherCode}</span>&nbsp;|&nbsp;
                                                <span>Hạn sử dụng: {new Date(item.endDate).toLocaleDateString()}</span>
                                                <br/>
                                                <span>Mô tả: {item.note}</span>
                                            </div>
                                            <Checkbox
                                                checked={selectedVoucher && selectedVoucher.id === item.id}
                                                onChange={(e) => handleVoucherSelection(e.target.checked, item)}
                                            ></Checkbox>
                                        </div>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </Modal>
    );

};

export default memo(ModalListVoucher);
