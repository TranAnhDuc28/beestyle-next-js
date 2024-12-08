import {Suspense} from "react";
import AdminLoader from "@/components/Loader/AdminLoader";
import {Metadata} from "next";
import VariantComponent from "@/components/Admin/Product/Variant/VariantComponent";

export const metadata: Metadata = {
    title: "Sản phẩm",
    description: "UserProductComponent variant service",
};

function Variant({ params }: { params: { id: string }}) {
    const productId = params.id;
    return (
        <Suspense fallback={<AdminLoader/>}>
            <VariantComponent productId={productId}/>
        </Suspense>
    );
}

export default Variant;