import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import { Metadata } from "next";
import PromotionComponent from "@/components/Admin/Promotion/PromotionComponent";

export const metadata: Metadata = {
    title: "Chương trình khuyến mại",
    description: "Promotion"
}

const VoucherPage = () => {
    return (
        <Suspense fallback={<Loader />}>
            <PromotionComponent/>
        </Suspense>
    );
}

export default VoucherPage;
