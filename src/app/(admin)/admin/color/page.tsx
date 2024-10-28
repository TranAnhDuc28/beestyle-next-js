import Loader from "@/components/Loader/UserLoader";
import ColorComponent from "@/components/Admin/Color/ColorComponent";
import { Suspense } from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Màu Sắc",
    description: "Product - Color service",
};

function Color() {
    return (
        <Suspense fallback={<Loader />}>
            <ColorComponent/>
        </Suspense>
    );
}
export default Color;