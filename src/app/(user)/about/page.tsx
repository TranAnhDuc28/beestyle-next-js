import {Metadata} from "next";
import { Suspense } from "react";
import UserLoader from "@/components/Loader/UserLoader";

export const metadata: Metadata = {
    title: "Thông tin",
    description: "about",
};

export default function Home() {
    return (
        <Suspense fallback={<UserLoader/>}>
            ABOUT
        </Suspense>
    );
}
