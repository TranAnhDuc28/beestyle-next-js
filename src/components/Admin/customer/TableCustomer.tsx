"use client";

import { getCustomers } from "@/services/CustomerService";
import { Table } from "antd";
import { ColumnType } from "antd/es/table";
import useSWR from "swr";

const TableCustomer = () => {
  const { data, error, isLoading } = useSWR("api/customer", getCustomers, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });
  
  if(error) return <div>{error.message}</div>
  if(!data) return <div>Loading..</div>
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
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} loading={isLoading} />
    </div>
  );
};

export default TableCustomer;
