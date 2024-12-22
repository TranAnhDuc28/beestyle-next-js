import React, {memo, useCallback, useContext, useEffect, useState} from "react";
import {
    AutoCompleteProps,
    Button,
    Checkbox,
    CheckboxProps, Col,
    Divider,
    Drawer,
    Flex, Input, InputNumber, Modal, Popover, QRCode, Radio, RadioChangeEvent, Row, Select, Tag,
    Typography
} from "antd";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {LiaShippingFastSolid} from "react-icons/lia";
import {BiSolidCoupon} from "react-icons/bi";
import {PAYMENT_METHOD} from "@/constants/PaymentMethod";
import {FORMAT_NUMBER_WITH_COMMAS, PARSER_NUMBER_WITH_COMMAS_TO_NUMBER} from "@/constants/AppConstants";
import {HandleSale} from "@/components/Admin/Sale/SaleComponent";
import {debounce} from "lodash";
import QuickSelectMoney from "@/components/Admin/Sale/QuickSelectMoney";
import {ExclamationCircleFilled} from "@ant-design/icons";
import {IOrderCreateOrUpdate} from "@/types/IOrder";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";
import useAddress from "@/components/Admin/Address/hook/useAddress";
import ModalListVoucher from "./ModalListVoucher";
import {IVoucher} from "@/types/IVoucher";

const {Title, Text} = Typography;
const {TextArea} = Input;

export interface PaymentInfo {
    discount: number; // giảm giá của voucher
    amountDue: number; // tiền khách cần trả
    amountPaid: number; // tiền khách trả
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

