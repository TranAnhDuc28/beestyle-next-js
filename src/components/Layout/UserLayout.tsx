"use client"
import {Layout} from 'antd';
import UserHeader from '../Header/UserHeader';
import UserFooter from '../Footer/UserFooter';
import React from "react";

const {Content} = Layout;

const UserLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {

    return (
        <Layout>
            <UserHeader/>
            <Content>
                {children}
            </Content>
            <UserFooter/>
        </Layout>
    );
};

export default UserLayout;