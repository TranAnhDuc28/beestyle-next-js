import { Suspense } from "react";

import TableCustomer from "@/components/Admin/Customer/CustomerComponent";
import Loader from "@/components/Loader/Loader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khách hàng",
  description: "Customer - Customer service",
};
const CustomerPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <TableCustomer />
      </Suspense>
    </div>
  );
};

export default CustomerPage;
