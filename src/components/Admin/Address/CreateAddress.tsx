import { Form, Select, Spin } from "antd";
import React, { useEffect } from "react";
import useAddress from "./hook/useAddress";
import TextArea from "antd/es/input/TextArea";

interface IProps {
  selected: {
    province: string,
    district: string,
    ward: string,
  };
  setSelected: React.Dispatch<React.SetStateAction<{
    province: string;
    district: string;
    ward: string;
  }>>;
  handleProvinceChange: (value: string, name: string) => void;
  handleDistrictChange: (value: string, name: string) => void;
  handleWardChange: (value: string, name: string) => void;
  handleDetailAddress: (value: string) => void;
  form: any;
}

const CreateAddress = (props: IProps) => {
  const {
    selected,
    setSelected,
    handleDistrictChange,
    handleProvinceChange,
    handleWardChange,
    handleDetailAddress,
    form,
  } = props;

  const { provinces, districts, wards, fetchDistricts, fetchWards, resetAddressData, loading } = useAddress();

  useEffect(() => {
    if (!selected.province) {
      resetAddressData();
      setSelected((prev) => ({ ...prev, district: "", ward: "" })); // Xóa các giá trị cũ khi không có tỉnh được chọn
    }
  }, [selected.province]);

  return (
    <Form
      form={form}
      layout="horizontal"
      labelAlign="left"
      labelWrap
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 20 }}
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
                setSelected({ province: value, district: "", ward: "" }); // Đặt lại giá trị district và ward
                fetchDistricts(value);
              }
            }}
            placeholder="Chọn tỉnh"
            style={{ width: "100%" }}
            loading={loading.provinces}
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
                setSelected((prev) => ({ ...prev, district: value, ward: "" })); // Đặt lại ward
                fetchWards(value);
              }
            }}
            placeholder="Chọn huyện"
            style={{ width: "100%" }}
            value={selected.district || undefined} // Đảm bảo hiển thị đúng giá trị hiện tại
            loading={loading.districts}
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
                setSelected((prev) => ({ ...prev, ward: value }));
              }
            }}
            placeholder="Chọn xã"
            style={{ width: "100%" }}
            value={selected.ward || undefined} // Đảm bảo hiển thị đúng giá trị hiện tại
            loading={loading.wards}
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

      <Form.Item label="Chi tiết" name="detail">
        <TextArea
          onChange={(e) => handleDetailAddress(e.target.value)}
          placeholder="Nhập địa chỉ chi tiết"
        />
      </Form.Item>
    </Form>
  );
};

export default CreateAddress;
