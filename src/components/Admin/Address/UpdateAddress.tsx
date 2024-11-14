import useAppNotifications from "@/hooks/useAppNotifications";
import { Button, Col, Form, Row, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import useAddress from "./hook/useAddress";
import { updateAddress } from "@/services/AddressService";
import TextArea from "antd/es/input/TextArea";

interface IProps {
  mutate: any;
  initialValues: any;
  hanldeClose: () => void;
}

const UpdateAddress = (props: IProps) => {
  const { showNotification } = useAppNotifications();
  const { mutate, initialValues, hanldeClose } = props;
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [form] = Form.useForm();
  const { provinces, districts, wards, fetchDistricts, fetchWards,loading} = useAddress();

  const [selected, setSelected] = useState({
    province: initialValues?.cityCode || "",
    district: initialValues?.districtCode || "",
    ward: initialValues?.communeCode || "",
  });
  const [selectedName, setSelectedName] = useState({
    province: initialValues?.city || "",
    district: initialValues?.district || "",
    ward: initialValues?.commune || "",
    addressName: initialValues?.addressName || "",
  });
  // const [detailAddress, setDetailAddress] = useState("");

  console.log(initialValues);

  // Xử lý khi tỉnh được chọn
  const handleProvinceChange = (value: any, name: string) => {
    setSelected((prev) => ({ ...prev, province: value }));
    setSelectedName((prev) => ({ ...prev, province: name }));
    form.setFieldsValue({
      province: value,
      district: undefined,
      ward: undefined,
      addressName:undefined,
    }); // Đảm bảo form nhận giá trị tỉnh mới
  };

  // Xử lý khi huyện được chọn
  const handleDistrictChange = (value: any, name: string) => {
    setSelected((prev) => ({ ...prev, district: value }));
    setSelectedName((prev) => ({ ...prev, district: name }));
    form.setFieldsValue({ district: value, ward: undefined }); // Đảm bảo form nhận giá trị huyện mới
  };

  // Xử lý khi xã được chọn
  const handleWardChange = (value: any, name: string) => {
    setSelected((prev) => ({ ...prev, ward: value }));
    setSelectedName((prev) => ({ ...prev, ward: name }));
    form.setFieldsValue({ ward: value }); // Đảm bảo form nhận giá trị xã mới
  };
  // Xử lý khi số nhà được chọn
  const handleDetailAddressChange = (value: string) => {
    setSelectedName((prev) => ({ ...prev, addressName: value }));
  };

  // Cập nhật form với initialValues và fetch dữ liệu khi khởi tạo
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        province: initialValues.city,
        district: initialValues.district,
        ward: initialValues.commune,
        addressName: initialValues.addressName,
      });

      if (initialValues.city) {
        fetchDistricts(initialValues.cityCode).then(() => {
          if (initialValues.district) {
            fetchWards(initialValues.districtCode);
          }
        });
      }
    }
  }, [initialValues]);
  const onFinish = async (value: any) => {
    //   console.log(value);
    try {
      const {
        city,
        district,
        commune,
        addressName,
        isDefault,
        customer,
        ...rest
      } = value; // Giải cấu trúc các thuộc tính để tránh ghi đè

      const address = {
        addressName: selectedName.addressName,
        // addressName:
        // detailAddress == ""
        //   ? `${selectedName.ward} - ${selectedName.district} - ${selectedName.province}`
        //   : `${detailAddress} - ${selected.ward} - ${selectedName.district} - ${selectedName.province}`,
        cityCode: Number(selected.province), // Nếu cần chuyển đổi
        city: selectedName.province ?? "", // Lưu tên tỉnh vào đây
        districtCode: Number(selected.district), // Nếu cần chuyển đổi
        district: selectedName.district ?? "", // Lưu tên huyện vào đây
        communeCode: Number(selected.ward), // Cần lấy từ API nếu có
        commune: selectedName.ward ?? "", // Tên xã
        default: initialValues.default,
        ...rest, // Gộp các giá trị khác từ value vào đối tượng address
      };
      console.log("Success:", address);
      if (initialValues) {
        const data = {
          ...address,
          id: initialValues.id,
        };
        const result = await updateAddress(data);
        mutate();
        if (result.data) {
          console.log(result.data);
          hanldeClose();
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
    <>
      <Form
        form={form}
        // name="updateBrand"
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={() => setIsFormChanged(true)} // Mở nút cập nhật khi có thay đổi
      >
        <Row gutter={16}>
          {" "}
          {/* Thêm khoảng cách giữa các cột */}
          <Col span={8}>
            {" "}
            {/* Mỗi cột chiếm 1/3 chiều rộng */}
            <Form.Item
              label="Tỉnh"
              name="province"
              rules={[{ required: true, message: "Vui lòng chọn tỉnh!" }]}
            >
              
              <Select
                onChange={(value) => {
                  const province = provinces.find(
                    (prov) => prov.code === value
                  );
                  if (province) {
                    handleProvinceChange(value, province.name);
                    fetchDistricts(value);
                  }
                }}
                placeholder="Chọn tỉnh"
                style={{ width: "100%" }}
              >
                {provinces.map((province) => (
                  <Select.Option key={province.code} value={province.code}>
                    {province.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Huyện"
              name="district"
              rules={[{ required: true, message: "Vui lòng chọn huyện!" }]}
            >
              <Select
                onChange={(value) => {
                  const district = districts.find(
                    (dist) => dist.code === value
                  );
                  if (district) {
                    handleDistrictChange(value, district.name);
                    fetchWards(value);
                  }
                }}
                placeholder="Chọn huyện"
                style={{ width: "100%" }}
                value={initialValues.districtCode || undefined} // Đảm bảo hiển thị đúng giá trị hiện tại
              >
                {districts && districts.length > 0 ? (
                  districts.map((district) => (
                    <Select.Option key={district.code} value={district.code}>
                      {district.name}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option disabled>Chọn huyện</Select.Option>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Xã"
              name="ward"
              rules={[{ required: true, message: "Vui lòng chọn xã!" }]}
            >
              
              <Select
                onChange={(value) => {
                  const ward = wards.find((war) => war.code === value);
                  if (ward) {
                    handleWardChange(value, ward.name);
                  }
                }}
                placeholder="Chọn xã"
                style={{ width: "100%" }}
                value={initialValues.wardCode || undefined} // Đảm bảo hiển thị đúng giá trị hiện tại
              >
                {wards && wards.length > 0 ? (
                  wards.map((ward) => (
                    <Select.Option key={ward.code} value={ward.code}>
                      {ward.name}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option disabled>Chọn xã</Select.Option>
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Chi tiết" name="addressName">
          <TextArea
            onChange={(e) => handleDetailAddressChange(e.target.value)}
            placeholder="Nhập địa chỉ chi tiết"
          />
        </Form.Item>
        <Space className="flex justify-center">
          <Button type="primary" htmlType="submit" disabled={!isFormChanged}>
            Cập nhật
          </Button>
        </Space>
      </Form>
    </>
  );
};
export default UpdateAddress;
