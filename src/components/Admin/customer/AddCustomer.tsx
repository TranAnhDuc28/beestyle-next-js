import { Button, DatePicker, Form, Input, message, Modal, Radio } from "antd";
import React from "react";
import moment from "moment";
import { createCustomer } from "@/services/CustomerService";
import { mutate } from "swr";


interface ModalAdd {
  visible: boolean;
  onClose: () => void;
}

const AddCustomer = ({ visible, onClose }: ModalAdd) => {
  const [form] = Form.useForm();


  const handleSubmit = async (values: ICustomer) => {
    try {
      form.setFieldValue(values.dateOfBirth,moment.utc(values.dateOfBirth).format("YYYY-MM-DD"))
      const result = await createCustomer(values);
      console.log(result);

      if (result.code !== 201) {
        message.error(`Thêm mới thất bại, ${result.error}`);
      } else {
        mutate("api/customer");
        message.success("Thêm mới thành công");
        onClose();
        console.log("Dữ liệu Thêm mới: ", values);
      }
    } catch (error) {
      message.error("Thêm mới thất bại");
    }
  };
  return (
    <>
      <Modal title={"Thêm mới khách hàng"} visible={visible} onCancel={onClose} footer= {null}>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item label="Họ tên" name="fullName">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
          <Form.Item label="Sdt" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <DatePicker format={"YYYY-MM-DD"} />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Radio.Group>
              <Radio value="MALE">Nam</Radio>
              <Radio value="FEMALE">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default AddCustomer;


