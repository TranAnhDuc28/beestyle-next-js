import useAppNotifications from "@/hooks/useAppNotifications";
import { IAddress } from "@/types/IAddress";
import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import useAddress from "./hook/useAddress";
import { updateAddress } from "@/services/AddressService";
import { useParams } from "next/navigation";

interface IProps {
  mutate: any;
  initialValues: any;
  hanldeClose: () => void;
}

const UpdateAddress = (props: IProps) => {
  const { showNotification } = useAppNotifications();
  const { mutate, initialValues, hanldeClose } = props;
  const [form] = Form.useForm();
  const { provinces, districts, wards, fetchDistricts, fetchWards } =
    useAddress();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWardName, setSelectedWardName] = useState("");

  console.log("initialValues", initialValues.default);

  // Xử lý khi tỉnh được chọn
  const handleProvinceChange = (value: any, name: string) => {
    setSelectedProvince(value);
    setSelectedProvinceName(name);
    setSelectedDistrict(""); // Reset huyện khi tỉnh thay đổi
    setSelectedWard("");
    form.setFieldsValue({ district: undefined, ward: undefined }); // Xóa dữ liệu hiện tại của huyện và xã
  };

  // Xử lý khi huyện được chọn
  const handleDistrictChange = (value: any, name: string) => {
    setSelectedDistrict(value);
    setSelectedDistrictName(name);
  };
  // Xử lý khi xã được chọn
  const handleWardChange = (value: any, name: string) => {
    setSelectedWard(value);
    setSelectedWardName(name);
  };

  useEffect(() => {
    if (initialValues) {
      console.log(initialValues);

      form.setFieldsValue({
        province: initialValues.city,
        district: initialValues.district,
        ward: initialValues.commune,
        
      });
    }
  }, [initialValues]);

  const onFinish = async (value:any) => {
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
        addressName: `${selectedWardName} - ${selectedDistrictName} - ${selectedProvinceName}`,
        city: selectedProvinceName ?? "", // Lưu tên tỉnh vào đây
        district: selectedDistrictName ?? "", // Lưu tên huyện vào đây
        commune: selectedWardName ?? "", // Tên xã
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
        name="updateBrand"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Tỉnh"
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh!" }]}
        >
          <Select
            onChange={(value) => {
              const province = provinces.find((prov) => prov.code === value);
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

        <Form.Item
          label="Huyện"
          name="district"
          rules={[{ required: true, message: "Vui lòng chọn huyện!" }]}
        >
          <Select
            onChange={(value) => {
              const district = districts.find((dist) => dist.code === value);
              if (district) {
                handleDistrictChange(value, district.name);
                fetchWards(value);
              }
            }}
            placeholder="Chọn huyện"
            style={{ width: "100%" }}
            disabled={!selectedProvince}
          >
            {districts.map((district) => (
              <Select.Option key={district.code} value={district.code}>
                {district.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

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
            disabled={!selectedDistrict}
          >
            {wards.map((ward) => (
              <Select.Option key={ward.code} value={ward.code}>
                {ward.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Space className="flex justify-center">
          <Button type="primary" htmlType="submit" disabled={!selectedProvince}>
            Cập nhật
          </Button>
        </Space>
      </Form>
    </>
  );
};
export default UpdateAddress;
