"use client"
import React from "react";
import {Button, Card, Col, Flex, notification, Row, Space, Statistic, Typography} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

const {Title} = Typography;

const Dashboard: React.FC = () => {
    return (
        <Row gutter={16}>
            <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                        title="Idle"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
            <Col span={6}>
                <Card bordered={false}>
                    <Statistic
                        title="Idle"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                    />
                </Card>
            </Col>
        </Row>
    );
}

export default Dashboard;