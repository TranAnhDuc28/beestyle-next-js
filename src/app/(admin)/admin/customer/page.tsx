import { Suspense } from "react";
import TableCustomer from "@/components/Admin/Customer/TableCustomer";
import AdminLoader from "@/components/Loader/AdminLoader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khách hàng",
  description: "Customer - Customer service",
};

const CustomerPage = () => {
  return (
      <Suspense fallback={<AdminLoader />}>
        <TableCustomer />
      </Suspense>
  );
};
export default CustomerPage;
