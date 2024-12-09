'use client';
import {Layout, theme} from 'antd';
import UserHeader from '../Header/UserHeader';
import UserFooter from '../Footer/UserFooter';
import React from "react";
import {Poppins} from "next/font/google";

const {Content} = Layout;

const UserLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();

    return (
        <Layout>
            <UserHeader/>
            <Content style={{backgroundColor: colorBgContainer}}>
                {children}
            </Content>
            <UserFooter/>
        </Layout>
    );
};

export default UserLayout;