import useAppNotifications from "@/hooks/useAppNotifications";
import { updateCustomer } from "@/services/CustomerService";
import { Button, Col, DatePicker, Form, Input, Modal, Radio, Row } from "antd";
import moment from "moment";
import { useEffect } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  mutate: any;
  dataUpdate: any;
  setDataUpdate: any;
}

const UpdateCustomer = (props: IProps) => {
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

    if(dataUpdate){

      form.setFieldsValue({
        id: dataUpdate.id,
        fullName: dataUpdate.fullName,
        dateOfBirth: dataUpdate.dateOfBirth ? moment(dataUpdate.dateOfBirth).local() : null, // Hiển thị ngày theo múi giờ hiện tại
        gender: dataUpdate.gender,
        phoneNumber: dataUpdate.phoneNumber,
        password: dataUpdate.password,
      });
    }
    // Cập nhật lại form khi param thay đổi
  }, [dataUpdate]);

  // const handleSubmit = async (values: ICustomer) => {
  //   try {
  //     form.setFieldValue(
  //       values.dateOfBirth,
  //       moment(values.dateOfBirth).format("YYYY-MM-DD")
  //     );
  //     const result = await updateCustomer(values);
  //     console.log(result);

  //     if (result.code !== 201) {
  //       showNotification("error", { message: result.error });
  //     } else {
  //       onMutate();
  //       showNotification("success", { message: result.message });
  //       onClose();
  //       console.log("Dữ liệu cập nhật: ", values);
  //     }
  //   } catch (error) {
  //     showNotification("error", { message: error });
  //   }

  //   // Xử lý cập nhật khách hàng
  // };
  const onFinish = async (value: ICustomer) => {
    console.log(value);
    try {
        if (dataUpdate) {
            const data = {
                ...value,
                id: dataUpdate.id
            }
            const result = await updateCustomer(data);
            mutate();
            if (result.data) {
                handleCloseUpdateModal();
                showNotification("success", {message: result.message});
            }
        }
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message;
        if (errorMessage && typeof errorMessage === 'object') {
            Object.entries(errorMessage).forEach(([field, message]) => {
                showNotification("error", {message: String(message)});
            });
        } else {
            showNotification("error", {message: error?.message, description: errorMessage,});
        }
    }

};

 

  return (
    <Modal
      title="Chỉnh sửa chất liệu"
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
            <Form.Item label="Họ tên" name="fullName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Password" name="password">
              <Input.Password />
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
      </Form>
    </Modal>
  );
};

export default UpdateCustomer;
