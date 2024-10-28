import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";

interface IProps {
  customer: ICustomer | undefined;
}
const InformationCustomer = (props: IProps) => {
  const { customer } = props;
  console.log(customer);

  return (
    <div className="px-6" >
      <div className="text-center ">
        <Avatar size={120} icon={<UserOutlined />} />
        <p className="text-2xl font-bold mt-4  ">{customer?.fullName}</p>
      </div>
      <div className="mt-5">
        <p> {customer?.gender}</p>
        <p> {customer?.email}</p>
        <p> {customer?.dateOfBirth}</p>
        <p> {customer?.status}</p>
      </div>
    </div>
  );
};

export default InformationCustomer;
