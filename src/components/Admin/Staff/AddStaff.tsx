"use client";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import React, { memo } from "react";
import moment from "moment";
import useAppNotifications from "@/hooks/useAppNotifications";
import { createStaff } from "@/services/StaffService";
const { Option } = Select;

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => void;
  mutate: any;
}

const AddStaff = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen, mutate } = props;
  const { showNotification } = useAppNotifications();
  const [form] = Form.useForm();

  const handleCancelModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const handleSubmit = async (value: IStaff) => {
    console.log(value);

    try {
      const result = await createStaff(value);
      mutate();
      console.log(value);

      if (result.data) {
        handleCancelModal();
        showNotification("success", { message: result.message });
      }
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
    <>
      <Modal
        title={"Thêm mới nhân viên"}
        cancelText="Hủy"
        okText="Lưu"
        onOk={() => form.submit()}
        style={{ top: 20 }}
        open={isCreateModalOpen}
        onCancel={() => handleCancelModal()}
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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập username!" }]}
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
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sdt"
            name="phoneNumber"
            rules={[{ required: true, message: "Vui lòng nhập sdt!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: "100%" }}
            />
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
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: false, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(AddStaff);
