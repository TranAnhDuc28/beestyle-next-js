import {
    CalendarOutlined,
    CheckOutlined,
    PhoneOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import {
    Avatar,
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
  } from "antd";
  import { GENDER, GENDER_KEY } from "@/constants/Gender";
  import { STATUS } from "@/constants/Status";
  import useAppNotifications from "@/hooks/useAppNotifications";
  import moment from "moment";
  import React, { useEffect } from "react";
  import { mutate } from "swr";
  import { updateCustomer } from "@/services/CustomerService";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  
  interface IProps {
    customer: ICustomer;
    mutate: any;
  }
  dayjs.extend(utc);
  
  const InformationCustomer = (props: IProps) => {
    const { customer, mutate } = props;
    console.log(customer);
  
    const { showNotification } = useAppNotifications();
    const [form] = Form.useForm();
  
    const onFinish = async (value: any) => {
      console.log(value);
      try {
        if (customer) {
          const data = {
            ...value,
            dateOfBirth: value.dateOfBirth
              ? value.dateOfBirth.utc().format("YYYY-MM-DD")
              : null,
            id: customer.id,
          };
          console.log(data);
  
          const result = await updateCustomer(data);
  
          mutate();
          if (result.data) {
            //   handleCloseUpdateModal();
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
  
    useEffect(() => {
      if (customer) {
        form.setFieldsValue({
          id: customer.id,
          fullName: customer.fullName,
          dateOfBirth: dayjs(customer.dateOfBirth).isValid()
            ? dayjs.utc(customer.dateOfBirth)
            : null,
          gender: customer.gender,
          phoneNumber: customer.phoneNumber,
          // password: customer.password,
          status: customer.status,
          email: customer.email,
          // address:
          //   customer.addresses && customer.addresses.length > 0
          //     ? customer.addresses[0].addressName
          //     : "",
        });
        // console.log("customer.address:", customer.address);
        console.log(customer);
      }
      // Cập nhật lại form khi param thay đổi
    }, [customer]);
  
    return (
      <div className="flex">
        <div className="text-center mx-8 mt-6">
          <Avatar size={200} icon={<UserOutlined />} />
          <p className="text-2xl font-bold mt-4  ">{customer?.fullName}</p>
        </div>
        {/* <div className="mt-5 text-sm font-semibold"> */}
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="w-full max-w-xl"
        >
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input />
          </Form.Item>
  
          {/* <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập password!" }]}
          >
            <Input.Password  />
          </Form.Item> */}
  
          {/* <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập address!" }]}
            
          >
            <Input disabled={true}/>
          </Form.Item> */}
  
          <Form.Item
            label="Sdt"
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
          <Row gutter={[10, 20]} justify="space-between">
            <Col xs={12} md={12}>
              <Form.Item
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
              >
                <DatePicker
                  format="YYYY-MM-DD"
                  style={{ width: "100%" }}
                  allowClear={false} // Ngăn xóa giá trị ngày
                />
              </Form.Item>
            </Col>
            <Col xs={12} md={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                // rules={[{ required: true, message: "Vui lòng nhập giới tính!" }]}
              >
                <Select
                  options={(
                    Object.keys(GENDER_KEY) as Array<keyof typeof GENDER_KEY>
                  ).map((key) => ({ value: key, label: GENDER_KEY[key] }))}
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Form.Item
            name="status"
            label="Trạng thái"
            // rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select
              options={(Object.keys(STATUS) as Array<keyof typeof STATUS>).map(
                (key) => ({ value: key, label: STATUS[key] })
              )}
            />
          </Form.Item>
          <div className="flex justify-end">
            <Button htmlType="submit" type="primary">
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      </div>
      // </div>
    );
  };
  
  export default InformationCustomer;
  