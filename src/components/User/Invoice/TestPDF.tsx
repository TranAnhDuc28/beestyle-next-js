// import React, { useState } from "react";
// import { Button } from "antd";
// import { previewInvoicePdf } from "@/services/InvoiceService";
//
// interface IProps {
//     invoiceData: any;
// }
//
// export default function TestPDFComponent(props: IProps) {
//     const { invoiceData } = props;
//
//     const [pdfUrl, setPdfUrl] = useState<string | null>(null); // URL PDF
//
//     // Hàm xem trước và in trực tiếp
//     const handlePreviewAndPrint = async () => {
//         try {
//             console.log("Đang gửi yêu cầu xem trước PDF...");
//             const base64Pdf = await previewInvoicePdf(invoiceData);
//
//             if (base64Pdf) {
//                 // Kiểm tra Base64 và thêm prefix nếu thiếu
//                 const validBase64 = base64Pdf.startsWith("data:application/pdf;base64,")
//                     ? base64Pdf
//                     : `data:application/pdf;base64,${base64Pdf}`;
//
//                 // Chuyển Base64 thành Blob
//                 const byteCharacters = atob(validBase64.split(",")[1]);
//                 const byteNumbers = Array.from(byteCharacters, (char) =>
//                     char.charCodeAt(0)
//                 );
//                 const byteArray = new Uint8Array(byteNumbers);
//                 const blob = new Blob([byteArray], { type: "application/pdf" });
//
//                 // Tạo URL từ Blob
//                 const pdfBlobUrl = URL.createObjectURL(blob);
//                 setPdfUrl(pdfBlobUrl); // Lưu URL vào state
//
//                 // Tự động in từ iframe
//                 const iframe = document.getElementById("pdf-iframe") as HTMLIFrameElement;
//                 if (iframe) {
//                     iframe.onload = () => {
//                         iframe.contentWindow?.print(); // Gọi phương thức print từ iframe
//                     };
//                 }
//             } else {
//                 console.error("Không thể tạo xem trước PDF.");
//             }
//         } catch (error) {
//             console.error("Lỗi khi tạo xem trước PDF:", error);
//         }
//     };
//
//     return (
//         <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//             <h2>Test In Hóa Đơn PDF</h2>
//             <p>Kiểm tra chức năng in hóa đơn ngay tại trang này.</p>
//             <Button type="primary" onClick={handlePreviewAndPrint}>
//                 Xem hóa đơn và In ngay
//             </Button>
//
//             {/* iframe ẩn để tải PDF và in */}
//             {pdfUrl && (
//                 <iframe
//                     id="pdf-iframe"
//                     src={pdfUrl}
//                     style={{ display: "none" }} // Ẩn iframe khỏi người dùng
//                     title="Hóa Đơn"
//                 />
//             )}
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import {
  downloadInvoicePdf,
  previewInvoicePdf,
} from "@/services/InvoiceService";
import { getSendThankMail } from "@/services/MailService";

const InvoiceComponent = () => {
  const [invoiceId, setInvoiceId] = useState<number>(44); // ID của hóa đơn
  const [invoiceDetails, setInvoiceDetails] = useState<any>(null); // Lưu trữ thông tin hóa đơn
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // URL PDF

  // Hàm gọi API để tải PDF
  const handleDownloadPdf = () => {
    downloadInvoicePdf(44);
  };

  useEffect(() => {
    if (pdfUrl) {
      const iframe = document.getElementById("pdf-iframe") as HTMLIFrameElement;
      if (iframe) {
        iframe.onload = () => {
          // Gọi trực tiếp lệnh in từ iframe khi PDF đã được tải
          iframe.contentWindow?.print();
        };
      }
    }
  }, [pdfUrl]);
  // Hàm gọi API để lấy thông tin hóa đơn
  // const handleGetInvoiceDetails = async () => {
  //     const data = await downloadInvoicePdf(invoiceId);
  //     setInvoiceDetails(data);
  // };

  const handlePreviewAndPrint = async () => {
    try {
      console.log("Đang gửi yêu cầu xem trước PDF...");
      const base64Pdf = await previewInvoicePdf(invoiceId);

      if (base64Pdf) {
        // Kiểm tra Base64 và thêm prefix nếu thiếu
        const validBase64 = base64Pdf.startsWith("data:application/pdf;base64,")
          ? base64Pdf
          : `data:application/pdf;base64,${base64Pdf}`;

        // Chuyển Base64 thành Blob
        const byteCharacters = atob(validBase64.split(",")[1]);
        const byteNumbers = Array.from(byteCharacters, (char) =>
          char.charCodeAt(0)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // Tạo URL từ Blob
        const pdfBlobUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfBlobUrl); // Lưu URL vào state

        const fileName = `Invoice_${invoiceId || "Unknown"}.pdf`;
        const pdfFile = new File([blob], fileName, { type: "application/pdf" });
        const dataMail = {
          recipient:"locnhph38787@fpt.edu.vn",
          customerName:"Nguyễn Hữu Lộc",
          files: pdfFile}
          console.log(dataMail);
          const mail = await getSendThankMail(dataMail);
          console.log('Mail sent successfully: ',mail);
        // Tự động in từ iframe
        const iframe = document.getElementById(
          "pdf-iframe"
        ) as HTMLIFrameElement;
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow?.print(); // Gọi phương thức print từ iframe
          };
        }
      } else {
        console.error("Không thể tạo xem trước PDF.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo xem trước PDF:", error);
    }

    
  };

  return (
    <div>
      <h1>Hóa đơn #{invoiceId}</h1>
      <button onClick={handleDownloadPdf}>Tải PDF</button>
      <button onClick={handlePreviewAndPrint}>Lấy Thông Tin Hóa Đơn</button>

      {invoiceDetails && (
        <div>
          <h2>Thông tin hóa đơn</h2>
          <pre>{JSON.stringify(invoiceDetails, null, 2)}</pre>
        </div>
      )}

      {/* iframe ẩn để tải PDF và in */}
      {pdfUrl && (
        <iframe
          id="pdf-iframe"
          src={pdfUrl}
          style={{ display: "none" }} // Ẩn iframe khỏi người dùng
          title="Hóa Đơn"
        />
      )}
    </div>
  );
};

export default InvoiceComponent;
