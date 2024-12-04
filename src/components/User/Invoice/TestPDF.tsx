import React, { useState } from "react";
import { generateInvoicePdf } from "@/services/InvoiceService";


interface IProps{
  invoiceData:any
}
export default function TestPDFComponent(props:IProps) {
  // const [invoiceData, setInvoiceData] = useState({
  //   customerId: "C001",
  //   products: [
  //     { productId: "P001", productName: "Sản phẩm A", quantity: 2, price: 100000 },
  //     { productId: "P002", productName: "Sản phẩm B", quantity: 1, price: 150000 },
  //   ],
  //   totalAmount: 350000,
  //   orderDate: new Date().toISOString(),
  // });

  const {invoiceData} = props
  const handleGeneratePDF = async () => {
    try {
      console.log("Đang gửi yêu cầu tạo PDF...");
      await generateInvoicePdf(invoiceData);
      console.log("PDF đã được tải xuống.");
    } catch (error) {
      console.error("Lỗi khi tạo PDF:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Test Tạo PDF</h2>
      <p>Kiểm tra chức năng tạo file PDF từ dữ liệu hóa đơn.</p>
      <div style={{ marginBottom: "20px" }}>
        <h3>Dữ liệu hóa đơn:</h3>
        <pre style={{ background: "#f4f4f4", padding: "10px" }}>
          {JSON.stringify(invoiceData, null, 2)}
        </pre>
      </div>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleGeneratePDF}
      >
        Tạo PDF
      </button>
    </div>
  );
}
