import httpInstance from "@/utils/HttpInstance"


export const URL_API_CUSTOMER = {
  get: '/admin/Customer',
  creat:'/admin/Customer/create',
  update:'/admin/Customer/update',
  delete:'/admin/Customer/delete',
}

export const getCustomer = async (url:string) => {
  const response = await httpInstance.get(url)
  return response.data
}

export const createCustomer = async (data: ICustomer) => {
  const response = await httpInstance.post(URL_API_CUSTOMER.creat,data)
  return response.data
}

export const updateCustomer = async (data: ICustomer) => {
  const response = await httpInstance.put(`${URL_API_CUSTOMER.update}/${data.id}`,data)
  return response.data
}