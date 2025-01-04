import httpInstance from "@/utils/HttpInstance";

export const URL_API_INVOICE = {
    generatePdf: "/invoice",
    previewPdf: "/invoice/preview",
};

// Xuất file PDF của hóa đơn
export const generateInvoicePdf = async (id: number) => {
    try {
        // Gửi yêu cầu GET để lấy file PDF
        const response = await httpInstance.get(`/invoice/generate/${id}`, {
            responseType: "blob", // Nhận file PDF dưới dạng blob
        });

        // Tạo URL từ blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Tạo link tải file
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice_${id}.pdf`);
        document.body.appendChild(link);
        link.click();

        // Cleanup: Xóa link sau khi sử dụng
        document.body.removeChild(link);
    } catch (error) {
        console.error("Lỗi khi tải file PDF:", error);
    }
};

// Xem trước file PDF của hóa đơn
export const previewInvoicePdf = async (id: number): Promise<string | null> => {
    try {
        // Gửi yêu cầu GET để lấy file PDF
        const response = await httpInstance.get(`/invoice/preview/${id}`, {
            responseType: "arraybuffer", // Nhận dữ liệu PDF dưới dạng buffer
        });

        // Chuyển đổi dữ liệu sang Base64
        const base64Pdf = `data:application/pdf;base64,${btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
            )
        )}`;

        return base64Pdf; // Trả về chuỗi Base64 để hiển thị trong iframe hoặc cửa sổ mới
    } catch (error) {
        console.error("Lỗi khi xem trước hóa đơn:", error);
        return null;
    }
};

// import axios from "axios";
//
// // URL của API
// const BASE_URL = "http://localhost:8080/api/v1/invoice";
//
// // Hàm để tải file PDF của hóa đơn
// export const downloadInvoicePdf = async (invoiceId) => {
//     try {
//         // Kiểm tra `invoiceId` hợp lệ
//         if (!invoiceId) {
//             console.error("Invoice ID không hợp lệ.");
//             return;
//         }
//
//         // Gửi yêu cầu GET để tải file PDF
//         const response = await axios.get(`${BASE_URL}/${invoiceId}`, {
//             responseType: "blob", // Nhận dữ liệu dưới dạng blob
//         });
//
//         // Kiểm tra phản hồi từ server
//         if (response.status !== 200 || !response.data) {
//             console.error("Không thể tải hóa đơn. Kiểm tra lại phản hồi từ server.");
//             return;
//         }
//
//         // Tạo URL từ blob data
//         const blob = new Blob([response.data], { type: "application/pdf" });
//         const url = window.URL.createObjectURL(blob);
//
//         // Tạo một thẻ <a> để tải file
//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute("download", `invoice_${invoiceId}.pdf`); // Tên file khi tải xuống
//
//         // Thêm thẻ <a> vào body và click để tải
//         document.body.appendChild(link);
//         link.click();
//
//         // Cleanup: Xóa thẻ <a> sau khi tải xong
//         document.body.removeChild(link);
//
//         // Cleanup: Hủy URL Object sau khi sử dụng
//         window.URL.revokeObjectURL(url);
//     } catch (error) {
//         // Xử lý lỗi
//         console.error("Lỗi khi tải hóa đơn:", error?.response?.data || error.message);
//     }
// };
