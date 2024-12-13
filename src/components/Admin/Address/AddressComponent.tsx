"use client";
import ColorButton from "@/components/Button/ColorButton";
import { IAddress } from "@/types/IAddress";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Tag, Typography } from "antd";
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

  useEffect(() => {
    if (error) {
      showNotification("error", {
        message: error?.message,
        description: error?.response?.data?.message || "Error fetching addresses",
      });
    }
  }, [error]);

  const handleExpand = (expanded: boolean, record: IAddress) => {
    setExpandedKey(expanded ? record.id : null);
  };
  

  const handleUpdate = async () => {
    setExpandedKey(null); // Reset trạng thái
    await mutate(); // Làm mới dữ liệu
  };

  const handleSetDefault = async (record: IAddress) => {
    try {
      if (record) {
        const data = { ...record, isDefault: true, id: record.id };
        const result = await setIsDefault(data);
        await mutate();

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
      title: "Địa chỉ",
      dataIndex: "addressName",
      key: "addressName",
      render: (address, record) => (
        <div>
          <span>
            {address
              ? `${address}, ${record.commune || ""}, ${record.district || ""}, ${record.city || ""}`
              : `${record.commune || ""}, ${record.district || ""}, ${record.city || ""}`}
          </span>
          {record.isDefault && (
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
      render: (_, record: IAddress) => (
        <Popconfirm
          placement="left"
          title="Bạn có muốn đặt địa chỉ làm mặc định hay không?"
          onConfirm={() => handleSetDefault(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button disabled={record.isDefault}>Đặt làm mặc định</Button>
        </Popconfirm>
      ),
    },
  ];

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
                    hanldeClose={handleUpdate}
                    key={record.id}
                    mutate={mutate}
                  />
                ) : null,
          onExpand: handleExpand,
          rowExpandable: () => true,
        }}
        dataSource={data?.data?.items || []}
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
