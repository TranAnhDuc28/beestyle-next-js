"use client";
import {Col, DatePicker, Form, Input, Modal, Row, Select} from "antd";
import React, {memo, useCallback, useEffect, useState} from "react";
import {createCustomer} from "@/services/CustomerService";
import useAppNotifications from "@/hooks/useAppNotifications";
import {createAddress} from "@/services/AddressService";
import useAddress from "../Address/hook/useAddress";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";

const {Option} = Select;

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any;
}

const AddCustomer = (props: IProps) => {
    const {isCreateModalOpen, setIsCreateModalOpen, mutate} = props;
    const {showNotification} = useAppNotifications();

    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);
    const [selectedDistrictCode, setSelectedDistrictCode] = useState<string | null>(null);
    const [selectedWardCode, setSelectedWardsCode] = useState<string | null>(null);

    const [selectedProvinceName, setSelectedProvinceName] = useState<string | null>(null);
    const [selectedDistrictName, setSelectedDistrictName] = useState<string | null>(null);
    const [selectedWardName, setSelectedWardName] = useState<string | null>(null);
    const [selectedAddressDetail, setSelectedAddressDetail] = useState<string | null>(null);

    const {handleGetProvinces, handleGetDistricts, handleGetWards} = useAddress();
    const provincesData = handleGetProvinces();
    const districtsData = handleGetDistricts(selectedProvinceCode);
    const wardsData = handleGetWards(selectedDistrictCode);

    const [form] = Form.useForm();

    console.log(isCreateModalOpen);

    const onChangeSelectedProvince = useCallback(
        (provinceCode: string) => {
            setSelectedProvinceCode(provinceCode);
            const province = provincesData.dataOptionProvinces.find(
                (prev) => prev.key === provinceCode
            );
            setSelectedProvinceCode(provinceCode);
            form.setFieldsValue({
                province: provinceCode, // Cập nhật tỉnh
                district: undefined, // Reset huyện
                ward: undefined, // Reset xã
            });

            setSelectedProvinceName(province?.label);
            setSelectedDistrictCode(null);
            setSelectedWardsCode(null);
            setSelectedDistrictName(null);
            setSelectedWardName(null);
            console.log(provinceCode);
        },
        [provincesData]
    );

    const onChangeSelectedDistrict = useCallback(
        (districtCode: string) => {
            setSelectedDistrictCode(districtCode);
            const district = districtsData.dataOptionDistricts.find(
                (prev) => prev.key === districtCode
            );
            form.setFieldsValue({
                district: districtCode, // Cập nhật huyện trong Form
                ward: undefined, // Reset xã
            });
            setSelectedDistrictName(district?.label);
            console.log(selectedDistrictName);

            setSelectedWardsCode(null);
            setSelectedWardName(null);
            console.log(districtCode);
        },
        [districtsData]
    );

    const onChangeSelectedWard = useCallback(
        (wardCode: string) => {
            setSelectedWardsCode(wardCode);
            const ward = wardsData.dataOptionWards.find(
                (prev) => prev.key === wardCode
            );
            setSelectedWardName(ward?.label);
            console.log(selectedWardName);
            console.log(wardCode);
        },
        [wardsData]
    );

    const handleSubmit = async (values: any) => {
        try {
            const result = await createCustomer(values);
            console.log(values.addressDetail);

            setSelectedAddressDetail(values.addressDetail);
            console.log(selectedAddressDetail);

            if (result.data) {
                const customer = result.data; // Lấy ID của khách hàng từ phản hồi

                const address = {
                    addressName: values.addressDetail,
                    cityCode: Number(selectedProvinceCode), // Nếu cần chuyển đổi
                    city: selectedProvinceName, // Lưu tên tỉnh vào đây
                    districtCode: Number(selectedDistrictCode), // Nếu cần chuyển đổi
                    district: selectedDistrictName, // Lưu tên huyện vào đây
                    communeCode: Number(selectedWardCode), // Cần lấy từ API nếu có
                    commune: selectedWardName, // Tên xã
                    isDefault: false,
                    customer: {
                        id: customer.id, // Thay đổi bằng ID thực tế
                    },
                };

                console.log(address);

                // Gọi API để tạo địa chỉ
                try {
                    await createAddress(address);
                    console.log(address.customer);
                    mutate();
                } catch (error: any) {
                    const errorMessage = error?.response?.data?.message;
                    if (errorMessage && typeof errorMessage === "object") {
                        Object.entries(errorMessage).forEach(([field, message]) => {
                            showNotification("error", {message: String(message)});
                        });
                    } else {
                        showNotification("error", {
                            message: error?.message,
                            description: errorMessage,
                        });
                    }
                }

                // Đóng modal và hiển thị thông báo thành công
                handleCancelModal();
                showNotification("success", {message: result.message});
            }
        } catch (error: any) {
            // Xử lý lỗi và hiển thị thông báo lỗi
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === "object") {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error", {message: String(message)});
                });
            } else {
                showNotification("error", {
                    message: error?.message,
                    description: errorMessage,
                });
            }
        }
    };
    const handleCancelModal = () => {
        form.resetFields();
        setSelectedProvinceCode(null);
        setSelectedDistrictCode(null);
        setSelectedWardsCode(null);
        setIsCreateModalOpen(false);
    };

    return (
        <>
            <Modal
                title={"Thêm mới khách hàng"}
                cancelText="Hủy"
                width={600}
                okText="Lưu"
                onOk={() => form.submit()}
                style={{top: 20}}
                open={isCreateModalOpen}
                onCancel={handleCancelModal}
                okButtonProps={{style: {background: "#00b96b"}}}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="horizontal"
                    labelAlign="left"
                    labelWrap
                    labelCol={{span: 6}}
                    wrapperCol={{span: 20}}
                >
                    <Form.Item
                        label="Họ tên"
                        name="fullName"
                        rules={[{required: true, message: "Vui lòng nhập họ và tên!"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[{required: true, message: "Vui lòng nhập sdt!"}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        // rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Ngày sinh"
                        name="dateOfBirth"
                        // rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
                    >
                        <DatePicker format="YYYY-MM-DD" style={{width: "100%"}}/>
                    </Form.Item>

                    <Form.Item label="Giới tính" name="gender" initialValue="0">
                        <Select
                            style={{width: "100%"}}
                            placeholder="Giới tính"
                            defaultValue="0"
                        >
                            <Select.Option value="0">Nam</Select.Option>
                            <Select.Option value="1">Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Tỉnh/Thành phố" name="province"
                               rules={[{required: true, message: "Vui lòng chọn tỉnh/thành phố!"}]}>
                        <SelectSearchOptionLabel

                            value={selectedProvinceCode}
                            style={{width: "100%"}}
                            placeholder="Tỉnh / Thành phố"
                            data={provincesData?.dataOptionProvinces}
                            isLoading={provincesData?.isLoading}
                            onChange={onChangeSelectedProvince}
                        />
                    </Form.Item>

                    <Form.Item label="Huyện/Quận" name="district"
                               rules={[{required: true, message: "Vui lòng chọn huyện/quận!"}]}>
                        <SelectSearchOptionLabel
                            value={selectedDistrictCode}
                            placeholder="Quận / Huyện"
                            style={{width: "100%"}}
                            data={districtsData?.dataOptionDistricts}
                            isLoading={districtsData?.isLoading}
                            onChange={onChangeSelectedDistrict}
                        />
                    </Form.Item>

                    <Form.Item label="Xã/Phường" name="ward"
                               rules={[{required: true, message: "Vui lòng chọn xã/phường!"}]}>
                        <SelectSearchOptionLabel
                            value={selectedWardCode}
                            placeholder="Phường / Xã"
                            style={{width: "100%"}}
                            data={wardsData?.dataOptionWards}
                            isLoading={wardsData?.isLoading}
                            onChange={onChangeSelectedWard}
                        />
                    </Form.Item>

                    <Form.Item label="Chi tiết" name="addressDetail"
                               rules={[{required: true, message: "Vui lòng nhập địa chỉ chi tiết!"}]}>
                        <Input style={{width: "100%"}} placeholder="Địa chỉ"/>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
};

export default memo(AddCustomer);
