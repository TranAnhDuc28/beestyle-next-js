import { GENDER_KEY } from "@/constants/Gender";
import { STATUS } from "@/constants/Status";
import useAppNotifications from "@/hooks/useAppNotifications";
import { updateStaff } from "@/services/StaffService";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment";
import { memo, useEffect } from "react";
const { Option } = Select;

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
        address: dataUpdate.address,
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
          <DatePicker format={"YYYY-MM-DD"} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Vui lòng nhập giới tính!" }]}
        >
          <Select
            options={(
              Object.keys(GENDER_KEY) as Array<keyof typeof GENDER_KEY>
            ).map((key) => ({ value: key, label: GENDER_KEY[key] }))}
          />
        </Form.Item>
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
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: false, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(UpdateStaff);