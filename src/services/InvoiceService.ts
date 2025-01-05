import httpInstance from "@/utils/HttpInstance";

export const URL_API_INVOICE = {
  generatePdf: '/invoice/generate',
  previewPdf: "/invoice/preview", 
};

// Xuất file PDF của hóa đơn
export const generateInvoicePdf = async (data: any) => {
    const response = await httpInstance.post('/invoice/generate', data, {
      responseType: 'blob', // Nhận file PDF dưới dạng blob
    });
  
    // Tải file PDF xuống
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'invoice.pdf');
    document.body.appendChild(link);
    link.click();
  
    return response.data;
  };

  export const previewInvoicePdf = async (data: any): Promise<string | null> => {
    try {
      const response = await httpInstance.post("/invoice/preview", data, {
        responseType: "arraybuffer", // Nhận dữ liệu PDF từ backend
      });
  
      // Chuyển đổi sang Base64
      const base64Pdf = `data:application/pdf;base64,${btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), "")
      )}`;
  
      return base64Pdf; // Trả về chuỗi Base64
    } catch (error) {
      console.error("Lỗi khi lấy preview PDF:", error);
      return null;
    }
  };
