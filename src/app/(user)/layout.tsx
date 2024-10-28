"use client";
import React, {ReactNode} from "react";
import {App, FloatButton} from "antd";
import {AntdRegistry} from "@ant-design/nextjs-registry";

export default function RootUserLayout({children,}: Readonly<{ children: ReactNode; }>) {
    return (
        <>
            <AntdRegistry>
                <App>
                    <main>{children}</main>
                </App>
            </AntdRegistry>
            <FloatButton.BackTop visibilityHeight={100}/>
        </>
    );
}
