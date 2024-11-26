'use client';
import {Layout} from 'antd';
import UserHeader from '../Header/UserHeader';
import UserFooter from '../Footer/UserFooter';
import React from "react";
import {Poppins} from "next/font/google";

const poppins = Poppins(
    {
        subsets: ['latin'],
        variable: '--font-poppins',
        weight: ['400', '500', '600', '700'],
        style: ['normal', 'italic']
    }
);

const {Content} = Layout;

const UserLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {

    return (
        <Layout className={poppins.variable}>
            <UserHeader/>
            <Content>
                {children}
            </Content>
            <UserFooter/>
        </Layout>
    );
};

export default UserLayout;