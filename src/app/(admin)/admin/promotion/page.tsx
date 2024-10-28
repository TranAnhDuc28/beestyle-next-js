import PromotionComponent from "@/components/Admin/Promotion/PromotionComponent";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Phiếu giảm giá",
};

const PromotionPage = () => {
    return (
        <Suspense fallback={<Loader />}>
            <PromotionComponent/>
        </Suspense>
    );
}

export default PromotionPage;
