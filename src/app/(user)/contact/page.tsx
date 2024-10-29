import {Metadata} from "next";
import { Suspense } from "react";
import UserLoader from "@/components/Loader/UserLoader";

export const metadata: Metadata = {
    title: "Liên hệ",
    description: "contact",
};

export default function Contact() {
    return (
        <Suspense fallback={<UserLoader/>}>
            CONTACT
        </Suspense>
    );
}
