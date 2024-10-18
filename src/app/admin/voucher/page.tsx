import VoucherComponent from "@/components/Admin/Voucher/VoucherComponent"; // Đường dẫn tới component Voucher
import { OptionsParams } from "@/utils/HttpInstance";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

const VoucherPage = (props: any) => {
    // Kiểm tra và chuyển đổi giá trị 'size' và 'page' từ searchParams
    const size: number = (props?.searchParams?.size && !isNaN(props.searchParams.size)) ?
        Number(props.searchParams.size) : 10;  // Kích thước mặc định là 10

    const page: number = (props?.searchParams?.page && !isNaN(props.searchParams.page)) ?
        Number(props.searchParams.page) : 1;  // Trang mặc định là 1

    // Tạo đối tượng options cho việc gọi API với các thông số phân trang
    const options: OptionsParams = {
        params: {
            page: page,
            size: size
        }
    };

    return (
        <Suspense fallback={<Loader />}>
            <VoucherComponent options={options} />
        </Suspense>
    );
}

export default VoucherPage;
