import useAppNotifications from "@/hooks/useAppNotifications";
import { updateCustomer } from "@/services/CustomerService";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
} from "antd";
import moment from "moment";
import { useEffect } from "react";
import { mutate } from "swr";

const UpdateCustomer = ({
  param,
  onClose,
  onMutate,
}: {
  param: ICustomer;
  onClose: () => void;
  onMutate: any;
}) => {
  const { showNotification } = useAppNotifications();
  const [form] = Form.useForm();

  const handleSubmit = async (values: ICustomer) => {
    try {
      form.setFieldValue(
        values.dateOfBirth,
        moment(values.dateOfBirth).format("YYYY-MM-DD")
      );
      const result = await updateCustomer(values);
      console.log(result);

      if (result.code !== 201) {
        showNotification("error", { message: result.error });
      } else {
        onMutate();
        showNotification("success", { message: result.message });
        onClose();
        console.log("Dữ liệu cập nhật: ", values);
      }
    } catch (error) {
      showNotification("error", { message: error });
    }

    // Xử lý cập nhật khách hàng
  };

  useEffect(() => {
    // Cập nhật lại form khi param thay đổi
    form.setFieldsValue({
      id: param.id,
      fullName: param.fullName,
      dateOfBirth: param.dateOfBirth ? moment(param.dateOfBirth).local() : null, // Hiển thị ngày theo múi giờ hiện tại
      gender: param.gender,
      phoneNumber: param.phoneNumber,
      password: param.password,
    });
  }, [param, form]);

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Id" name="id">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Họ tên" name="fullName">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Sdt" name="phoneNumber">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Ngày sinh" name="dateOfBirth">
            <DatePicker format={"YYYY-MM-DD"} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Giới tính" name="gender">
            <Radio.Group>
              <Radio value="MALE">Nam</Radio>
              <Radio value="FEMALE">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit">
        Cập nhật
      </Button>
    </Form>
  );
};

export default UpdateCustomer;
