"use client";
import useAppNotifications from "@/hooks/useAppNotifications";
import {
  getDetailCustomer,
  URL_API_CUSTOMER,
} from "@/services/CustomerService";
import { Breadcrumb, Layout, Row, Col, Typography } from "antd";
import React, { useEffect } from "react";
import useSWR from "swr";
import InformationCustomer from "./InformationCustomer";
import AddressComponent from "../../Address/AddressComponent";
import { HomeOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface IProps {
  customerId: string;
}

const CustomerDetailComponent = (props: IProps) => {
  const { showNotification } = useAppNotifications();
  const { customerId } = props;

  const { data, error, isLoading, mutate } = useSWR(
    `${URL_API_CUSTOMER.get}/${customerId}`,
    getDetailCustomer,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (error) {
      showNotification("error", {
        message: error?.message,
        description: error?.response?.data?.message || "Error fetching data",
      });
    }
  }, [error]);

  let result: any;
  if (!isLoading && data) {
    result = data?.data;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { href: "/admin", title: <HomeOutlined /> },
          { title: "Khách hàng", href: "/admin/customer" },
          { title: "Chi tiết" },
        ]}
        style={{ marginBottom: "20px" }}
      />
      <Layout style={{ padding: "0 10px" }}>
        <Row
          gutter={[0, 0]} // Giảm khoảng cách giữa các cột
          justify="center"
          style={{
            // margin: "0 auto",
            marginLeft:"50px",
            maxWidth: "1500px", // Tăng chiều rộng tổng thể để tận dụng màn hình
          }}
        >
          {/* Cột thông tin khách hàng */}
          <Col xs={24} md={14}>
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius:"8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                minHeight: "550px", // Tăng chiều cao cho cân đối
              }}
            >
              <Title level={4} style={{ marginBottom: "20px" }}>
                Thông tin khách hàng
              </Title>
              <InformationCustomer mutate={mutate} customer={result} />
            </div>
          </Col>

          {/* Cột địa chỉ */}
          <Col xs={24} md={10}>
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderBottomRightRadius: "8px",
                borderTopRightRadius:"8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                minHeight: "550px",
              }}
            >
              <Title level={4} style={{ marginBottom: "20px" }}>
                Thông tin địa chỉ
              </Title>
              <AddressComponent />
            </div>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default CustomerDetailComponent;
