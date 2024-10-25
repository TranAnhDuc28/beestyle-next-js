import { Suspense } from "react";
import TableCustomer from "@/components/Admin/Customer/TableCustomer";
import Loader from "@/components/Loader/Loader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khách hàng",
  description: "Customer - Customer service",
};

const CustomerPage = () => {
  return (
      <Suspense fallback={<Loader />}>
        <TableCustomer />
      </Suspense>
  );
};
export default CustomerPage;
