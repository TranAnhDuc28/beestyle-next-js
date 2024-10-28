"use client";
<<<<<<< HEAD:src/app/admin/layout.tsx
<<<<<<<< HEAD:src/app/(admin)/admin/layout.tsx
import "./globals.css";
import React, { ReactNode, useEffect, useState } from "react";
import AdminLayout from "@/components/Layout/AdminLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {App} from "antd";
import AdminLoader from "@/components/Loader/AdminLoader";
========
import "../css/globals.css";
import React, {ReactNode, useEffect, useState} from "react";
import Loader from "@/components/Loader/Loader";
import {App, FloatButton} from "antd";
import {AntdRegistry} from "@ant-design/nextjs-registry";
>>>>>>>> be4cc2f8c258eb45a9281f7553538b4c4b206038:src/app/layout.tsx

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
<<<<<<<< HEAD:src/app/(admin)/admin/layout.tsx
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
========
        <body>
        {
            loading ?
                (
                    <Loader/>
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
>>>>>>>> be4cc2f8c258eb45a9281f7553538b4c4b206038:src/app/layout.tsx
=======
import "../../../css/globals.css";
import "../../../css/table-customize.css";
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
                        <main>{children}</main>
                    </AdminLayout>
                </App>
            </AntdRegistry>
            <FloatButton.BackTop visibilityHeight={100}/>
        </>
>>>>>>> be4cc2f8c258eb45a9281f7553538b4c4b206038:src/app/(admin)/admin/layout.tsx
    );
}
