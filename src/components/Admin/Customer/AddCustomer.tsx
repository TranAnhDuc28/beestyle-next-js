"use client";
import { Col, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { memo, useEffect, useState } from "react";
import moment from "moment";
import { createCustomer } from "@/services/CustomerService";
import useAppNotifications from "@/hooks/useAppNotifications";
import { createAddress } from "@/services/AddressService";

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
  const [provinces, setProvinces] = useState<any[]>([]); // Dữ liệu tỉnh
  const [districts, setDistricts] = useState<any[]>([]); // Dữ liệu huyện
  const [wards, setWards] = useState<any[]>([]); // Dữ liệu xã

  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const handleCancelModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
    setWards([])
  };

  const handleSubmit = async (values: ICustomer) => {
    try {
      // Định dạng ngày sinh
      console.log(values.dateOfBirth);
      
      const result = await createCustomer(values);
      mutate();

      if (result.data) {
        const customer = result.data; // Lấy ID của khách hàng từ phản hồi

        // Tạo địa chỉ mới với ID của khách hàng
        const address = {
          addressName: "Địa chỉ",
          city: province,
          district: district,
          commune: ward,
          isDefault: false,
          customer: {
            id: customer.id,
          },
        };

        console.log(address);

        // Gọi API để tạo địa chỉ
        try {
          const addressResult = await createAddress(address);
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

  // Lấy dữ liệu tỉnh
  const fetchProvinces = async () => {
    // Thay thế URL bằng API lấy tỉnh thực tế
    const response = await fetch(
      "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
    );
    const data = await response.json();
    setProvinces(data.data.data);
  };

  // Lấy dữ liệu huyện khi tỉnh được chọn
  const fetchDistricts = async (code?: any) => {
    const response = await fetch(
      `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`
    );
    const data = await response.json();
    setDistricts(data.data.data);
  };

  // Lấy dữ liệu xã khi xã được chọn
  const fetchWards = async (code?: any) => {
    const response = await fetch(
      `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${code}&limit=-1`
    );
    const data = await response.json();
    setWards(data.data.data);
  };

  // Lấy tên tỉnh
  const fetchProvince = async (code?: any) => {
    const response = await fetch(
      `https://vn-public-apis.fpo.vn/provinces/getAll?q=${code}&cols=code`
    );
    const data = await response.json();

    // Kiểm tra xem có dữ liệu không
    if (data.exitcode === 1 && data.data && data.data.data.length > 0) {
      // Lấy tên tỉnh
      const provinceName = data.data.data[0].name;
      setProvince(provinceName); // Lưu tên vào state
      console.log(provinceName); // In ra tên
    } else {
      console.log("Không tìm thấy tỉnh");
    }
  };

  // Lấy tên huyện
  const fetchDistrict = async (code?: any) => {
    const response = await fetch(
      `https://vn-public-apis.fpo.vn/districts/getAll?q=${code}&cols=code`
    );
    const data = await response.json();

    // Kiểm tra xem có dữ liệu không
    if (data.exitcode === 1 && data.data && data.data.data.length > 0) {
      // Lấy tên tỉnh
      const provinceName = data.data.data[0].name;
      setDistrict(provinceName); // Lưu tên vào state
      // console.log(provinceName); // In ra tên
    } else {
      console.log("Không tìm thấy tỉnh");
    }
  };

  useEffect(() => {
    if (isCreateModalOpen) {
      fetchProvinces();
    }
  }, [isCreateModalOpen]);

  // Xử lý khi tỉnh được chọn
  const handleProvinceChange = (value?: any) => {
    setSelectedProvince(value);
    setSelectedDistrict(""); // Reset huyện khi tỉnh thay đổi
    setWards([]); // Reset xã khi tỉnh thay đổi
    fetchDistricts(value);
    fetchProvince(value);
    // console.log(value);
  };

  // Xử lý khi huyện được chọn
  const handleDistrictChange = (value?: any) => {
    setSelectedDistrict(value);
    fetchWards(value);
    fetchDistrict(value);
    console.log(value);
    
  };
  // Xử lý khi xã được chọn
  const handleWardChange = (value?: any) => {
    setWard(value);
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
        <Form form={form} onFinish={handleSubmit} layout="vertical">
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

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Vui lòng nhập giới tính!" }]}
          >
            <Select style={{ width: "100%" }} placeholder="Giới tính">
              <Option value="0">Nam</Option>
              <Option value="1">Nữ</Option>
            </Select>
          </Form.Item>

          {/* Trường địa chỉ */}
          <Form.Item
            label="Tỉnh"
            name="province"
            rules={[{ required: true, message: "Vui lòng chọn tỉnh!" }]}
          >
            <Select
              onChange={handleProvinceChange}
              placeholder="Chọn tỉnh"
              style={{ width: "100%" }}
            >
              {provinces.map((province) => (
                <Option key={province._id} value={province.code}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Huyện"
            name="district"
            rules={[{ required: true, message: "Vui lòng chọn huyện!" }]}
          >
            <Select
              onChange={handleDistrictChange}
              placeholder="Chọn huyện"
              style={{ width: "100%" }}
              disabled={!selectedProvince} // Khóa khi chưa chọn tỉnh
            >
              {districts.map((district) => (
                <Option key={district._id} value={district.code}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Xã"
            name="ward"
            rules={[{ required: true, message: "Vui lòng chọn xã!" }]}
          >
            <Select
              onChange={handleWardChange}
              placeholder="Chọn xã"
              style={{ width: "100%" }}
              disabled={!selectedDistrict} // Khóa khi chưa chọn huyện
            >
              {wards.map((ward) => (
                <Option key={ward._id} value={ward.name}>
                  {ward.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(AddCustomer);
