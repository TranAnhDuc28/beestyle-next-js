import { Metadata } from "next";
import Dashboard from "@/components/Dashboard/Dashboard";
import { Suspense } from "react";
import AdminLoader from "@/components/Loader/AdminLoader";
import { getAdminAccountInfo } from "@/utils/AppUtil";
import Unauthorized from "@/app/unauthorized/page";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "dashboard",
};

export default function HomeAdmin() {
    return (
        <>
            {getAdminAccountInfo() && getAdminAccountInfo()?.role === 'ADMIN' ? (
                <Suspense fallback={<AdminLoader />}>
                    <Dashboard />
                </Suspense>
            ) : (<Unauthorized />)}
        </>
    );
}
