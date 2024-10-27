import {Metadata} from "next";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export const metadata: Metadata = {
    title: "Trang chủ",
    description: "home",
};

export default function HomeUser() {
    return (
        <Suspense fallback={<Loader/>}>
            HOME
        </Suspense>
    );
}
