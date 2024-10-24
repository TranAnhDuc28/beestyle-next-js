"use client";
import { Col, DatePicker, Form, Input, Modal, Radio, Row, Select } from "antd";
import React, { memo } from "react";
import moment from "moment";
import { createCustomer } from "@/services/CustomerService";
import useAppNotifications from "@/hooks/useAppNotifications";
const {Option} = Select;

interface ModalAdd {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => void;
  mutate: any;
}

const AddCustomer = ({
  isCreateModalOpen,
  setIsCreateModalOpen,
  mutate,
}: ModalAdd) => {
  const { showNotification } = useAppNotifications();
  const [form] = Form.useForm();

  const handleCancelModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const handleSubmit = async (values: ICustomer) => {
    try {
      form.setFieldValue(
        values.dateOfBirth,
        moment.utc(values.dateOfBirth).format("YYYY-MM-DD")
      );
      const result = await createCustomer(values);

      console.log(result);

      if (result.code !== 201) {
        showNotification("error", { message: result.error });
      } else {
        mutate();
        showNotification("success", { message: result.message });
        handleCancelModal();
        form.resetFields();
        console.log("Dữ liệu Thêm mới: ", values);
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
        title={"Thêm mới khách hàng"}
        cancelText="Hủy"
        okText="Lưu"
        onOk={() => form.submit()}
        style={{ top: 20 }}
        open={isCreateModalOpen}
        onCancel={() => handleCancelModal()}
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
            <DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Vui lòng nhập giới tính!" }]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Giới tính"
              suffixIcon={null}
            >
              <Option value="0" >
                Nam
              </Option>
              <Option value="1" >
                Nữ
              </Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default memo(AddCustomer);
