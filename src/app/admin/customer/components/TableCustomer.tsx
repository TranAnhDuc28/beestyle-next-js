"use client";

import { Table } from "antd";
import { ColumnType } from "antd/es/table";

interface IProps {
  customers: ICustomer[] | [];
}

const TableCustomer = (props: IProps) => {
  const { customers } = props;
  console.log(customers);

  const columns:ColumnType<ICustomer>[]= [
    {
        title:'id',
        dataIndex:'id'
    },
    {
        title:'fullName',
        dataIndex:'fullName'
    },
    {
        title:'dateOfBirth',
        dataIndex:'dateOfBirth'
    },
    {
        title:'gender',
        dataIndex:'gender'
    },
  ]

  return (
    <div>
      <Table dataSource={customers} columns={columns} />
    </div>
  );
};

export default TableCustomer;
