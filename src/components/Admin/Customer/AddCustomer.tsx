"use client";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import React, { memo, useEffect, useState } from "react";
import { createCustomer } from "@/services/CustomerService";
import useAppNotifications from "@/hooks/useAppNotifications";
import { createAddress } from "@/services/AddressService";
import CreateAddress from "../Address/CreateAddress";

const { Option } = Select;

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => void;
  mutate: any;
}

const AddCustomer = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen, mutate } = props;
  const { showNotification } = useAppNotifications();
  const [form] = Form.useForm();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");

  console.log(isCreateModalOpen);

  const handleSubmit = async (values: ICustomer) => {
    try {
      // Định dạng ngày sinh
      console.log(values.dateOfBirth);

      const result = await createCustomer(values);

      if (result.data) {
        const customer = result.data; // Lấy ID của khách hàng từ phản hồi

        const address = {
          addressName: `${selectedWardName} - ${selectedDistrictName} - ${selectedProvinceName}`,
          cityCode: Number(selectedProvince), // Nếu cần chuyển đổi
          city: selectedProvinceName ?? "", // Lưu tên tỉnh vào đây
          districtCode: Number(selectedDistrict), // Nếu cần chuyển đổi
          district: selectedDistrictName ?? "", // Lưu tên huyện vào đây
          communeCode: Number(selectedWard), // Cần lấy từ API nếu có
          commune: selectedWardName ?? "", // Tên xã
          default: false,
          customer: {
            id: customer.id, // Thay đổi bằng ID thực tế
          },
        };

        console.log(address);
        mutate();
        // Gọi API để tạo địa chỉ
        try {
          await createAddress(address);
          console.log(address.customer);
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

        // Đóng modal và hiển thị thông báo thành công
        handleCancelModal();
        showNotification("success", { message: result.message });
      }
    } catch (error: any) {
      // Xử lý lỗi và hiển thị thông báo lỗi
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
  const handleCancelModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  useEffect(() => {
    if (isCreateModalOpen) {
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedWard("");
    }
  }, [isCreateModalOpen]);



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

  // console.log(wards);
  return (
    <>
      <Modal
        title={"Thêm mới khách hàng"}
        cancelText="Hủy"
        okText="Lưu"
        onOk={() => form.submit()}
        style={{ top: 20 }}
        open={isCreateModalOpen}
        onCancel={handleCancelModal}
        okButtonProps={{ style: { background: "#00b96b" } }}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="horizontal"
          labelAlign="left"
          labelWrap
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[{ required: true, message: "Vui lòng nhập sdt!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
          >
            <DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Giới tính" name="gender" initialValue="0">
            <Select
              style={{ width: "100%" }}
              placeholder="Giới tính"
              defaultValue="0"
            >
              <Select.Option value="0">Nam</Select.Option>
              <Select.Option value="1">Nữ</Select.Option>
            </Select>
          </Form.Item>

          <CreateAddress
            handleDistrictChange={handleDistrictChange}
            handleProvinceChange={handleProvinceChange}
            handleWardChange={handleWardChange}
            selectedDistrict={selectedDistrict}
            selectedProvince={selectedProvince}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(AddCustomer);
