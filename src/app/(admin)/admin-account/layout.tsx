"use client";
import "../../../css/admin.css";
import React, {ReactNode} from "react";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {App} from "antd";


export default function AdminAccountLayout({children,}: Readonly<{ children: ReactNode; }>) {
    return (
        <>
            <AntdRegistry>
                <App>
                    <main>{children}</main>
                </App>
            </AntdRegistry>
        </>
    );
}
