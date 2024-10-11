"use client"
import React from "react";
import {Button, Flex, Space, Spin, Typography} from "antd";
import {showNotification} from "@/utils/notificationUtils";

const {Title} = Typography;

const Dashboard: React.FC = () => {
    const messageSuccess = () => {
        showNotification.success('Thông báo', 'SUCCESS.')
    }
    const messageWarning = () => {
        showNotification.warning('Thông báo', 'WARNING.')
    }
    const messageError = () => {
        showNotification.error('Thông báo', 'ERROR.')
    }
    const messageInfo = () => {
        showNotification.info('Thông báo', 'INFO.')
    }

    return (
        <Flex vertical align="center" justify="center" style={{height: '100vh'}}>
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