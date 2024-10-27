import {Metadata} from "next";
import Dashboard from "@/components/Dashboard/Dashboard";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "dashboard",
};

export default function HomeAdmin() {
    return (
        <Suspense fallback={<Loader/>}>
            <Dashboard/>
        </Suspense>
    );
}
