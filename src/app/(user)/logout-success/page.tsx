import { Metadata } from "next";
import { Suspense } from "react";
import UserLoader from "@/components/Loader/UserLoader";
import LogoutSuccess from "@/components/User/Account/LogoutSuccess";

export const metadata: Metadata = {
    title: "Tài khoản",
    description: "account"
};

export default function ContactPage() {
    return (
        <Suspense fallback={<UserLoader />}>
            <LogoutSuccess />
        </Suspense>
    );
}
