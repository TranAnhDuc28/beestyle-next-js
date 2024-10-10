"use client"

import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import SiderMenu from './SiderMenu';
import HeaderBar from './HeaderBar';

const { Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();

    const toggleCollapsed = () => setCollapsed(!collapsed);

    return (
        <Layout>
            <SiderMenu collapsed={collapsed} />
            <Layout>
                <HeaderBar collapsed={collapsed} onToggle={toggleCollapsed} />
                    <Content
                        style={{
                            margin: '5px',
                            padding: 10,
                            minHeight: 700,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
