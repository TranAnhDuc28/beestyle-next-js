import {CalendarOutlined, CheckOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";
import React from "react";

interface IProps {
    customer: ICustomer;
}

const InformationCustomer = (props: IProps) => {
    const {customer} = props;
    console.log(customer);

    return (
        <div className="px-6">
            <div className="text-center ">
                <Avatar size={120} icon={<UserOutlined/>}/>
                <p className="text-2xl font-bold mt-4  ">{customer?.fullName}</p>
            </div>
            <div className="mt-5 text-sm font-semibold">
                <p><UserOutlined/> {customer?.gender === "MALE" ? "Nam" : "Nữ"}</p>
                <p><PhoneOutlined/> {customer?.phoneNumber}</p>
                <p><CalendarOutlined/> {customer?.dateOfBirth?.toString()}</p>
                <p><CheckOutlined/> {customer?.status === "ACTIVE" ? "Hoạt động" : "Ngừng hoạt động"}</p>
            </div>
        </div>
    );
};

export default InformationCustomer;
