import httpInstance from "@/utils/HttpInstance";

export const URL_API_INVOICE = {
  create: '/invoice/generate',
  getById: '/invoice',
  getAll: '/invoice/all',
  generatePdf: '/invoice/generate',
};

// Tạo mới hóa đơn
export const createInvoice = async (data: any) => {
  const response = await httpInstance.post(URL_API_INVOICE.create, data);
  return response.data; // Trả về dữ liệu hóa đơn vừa tạo
};

// Lấy hóa đơn theo ID
export const getInvoiceById = async (id: string) => {
  const response = await httpInstance.get(`${URL_API_INVOICE.getById}/${id}`);
  return response.data; // Trả về thông tin chi tiết hóa đơn
};

// Lấy danh sách tất cả hóa đơn
export const getAllInvoices = async () => {
  const response = await httpInstance.get(URL_API_INVOICE.getAll);
  return response.data; // Trả về danh sách các hóa đơn
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
