import { IAddress } from "@/types/IAddress"
import httpInstance from "@/utils/HttpInstance"

export const URL_API_ADDRESS = {
    get: '/admin/address',
    creat:'/admin/address/create',
    update:'/admin/address/update',
    delete:'/admin/address/delete',
  }

  
  export const createAddress = async (data: IAddress) => {
    const response = await httpInstance.post(URL_API_ADDRESS.creat,data)
    return response.data
  }

  export const getAddressByCustomerId = async (key:any) => {
    const response = await httpInstance.get(key);
    return response.data
  }


  