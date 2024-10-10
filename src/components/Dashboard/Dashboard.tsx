"use client"
import React from "react";
import {Flex, Spin, Typography} from "antd";

const { Title } = Typography;

const Dashboard: React.FC = () => {

    return (
        <>
            <Flex align={"center"} justify={"center"} style={{ height: '100vh' }}>
                <Title >Dashboard</Title>
            </Flex>
        </>
    );
}

export default Dashboard;