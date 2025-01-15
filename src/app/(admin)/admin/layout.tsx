"use client";
import "../../../css/admin.css";
import React, { ReactNode } from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, FloatButton } from "antd";
import AuthenticationProvider from "@/components/Context/AuthenticationProvider";
import { getAdminAccountInfo } from "@/utils/AppUtil";
import Unauthorized from "@/app/unauthorized/page";

export default function RootAdminLayout({ children, }: Readonly<{ children: ReactNode; }>) {
    return (
        <>
            {getAdminAccountInfo() ? (
                <>
                    <AntdRegistry>
                        <App>
                            <AuthenticationProvider>
                                <AdminLayout>
                                    <main>{children}</main>
                                </AdminLayout>
                            </AuthenticationProvider>
                        </App>
                    </AntdRegistry>
                    <FloatButton.BackTop visibilityHeight={700} />
                </>
            ) : (
                <>
                    <Unauthorized />
                </>
            )}
        </>
    );
}
