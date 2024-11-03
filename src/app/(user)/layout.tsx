"use client";
import "../../css/user.css";
import React, {ReactNode} from "react";
import {App, FloatButton} from "antd";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import UserLayout from "@/components/Layout/UserLayout";

export default function RootUserLayout({children,}: Readonly<{ children: ReactNode; }>) {
    return (
        <>
            <AntdRegistry>
                <App>
                    <UserLayout>
                        <main>{children}</main>
                    </UserLayout>
                </App>
            </AntdRegistry>
            <FloatButton.BackTop visibilityHeight={100}/>
        </>
    );
}
