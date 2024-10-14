"use client"

import React, {Suspense, useState} from 'react';
import {Layout} from 'antd';
import AppSideMenu from '../SideBar/AppSideMenu';
import AppHeader from '../Header/AppHeader';
import Loader from "@/components/Loader/Loader";

const {Content} = Layout;

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => setCollapsed(!collapsed);

    return (
        <Layout>
            <AppSideMenu collapsed={collapsed}/>
            <Layout>
                <AppHeader collapsed={collapsed} onToggle={toggleCollapsed}/>
                <Content className="pt-5 pr-2.5 pb-2.5 pl-5 overflow-auto">
                    <Suspense fallback={<Loader/>}>
                        {children}
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
