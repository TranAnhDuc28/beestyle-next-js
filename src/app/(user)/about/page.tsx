import {Metadata} from "next";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export const metadata: Metadata = {
    title: "Thông tin",
    description: "about",
};

export default function Home() {
    return (
        <Suspense fallback={<Loader/>}>
            ABOUT
        </Suspense>
    );
}
