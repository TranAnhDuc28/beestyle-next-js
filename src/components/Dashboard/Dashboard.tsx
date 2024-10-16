"use client"
import React from "react";
import {Button, Flex, notification, Space, Typography} from "antd";

const {Title} = Typography;

const Dashboard: React.FC = () => {
    const messageSuccess = () => {
  
    }
    const messageWarning = () => {

    }
    const messageError = () => {
       
    }
    const messageInfo = () => {

    }

    return (
        <Flex vertical align="center" justify="center">
            <Space direction="vertical" size="large" align="center">
                <Title>Dashboard</Title>
                <Space>
                    <Button type="primary" onClick={messageSuccess}>Success</Button>
                    <Button type="primary" onClick={messageWarning}>Warning</Button>
                    <Button type="primary" onClick={messageError}>Error</Button>
                    <Button type="primary" onClick={messageInfo}>Info</Button>
                </Space>
            </Space>
        </Flex>
    );
}

export default Dashboard;