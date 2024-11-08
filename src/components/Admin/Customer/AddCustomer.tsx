"use client";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import React, { memo, useEffect, useState } from "react";
import { createCustomer } from "@/services/CustomerService";
import useAppNotifications from "@/hooks/useAppNotifications";
import { createAddress } from "@/services/AddressService";
import CreateAddress from "../Address/CreateAddress";
import dayjs from "dayjs";

const { Option } = Select;

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => void;
  mutate: any;
}

const AddCustomer = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen, mutate } = props;
  const { showNotification } = useAppNotifications();

  const [selected, setSelected] = useState({
    province: "",
    district: "",
    ward: "",
  });
  const [selectedName, setSelectedName] = useState({
    province: "",
    district: "",
    ward: "",
    addressName:""
  });
  // const [selectedProvince, setSelectedProvince] = useState("");
  // const [selectedDistrict, setSelectedDistrict] = useState("");
  // const [selectedWard, setSelectedWard] = useState("");

  // const [selectedProvinceName, setSelectedProvinceName] = useState("");
  // const [selectedDistrictName, setSelectedDistrictName] = useState("");
  // const [selectedWardName, setSelectedWardName] = useState("");
  // const [detailAddress, setDetailAddress] = useState("");

  const [form] = Form.useForm(); // Form chính của khách hàng
  const [addressForm] = Form.useForm(); // Form cho phần địa chỉ

  console.log(isCreateModalOpen);

  const handleSubmit = async (values: ICustomer) => {
    try {
      // Hiển thị lại dateOfBirth dưới dạng chuỗi cho đúng định dạng khi gửi lên server hoặc lưu trữ
      // values.dateOfBirth = dayjs(values.dateOfBirth).format("YYYY-MM-DD");

      // console.log(values.dateOfBirth);
      const result = await createCustomer(values);

      if (result.data) {
        const customer = result.data; // Lấy ID của khách hàng từ phản hồi

        const address = {
          addressName: selectedName.addressName,
          // addressName:
          //   detailAddress == ""
          //     ? `${selectedName.ward} - ${selectedName.district} - ${selectedName.province}`
          //     : `${detailAddress} - ${selected.ward} - ${selectedName.district} - ${selectedName.province}`,
          cityCode: Number(selected.province), // Nếu cần chuyển đổi
          city: selectedName.province ?? "", // Lưu tên tỉnh vào đây
          districtCode: Number(selected.district), // Nếu cần chuyển đổi
          district: selectedName.district ?? "", // Lưu tên huyện vào đây
          communeCode: Number(selected.ward), // Cần lấy từ API nếu có
          commune: selectedName.ward ?? "", // Tên xã
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
    addressForm.resetFields()
    setSelected({province:"",district:"",ward:""})
    setIsCreateModalOpen(false);
  };



  // Xử lý khi tỉnh được chọn
  const handleProvinceChange = (value: any, name: string) => {
    // setSelectedProvince(value);
    // setSelectedProvinceName(name);
    setSelected((prev) =>({...prev,province:value}))
    console.log("province",value);
    
    setSelectedName((prev) =>({...prev,province:name}))
    addressForm.setFieldsValue({ district: undefined, ward: undefined })
  };

  // Xử lý khi huyện được chọn
  const handleDistrictChange = (value: any, name: string) => {
    // setSelectedDistrict(value);
    // setSelectedDistrictName(name);
    setSelected((prev) =>({...prev,district:value}))
    setSelectedName((prev) =>({...prev,district:name}))
    console.log("district",value);
    addressForm.setFieldsValue( {ward: undefined });
  };
  // Xử lý khi xã được chọn
  const handleWardChange = (value: any, name: string) => {
    // setSelectedWard(value);
    // setSelectedWardName(name);
    setSelected((prev) =>({...prev,ward:value}))
    console.log("ward",value);
    setSelectedName((prev) =>({...prev,ward:name}))
  };

  // Xử lý khi số nhà được chọn
  const handleDetailAddressChange = (value: string) => {
    setSelectedName((prev) =>({...prev,addressName:value}))
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
            // rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input />
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
            // rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            // rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
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
          form={addressForm}
            handleDistrictChange={handleDistrictChange}
            handleProvinceChange={handleProvinceChange}
            handleWardChange={handleWardChange}
            handleDetailAddress={handleDetailAddressChange}
            selected={selected}
            setSelected={setSelected}
          />
        </Form>
      </Modal>
    </>
  );
};

export default memo(AddCustomer);
