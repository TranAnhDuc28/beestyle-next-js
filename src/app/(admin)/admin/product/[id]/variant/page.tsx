import {Suspense} from "react";
import AdminLoader from "@/components/Loader/AdminLoader";
import {Metadata} from "next";
import VariantComponent from "@/components/Admin/Product/Variant/VariantComponent";
import {useParams} from "next/navigation";

export const metadata: Metadata = {
    title: "Sản phẩm",
    description: "ShopProductGridComponent variant service",
};

function Variant({ params }: { params: { id: string }}) {
    const {id} = useParams()
    return (
        <Suspense fallback={<AdminLoader/>}>
            <VariantComponent productId={productId}/>
        </Suspense>
    );
}

export default Variant;