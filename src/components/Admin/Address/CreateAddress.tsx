import { Form, Select } from "antd";
import React from "react";
import useAddress from "./hook/useAddress";

interface IProps {
  selectedProvince: string;
  selectedDistrict: string;
  handleProvinceChange: (value: string, name: string) => void;
  handleDistrictChange: (value: string, name: string) => void;
  handleWardChange: (value: string, name: string) => void;
}
const CreateAddress = (props: IProps) => {
  const {
    selectedDistrict,
    selectedProvince,
    handleDistrictChange,
    handleProvinceChange,
    handleWardChange,
  } = props;
  const { provinces, districts, wards, fetchDistricts, fetchWards } =
    useAddress();

  console.log(districts);
  console.log(selectedProvince);

  return (
    <div>
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
    </div>
  );
};

export default CreateAddress;
