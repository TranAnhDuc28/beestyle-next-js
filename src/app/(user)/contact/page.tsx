import {Metadata} from "next";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export const metadata: Metadata = {
    title: "Liên hệ",
    description: "contact",
};

export default function Contact() {
    return (
        <Suspense fallback={<Loader/>}>
            CONTACT
        </Suspense>
    );
}
