const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getCustomers = async () => {
   try {
    const response = await fetch(`${API_URL}/admin/customer`)
    
    const result = await response.json()
    const {data: {items} } = result
    return items
   } catch (error) {
     return null
   }
}