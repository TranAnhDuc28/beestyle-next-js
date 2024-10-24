"use client";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
} from "antd";
import React, { memo } from "react";
import moment from "moment";
import useAppNotifications from "@/hooks/useAppNotifications";
import { createStaff } from "@/services/StaffService";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => void;
  mutate:any;
}

const AddStaff = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen, mutate } = props;
  const { showNotification } = useAppNotifications();
  const [form] = Form.useForm();

  const handleCancelModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };

  const handleSubmit = async (values: IStaff) => {
    try {
      form.setFieldValue(
        values.dateOfBirth,
        moment.utc(values.dateOfBirth).format("YYYY-MM-DD")
      );
      const result = await createStaff(values);

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
      showNotification("error", { message: error.message || String(error) });
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
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Họ tên"
                name="fullName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập password!" }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập username!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Sdt"
                name="phoneNumber"
                rules={[{ required: true, message: "Vui lòng nhập sdt!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Vui lòng nhập ngày sinh!" },
                ]}
              >
                <DatePicker format={"YYYY-MM-DD"} style={{width:"100%"}}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[
                  { required: true, message: "Vui lòng nhập giới tính!" },
                ]}
              >
                <Radio.Group>
                  <Radio value="0">Nam</Radio>
                  <Radio value="1">Nữ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default memo(AddStaff);
