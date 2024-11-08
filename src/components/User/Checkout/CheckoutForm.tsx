import React, { useState, useEffect } from "react";
import { Form, Input, Select, Radio, Divider } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  HomeOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import styles from "@/css/user/styles/checkout.module.css";
import CreateAddress from "@/components/Admin/Address/CreateAddress";

const { Option } = Select;

const CheckoutForm = () => {
  const [selectedMethod, setSelectedMethod] = useState("home");
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selected, setSelected] = useState({
    province: "",
    district: "",
    ward: "",
  });
  const [selectedName, setSelectedName] = useState({
    province: "",
    district: "",
    ward: "",
    addressName: "",
  });
  const [shippingPrice, setShippingPrice] = useState(20000); // Mặc định là 20.000đ

  const [addressForm] = Form.useForm(); // Form cho phần địa chỉ
  const onChangeMethod = (e) => {
    const value = e.target.value;
    setSelectedMethod(value);
  
    if (value === "home") {
      // Reset giá trị cho các trường khi chọn "Giao hàng tận nhà"
      addressForm.setFieldsValue({ district: undefined, ward: undefined });
      setSelected({
        province: selected.province, // Giữ lại giá trị tỉnh đã chọn
        district: "",  // Reset huyện
        ward: "",      // Reset xã
      });
    }
  };
  const onChangeShipping = (e) => {
    setSelectedShipping(e.target.value);
  };


  // Xử lý khi tỉnh được chọn
const handleProvinceChange = (value: any, name: string) => {
  setSelected((prev) => ({ ...prev, province: value }));
  setSelectedName((prev) => ({ ...prev, province: name }));
  addressForm.setFieldsValue({ district: undefined, ward: undefined });  // Reset district và ward khi province thay đổi

  // Cập nhật giá trị phí vận chuyển
  if (value === "01") {
    setShippingPrice(20000); // Hà Nội có phí là 20.000đ
  } else {
    setShippingPrice(30000); // Các tỉnh khác có phí là 30.000đ
  }
};

// Xử lý khi huyện được chọn
const handleDistrictChange = (value: any, name: string) => {
  setSelected((prev) => ({ ...prev, district: value }));
  setSelectedName((prev) => ({ ...prev, district: name }));
  addressForm.setFieldsValue({ ward: undefined });  // Reset ward khi district thay đổi
};

// Xử lý khi xã được chọn
const handleWardChange = (value: any, name: string) => {
  setSelected((prev) => ({ ...prev, ward: value }));
  setSelectedName((prev) => ({ ...prev, ward: name }));
};

// Xử lý khi số nhà được chọn
const handleDetailAddressChange = (value: string) => {
  setSelectedName((prev) => ({ ...prev, addressName: value }));
};


  return (
    <div className={styles["checkout-form"]}>
      <h3 className={styles["heading"]} style={{ fontSize: 20 }}>
        Người nhận
      </h3>
      <Form
        layout="horizontal"
        className={styles["form"]}
        method="post"
        action="#"
      >
        <Form.Item
          name="customerName"
          rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}
        >
          <Input
            placeholder="Tên khách hàng"
            prefix={<UserOutlined className="pr-2" />}
            className={styles["input-checkout"]}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input
            placeholder="Số điện thoại"
            prefix={<PhoneOutlined className="pr-2" />}
            className={styles["input-checkout"]}
          />
        </Form.Item>

        <Form.Item name="email">
          <Input
            placeholder="Địa chỉ email (Không bắt buộc)"
            prefix={<MailOutlined className="pr-2" />}
            className={styles["input-checkout"]}
          />
        </Form.Item>

        <div className={`${styles["delivery-method"]} mt-5`}>
          <h3 className={styles["heading"]}>Hình thức nhận hàng</h3>
          <Radio.Group
            onChange={onChangeMethod}
            value={selectedMethod}
            className={styles["delivery-radio-group"]}
          >
            <div className="d-flex">
              <div className="mr-5">
                <Radio.Button
                  value="home"
                  className={`${styles["delivery-option"]} ${
                    selectedMethod === "home" ? styles["selected"] : ""
                  }`}
                  style={{ padding: 30 }}
                >
                  <div style={{ marginTop: "-15px" }}>
                    <HomeOutlined
                      style={{ fontSize: "24px", margin: "0 10px 0 5px" }}
                    />
                    Giao hàng tận nhà
                  </div>
                </Radio.Button>
              </div>
              <div>
                <Radio.Button
                  value="store"
                  className={`${styles["delivery-option"]} ${
                    selectedMethod === "store" ? styles["selected"] : ""
                  }`}
                  style={{ padding: 30 }}
                >
                  <div style={{ marginTop: "-15px" }}>
                    <ShopOutlined
                      style={{ fontSize: "24px", margin: "0 10px 0 5px" }}
                    />
                    Lấy tại cửa hàng
                  </div>
                </Radio.Button>
              </div>
            </div>
          </Radio.Group>
        </div>

        {selectedMethod === "home" ? (
          <>
            <CreateAddress
              form={addressForm}
              handleDistrictChange={handleDistrictChange}
              handleProvinceChange={handleProvinceChange}
              handleWardChange={handleWardChange}
              handleDetailAddress={handleDetailAddressChange}
              selected={selected}
              setSelected={setSelected}
            />
            {selected.province ? (
              <div className={styles["shipping-method"]}>
                <h3 className={styles["heading"]}>Phương thức vận chuyển</h3>

                <Radio.Group
                  onChange={onChangeShipping}
                  value={selectedShipping}
                  className={styles["shipping-radio-group"]}
                >
                  <div
                    className={styles["shipping-option"]}
                    style={{ width: "550px" }}
                  >
                    <Radio
                      value="standard"
                      className={styles["shipping-radio"]}
                    >
                      <div className={styles["shipping-content"]} 
                      style={{ width: "500px" }}>
                        <div className={styles["shipping-info"]} >
                          <span className={styles["shipping-title"]}>
                            Tiêu chuẩn
                          </span>
                          <span className={styles["shipping-price"]}>
                            {shippingPrice.toLocaleString()} ₫
                          </span>
                        </div>
                        <div className={styles["shipping-description"]}>
                          Đảm bảo nhận hàng từ 3 - 5 ngày
                        </div>
                      </div>
                    </Radio>
                    <Divider />
                    <Radio
                      value="flash"
                      className={`${styles["shipping-radio"]}`}
                    >
                      <div className={styles["shipping-content"]} 
                      style={{ width: "500px" }}>
                        <div className={styles["shipping-info"]}>
                          <span className={styles["shipping-title"]}>
                            Hoả tốc
                          </span>
                          <span className={styles["shipping-price"]}>
                            65.000 ₫
                          </span>
                        </div>
                        <div className={styles["shipping-description"]}>
                          Đảm bảo nhận hàng ngay trong ngày
                        </div>
                      </div>
                    </Radio>
                  </div>
                </Radio.Group>
              </div>
            ) : (
              ""
            )}
          </>
        ) : null}
      </Form>
    </div>
  );
};

export default CheckoutForm;
