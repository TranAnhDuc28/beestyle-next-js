import React, { useCallback } from "react";
import { Form, Input, Radio, Row, Col, Alert } from "antd";
import {
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { TbCreditCardPay } from "react-icons/tb";
import styles from "./css/checkout.module.css";
import useAddress from "@/components/Admin/Address/hook/useAddress";
import TextArea from "antd/es/input/TextArea";
import { calculateShippingFee } from "@/services/GHTKService";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";
import { AiOutlineHome } from "react-icons/ai";
import { RiStore2Line } from "react-icons/ri";

interface IProps {
    addressForm: any;
    userForm: any;
    onShippingCostChange: (cost: number) => void;
    pickUpAddress?: { province: string; district: string };
    defaultWeight?: number;
    defaultValue?: number;
    selectedPayment: string;
    onPaymentChange: (value: string) => void;
    selectedProvinceCode: string | null;
    onProvinceChange: (code: string) => void;
    selectedDistrictCode: string | null;
    onDistrictChange: (code: string | null) => void;
    selectedWardCode: string | null;
    onWardChange: (code: string | null) => void;
    selectedProvinceName: string | null;
    onProvinceNameChange: (name: string | null) => void;
    selectedDistrictName: string | null;
    onDistrictNameChange: (name: string | null) => void;
    detailAddress: string | null;
    onDetailAddressChange: (address: string | null) => void;
}

const CheckoutForm = (props: IProps) => {
    const {
        addressForm,
        userForm,
        onShippingCostChange,
        pickUpAddress,
        defaultWeight = 100,
        defaultValue = 500000,
        selectedPayment,
        onPaymentChange,
        selectedProvinceCode,
        onProvinceChange,
        selectedDistrictCode,
        onDistrictChange,
        selectedWardCode,
        onWardChange,
        selectedProvinceName,
        onProvinceNameChange,
        selectedDistrictName,
        onDistrictNameChange,
        detailAddress,
        onDetailAddressChange,
    } = props;

    const { handleGetProvinces, handleGetDistricts, handleGetWards } = useAddress();
    const provincesData = handleGetProvinces();
    const districtsData = handleGetDistricts(selectedProvinceCode);
    const wardsData = handleGetWards(selectedDistrictCode);

    const handlePaymentChange = (e: any) => {
        const value = e.target.value;
        onPaymentChange(value);
        if (value === 'COD') {
            addressForm.setFieldsValue({ district: undefined, ward: undefined });
        }
    };

    const onChangeSelectedProvince = useCallback(
        (provinceCode: string) => {
            const province = provincesData.dataOptionProvinces.find(
                (prev) => prev.key === provinceCode
            );
            onProvinceChange(provinceCode);
            addressForm.setFieldsValue({
                province: provinceCode,
                district: undefined,
                ward: undefined,
            });

            onProvinceNameChange(province?.label);
            onDistrictChange(null);
            onWardChange(null);
            onDistrictNameChange(null);
        },
        [addressForm, provincesData.dataOptionProvinces, onProvinceChange, onProvinceNameChange, onDistrictChange, onWardChange, onDistrictNameChange]
    );

    const onChangeSelectedDistrict = useCallback(
        async (districtCode: string) => {
            const district = districtsData.dataOptionDistricts.find(
                (prev) => prev.key === districtCode
            );
            onDistrictChange(districtCode);
            addressForm.setFieldsValue({
                district: districtCode,
                ward: undefined,
            });
            onDistrictNameChange(district?.label);

            const params = {
                pick_province: pickUpAddress?.province || "Hà Nội", // Lấy từ props hoặc giá trị mặc định
                pick_district: pickUpAddress?.district || "Huyện Hoài Đức", // Lấy từ props hoặc giá trị mặc định
                province: selectedProvinceName,
                district: district?.label,
                address: detailAddress,
                weight: defaultWeight, // Lấy từ props hoặc giá trị mặc định
                value: defaultValue, // Lấy từ props hoặc giá trị mặc định
                transport: "road", // Có thể cho phép người dùng chọn sau
            };

            try {
                const fee = await calculateShippingFee(params);
                onShippingCostChange(fee.fee);
            } catch (error) {
                console.error("Lỗi tính phí vận chuyển:", error);
            }
        },
        [
            districtsData.dataOptionDistricts,
            selectedProvinceName,
            addressForm,
            onShippingCostChange,
            detailAddress,
            pickUpAddress,
            defaultWeight,
            defaultValue,
            onDistrictChange,
            onDistrictNameChange
        ]
    );

    const onChangeSelectedWard = useCallback(
        (wardCode: string) => {
            onWardChange(wardCode);
        },
        [onWardChange]
    );

    const handleDetailAddressChange = (value: string) => {
        onDetailAddressChange(value);
    };

    return (
        <div className={styles["checkout-form"]}>
            <h3 className={styles["heading"]}>Thông tin người nhận</h3>
            <Form layout="horizontal" className={styles["form"]} form={userForm} action="#">
                <Form.Item
                    name="customerName"
                    rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}
                >
                    <Input
                        placeholder="Tên khách hàng"
                        prefix={<UserOutlined className="pr-2" />}
                        className={styles["input-checkout"]}
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                >
                    <Input
                        placeholder="Số điện thoại"
                        prefix={<PhoneOutlined className="pr-2" />}
                        className={styles["input-checkout"]}
                    />
                </Form.Item>

                <Form.Item name="email">
                    <Input
                        placeholder="Địa chỉ email (Không bắt buộc)"
                        prefix={<MailOutlined className="pr-2" />}
                        className={styles["input-checkout"]}
                    />
                </Form.Item>
            </Form>

            <div className={`${styles["delivery-method"]} my-4`}>
                <h3 className={styles["heading"]}>Hình thức thanh toán</h3>
                <Radio.Group
                    onChange={handlePaymentChange}
                    value={selectedPayment}
                    className={styles["delivery-radio-group"]}
                >
                    <div>
                        <Radio.Button
                            value="COD"
                            className={`${styles["delivery-option"]} ${selectedPayment === "COD" ? styles["selected"] : ""
                                }`}
                            style={{ padding: '25px 5px', width: '190px' }}
                        >
                            <div
                                className="flex flex-col items-center justify-between text-center"
                                style={{ marginTop: -15 }}
                            >
                                <AiOutlineHome size={15} />
                                <span style={{ fontSize: 12, lineHeight: '20px' }}>Thanh toán khi nhận hàng (COD)</span>
                            </div>
                        </Radio.Button>
                    </div>

                    <div>
                        <Radio.Button
                            value="VNPay"
                            className={`${styles["delivery-option"]} ${selectedPayment === "VNPay" ? styles["selected"] : ""
                                }`}
                            style={{ padding: '25px 0', width: '190px' }}
                        >
                            <div
                                className="flex flex-col items-center justify-center"
                                style={{ marginTop: -15 }}
                            >
                                <TbCreditCardPay size={15} />
                                <span style={{ fontSize: 12, lineHeight: '20px' }}>Thanh toán qua VNPay</span>
                            </div>
                        </Radio.Button>
                    </div>

                    <div>
                        <Radio.Button
                            value="Store"
                            className={`${styles["delivery-option"]} ${selectedPayment === "Store" ? styles["selected"] : ""
                                }`}
                            style={{ padding: '25px 0', width: '190px' }}
                        >
                            <div
                                className="flex flex-col items-center justify-center"
                                style={{ marginTop: -15 }}
                            >
                                <RiStore2Line size={15} />
                                <span style={{ fontSize: 12, lineHeight: '20px' }}>Nhận tại cửa hàng</span>
                            </div>
                        </Radio.Button>
                    </div>
                </Radio.Group>
            </div>

            {selectedPayment === "COD" || selectedPayment === "VNPay" ? (
                <>
                    <h3 className={styles["heading"] + " my-4"}>Địa chỉ nhận hàng</h3>
                    <Form layout="horizontal" className={styles["form"]} form={addressForm} action="#">
                        <Row gutter={16} className="mb-3">
                            <Col span={8}>
                                <Form.Item
                                    name="province"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn tỉnh/thành phố!",
                                        },
                                    ]}
                                >
                                    <SelectSearchOptionLabel
                                        value={selectedProvinceCode}
                                        style={{ width: "100%", height: "48px" }}
                                        placeholder="Tỉnh / Thành phố"
                                        data={provincesData?.dataOptionProvinces}
                                        isLoading={provincesData?.isLoading}
                                        onChange={onChangeSelectedProvince}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="district"
                                    rules={[{ required: true, message: "Vui lòng chọn huyện/quận!" }]}
                                >
                                    <SelectSearchOptionLabel
                                        value={selectedDistrictCode}
                                        placeholder="Quận / Huyện"
                                        style={{ width: "100%", height: "48px" }}
                                        data={districtsData?.dataOptionDistricts}
                                        isLoading={districtsData?.isLoading}
                                        onChange={onChangeSelectedDistrict}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="ward"
                                    rules={[{ required: true, message: "Vui lòng chọn xã/phường!" }]}
                                >
                                    <SelectSearchOptionLabel
                                        value={selectedWardCode}
                                        placeholder="Phường / Xã"
                                        style={{ width: "100%", height: "48px" }}
                                        data={wardsData?.dataOptionWards}
                                        isLoading={wardsData?.isLoading}
                                        onChange={onChangeSelectedWard}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item name="addressDetail" style={{ marginTop: -10 }}>
                            <TextArea
                                onChange={(e) => handleDetailAddressChange(e.target.value)}
                                placeholder="Nhập địa chỉ chi tiết"
                                className="p-2"
                                rows={4}
                                style={{ resize: 'none' }}
                                maxLength={250}
                            />
                        </Form.Item>
                    </Form>
                </>
            ) : (
                <Alert
                    message="Thử nghiệm"
                    description="Tính năng này đang trong giai đoạn thử nghiệm, có thể hoạt động chưa ổn định."
                    type="warning"
                    className="mt-7"
                    showIcon
                />
            )}
        </div>
    );
};

export default CheckoutForm;
