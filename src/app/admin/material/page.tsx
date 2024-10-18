import MaterialComponent from "@/components/Admin/Material/MaterialComponent";
import { OptionsParams } from "@/utils/HttpInstance";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Chất liệu",
    description: "Product - Material service",
};

const MaterialPage = () => {
    return (
        <Suspense fallback={<Loader />}>
            <MaterialComponent/>
        </Suspense>
    );
}
export default MaterialPage;