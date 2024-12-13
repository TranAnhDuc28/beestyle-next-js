import { Form, Select, Spin } from "antd";
import React, { useEffect } from "react";
import useAddress from "./hook/useAddress";
import TextArea from "antd/es/input/TextArea";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";

interface IProps {
  selected: {
    province: string;
    district: string;
    ward: string;
  };
  setSelected: React.Dispatch<
    React.SetStateAction<{
      province: string;
      district: string;
      ward: string;
    }>
  >;
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

  const { handleGetProvinces, handleGetDistricts, handleGetWards } =
    useAddress();
  const provincesData = handleGetProvinces();
  const districtsData = handleGetDistricts(selected.province);
  const wardsData = handleGetWards(selected.district);

  console.log(provincesData.dataOptionProvinces);

  // useEffect(() => {
  //   if (!selected.province) {
  //     resetAddressData();
  //     setSelected((prev) => ({ ...prev, district: "", ward: "" })); // Xóa các giá trị cũ khi không có tỉnh được chọn
  //   }
  // }, [selected.province]);

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
          placeholder="Tỉnh / Thành Phố"
          options={provincesData.dataOptionProvinces}
          loading={provincesData.isLoading}
          onChange={() => {
            const province = provincesData.dataOptionProvinces.find(
              (prov) => prov.value === selected.province
            );
            console.log(province);
            console.log(selected.province);
            handleProvinceChange(selected.province, province?.label);
          }}
        />
      </Form.Item>

      <Form.Item
        label="Huyện"
        name="district"
        rules={[{ required: true, message: "Vui lòng chọn huyện!" }]}
      >
        <SelectSearchOptionLabel
          value={selected.province}
          placeholder="Huyện / Quận"
          style={{ width: "100%" }}
          data={districtsData?.dataOptionDistricts}
          isLoading={districtsData?.isLoading}
          // onChange={() => {
          //   const province = provincesData.dataOptionProvinces.find(
          //     (prov) => prov.value === selected.province
          //   );
          //   console.log(province);
          //   console.log(selected.province);
          //   handleProvinceChange(selected.province, province?.label);
          // }}
        />
      </Form.Item>

      <Form.Item
        label="Xã"
        name="ward"
        rules={[{ required: true, message: "Vui lòng chọn xã!" }]}
      >
        <Select
        // onChange={(value) => {
        //   const ward = wards.find((war) => war.code === value);
        //   if (ward) {
        //     handleWardChange(value, ward.name);
        //     setSelected((prev) => ({ ...prev, ward: value }));
        //   }
        // }}
        // placeholder="Chọn xã"
        // style={{ width: "100%" }}
        // value={selected.ward || undefined} // Đảm bảo hiển thị đúng giá trị hiện tại
        // loading={loading.wards}
        >
          {/* {wards && wards.length > 0 ? (
              wards.map((ward) => (
                <Select.Option key={ward.code} value={ward.code}>
                  {ward.name}
                </Select.Option>
              ))
            ) : (
              <Select.Option disabled>Chọn xã</Select.Option>
            )} */}
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
