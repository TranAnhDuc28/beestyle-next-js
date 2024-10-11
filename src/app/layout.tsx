"use client";
import "./globals.css";
import React, {ReactNode, Suspense, useEffect, useState} from "react";
import AppLayout from "@/components/Layout/AppLayout";
import Loader from "@/components/Loader/Loader";
import {AntdRegistry} from "@ant-design/nextjs-registry";


export default function RootLayout({children,}: Readonly<{ children: ReactNode; }>) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);

        return () => clearTimeout(timer);
    }, []);

    return (

        <html lang="en">
        <body>
        {loading ? (
            <Loader/>
        ) : (
            <AntdRegistry>
                <AppLayout>
                    {children}
                </AppLayout>
            </AntdRegistry>
        )}

        </body>
        </html>

    );
}
