import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import {
    AutoCompleteProps,
    Button,
    Checkbox,
    Col,
    Divider,
    Drawer,
    Flex, Input, InputNumber, Modal, Popover, QRCode, Radio, RadioChangeEvent, Row, Tag,
    Typography
} from "antd";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {LiaShippingFastSolid} from "react-icons/lia";
import {BiSolidCoupon} from "react-icons/bi";
import {PAYMENT_METHOD} from "@/constants/PaymentMethod";
import {FORMAT_NUMBER_WITH_COMMAS, PARSER_NUMBER_WITH_COMMAS_TO_NUMBER} from "@/constants/AppConstants";
import {HandleSale} from "@/components/Admin/Sale/SaleComponent";
import {debounce} from "lodash";
import QuickSelectMoney from "@/components/Admin/Sale/QuickSelectMoneyTag";
import {ExclamationCircleFilled} from "@ant-design/icons";
import {IOrderCreateOrUpdate} from "@/types/IOrder";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";
import useAddress from "@/components/Admin/Address/hook/useAddress";
import ModalListVoucher from "./ModalListVoucher";
import {IVoucher} from "@/types/IVoucher";
import {ORDER_TYPE} from "@/constants/OrderType";
import {ORDER_STATUS} from "@/constants/OrderStatus";
import {calculateFinalAmount, calculateInvoiceDiscount, calculateShippingFee} from "@/utils/AppUtil";
import {DISCOUNT_TYPE} from "@/constants/DiscountType";

const {Title, Text} = Typography;
const {TextArea} = Input;

export interface PaymentInfo {
    discountAmount: number; // giảm giá của voucher
    shippingFee: number // phí ship với bán giao hàng
    finalTotalAmount: number; // tiền khách cần trả cuối cùng
    amountPaid: number; // tiền khách thanh tóán
    change: number; // tiền dư
}

interface IProps {
    title?: string;
    open: boolean;
    onClose: (drawerType: "checkout" | "filter", isOpen: boolean) => void;
}

