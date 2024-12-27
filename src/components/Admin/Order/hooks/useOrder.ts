import useAppNotifications from "@/hooks/useAppNotifications";
import {IOrder, IOrderCreateOrUpdate} from "@/types/IOrder";
import {createOrder, getOrders, updateOrder, URL_API_ORDER} from "@/services/OrderService";
import {useState} from "react";
import useSWR from "swr";

const delay = () => new Promise<void>(res => setTimeout(() => res(), 200));

const useOrder = () => {
    const {showNotification, showMessage} = useAppNotifications();
    const [loading, setLoading] = useState<boolean>(false);

    const handleGetOrderService = (orderId: number | null) => {
        const {data, isLoading, error, mutate} = useSWR(
           orderId ? URL_API_ORDER.getOrderDetail(orderId) : null,
            getOrders,
            {
                revalidateIfStale: false,
                revalidateOnReconnect: false,
                revalidateOnFocus: false
            }
        );

        const orderDetail = data?.data ? data.data : undefined;

        return {orderDetail, isLoading, error, mutate};
    }

    const handleCreateOrder =  async (value: IOrderCreateOrUpdate) => {
        setLoading(true);
        try {
            await delay();
            const result = await createOrder(value);
            if (result.data) showMessage("success", result.message);
            return result.data;
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error", {message: String(message)});
                });
            } else {
                showNotification("error", {message: error?.message, description: errorMessage});
            }
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateOrder =  async (value: IOrder, id: number) => {
        try {
            const result = await updateOrder(value, id);
            // await mutate(`${URL_API_ORDER.get}/sale/order-pending`);
            if (result.data) showNotification("success", {message: result.message});
            return result.data;
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error", {message: String(message)});
                });
            } else {
                showNotification("error", {message: error?.message, description: errorMessage});
            }
            return null;
        }
    }

    return {loading, handleCreateOrder, handleUpdateOrder, handleGetOrderService};
}
export default useOrder;