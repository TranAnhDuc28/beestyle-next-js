"use client";
import "./globals.css";
import {ReactNode, useEffect, useState} from "react";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import Loader from "@/components/Loader/Loader";
import AppLayout from "@/components/Layout/AppLayout";


export default function RootLayout({children,}: Readonly<{ children: ReactNode; }>) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <html lang="en">
        <body>
        {
            loading ? <Loader/> :
            <AppLayout>
                <AntdRegistry>{children}</AntdRegistry>
            </AppLayout>
        }
        </body>
        </html>
    );
}
