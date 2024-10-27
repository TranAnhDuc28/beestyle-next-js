"use client";
import "../../css/globals.css";
import React, { ReactNode, useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import {App, FloatButton} from "antd";

export default function RootAdminLayout({ children, }: Readonly<{ children: ReactNode; }>) {
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
                            <span>USER</span>
                        )
                }
                <FloatButton.BackTop visibilityHeight={100}/>
            </body>
        </html >
    );
}
