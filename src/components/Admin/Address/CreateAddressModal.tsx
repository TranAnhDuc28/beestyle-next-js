import { Form, Modal, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import useAddress from "./hook/useAddress";
import { IAddress } from "@/types/IAddress";
import { createAddress } from "@/services/AddressService";
import useAppNotifications from "@/hooks/useAppNotifications";
import { useParams } from "next/navigation";
import TextArea from "antd/es/input/TextArea";

interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (value: boolean) => void;
  mutate: any;
}
const CreateAddressModal = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen, mutate } = props;
  const {
    provinces,
    districts,
    wards,
    fetchDistricts,
    fetchWards,
    loading,
    resetAddressData
  } = useAddress();

  const [selected, setSelected] = useState({
    province: "",
    district: "",
    ward: "",
  });
  const [selectedName, setSelectedName] = useState({
    province: "",
    district: "",
    ward: "",
  });
  const [detailAddress, setDetailAddress] = useState("");

  const { id } = useParams();
  console.log(id);

  const { showNotification } = useAppNotifications();
  const [form] = Form.useForm();




  useEffect(() => {
    if (!selected.province) {
        resetAddressData(); // Reset dữ liệu huyện và xã
    } else {
        setSelected((prev) => ({ ...prev, district: "", ward: "" }));
        setSelectedName((prev) => ({ ...prev, district: "", ward: "" }));
        form.setFieldsValue({ district: undefined, ward: undefined });
    }
}, [selected.province]);


  const handleCloseCreateModal = () => {
    form.resetFields(); // Xóa toàn bộ dữ liệu trong form
    setSelected({ province: "", district: "", ward: "" });
    setSelectedName({ province: "", district: "", ward: "" });
    setDetailAddress("");
    setIsCreateModalOpen(false);
};


  // Xử lý khi tỉnh được chọn
  const handleProvinceChange = (value: any, name: string) => {
    setSelected((prev) =>({...prev,province:value}))
    setSelectedName((prev) =>({...prev,province:name}))
    form.setFieldsValue({province:value, district: undefined, ward: undefined })
    // fetchDistricts(value)
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
    setDetailAddress(value);
  };
  const onFinish = async (value: IAddress) => {
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
      addressName:detailAddress,
      // addressName: 
      //   detailAddress == ""
      //     ? `${selectedName.ward} - ${selectedName.district} - ${selectedName.province}`
      //     : `${detailAddress} - ${selected.ward} - ${selectedName.district} - ${selectedName.province}`,
      cityCode: Number(selected.province), // Nếu cần chuyển đổi
      city: selectedName.province ?? "", // Lưu tên tỉnh vào đây
      districtCode: Number(selected.district), // Nếu cần chuyển đổi
      district: selectedName.district ?? "", // Lưu tên huyện vào đây
      communeCode: Number(selected.ward), // Cần lấy từ API nếu có
      commune: selectedName.ward ?? "", // Tên xã
      isDefault: false,
      customer: {
        id: id, // Thay đổi bằng ID thực tế
      },
    };
    console.log("Success:", address);
    try {
      const result = await createAddress(address);
      if (result.data) {
        handleCloseCreateModal();
        showNotification("success", { message: result.message });
      }
      mutate();
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
      title="Thêm địa chỉ"
      cancelText="Hủy"
      okText="Lưu"
      style={{ top: 20 }}
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
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
          label="Tỉnh"
          name="province"
          rules={[{ required: true, message: "Vui lòng chọn tỉnh!" }]}
        >
         
            <Select
              onChange={(value) => {
                const province = provinces.find((prov) => prov.code === value);
                if (province) {
                  handleProvinceChange(value, province.name);
                  setSelectedName({
                    province: province.name,
                    district: "",
                    ward: "",
                  }); // Đặt lại giá trị district và ward
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
                  setSelectedName((prev) => ({
                    ...prev,
                    district: district.name,
                    ward: "",
                  })); // Đặt lại ward
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
                  setSelectedName((prev) => ({ ...prev, ward: ward.name }));
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
            onChange={(e) => handleDetailAddressChange(e.target.value)}
            placeholder="Nhập địa chỉ chi tiết"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAddressModal;
