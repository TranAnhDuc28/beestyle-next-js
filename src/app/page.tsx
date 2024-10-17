import {Metadata} from "next";
import Dashboard from "@/components/Dashboard/Dashboard";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
};

export default function Home() {
    return (
        <Suspense fallback={<Loader/>}>
            <Dashboard/>
        </Suspense>
    );
}
