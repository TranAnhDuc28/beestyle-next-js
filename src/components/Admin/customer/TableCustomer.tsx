"use client";

import { getCustomer, URL_API_CUSTOMER } from "@/services/CustomerService";
import { Button, Flex, notification, Table, Tooltip } from "antd";
import { ColumnType } from "antd/es/table";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import ModalCustomer from "./ModalCustomer";
import AddCustomer from "./AddCustomer";
import TablePagination from "@/components/Table/TablePagination";
import { Content } from "antd/es/layout/layout";
import MaterialFilter from "../Material/MaterialFilter";
import { EditTwoTone } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TableCustomer = () => {
  const [api, contextHolder] = notification.useNotification();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCreateCustomer, setIsModalCreateCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [modalType, setModalType] = useState<"detail" | "update">("detail");

  const handelDetail = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
    setModalType("detail");
  };

  const handelUpdate = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
    setModalType("update");
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedCustomer(null);
    setIsModalCreateCustomer(false);
  };

  const handleCreate = () => {
    setIsModalCreateCustomer(true);
  };

  const { data, error, isLoading, mutate } = useSWR(
    `${URL_API_CUSTOMER.get}${
      params.size !== 0 ? `?${params.toString()}` : ""
    }`,
    getCustomer,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading..</div>;

  console.log(data);

  const columns: ColumnType<ICustomer>[] = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "dateOfBirth",
      dataIndex: "dateOfBirth",
    },
    {
      title: "gender",
      dataIndex: "gender",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createAt",
    },
    {
      title: "Ngày sửa",
      dataIndex: "updatedAt",
      key: "updateAt",
    },
    {
      title: "Thao tác",
      render: (text: any, record: ICustomer, index: number) => (
        <div className="flex gap-3">
          <Tooltip placement="top" title="Xem chi tiết">
            <EditTwoTone
              twoToneColor={"#f57800"}
              style={{
                cursor: "pointer",
                padding: "5px",
                border: "1px solid #f57800",
                borderRadius: "5px",
              }}
              onClick={() => handelDetail(record)}
            />
          </Tooltip>
          <Tooltip placement="top" title="Cập nhật">
            <EditTwoTone
              twoToneColor={"#f57800"}
              style={{
                cursor: "pointer",
                padding: "5px",
                border: "1px solid #f57800",
                borderRadius: "5px",
              }}
              onClick={() => handelUpdate(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
 

  let result: any;
  if (!isLoading && data) {
    result = data?.data;
    console.log(result);
  }

  return (
    <div>
      <div className="flex justify-end py-5 mx-5">
        <Button onClick={() => handleCreate()}>Thêm mới</Button>
      </div>
      <Flex align={"flex-start"} justify={"flex-start"} gap={"middle"}>
        <MaterialFilter />
        <Content
          className="min-w-0 bg-white"
          style={{
            boxShadow: "0 1px 8px rgba(0, 0, 0, 0.15)",
            flex: 1,
            minWidth: 700,
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <TablePagination
            loading={isLoading}
            columns={columns}
            data={result?.items ? result.items : []}
            current={result?.pageNo}
            pageSize={result?.pageSize}
            total={result?.totalElements}
          ></TablePagination>
        </Content>
      </Flex>
      <ModalCustomer
        visible={isModalVisible}
        onClose={handleClose}
        customer={selectedCustomer}
        modalType={modalType}
        onMutate={mutate}
      />
      <AddCustomer visible={isModalCreateCustomer} onClose={handleClose} />
    </div>
  );
};

export default TableCustomer;
