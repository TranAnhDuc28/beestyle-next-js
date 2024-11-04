import { Form, Modal, Select } from "antd";
import React, { useState } from "react";
import useAddress from "./hook/useAddress";
import { IAddress } from "@/types/IAddress";
import { createAddress } from "@/services/AddressService";
import useAppNotifications from "@/hooks/useAppNotifications";
import { useParams, useSearchParams } from "next/navigation";
import { mutate } from "swr";
import TextArea from "antd/es/input/TextArea";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => void;
  mutate: any;
}
const CreateAddressModal = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen, mutate } = props;
  const { provinces, districts, wards, fetchDistricts, fetchWards } =
    useAddress();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const { id } = useParams();
  console.log(id);

  const { showNotification } = useAppNotifications();
  const [form] = Form.useForm();
  const handleCloseCreateModal = () => {
    form.resetFields();
    setSelectedProvince("");
    setSelectedDistrict("");
    setDetailAddress("");
    setIsCreateModalOpen(false);
  };

  // Xử lý khi tỉnh được chọn
  const handleProvinceChange = (value: any, name: string) => {
    setSelectedProvince(value);
    setSelectedProvinceName(name);
    setSelectedDistrict(""); // Reset huyện khi tỉnh thay đổi
  };

  // Xử lý khi huyện được chọn
  const handleDistrictChange = (value: any, name: string) => {
    setSelectedDistrict(value);
    setSelectedDistrictName(name);
  };
  // Xử lý khi xã được chọn
  const handleWardChange = (value: any, name: string) => {
    setSelectedWard(value);
    setSelectedWardName(name);
  };
  // Xử lý khi số nhà được chọn
  const handleDetailAddressChange = (value: string) => {
    setDetailAddress(value);
  };
  const onFinish = async (value: IAddress) => {
    const {
      city,
      district,
      commune,
      addressName,
      isDefault,
      customer,
      ...rest
    } = value; // Giải cấu trúc các thuộc tính để tránh ghi đè

    const address = {
      addressName:
        detailAddress == ""
          ? `${selectedWardName} - ${selectedDistrictName} - ${selectedProvinceName}`
          : `${detailAddress} - ${selectedWardName} - ${selectedDistrictName} - ${selectedProvinceName}`,
      city: selectedProvinceName ?? "", // Lưu tên tỉnh vào đây
      district: selectedDistrictName ?? "", // Lưu tên huyện vào đây
      commune: selectedWardName ?? "", // Tên xã
      isDefault: false,
      customer: {
        id: id, // Thay đổi bằng ID thực tế
      },
      ...rest, // Gộp các giá trị khác từ value vào đối tượng address
    };
    console.log("Success:", address);
    try {
      const result = await createAddress(address);
      if (result.data) {
        handleCloseCreateModal();
        showNotification("success", { message: result.message });
      }
      mutate();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage && typeof errorMessage === "object") {
        Object.entries(errorMessage).forEach(([field, message]) => {
          showNotification("error", { message: String(message) });
        });
      } else {
        showNotification("error", {
          message: error?.message,
          description: errorMessage,
        });
      }
    }
  };

  return (
    <Modal
      title="Thêm địa chỉ"
      cancelText="Hủy"
      okText="Lưu"
      style={{ top: 20 }}
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      okButtonProps={{ style: { background: "#00b96b" } }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        labelAlign="left"
        labelWrap
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          label="Tỉnh"
          name="cityCode"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh!" }]}
        >
          <Select
            onChange={(value) => {
              const province = provinces.find((prov) => prov.code === value);
              if (province) {
                handleProvinceChange(value, province.name);
                fetchDistricts(value);
              }
            }}
            placeholder="Chọn tỉnh"
            style={{ width: "100%" }}
          >
            {provinces.map((province) => (
              <Select.Option key={province.code} value={province.code}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Huyện"
          name="districtCode"
          rules={[{ required: true, message: "Vui lòng chọn huyện!" }]}
        >
          <Select
            onChange={(value) => {
              const district = districts.find((dist) => dist.code === value);
              if (district) {
                handleDistrictChange(value, district.name);
                fetchWards(value);
              }
            }}
            placeholder="Chọn huyện"
            style={{ width: "100%" }}
            disabled={!selectedProvince}
          >
            {districts.length > 0 ? (
              districts.map((district) => (
                <Select.Option key={district.code} value={district.code}>
                  {district.name}
                </Select.Option>
              ))
            ) : (
              <Select.Option disabled>Không có xã nào</Select.Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Xã"
          name="communeCode"
          rules={[{ required: true, message: "Vui lòng chọn xã!" }]}
        >
          <Select
            onChange={(value) => {
              const ward = wards.find((war) => war.code === value);
              if (ward) {
                handleWardChange(value, ward.name);
              }
            }}
            placeholder="Chọn xã"
            style={{ width: "100%" }}
            disabled={!selectedDistrict}
          >
            {wards.map((ward) => (
              <Select.Option key={ward.code} value={ward.code}>
                {ward.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Chi tiết" name="detail">
          <TextArea
            onChange={(e) => handleDetailAddressChange(e.target.value)}
            placeholder="Nhập địa chỉ chi tiết"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAddressModal;
