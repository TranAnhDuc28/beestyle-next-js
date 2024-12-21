import React, {useState, useEffect, memo, useContext} from "react";
import {Modal, List, Card, Avatar, Space, Typography, Button, Checkbox, Pagination} from "antd";
import {findVouchersByTotalAmount} from "@/services/VoucherService";
import {HandleSale} from "@/components/Admin/Sale/SaleComponent";
import {IVoucher} from "@/types/IVoucher";

const {Text, Title} = Typography;

interface IProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onVoucherSelect: (voucherSelected: IVoucher) => void;
}

const ModalListVoucher: React.FC<IProps> = (props) => {
    const {isModalOpen, setIsModalOpen, onVoucherSelect} = props;
    const handleSale = useContext(HandleSale);

    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 10;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedVouchers = vouchers.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const fetchVouchers = async () => {
        try {
            setLoading(true);
            const totalAmount = handleSale?.orderCreateOrUpdate.totalAmount ?? 0;
            const data = await findVouchersByTotalAmount(totalAmount);

            const sortedData = data.sort((a: any, b: any) => {
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

    const handleVoucherSelection = (checked: boolean, voucher: IVoucher) => {
        setSelectedVoucher(checked ? voucher : undefined);
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


    return (
        <Modal
            title="Voucher"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={() => setIsModalOpen(false)}
            width={500}
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
                        <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                            Hủy
                        </Button>
                        <Button key="ok" type="primary" onClick={handleOk} style={{marginLeft: "10px"}}>
                            Xác nhận
                        </Button>
                    </div>
                </div>
            }
            style={{
                top: "40px",
            }}
            styles={{
                body: {
                    maxHeight: "510px",
                    minHeight: "510px",
                    overflowY: "auto",
                }
            }}

        >
            <List
                loading={loading}
                style={{width: "100%"}}
                dataSource={paginatedVouchers}
                renderItem={(item: IVoucher) => (
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
                                        src="/red-gift-square-box.png"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
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
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <div style={{textAlign: "left", marginLeft: "auto"}}>
                                                <Text strong>{item.voucherName}</Text>
                                                <Title level={5} style={{margin: 0}}>
                                                    {item.discountType === "PERCENTAGE"
                                                        ? `Giảm ${item.discountValue || 0}% tối đa ${
                                                            item.maxDiscount
                                                                ? `${item.maxDiscount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                                : 0
                                                        }đ`
                                                        : `Giảm ${item.discountValue
                                                            ? `${item.discountValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                            : 0}đ`}
                                                </Title>
                                                <span style={{color: "black", fontWeight: "normal"}}>
                                                        Cho đơn từ {item.minOrderValue
                                                    ? `${item.minOrderValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                    : 0}đ
                                                    </span>
                                            </div>
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
                                            {/*<span>Mã: {item.voucherCode}</span>&nbsp;|&nbsp;*/}
                                            <span>Hạn sử dụng: {new Date(item.endDate).toLocaleDateString()}</span>
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
        </Modal>
    );

};

export default memo(ModalListVoucher);
