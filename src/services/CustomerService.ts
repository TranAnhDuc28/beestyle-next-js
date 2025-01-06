import httpInstance from "@/utils/HttpInstance"


export const URL_API_CUSTOMER = {
  get: '/admin/customer',
  creat:'/admin/customer/create',
  update:'/admin/customer/update',
  delete:'/admin/customer/delete',
}

export const getCustomers = async (url:string) => {
  const response = await httpInstance.get(url)
  return response.data
}

export const getDetailCustomer = async (key: string) => {
  // const id = key.split('/').pop(); // Lấy id từ key nếu cần
  const response = await httpInstance.get(key);
  return response.data;
};

export const createCustomer = async (data: ICustomer) => {
  const response = await httpInstance.post(URL_API_CUSTOMER.creat,data)
  return response.data
}

export const updateCustomer = async (data: ICustomer) => {
  const response = await httpInstance.put(`${URL_API_CUSTOMER.update}/${data.id}`,data)
  return response.data
}
