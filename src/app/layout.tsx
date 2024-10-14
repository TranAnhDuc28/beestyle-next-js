"use client";
import "./globals.css";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Loader from "@/components/Loader/Loader";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({ children, }: Readonly<{ children: ReactNode; }>) {
    const [loading, setLoading] = useState<boolean>(true);
    console.log(loading);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <html lang="en">
            <body>
                {
                    loading ?
                        (
                            <Loader />
                        )
                        :
                        (
                            <AntdRegistry>
                                <DefaultLayout>{children}</DefaultLayout>
                            </AntdRegistry>
                        )
                }

                {/* {
                    loading ?
                        (<Spin spinning={loading} size="large" fullscreen />) :
                        (<AntdRegistry>
                            <DefaultLayout>{children}</DefaultLayout>
                        </AntdRegistry>)
                } */}

            </body>
        </html >
    );
}
