const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCustomers = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/customer`);

    const result = await response.json();
    const {
      data: { items },
    } = result;
    return items;
  } catch (error) {
    throw new Error("Fetch data failed");
  }
};

export const updateCustomer = async (id: number, item: any) => {
  const response = await fetch(`${API_URL}/admin/customer/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return await response.json()
};

export const createCustomer = async (item: any) => {
  const response = await fetch(`${API_URL}/admin/customer/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  return await response.json()
}
