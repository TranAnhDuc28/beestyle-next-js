import {Metadata} from "next";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard app",
};

export default function Home() {
    return (
        <Dashboard/>
    );
}
