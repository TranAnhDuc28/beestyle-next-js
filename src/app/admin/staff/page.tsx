import { Suspense } from "react";

import TableCustomer from "@/components/Admin/Customer/TableCustomer";
import Loader from "@/components/Loader/Loader";
import { Metadata } from "next";
import TableStaff from "@/components/Admin/Staff/TableStaff";

export const metadata: Metadata = {
  title: "Nhân viên",
  description: "Staff - Staff service",
};
const StaffPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <TableStaff />
      </Suspense>
    </div>
  );
};

export default StaffPage;
