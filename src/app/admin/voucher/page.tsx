import VoucherComponent from "@/components/Admin/Voucher/VoucherComponent";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Phiếu giảm giá",
};

const VoucherPage = () => {
    return (
        <Suspense fallback={<Loader />}>
            <VoucherComponent/>
        </Suspense>
    );
}

export default VoucherPage;
