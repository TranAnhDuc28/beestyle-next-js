"use client";
import ColorButton from "@/components/Button/ColorButton";
import { IAddress } from "@/types/IAddress";
import { EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tag, Tooltip, Typography } from "antd";
import { ColumnType } from "antd/es/table";
import { Table } from "antd/lib";
import React, { useEffect, useState } from "react";
import {
  getAddressByCustomerId,
  setIsDefault,
  URL_API_ADDRESS,
} from "@/services/AddressService";
import useSWR from "swr";
import { useParams } from "next/navigation";
import useAppNotifications from "@/hooks/useAppNotifications";
import CreateAddressModal from "./CreateAddressModal";
import UpdateAddress from "./UpdateAddress";

const { Title } = Typography;

const AddressComponent = () => {
  const [expandedKey, setExpandedKey] = useState<number | null>(null);


  const handleUpdate = (values: any) => {
    console.log("Updated values:", values);
    setExpandedKey(null); // Đóng form sau khi cập nhật
  };
 
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const { id } = useParams();
  const { showNotification } = useAppNotifications();
  const { data, error, isLoading, mutate } = useSWR(
    `${URL_API_ADDRESS.get}?id=${id}`,
    getAddressByCustomerId,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );


  // Đặt hàng nào đang mở rộng và đóng form khi thay đổi
  const handleExpand = (expanded: boolean, record: IAddress) => {
    setExpandedKey(expanded ? record.id : null); // Mở rộng hàng đã chọn
  };
  const textTitle = "Bạn có muốn đặt địa chỉ làm mặc định hay không?";

  const handleSetDefault = async (record: IAddress) => {
    try {
      if (record) {
        console.log(record.customer);

        const data = {
          ...record,
          default: true,
          customer: {
            id: record.customer,
          },
          id: record.id,
        };
        console.log("dataupdate", data.customer);

        const result = await setIsDefault(data);

        mutate();
        console.log(result);

        if (result.data) {
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
  const columns: ColumnType<IAddress>[] = [
    {
      title: "",
      render: (text: any, record: IAddress, index: number) => (
        <div className="flex gap-3">
          <Tooltip placement="top" title="Cập nhật">
            <EditTwoTone
              twoToneColor={"#f57800"}
              style={{
                cursor: "pointer",
                padding: "5px",
                border: "1px solid #f57800",
                borderRadius: "5px",
              }}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "addressName",
      key: "addressName",
      render: (address, record) => (
        <div>
          <span>{address}</span>
          {record.default && (
            <Tag color="green" style={{ marginLeft: 8 }}>
              Default
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: IAddress, index: number) => (
        <Popconfirm
          placement="left"
          title={textTitle}
          onConfirm={() => handleSetDefault(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button disabled={record.default}>Đặt làm mặc định</Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    if (error) {
      showNotification("error", {
        message: error?.message,
        description:
          error?.response?.data?.message || "Error fetching materials",
      });
    }
  }, [error]);

  let result: any;
  if (!isLoading && data) {
    result = data?.data;
    console.log(result);
  }
  // Lấy tất cả các mảng addresses từ items và gộp thành một mảng duy nhất
  const allAddresses = result?.items
    .map((item: any) => item.customer?.addresses || []) // Lấy addresses từ từng customer hoặc mảng rỗng nếu không có
    .flat(); // Gộp tất cả các mảng con thành một mảng duy nhất

  console.log(allAddresses);

  return (
    <div>
      <Space className="flex justify-between">
        <Title level={3}>Địa chỉ</Title>
        <ColorButton
          bgColor="#00b96b"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Thêm địa chỉ
        </ColorButton>
      </Space>
      <Table
        rowKey="id"
        expandable={{
          expandedRowRender: (record) =>
            expandedKey === record.id ? (
              <UpdateAddress
                initialValues={record}
                onSubmit={handleUpdate}
                key={record.id}
                mutate={mutate}
              />
            ) : null,
          onExpand: handleExpand, // Xử lý đóng/mở form
          rowExpandable: () => true,
        }}
        dataSource={allAddresses}
        columns={columns}
        pagination={false}
      />
      <CreateAddressModal
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        mutate={mutate}
      />
    </div>
  );
};

export default AddressComponent;