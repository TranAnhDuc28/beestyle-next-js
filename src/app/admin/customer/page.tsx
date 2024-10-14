import { Suspense } from "react";
import TableCustomer from "../../../components/Admin/customer/TableCustomer";
import Loader from "@/components/Loader/Loader";

const CustomerPage = () => {
  return (
    <div>
      <div className="text-center text-3xl font-bold mb-8">Customer</div>
      <Suspense fallback={<Loader />}>
        <TableCustomer />
      </Suspense>
    </div>
  );
};

export default CustomerPage;
