"use client"

import React, {useState} from 'react';
import {Layout, theme} from 'antd';
import AppSideMenu from '../SideBar/AppSideMenu';
import AppHeader from '../Header/AppHeader';

const {Content} = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();

    const toggleCollapsed = () => setCollapsed(!collapsed);

    return (
        <Layout>
            <AppSideMenu collapsed={collapsed}/>
            <Layout>
                <AppHeader collapsed={collapsed} onToggle={toggleCollapsed}/>
                <Content
                    style={{
                        margin: '10px',
                        padding: 10,
                        minHeight: 500,
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