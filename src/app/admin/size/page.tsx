import React, {Suspense} from "react";
import Loader from "@/components/Loader/UserLoader";
import {Metadata} from "next";
import SizeComponent from "@/components/Admin/Size/SizeComponent";

export const metadata: Metadata = {
    title: "Kích thước",
    description: "Product - Size service",
};

function Size() {
    return (
        <Suspense fallback={<Loader />}>
            <SizeComponent/>
        </Suspense>
    );
}

export default Size;