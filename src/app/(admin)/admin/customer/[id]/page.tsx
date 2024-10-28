"use client";
import InformationCustomer from "@/components/Admin/Customer/Detail/InformationCustomer";
import useAppNotifications from "@/hooks/useAppNotifications";
import { getDetailCustomer, URL_API_CUSTOMER } from "@/services/CustomerService";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";



const DeatialCustomer = () => {
  const {showNotification} = useAppNotifications();
  const { id } = useParams()

  const {data, error, isLoading, mutate} =
        useSWR(
            `${URL_API_CUSTOMER.get}/${id}`,
            getDetailCustomer,
            {
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            }
        );

        useEffect(() => {
          if (error) {
              showNotification("error",{
                  message: error?.message, description: error?.response?.data?.message || "Error fetching brands",
              });
          }
      }, [error]);
  
      let result: any;
      if (!isLoading && data) {
          result = data?.data;
      }
      
  return (
    <Layout>
      <Sider
        theme="light"
        width={300}
        style={{
          position: "fixed",
          minHeight: "100vh",
          paddingTop:"20px"
        }}
      >
        <InformationCustomer customer={result} />
      </Sider>
      <Layout>
        <Content className="pt-5 pr-2.5 pb-2.5 pl-5 overflow-auto" style={{ marginLeft: 300 }}>
          Detail customer
        </Content>
      </Layout>
    </Layout>
  );
};

export default DeatialCustomer;
