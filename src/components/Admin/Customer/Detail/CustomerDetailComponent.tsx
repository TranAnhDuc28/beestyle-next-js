'use client'
import useAppNotifications from '@/hooks/useAppNotifications';
import { getDetailCustomer, URL_API_CUSTOMER } from '@/services/CustomerService';
import { Breadcrumb, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect } from 'react'
import useSWR from 'swr';
import InformationCustomer from './InformationCustomer';
import Link from 'next/link';
import AddressComponent from '../../Address/AddressComponent';
import { HomeOutlined, TeamOutlined } from '@ant-design/icons';


const {Content} = Layout;
interface IProps {
    customerId: string;
}
const CustomerDetailComponent = (props:IProps) => {
    const {showNotification} = useAppNotifications();
    const { customerId } = props;
  
    const {data, error, isLoading, mutate} =
          useSWR(
              `${URL_API_CUSTOMER.get}/${customerId}`,
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
        console.log(result?.addresses);
        
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
          <Breadcrumb
                items={[
                    {href: '/admin', title: <HomeOutlined/>,},
                    {title: 'Khách hàng',href:'/admin/customer'},
                    {title: 'Chi tiết'},
                ]}
            />
            <AddressComponent />
          </Content>
        </Layout>
      </Layout>
    );
  };

export default CustomerDetailComponent