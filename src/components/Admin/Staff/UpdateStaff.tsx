import { STATUS } from "@/constants/Status";
import useAppNotifications from "@/hooks/useAppNotifications";
import { updateCustomer } from "@/services/CustomerService";
import { updateStaff } from "@/services/StaffService";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
} from "antd";
import moment from "moment";
import { memo, useEffect } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  mutate: any;
  dataUpdate: any;
  setDataUpdate: any;
}

const UpdateStaff = (props: IProps) => {
  const { showNotification } = useAppNotifications();
  const {
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    mutate,
    dataUpdate,
    setDataUpdate,
  } = props;
  const [form] = Form.useForm();

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
    setDataUpdate(null);
  };

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        id: dataUpdate.id,
        username: dataUpdate.username,
        email: dataUpdate.email,
        fullName: dataUpdate.fullName,
        dateOfBirth: dataUpdate.dateOfBirth
          ? moment(dataUpdate.dateOfBirth).local()
          : null, // Hiển thị ngày theo múi giờ hiện tại
        gender: dataUpdate.gender,
        phoneNumber: dataUpdate.phoneNumber,
        password: dataUpdate.password,
        status: dataUpdate.status,
      });
      console.log(dataUpdate);
      
    }
    // Cập nhật lại form khi param thay đổi
  }, [dataUpdate]);

  const onFinish = async (value: IStaff) => {
    console.log(value);
    try {
      if (dataUpdate) {
        const data = {
          ...value,
          id: dataUpdate.id,
        };
        const result = await updateStaff(data);
        mutate();
        if (result.data) {
          handleCloseUpdateModal();
          showNotification("success", { message: result.message });
        }
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
    <Modal
      title="Chỉnh sửa nhân viên"
      cancelText="Hủy"
      okText="Lưu"
      style={{ top: 20 }}
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseUpdateModal()}
      okButtonProps={{ style: { background: "#00b96b" } }}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Id" name="id">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Họ tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập username!" },
                ]}
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
                <Input/>
              </Form.Item>
            </Col>
          </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập password!" }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Sdt"
              name="phoneNumber"
              rules={[{ required: true, message: "Vui lòng nhập sdt!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
            >
              <DatePicker format={"YYYY-MM-DD"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng nhập giới tính!" }]}
            >
              <Radio.Group>
                <Radio value="MALE">Nam</Radio>
                <Radio value="FEMALE">Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select
            options={(Object.keys(STATUS) as Array<keyof typeof STATUS>).map(
              (key) => ({ value: key, label: STATUS[key] })
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(UpdateStaff);
