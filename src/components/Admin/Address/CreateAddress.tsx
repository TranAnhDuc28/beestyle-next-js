// AddressForm.tsx
"use client";
import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;

interface AddressFormProps {
  selectedProvince: string;
  selectedDistrict: string;
  selectedWard: string;
  onProvinceChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  onWardChange: (value: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  selectedProvince,
  selectedDistrict,
  selectedWard,
  onProvinceChange,
  onDistrictChange,
  onWardChange,
}) => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [provinceName, setProvinceName] = useState<string>("");
  const [districtName, setDistrictName] = useState<string>("");
  const [wardName, setWardName] = useState<string>("");

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    const response = await fetch("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1");
    const data = await response.json();
    setProvinces(data.data.data);
  };

  const fetchDistricts = async (code: string) => {
    const response = await fetch(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`);
    const data = await response.json();
    setDistricts(data.data.data);
  };

  const fetchWards = async (code: string) => {
    const response = await fetch(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${code}&limit=-1`);
    const data = await response.json();
    setWards(data.data.data);
  };

  const handleProvinceChange = (value: string) => {
    const selectedProvince = provinces.find((province) => province.code === value);
    setProvinceName(selectedProvince?.name || ""); // Lưu tên tỉnh
    onProvinceChange(value);
    fetchDistricts(value);
  };

  const handleDistrictChange = (value: string) => {
    const selectedDistrict = districts.find((district) => district.code === value);
    setDistrictName(selectedDistrict?.name || ""); // Lưu tên huyện
    onDistrictChange(value);
    fetchWards(value);
  };

  const handleWardChange = (value: string) => {
    const selectedWard = wards.find((ward) => ward.code === value);
    setWardName(selectedWard?.name || ""); // Lưu tên xã
    onWardChange(value);
  };

  return (
    <>
      <Form.Item label="Tỉnh" name="province" rules={[{ required: true, message: "Vui lòng chọn tỉnh!" }]}>
        <Select onChange={handleProvinceChange} placeholder="Chọn tỉnh" style={{ width: "100%" }} value={selectedProvince}>
          {provinces.map((province) => (
            <Option key={province._id} value={province.code}>
              {province.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Huyện" name="district" rules={[{ required: true, message: "Vui lòng chọn huyện!" }]}>
        <Select onChange={handleDistrictChange} placeholder="Chọn huyện" style={{ width: "100%" }} value={selectedDistrict} disabled={!selectedProvince}>
          {districts.map((district) => (
            <Option key={district._id} value={district.code}>
              {district.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Xã" name="ward" rules={[{ required: true, message: "Vui lòng chọn xã!" }]}>
        <Select onChange={handleWardChange} placeholder="Chọn xã" style={{ width: "100%" }} value={selectedWard} disabled={!selectedDistrict}>
          {wards.map((ward) => (
            <Option key={ward._id} value={ward.code}>
              {ward.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Hiển thị tên tỉnh, huyện, xã đã chọn */}
      <div>
        <p>Tỉnh đã chọn: {provinceName}</p>
        <p>Huyện đã chọn: {districtName}</p>
        <p>Xã đã chọn: {wardName}</p>
      </div>
    </>
  );
};

export default AddressForm;
