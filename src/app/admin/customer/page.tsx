
import { getCustomers } from "@/apis/customer/customer";
import TableCustomer from "./components/TableCustomer";

const CustomerPage = async () => {
  const customer = await getCustomers();
if(!customer) return <div>Không thể tải dữ liệu, vui lòng kiểm tra và thử lại sau</div>
  console.log(customer);
  
  return (
    <div>
      <div className="text-center text-3xl font-bold mb-8">Customer</div>
      <TableCustomer customers={customer} />
    </div>
  );
};

export default CustomerPage;