    const [discount, setDiscount] = useState<string[]>();
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalQROpen, setIsModalQROpen] = useState(false);
    const [selectedTag, setSelectedTag] = React.useState<number>(0);
    const [deliverySale, setDeliverySale] = React.useState<boolean>(false);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(
        {discount: 0, amountDue: 0, amountPaid: 0, change: 0});
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | null>(null);

    // console.log(JSON.stringify(paymentInfo, null, 2));

    const showModalQR = () => setIsModalQROpen(true);
    const handleModalQRCancel = () => setIsModalQROpen(false);

    const showModal = () => {
        if (!selectedVoucher) {
            setSelectedVoucher(null);
        }
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const orderCreateOrUpdate: IOrderCreateOrUpdate = {
            ...handleSale?.orderCreateOrUpdate,
            orderStatus: "PAID"
        }
        console.log(JSON.stringify(orderCreateOrUpdate, null, 2));

        setIsModalOpen(false);
        onClose("checkout", false);
    }

    const handleCancel = () => setIsModalOpen(false);

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
        setDeliverySale(checked);
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
                pickupMethod: checked ? "DELIVERY" : "AT_STORE"
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

    const handleInputAmountPaidChange = useCallback(debounce((value: number | null) => {
        setPaymentInfo(prev => ({
            ...prev,
            amountPaid: value || 0,
        }));
    }, 1000), []);

    // note in OrderCreateOrUpdate
    const handleChangeTextAreaNote = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleSale?.setOrderCreateOrUpdate((prevValue) => {
            return {
                ...prevValue,
                note: e.target.value
            };
        });
    }, 1500), []);

    // const onChange: CheckboxProps['onChange'] = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    // };

    // const onChangeSwitch = (checked: boolean) => {
    //     console.log(`switch to ${checked}`);
    // };
    const onChangeSelectedProvince = useCallback((provinceCode: string) => {
        setSelectedProvinceCode(provinceCode);
        setSelectedDistrictCode(null);
        setSelectedWardsCode(null);
    }, []);

    const onChangeSelectedDistrict = useCallback((districtCode: string) => {
        setSelectedDistrictCode(districtCode);
        setSelectedWardsCode(null);
    }, []);

    const onChangeSelectedWard = useCallback((wardCode: string) => {
        setSelectedWardsCode(wardCode);
    }, []);

    useEffect(() => {
        if (handleSale?.orderCreateOrUpdate) {
            const {totalAmount = 0} = handleSale?.orderCreateOrUpdate;
            const discount = 0;

            // Kiểm tra tổng tiền để áp dụng phí vận chuyển
            let shippingFee = deliverySale && totalAmount < 500000 ? 30000 : 0;

            // Khách cần trả và đảm bảo không có số âm
            let amountDue = Math.max(0, totalAmount - discount + shippingFee);

            setPaymentInfo((prevValue: PaymentInfo) => {
                // Tiền khách đã trả (hoặc được gán bằng số tiền cần thanh toán nếu chưa trả gì)
                const amountPaid = prevValue.amountPaid === 0 || prevValue.amountDue !== amountDue
                    ? amountDue
                    : paymentInfo.amountPaid;

                // Tính tiền dư
                const change = Math.max(0, amountPaid - amountDue);

                return {
                    ...prevValue,
                    amountPaid: amountPaid,
                    amountDue: amountDue,
                    change: change
                };
            });

            handleSale?.setOrderCreateOrUpdate((prevValue) => {
                return {
                    ...prevValue,
                    shippingFee: shippingFee
                };
            });
        }
    }, [paymentInfo.amountPaid, handleSale?.orderCreateOrUpdate?.totalAmount, deliverySale]);

    // UI
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

    const calculateDiscountAmount = (voucher: IVoucher) => {
        let totalAmount = handleSale?.orderCreateOrUpdate.totalAmount ?? 0;
        let discountAmount;

        if (voucher.discountType === "PERCENTAGE") {
            discountAmount = (totalAmount * voucher.discountValue) / 100;
            if (discountAmount > voucher.maxDiscount) {
                discountAmount = voucher.maxDiscount;
            }
        } else if (voucher.discountType === "CASH") {
            discountAmount = Math.min(voucher.discountValue, voucher.maxDiscount);
        }

        return discountAmount;

    };

    const handleVoucherSelect = (voucherSelected: IVoucher) => {
        const discountAmount = calculateDiscountAmount(voucherSelected) ?? 0;
        setDiscountAmount(discountAmount);
        setSelectedVoucher(voucherSelected);
        console.log("Giá trị giảm là: ", discountAmount);
    };

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
                    <Button onClick={showModal} type="primary" size="large">
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
                                            giảm tối đa {selectedVoucher.discountType === "PERCENTAGE" ?
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
                                    onClose={() => setSelectedVoucher(null)}
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
                            {`${handleSale?.orderCreateOrUpdate.totalAmount}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                        </Text>
                    </Flex>

                    {/* giảm giá hóa đơn */}
                    <Flex justify="space-between" align="center" style={{width: "100%", padding: "4px 0px"}} wrap>
                        <Text style={{fontSize: 16}}>Giảm giá</Text>
                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                            {`0`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
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
                                        {`${handleSale?.orderCreateOrUpdate.shippingFee}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                    </Text>
                                </Flex>
                            </>
                        )
                    }

                    {/* khách cần trả */}
                    <Flex justify="space-between" align="center" style={{width: "100%", padding: "4px 0px"}} wrap>
                        <Text style={{fontSize: 16}} strong>Tổng thanh toán</Text>
                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                            {`${paymentInfo.amountDue}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
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
                    handleSale?.dataCart && handleSale?.dataCart.length > 0 &&
                    (handleSale?.orderCreateOrUpdate?.totalAmount ?? 0) > 0 &&
                    (
                        <Flex style={{width: "100%"}} wrap>
                            {/* phương thức thanh toán */}
                            <Flex justify="flex-start" align="center" style={{width: "100%", marginBottom: 10}}
                                  wrap>
                                <Radio.Group defaultValue="CASH_ON_DELIVERY" onChange={handlePaymentMethod}>
                                    <Row gutter={[16, 16]}>
                                        {Object.keys(PAYMENT_METHOD).map((key) => (
                                            <Col key={key}>
                                                <Radio value={key}>
                                                    {PAYMENT_METHOD[key as keyof typeof PAYMENT_METHOD]}
                                                </Radio>
                                            </Col>
                                        ))}
                                    </Row>
                                </Radio.Group>
                            </Flex>

                            {/* chọn nhanh tiền khách trả */}
                            <QuickSelectMoney
                                amountDue={paymentInfo.amountDue}
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
                                                {/*<Flex justify="flex-start" align="center" wrap>*/}
                                                {/*    <Switch onChange={onChangeSwitch} style={{marginInlineEnd: 10}}/>*/}
                                                {/*    <Text style={{fontSize: 16, marginInlineEnd: 10}}>*/}
                                                {/*        Thanh toán khi nhận hàng*/}
                                                {/*    </Text>*/}
                                                {/*</Flex>*/}
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
                                        (handleSale.orderCreateOrUpdate.paymentMethod === "BANK_TRANSFER" ||
                                            handleSale.orderCreateOrUpdate.paymentMethod === "COD_AND_BANK_TRANSFER") &&
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
                onVoucherSelect={handleVoucherSelect}
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