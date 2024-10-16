"use client";
import "./globals.css";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Loader from "@/components/Loader/Loader";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const Context = React.createContext({ name: 'Default' });

export default function RootLayout({ children, }: Readonly<{ children: ReactNode; }>) {
    const contextValue = useMemo(() => ({ name: 'Default' }), []);
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
                            <Context.Provider value={contextValue}>
                                <AntdRegistry>
                                    <DefaultLayout>{children}</DefaultLayout>
                                </AntdRegistry>
                            </Context.Provider>
                        )
                }
            </body>
        </html >
    );
}
