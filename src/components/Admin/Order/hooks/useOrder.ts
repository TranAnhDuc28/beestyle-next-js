import useAppNotifications from "@/hooks/useAppNotifications";
import {IOrder, IOrderCreate} from "@/types/IOrder";
import {createOrder, updateOrder, URL_API_ORDER} from "@/services/OrderService";
import {mutate} from "swr";

interface IProps {

}

const useOrder = (props?: IProps) => {
    const {showNotification, showMessage} = useAppNotifications();

    const handleCreateOrder =  async (value: IOrderCreate) => {
        try {
            const result = await createOrder(value);
            await mutate(`${URL_API_ORDER.get}/sale/order-pending`);
            if (result.data) showMessage("success", result.message);
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error", {message: String(message)});
                });
            } else {
                showNotification("error", {message: error?.message, description: errorMessage});
            }
        }
    }

    const handleUpdateOrder =  async (value: IOrder, id: number) => {
        try {
            const result = await updateOrder(value, id);
            await mutate(`${URL_API_ORDER.get}/sale/order-pending`);
            if (result.data) showNotification("success", {message: result.message});
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error", {message: String(message)});
                });
            } else {
                showNotification("error", {message: error?.message, description: errorMessage});
            }
        }
    }

    return {handleCreateOrder, handleUpdateOrder};
}
export default useOrder;