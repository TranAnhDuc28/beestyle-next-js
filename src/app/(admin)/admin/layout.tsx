"use client";
import "../../../css/admin.css";
import React, {ReactNode} from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {App, FloatButton} from "antd";

export default function RootAdminLayout({children,}: Readonly<{ children: ReactNode; }>) {
    return (
        <>
            <AntdRegistry>
                <App>
                    <AdminLayout>
                        <App>
                            <main>{children}</main>
                        </App>
                    </AdminLayout>
                </App>
            </AntdRegistry>
            <FloatButton.BackTop visibilityHeight={700}/>
        </>
    );
}
