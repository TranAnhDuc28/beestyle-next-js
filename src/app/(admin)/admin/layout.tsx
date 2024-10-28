"use client";
import "./globals.css";
import React, { ReactNode, useEffect, useState } from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import AdminLoader from "@/components/Loader/AdminLoader";

export default function RootLayout({ children, }: Readonly<{ children: ReactNode; }>) {
    const [loading, setLoading] = useState<boolean>(true);

    const handleLoad = () => setLoading(false);

    useEffect(() => {
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, [loading]);

    return (
        <html lang="en">
            <body>
                {
                    loading ?
                        (<AdminLoader />) :
                        (
                            <App>
                                <AntdRegistry>
                                    <AdminLayout>{children}</AdminLayout>
                                </AntdRegistry>
                            </App>
                        )
                }
            </body>
        </html >
    )
}
