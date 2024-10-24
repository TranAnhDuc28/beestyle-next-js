"use client";
import "./globals.css";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import Loader from "@/components/Loader/Loader";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {App, FloatButton} from "antd";

export default function RootLayout({ children, }: Readonly<{ children: ReactNode; }>) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, [loading]);

    return (
        <html lang="en">
            <body>
                {
                    loading ?
                        (<Loader />) :
                        (
                            <App>
                                <AntdRegistry>
                                    <AdminLayout>{children}</AdminLayout>
                                </AntdRegistry>
                                <FloatButton.BackTop />
                            </App>
                        )
                }
                <FloatButton.BackTop visibilityHeight={100}/>
            </body>
        </html >
    );
}
