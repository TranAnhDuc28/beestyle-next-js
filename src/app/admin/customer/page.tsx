import { Suspense } from "react";
<<<<<<< HEAD
import TableCustomer from "../../../components/Admin/Customer/TableCustomer";
=======
import TableCustomer from "@/components/Admin/Customer/TableCustomer";
>>>>>>> 083b675d1508f0c8d12f0f21de0e5a50efe25337
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
