"use client";

import "./styles/index.css";

import React, { ReactNode, useEffect, useState } from "react";
import Loader from "@/components/Loader/UserLoader";
import { App, Layout } from "antd";
import { Poppins } from 'next/font/google';
import UserLayout from "@/components/Layout/UserLayout";

const poppins = Poppins({
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

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
                            <App className="js">
                                <Layout className={`${poppins.className}`}>
                                    <UserLayout />
                                </Layout>
                            </App>
                        )
                }
            </body>
        </html >
    );
}
