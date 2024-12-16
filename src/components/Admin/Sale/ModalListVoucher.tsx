import React, {useState, useEffect, memo} from "react";
import {Modal, List, Card, Avatar, Space, Typography, Button, Checkbox} from "antd";
import {findVouchersByTotalAmount} from "@/services/VoucherService";

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

    const fetchVouchers = async () => {
        try {
            setLoading(true);
            const data = await findVouchersByTotalAmount(totalAmount);
            const sortedData = data.sort((a, b) => {
                const discountValueA = a.discountType === 0 ? a.discountValue * totalAmount / 100 : a.maxDiscount;
                const discountValueB = b.discountType === 0 ? b.discountValue * totalAmount / 100 : b.maxDiscount;
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
                let discountAmount;

                if (selectedVoucher.discountType === 0) {
                    discountAmount = (totalAmount * selectedVoucher.discountValue) / 100;
                    if (discountAmount > selectedVoucher.maxDiscount) {
                        discountAmount = selectedVoucher.maxDiscount;
                    }
                } else if (selectedVoucher.discountType === 1) {
                    discountAmount = Math.min(selectedVoucher.discountValue, selectedVoucher.maxDiscount);
                }

                onVoucherSelect(discountAmount); // Trả giá trị giảm về cha

                setIsModalOpen(false);
            }
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
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button key="ok" type="primary" onClick={handleOk}>
                    Xác nhận
                </Button>,
            ]}
            styles={{
                body: {
                    minHeight: "300px",
                    maxHeight: "300px",
                    overflowY: "auto",
                }
            }}
        >
            {loading ? (
                <div style={{textAlign: "center", padding: "20px"}}>Đang tải...</div>
            ) : (
                <List
                    style={{width: "100%"}}
                    dataSource={vouchers}
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
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                            <Text strong>{item.voucherName}</Text>
                                            <div style={{textAlign: "right", marginLeft: "auto"}}>
                                                <Title level={5} style={{margin: 0}}>
                                                    {item.discountValue
                                                        ? `${item.discountValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                        : 0}{" "}
                                                    {item.discountType === 0 ? "%" : "VND"}
                                                </Title>
                                            </div>
                                        </div>
                                    }
                                    description={
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}>
                                            <div>
                                                <span>Mã: {item.voucherCode}</span>
                                                <br/>
                                                <span>Hạn sử dụng: {new Date(item.endDate).toLocaleDateString()}</span>
                                            </div>
                                            <Checkbox
                                                checked={selectedVoucher && selectedVoucher.id === item.id}
                                                onChange={(e) => handleVoucherSelection(e.target.checked, item)}
                                            >
                                            </Checkbox>
                                        </div>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                    pagination={{
                        defaultPageSize: 5,
                    }}

                />
            )}
        </Modal>
    );
};

export default memo(ModalListVoucher);
