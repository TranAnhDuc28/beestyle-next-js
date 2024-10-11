import {Metadata} from "next";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
    title: "Home",
    description: "Generated by create next app",
};

export default function Home() {
    return (
        <Dashboard/>
    );
}