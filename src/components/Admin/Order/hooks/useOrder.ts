import useAppNotifications from "@/hooks/useAppNotifications";
import {IOrder, IOrderCreate} from "@/types/IOrder";
import {createOrder, updateOrder} from "@/services/OrderService";
import {useState} from "react";

const delay = () => new Promise<void>(res => setTimeout(() => res(), 300));

const useOrder = () => {
    const {showNotification, showMessage} = useAppNotifications();
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateOrder =  async (value: IOrderCreate) => {
        setLoading(true);
        try {
            await delay();
            const result = await createOrder(value);
            // await mutate(`${URL_API_ORDER.get}/sale/order-pending`);
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
            return null;
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

    return {loading, handleCreateOrder, handleUpdateOrder};
}
export default useOrder;