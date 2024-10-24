import { Suspense } from "react";

import TableCustomer from "@/components/Admin/Customer/CustomerComponent";
import Loader from "@/components/Loader/Loader";
import { Metadata } from "next";
import TableStaff from "@/components/Admin/Staff/StaffComponent";
import StaffComponent from "@/components/Admin/Staff/StaffComponent";

export const metadata: Metadata = {
  title: "Nhân viên",
  description: "Staff - Staff service",
};
const StaffPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <StaffComponent />
      </Suspense>
    </div>
  );
};

export default StaffPage;
