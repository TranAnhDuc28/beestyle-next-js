import type {Metadata} from "next";
import AppLayout from "@/components/AppLayout";
import "./globals.css";
import {ReactNode} from "react";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({children,}: Readonly<{ children: ReactNode; }>) {

    return (
        <html lang="en" >
        <body>
        <AppLayout>
            {children}
        </AppLayout>
        </body>
        </html>
    );
}
