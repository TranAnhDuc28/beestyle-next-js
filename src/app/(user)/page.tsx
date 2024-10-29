import {Metadata} from "next";
import {Suspense} from "react";
import UserLoader from "@/components/Loader/UserLoader";
import UserLayout from "@/components/Layout/UserLayout";

export const metadata: Metadata = {
    title: "Trang chủ",
    description: "home",
};

export default function HomeUser() {
    return (
        <Suspense fallback={<UserLoader/>}>
            <UserLayout/>
        </Suspense>
    );
}
