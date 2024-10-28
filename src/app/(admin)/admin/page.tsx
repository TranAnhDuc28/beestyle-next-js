import {Metadata} from "next";
import Dashboard from "@/components/Dashboard/Dashboard";
import { Suspense } from "react";
import Loader from "@/components/Loader/UserLoader";

export const metadata: Metadata = {
    title: "Home",
    description: "home",
};

export default function HomeAdmin() {
    return (
        <Suspense fallback={<Loader/>}>
            <Dashboard/>
        </Suspense>
    )
}
