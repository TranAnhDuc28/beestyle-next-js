"use client";
import ColorButton from "@/components/Button/ColorButton";
import { IAddress } from "@/types/IAddress";
import { EditTwoTone, PlusOutlined } from "@ant-design/icons";
import { Space, Tag, Tooltip, Typography } from "antd";
import { ColumnType } from "antd/es/table";
import { Table } from "antd/lib";
import React, { useEffect, useState } from "react";
import {
  getAddressByCustomerId,
  URL_API_ADDRESS,
} from "@/services/AddressService";
import useSWR from "swr";
import { useParams } from "next/navigation";
import useAppNotifications from "@/hooks/useAppNotifications";
import CreateAddressModal from "./CreateAddressModal";

const { Title } = Typography;

const AddressComponent = () => {
  //   const { addresses } = props;
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
      dataIndex: "default",
      key: "default",
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
    .map((item:any) => item.customer?.addresses || []) // Lấy addresses từ từng customer hoặc mảng rỗng nếu không có
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
        dataSource={allAddresses ? allAddresses : []}
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
