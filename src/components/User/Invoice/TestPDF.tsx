import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { previewInvoicePdf } from "@/services/InvoiceService";

interface IProps {
  invoiceData: any;
}

export default function TestPDFComponent(props: IProps) {
  const { invoiceData } = props;

  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // URL PDF

  // Hàm xem trước và in trực tiếp
  const handlePreviewAndPrint = async () => {
    try {
      console.log("Đang gửi yêu cầu xem trước PDF...");
      const base64Pdf = await previewInvoicePdf(invoiceData);

      if (base64Pdf) {
        const validBase64 = base64Pdf.startsWith("data:application/pdf;base64,")
          ? base64Pdf
          : `data:application/pdf;base64,${base64Pdf}`;

        // Chuyển base64 thành Blob
        const byteCharacters = atob(validBase64.split(",")[1]);
        const byteNumbers = Array.from(byteCharacters, (char) =>
          char.charCodeAt(0)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        // Tạo URL từ Blob
        const pdfBlobUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfBlobUrl);

        // Tạo tên tệp mặc định (chỉ để gợi ý, không tải ngay)
        const fileName = `invoice_${new Date().toISOString().split('T')[0]}.pdf`;

        // Tạo thẻ <a> để gợi ý tên tệp khi in
        const downloadLink = document.createElement("a");
        downloadLink.href = pdfBlobUrl;
        downloadLink.download = fileName;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        // Không tải xuống ngay mà chỉ tạo gợi ý tên tệp
        // downloadLink.click(); // Không cần click ở đây vì không tải tệp ngay

        // Tự động in PDF từ iframe
        const iframe = document.createElement("iframe");
        iframe.src = pdfBlobUrl;
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        // Gọi lệnh in từ iframe khi PDF đã được tải
        iframe.onload = () => {
          iframe.contentWindow?.print(); // Gọi phương thức print từ iframe
          document.body.removeChild(iframe); // Xóa iframe sau khi in xong
        };
      } else {
        console.error("Không thể tạo xem trước PDF.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo xem trước PDF:", error);
    }
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
  

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Test In Hóa Đơn PDF</h2>
      <p>Kiểm tra chức năng in hóa đơn ngay tại trang này.</p>
      <Button type="primary" onClick={handlePreviewAndPrint}>
        Xem hóa đơn và In ngay
      </Button>

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
}