const CheckoutComponent: React.FC<IProps> = (props) => {
    const {open, onClose} = props;
    const handleSale = useContext(HandleSale);

    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);
    const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | null>(null);
    const [selectedWardCode, setSelectedWardsCode] = useState<string | null>(null);

    const {handleGetProvinces, handleGetDistricts, handleGetWards} = useAddress();
    const provincesData = handleGetProvinces();
    const districtsData = handleGetDistricts(selectedProvinceCode);
    const wardsData = handleGetWards(selectedDistrictCode);

    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalQROpen, setIsModalQROpen] = useState(false);
    const [selectedTag, setSelectedTag] = React.useState<number>(0);
    const [deliverySale, setDeliverySale] = React.useState<boolean>(false);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(
        {
            discountAmount: 0,
            shippingFee: 0,
            finalTotalAmount: 0,
            amountPaid: 0,
            change: 0
        });
    const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | undefined>(undefined);

    // console.log(JSON.stringify(paymentInfo, null, 2));

    // show QR thanh toán với chuyển khoản
    const showModalQR = () => setIsModalQROpen(true);
    const handleModalQRCancel = () => setIsModalQROpen(false);

    // hiển thị modal list voucher
    const showModalListVoucher = () => {
        setIsModalOpen(true);
    };

    // xác nhận thanh toán, hoàn thành hóa đơn
    const handleOk = () => {
        const orderCreateOrUpdate: IOrderCreateOrUpdate = {
            ...handleSale?.orderCreateOrUpdate,
            shippingFee: paymentInfo.shippingFee,
            totalAmount: paymentInfo.finalTotalAmount,
            orderStatus: ORDER_STATUS.PAID.key
        }

        console.log(JSON.stringify(orderCreateOrUpdate, null, 2));

        setIsModalOpen(false);
        onClose("checkout", false);
    }

    const handleCancel = () => setIsModalOpen(false);

    // xử lý khi chọn phương thức thanh toán
    const handlePaymentMethod = (e: RadioChangeEvent) => {
        handleSale?.setOrderCreateOrUpdate((prevValue) => {
            return {
                ...prevValue,
                paymentMethod: e.target.value
            };
        })
    };

    // xử lí khi chọn bán giao hàng
    const handleDeliverySale = (checked: boolean) => {
        // show thông tin nhập bán giao hàng
        setDeliverySale(checked);

        // reset selected tag quick money
        setSelectedTag(0);

        // tính phí vận chuyển
        let shippingFee = 0;

        // Lấy tổng số tiền từ hóa đơn hiện tại
        let totalAmount = handleSale?.orderCreateOrUpdate?.totalAmount;

        // Nếu chọn giao hàng và tổng tiền >= 500000 thì phí ship là 0
        if (checked) shippingFee = totalAmount && totalAmount >= 500000 ? 0 : 30000;

        handleSale?.setOrderCreateOrUpdate((prevValue) => {
            return {
                ...prevValue,
                shippingFee: shippingFee,
                orderType: checked ? ORDER_TYPE.DELIVERY.key : ORDER_TYPE.IN_STORE_PURCHASE.key
            };
        });

        setPaymentInfo(prevValue => {
            const updatedAmountPaid = checked
                ? prevValue.amountPaid + shippingFee
                // : prevValue.amountPaid - shippingFee;
                : totalAmount ?? 0;
            return {
                ...prevValue,
                amountPaid: updatedAmountPaid,
            };
        });
    }

    // xử lý khi nhập tiền khách trả
    const handleInputAmountPaidChange = useCallback(debounce((value: number | null) => {
        setPaymentInfo(prev => ({
            ...prev,
            amountPaid: value || 0,
        }));
    }, 1000), []);

    // xử lý giá trị ghi chú đơn hàng
    const handleChangeTextAreaNote = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleSale?.setOrderCreateOrUpdate((prevValue) => {
            return {
                ...prevValue,
                note: e.target.value
            };
        });
    }, 1500), []);

    // xử lý khi chọn tỉnh/TP
    const onChangeSelectedProvince = useCallback((provinceCode: string) => {
        setSelectedProvinceCode(provinceCode);
        setSelectedDistrictCode(null);
        setSelectedWardsCode(null);
    }, []);

    // xử lý khi chọn quận/huyện
    const onChangeSelectedDistrict = useCallback((districtCode: string) => {
        setSelectedDistrictCode(districtCode);
        setSelectedWardsCode(null);
    }, []);

    // xử lý khi chọn xã/phường
    const onChangeSelectedWard = useCallback((wardCode: string) => {
        setSelectedWardsCode(wardCode);
    }, []);

    // xử lý khi chọn voucher
    const handleVoucherSelect = (voucherSelected: IVoucher) => {
        setSelectedVoucher(voucherSelected);

        // giá trị giảm giá cho hóa đơn
        const discountAmount = calculateInvoiceDiscount(voucherSelected, handleSale?.totalAmountCart);

        // set id voucher vào hóa đơn thanh toán
        handleSale?.setOrderCreateOrUpdate((prevValue) => {
            return {
                ...prevValue,
                voucherId: voucherSelected.id
            };
        });

        // set và hiển thị tiền giảm giá voucher
        setPaymentInfo(prev => ({
            ...prev,
            discountAmount: discountAmount,
        }));

        console.log("Giá trị giảm và id voucher là: ", discountAmount, voucherSelected.id);
    };

    // xử lý khi hủy chọn voucher
    const handleClearTagVoucherSelected = useCallback(() => {
        // reset voucher được chọn về giá trị null
        setSelectedVoucher(undefined);

        // reset giá trị giảm giá về 0
        setPaymentInfo(prev => ({
            ...prev,
            discountAmount: 0,
        }));

        // reset id voucher trong hóa đơn
        handleSale?.setOrderCreateOrUpdate((prevValue) => {
            return {
                ...prevValue,
                voucherId: undefined
            };
        });
    }, []);


    // tính toán hiển thị thông tin thanh toán
    const displayInfoCheckout = async () => {
        try {
            if (handleSale?.totalAmountCart) {
                // tính tiền giảm giá cho hóa đơn dựa trên tổng tiền hàng
                const discountAmount = calculateInvoiceDiscount(selectedVoucher, handleSale.totalAmountCart);

                // Tính phí vận chuyển
                const shippingFee = deliverySale
                    ? await calculateShippingFee(handleSale.totalAmountCart, handleSale?.orderCreateOrUpdate.shippingAddress)
                    : 0;

                // tính tổng tiền cuối cùng cần thanh toán
                const finalTotalAmount = calculateFinalAmount(handleSale.totalAmountCart, discountAmount, shippingFee);

                // tính tiền dư
                const change = paymentInfo.amountPaid - finalTotalAmount;

                // đưa thông tin vào state
                setPaymentInfo((prevValue) => {
                    return {
                       ...prevValue,
                        shippingFee: shippingFee,
                        discountAmount: discountAmount,
                        finalTotalAmount: finalTotalAmount,
                        amountPaid: finalTotalAmount,
                        change: change
                    }
                });
            }
        } catch (error) {
            console.error("Error calculating checkout information:", error);
        }
    }

    useEffect(() => {
        if (handleSale?.totalAmountCart) {
            displayInfoCheckout();
        }
    }, [handleSale?.totalAmountCart]);

    // tính lại tổng tiền thanh toán khi giảm giá thay đổi
    useEffect(() => {
        const finalTotalAmount = calculateFinalAmount(handleSale?.totalAmountCart, paymentInfo.discountAmount, paymentInfo.shippingFee);

        setPaymentInfo((prevValue) => {
            return {
                ...prevValue,
                finalTotalAmount: finalTotalAmount
            }
        });
    }, [paymentInfo.discountAmount]);

    // tính tiền thừa trả khách
    useEffect(() => {
        const change = paymentInfo.amountPaid - paymentInfo.finalTotalAmount;

        setPaymentInfo((prevValue) => {
            return {
                ...prevValue,
                change: change
            }
        });
    }, [paymentInfo.amountPaid, paymentInfo.finalTotalAmount]);

    // title drawer checkout
    const titleDrawer = (
        <div>
            <Title level={4} style={{margin: 0}}>Khách lẻ</Title>
        </div>
    );

    const extraDrawer = (
        <div>
            <Button onClick={() => onClose("checkout", false)} type="text" icon={<CloseIcon/>}/>
        </div>
    );

    const showConfirmCheckOut = () => {
        Modal.confirm({
            title: "Xác nhận thanh toán đơn hàng",
            icon: <ExclamationCircleFilled/>,
            width: 500,
            content: (
                <div style={{margin: "20px 0px"}}>
                    <span>Bạn có chắc muốn thanh toán đơn hàng </span>
                    <Text strong>{handleSale?.orderCreateOrUpdate.orderTrackingNumber}</Text>
                </div>
            ),
            onOk() {
                handleOk()
            },
            onCancel() {
            },
        });
    };

    const footerDrawer = (
        <Flex justify="flex-end" align="center" style={{padding: "5px 0px"}}>
            <Button style={{width: "100%"}} size="large" type="primary" onClick={showConfirmCheckOut}>
                Xác nhận thanh toán
            </Button>
        </Flex>
    );

    return (
        <>
            <Drawer
                title={titleDrawer}
                placement="right"
                width={700}
                onClose={() => onClose("checkout", false)}
                open={open}
                closable={false}
                extra={extraDrawer}
                footer={footerDrawer}
                styles={{
                    header: {padding: '10px 24px'},
                    body: {padding: '15px'},
                }}
            >

                <Flex justify="space-between" align="center" style={{width: "100%"}} wrap gap={10}>
                    <Button onClick={showModalListVoucher} type="primary" size="large">
                        Chọn Voucher
                    </Button>

                    {/* voucher được chọn */}
                    {selectedVoucher ? (
                        <>
                            <Popover
                                content={
                                    <div>
                                        <Text strong>{selectedVoucher.voucherName}</Text>
                                        <br/>
                                        <Text>
                                            Hạn sử dụng: {new Date(selectedVoucher.endDate).toLocaleDateString()}
                                        </Text>
                                        <br/>
                                        <Text>
                                            Áp dụng cho đơn hàng từ {selectedVoucher.minOrderValue}đ,
                                            giảm tối đa {selectedVoucher.discountType === DISCOUNT_TYPE.PERCENTAGE.key ?
                                            `${selectedVoucher.maxDiscount}đ` :
                                            `${selectedVoucher.discountValue}đ`}
                                        </Text>
                                    </div>
                                }
                                trigger="hover"
                                placement="left"
                            >
                                <Tag
                                    closeIcon
                                    style={{display: "flex", alignItems: "center", padding: 5, fontSize: 16}}
                                    color="processing"
                                    onClose={handleClearTagVoucherSelected}
                                >
                                    <BiSolidCoupon style={{display: "inline", marginInlineEnd: 5}}/>
                                    <Text style={{fontSize: 16}}>
                                        {selectedVoucher?.voucherCode}
                                    </Text>
                                </Tag>
                            </Popover>
                        </>
                    ) : (
                        <></>
                    )}
                </Flex>

                <Divider style={{margin: "15px 0px"}}/>
                <Flex align="center" style={{width: "100%"}} wrap gap={10}>
                    <Flex justify="space-between" align="center" style={{width: "100%", paddingBottom: 4}} wrap>
                        <Flex justify="space-between" align="center" wrap>
                            <Text style={{fontSize: 16}}>
                                <span style={{marginInlineEnd: 30}}>Tổng tiền hàng</span>
                                <Text strong>
                                    {`${handleSale?.totalQuantityCart}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                </Text>
                            </Text>
                        </Flex>
                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                            {`${handleSale?.totalAmountCart}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                        </Text>
                    </Flex>

                    {/* giảm giá hóa đơn */}
                    <Flex justify="space-between" align="center" style={{width: "100%", padding: "4px 0px"}} wrap>
                        <Text style={{fontSize: 16}}>Giảm giá</Text>
                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                            {`${paymentInfo.discountAmount}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                        </Text>
                    </Flex>

                    {/* phí vận chuyển */}
                    {
                        deliverySale &&
                        (
                            <>
                                <Flex justify="space-between" align="center" style={{width: "100%", padding: "4px 0px"}}
                                      wrap>
                                    <Text style={{fontSize: 16}}>Phí vận chuyển</Text>
                                    <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                        {`${paymentInfo.shippingFee}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                    </Text>
                                </Flex>
                            </>
                        )
                    }

                    {/* khách cần trả */}
                    <Flex justify="space-between" align="center" style={{width: "100%", padding: "4px 0px"}} wrap>
                        <Text style={{fontSize: 16}} strong>Tổng thanh toán</Text>
                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                            {`${paymentInfo.finalTotalAmount}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                        </Text>
                    </Flex>

                    {/* tiền khách trả */}
                    <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                        <Text style={{fontSize: 16}} strong>Khách thanh toán</Text>
                        <InputNumber<number>
                            value={paymentInfo.amountPaid}
                            className="custom-input"
                            formatter={(value) => `${value}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                            parser={(value) => value?.replace(PARSER_NUMBER_WITH_COMMAS_TO_NUMBER, '') as unknown as number}
                            style={{textAlignLast: "end", fontWeight: "bold", fontSize: 16, width: 150}}
                            controls={false}
                            onChange={handleInputAmountPaidChange}
                        />
                    </Flex>
                </Flex>

                <Divider style={{margin: "15px 0px"}}/>

                {
                    handleSale?.dataCart && handleSale.dataCart.length > 0 &&
                    (handleSale?.totalAmountCart ?? 0) > 0 &&
                    (
                        <Flex style={{width: "100%"}} wrap>
                            {/* phương thức thanh toán */}
                            <Flex justify="flex-start" align="center" style={{width: "100%", marginBottom: 10}}
                                  wrap>
                                <Radio.Group defaultValue={PAYMENT_METHOD.CASH.key} onChange={handlePaymentMethod}>
                                    <Row gutter={[16, 16]}>
                                        {Object.keys(PAYMENT_METHOD).map((key) => (
                                            <Col key={key}>
                                                <Radio value={key}>
                                                    {PAYMENT_METHOD[key as keyof typeof PAYMENT_METHOD].description}
                                                </Radio>
                                            </Col>
                                        ))}
                                    </Row>
                                </Radio.Group>
                            </Flex>

                            {/* chọn nhanh tiền khách trả */}
                            <QuickSelectMoney
                                amountDue={paymentInfo.finalTotalAmount}
                                step={50000}
                                selectedTag={selectedTag}
                                setSelectedTag={setSelectedTag}
                                setPaymentInfo={setPaymentInfo}
                            />

                            <Flex justify="space-between" align="center" style={{width: "100%", marginTop: 10}}
                                  wrap>
                                <Text style={{fontSize: 16}}>Tiền thừa trả khách</Text>
                                <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                    {`${paymentInfo.change}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                </Text>
                            </Flex>

                            {/* bán giao hàng */}
                            <Flex justify="flex-start" align="center" style={{width: "100%", marginTop: 10}} wrap
                                  gap={10}>
                                <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                                    <Flex style={{display: "flex", width: "60%"}}>
                                        <Flex justify="space-between" align="center" wrap>
                                            <Checkbox onChange={() => handleDeliverySale(!deliverySale)}
                                                      style={{marginInlineEnd: 6}}/>
                                            <Flex justify="flex-start" align="center" wrap>
                                                <Text style={{fontSize: 15}}>
                                                    <span style={{marginInlineEnd: 4}}>Bán giao hàng</span>
                                                    <LiaShippingFastSolid style={{display: "inline"}}/>
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                {/* thông tin bán giao hàng */}
                                {
                                    deliverySale &&
                                    (
                                        <>
                                            <Flex justify="space-between" align="center" style={{width: "100%"}}
                                                  wrap gap={10}
                                            >
                                                <Title level={5} style={{marginBottom: 0}}>
                                                    Thông tin giao hàng
                                                </Title>
                                            </Flex>

                                            <div style={{width: "100%"}}>
                                                <Row wrap gutter={[8, 8]}>
                                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                        <Input style={{width: "100%"}} placeholder="Tên người nhận"/>
                                                    </Col>
                                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                        <Input style={{width: "100%"}} placeholder="Số điện thoại"/>
                                                    </Col>
                                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                                        <SelectSearchOptionLabel
                                                            value={selectedProvinceCode}
                                                            placeholder="Tỉnh / Thành Phố"
                                                            style={{width: "100%"}}
                                                            data={provincesData?.dataOptionProvinces}
                                                            isLoading={provincesData?.isLoading}
                                                            onChange={onChangeSelectedProvince}
                                                        />
                                                    </Col>
                                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                                        <SelectSearchOptionLabel
                                                            value={selectedDistrictCode}
                                                            placeholder="Quận / Huyện"
                                                            style={{width: "100%"}}
                                                            data={districtsData?.dataOptionDistricts}
                                                            isLoading={districtsData?.isLoading}
                                                            onChange={onChangeSelectedDistrict}
                                                        />
                                                    </Col>
                                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                                        <SelectSearchOptionLabel
                                                            value={selectedWardCode}
                                                            placeholder="Phường / Xã"
                                                            style={{width: "100%"}}
                                                            data={wardsData?.dataOptionWards}
                                                            isLoading={wardsData?.isLoading}
                                                            onChange={onChangeSelectedWard}
                                                        />
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Input style={{width: "100%"}} placeholder="Địa chỉ"/>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </>
                                    )
                                }
                                <Row style={{width: "100%"}} wrap>
                                    {
                                        !deliverySale &&
                                        (handleSale.orderCreateOrUpdate.paymentMethod === PAYMENT_METHOD.BANK_TRANSFER.key ||
                                            handleSale.orderCreateOrUpdate.paymentMethod === PAYMENT_METHOD.CASH_AND_BANK_TRANSFER.key) &&
                                        (
                                            <Col flex="none">
                                                <QRCode type="svg" value="https://ant.design/" size={120}
                                                        onClick={showModalQR}
                                                        style={{marginRight: 8, cursor: "pointer"}}/>
                                            </Col>
                                        )
                                    }
                                    <Col flex="auto">
                                        <TextArea
                                            showCount
                                            maxLength={1000}
                                            onChange={handleChangeTextAreaNote}
                                            placeholder="Ghi chú"
                                            style={{height: 120, resize: 'none'}}
                                        />
                                    </Col>
                                </Row>
                            </Flex>
                        </Flex>
                    )
                }
            </Drawer>

            {/* modal chọn voucher */}
            <ModalListVoucher
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleVoucherSelect={handleVoucherSelect}
            />

            {/* modal quét QR thanh toán */}
            <Modal title="QR Thanh toán" open={isModalQROpen} onCancel={handleModalQRCancel} footer={null}>
                <Flex justify="center" align="center" style={{margin: "20px 0px"}}>
                    <QRCode type="svg" value="https://ant.design/" size={400}/>
                </Flex>
            </Modal>


        </>
    );
}
export default memo(CheckoutComponent);