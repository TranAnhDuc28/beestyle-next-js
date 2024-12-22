import React, { useState, useCallback } from "react";
import { Form, Input, Radio, Row, Col, Alert } from "antd";
import {
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
    HomeOutlined,
    ShopOutlined,
} from "@ant-design/icons";
import styles from "@/css/user/styles/checkout.module.css";
import useAddress from "@/components/Admin/Address/hook/useAddress";
import TextArea from "antd/es/input/TextArea";
import { calculateShippingFee } from "@/services/GHTKService";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";

interface IProps {
    addressForm: any;
    userForm: any;
    onShippingCostChange: (cost: number) => void;
}

const CheckoutForm = (props: IProps) => {
    const { addressForm, userForm, onShippingCostChange } = props;
    const [selectedMethod, setSelectedMethod] = useState("home");
    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);
    const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | null>(null);
    const [selectedWardCode, setSelectedWardsCode] = useState<string | null>(null);

    const [selectedProvinceName, setSelectedProvinceName] = useState<string | null>(null);
    const [selectedDistrictName, setSelectedDistrictName] = useState<string | null>(null);
    const [selectedWardName, setSelectedWardName] = useState<string | null>(null);
    const [detailAddress, setDetailAddress] = useState<string | null>(null);

    const { handleGetProvinces, handleGetDistricts, handleGetWards } = useAddress();
    const provincesData = handleGetProvinces();
    const districtsData = handleGetDistricts(selectedProvinceCode);
    const wardsData = handleGetWards(selectedDistrictCode);
    const [shippingPrice, setShippingPrice] = useState(20000);

    const onChangeMethod = (e: any) => {
        const value = e.target.value;
        setSelectedMethod(value);

        if (value === "home") {
            addressForm.setFieldsValue({ district: undefined, ward: undefined });
        }
    };

    const onChangeSelectedProvince = useCallback(
        (provinceCode: string) => {
            const province = provincesData.dataOptionProvinces.find(
                (prev) => prev.key === provinceCode
            );
            setSelectedProvinceCode(provinceCode);
            addressForm.setFieldsValue({
                province: provinceCode,
                district: undefined,
                ward: undefined,
            });

            setSelectedProvinceName(province?.label);
            setSelectedDistrictCode(null);
            setSelectedWardsCode(null);
            setSelectedDistrictName(null);
            setSelectedWardName(null);
            console.log(provinceCode);
        },
        [addressForm, provincesData.dataOptionProvinces]
    );

    const onChangeSelectedDistrict = useCallback(
        async (districtCode: string) => {
            const district = districtsData.dataOptionDistricts.find(
                (prev) => prev.key === districtCode
            );
            setSelectedDistrictCode(districtCode);
            addressForm.setFieldsValue({
                district: districtCode,
                ward: undefined,
            });
            setSelectedDistrictName(district?.label);

            const params = {
                pick_province: "Hà Nội", // TODO: Lấy từ cấu hình
                pick_district: "Huyện Hoài Đức", // TODO: Lấy từ cấu hình
                province: selectedProvinceName,
                district: district?.label,
                address: detailAddress, // TODO: Lấy từ state, có thể bỏ trống tạm thời, cập nhật khi user nhập
                weight: 100, // TODO: Lấy từ giỏ hàng
                value: 500000, // TODO: Lấy từ giỏ hàng
                transport: "road", // TODO: Cho phép người dùng chọn
            };

            try {
                const fee = await calculateShippingFee(params);
                setShippingPrice(fee.fee);
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
            setShippingPrice,
            detailAddress,
        ]
    );

    const onChangeSelectedWard = useCallback(
        (wardCode: string) => {
            const ward = wardsData.dataOptionWards.find((prev) => prev.key === wardCode);
            setSelectedWardsCode(wardCode);
            setSelectedWardName(ward?.label);
            console.log(selectedWardName, wardCode);
        },
        [selectedWardName, wardsData.dataOptionWards]
    );

    const handleDetailAddressChange = (value: string) => {
        setDetailAddress(value);
    };

    const normFile = (e: any) => {
        console.log("Upload event:", e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className={styles["checkout-form"]}>
            <h3 className={styles["heading"]}>Người nhận</h3>
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
                <h3 className={styles["heading"]}>Hình thức nhận hàng</h3>
                <Radio.Group
                    onChange={onChangeMethod}
                    value={selectedMethod}
                    className={styles["delivery-radio-group"]}
                >
                    <div className="max-w-[210px] mt-2 me-4">
                        <Radio.Button
                            value="home"
                            className={`${styles["delivery-option"]} ${selectedMethod === "home" ? styles["selected"] : ""
                                }`}
                            style={{ padding: 25 }}
                        >
                            <div style={{ marginTop: "-15px" }}>
                                <HomeOutlined style={{ fontSize: "20px", margin: "0 10px 0 5px" }} />
                                Giao hàng tận nhà
                            </div>
                        </Radio.Button>
                    </div>
                    <div className="max-w-[210px] mt-2">
                        <Radio.Button
                            value="store"
                            className={`${styles["delivery-option"]} ${selectedMethod === "store" ? styles["selected"] : ""
                                }`}
                            style={{ padding: 25 }}
                        >
                            <div style={{ marginTop: "-15px" }}>
                                <ShopOutlined style={{ fontSize: "20px", margin: "0 10px 0 5px" }} />
                                Lấy tại cửa hàng
                            </div>
                        </Radio.Button>
                    </div>
                </Radio.Group>
            </div>

            {selectedMethod === "home" && (
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
                                        style={{ width: "100%" }}
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
                                        style={{ width: "100%" }}
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
                                        style={{ width: "100%" }}
                                        data={wardsData?.dataOptionWards}
                                        isLoading={wardsData?.isLoading}
                                        onChange={onChangeSelectedWard}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item name="detail" style={{ marginTop: -10 }}>
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
            ) || (
                    <>
                        <Alert
                            message="Thử nghiệm"
                            description="Tính năng này đang trong giai đoạn thử nghiệm, có thể hoạt động chưa ổn định."
                            type="warning"
                            className="mt-7"
                            showIcon
                        />
                    </>
                )}
        </div>
    );
};

export default CheckoutForm;
