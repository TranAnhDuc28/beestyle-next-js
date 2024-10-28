import { Suspense } from "react";

import TableCustomer from "@/components/Admin/Customer/CustomerComponent";
import Loader from "@/components/Loader/Loader";
import { Metadata } from "next";
import StaffComponent from "@/components/Admin/Staff/StaffComponent";

export const metadata: Metadata = {
  title: "Nhân viên",
  description: "Staff - Staff service",
};

const StaffPage = () => {
  return (
      <Suspense fallback={<Loader />}>
        <StaffComponent />
      </Suspense>
  );
};
export default StaffPage;
