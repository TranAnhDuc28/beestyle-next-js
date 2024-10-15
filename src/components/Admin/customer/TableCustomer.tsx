"use client";

import { getCustomers, updateCustomer } from "@/services/CustomerService";
import { Button, Table } from "antd";
import { ColumnType } from "antd/es/table";
import useSWR, { mutate } from "swr";
import DetailCustomer from "./ModalCustomer";
import { useState } from "react";
import ModalCustomer from "./ModalCustomer";
import AddCustomer from "./AddCustomer";

const TableCustomer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCreateCustomer,setIsModalCreateCustomer] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(
    null
  );
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
    setIsModalCreateCustomer(false)
  };

  const handleCreate = () => {
    setIsModalCreateCustomer(true)
  }


  

  const { data, error, isLoading } = useSWR("api/customer", getCustomers, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading..</div>;
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
        <Button className="max-w-30" onClick={() => handelDetail(record)}>Xem chi tiết</Button>
        <Button className="max-w-30" onClick={() => handelUpdate(record)}>Cập nhật</Button>
       </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end py-5 mx-5">
        <Button onClick={()=>handleCreate()}>Thêm mới</Button>
      </div>
      <Table dataSource={data} columns={columns} loading={isLoading} />
      <ModalCustomer
        visible={isModalVisible}
        onClose={handleClose}
        customer={selectedCustomer}
        modalType={modalType}
        
      />
      <AddCustomer visible={isModalCreateCustomer} onClose={handleClose}/>
    </div>
  );
};

export default TableCustomer;
