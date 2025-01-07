import React, { useCallback } from "react";
import { Form, Input, Radio, Row, Col, Alert, FormInstance } from "antd";
import {
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { TbCreditCardPay } from "react-icons/tb";
import styles from "./css/checkout.module.css";
import useAddress from "@/components/Admin/Address/hook/useAddress";
import TextArea from "antd/es/input/TextArea";
import { ghtkCalculateShippingFee } from "@/services/GhtkCalculateShippingFee";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";
import { AiOutlineHome } from "react-icons/ai";
import { RiStore2Line } from "react-icons/ri";

interface IProps {
    addressForm: FormInstance;
    userForm: FormInstance;
    onShippingCostChange: (cost: number) => void;
    pickUpAddress?: { province: string; district: string };
    defaultWeight?: number;
    defaultValue?: number;
    selectedPayment: string;
    onPaymentChange: (value: string) => void;
    selectedProvinceCode: string | null;
    onProvinceChange: (code: string, name: string | null) => void;
    selectedDistrictCode: string | null;
    onDistrictChange: (code: string | null, name: string | null) => void;
    selectedWardCode: string | null;
    onWardChange: (code: string | null, name: string | null) => void;
    selectedProvinceName: string | null;
    onProvinceNameChange: (name: string | null) => void;
    selectedDistrictName: string | null;
    onDistrictNameChange: (name: string | null) => void;
    selectedWardName: string | null;
    onWardNameChange: (name: string | null) => void;
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
        selectedWardName,
        onWardNameChange,
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
        if (value === 'CASH_AND_BANK_TRANSFER' || value === "BANK_TRANSFER") {
            addressForm.setFieldsValue({ district: undefined, ward: undefined });
        }
    };

    const onChangeSelectedProvince = useCallback(
        (provinceCode: string, provinceName: string) => {
            const province = provincesData.dataOptionProvinces.find(
                (prev) => prev.key === provinceCode
            );
            onProvinceChange(provinceCode, provinceName);
            onProvinceNameChange(provinceName);
            addressForm.setFieldsValue({
                province: provinceCode,
                district: undefined,
                ward: undefined,
            });

            onDistrictChange(null, null);
            onWardChange(null, null);
            onDistrictNameChange(null);
            onWardNameChange(null);
        },
        [
            addressForm, provincesData.dataOptionProvinces,
            onProvinceChange, onProvinceNameChange, onDistrictChange,
            onWardChange, onDistrictNameChange, onWardNameChange
        ]
    );

    const onChangeSelectedDistrict = useCallback(async (districtCode: string, districtName: string) => {
        const district = districtsData.dataOptionDistricts.find(
            (prev) => prev.key === districtCode
        );
        onDistrictChange(districtCode, districtName);
        addressForm.setFieldsValue({
            district: districtCode,
            ward: undefined,
        });
        onDistrictNameChange(districtName);
        onWardChange(null, null);
        onWardNameChange(null);

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
            const fee = await ghtkCalculateShippingFee(params);
            onShippingCostChange(fee.fee.fee);
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
            onDistrictNameChange,
            onWardChange,
            onWardNameChange
        ]
    );

    const onChangeSelectedWard = useCallback(
        (wardCode: string, wardName: string) => {
            const ward = wardsData.dataOptionWards.find(
                (prev) => prev.key === wardCode
            );
            onWardChange(wardCode, wardName);
            onWardNameChange(wardName);
        },
        [onWardChange, wardsData.dataOptionWards, onWardNameChange]
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
                            value="CASH_AND_BANK_TRANSFER"
                            className={`${styles["delivery-option"]} ${selectedPayment === "CASH_AND_BANK_TRANSFER" ? styles["selected"] : ""
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
                            value="BANK_TRANSFER"
                            className={`${styles["delivery-option"]} ${selectedPayment === "BANK_TRANSFER" ? styles["selected"] : ""
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
                            value="TEST"
                            className={`${styles["delivery-option"]} ${selectedPayment === "TEST" ? styles["selected"] : ""
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

            {selectedPayment === "CASH_AND_BANK_TRANSFER" || selectedPayment === "BANK_TRANSFER" ? (
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
                                        onChange={(value, option) => onChangeSelectedProvince(value, option?.label || '')} // Updated
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
                                        onChange={(value, option) => onChangeSelectedDistrict(value, option?.label || '')} // Updated
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
                                        onChange={(value, option) => onChangeSelectedWard(value, option?.label || '')} // Updated
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
