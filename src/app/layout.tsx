"use client";
import "../css/globals.css";
import React, {ReactNode, useEffect, useState} from "react";
import AdminLoader from "@/components/Loader/AdminLoader";
import {App, FloatButton} from "antd";
import {AntdRegistry} from "@ant-design/nextjs-registry";

export default function RootLayout({children,}: Readonly<{ children: ReactNode; }>) {
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
                (
                    <AdminLoader/>
                ) : (
                    <AntdRegistry>
                        <App>
                            <main>{children}</main>
                        </App>
                    </AntdRegistry>
                )
        }
        <FloatButton.BackTop visibilityHeight={100}/>
        </body>
        </html>
    );
}
