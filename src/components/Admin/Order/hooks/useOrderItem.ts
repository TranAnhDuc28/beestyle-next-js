import useAppNotifications from "@/hooks/useAppNotifications";
import {ICreateOrderItem, IUpdateOrderItem} from "@/types/IOrderItem";
import {
    createOrderItem,
    updateOrderItem,
    updateQuantityOrderItem,
} from "@/services/OrderItemService";
import {mutate} from "swr";
import {useContext} from "react";
import {HandleCart} from "@/components/Admin/Sale/SaleComponent";


const useOrderItem = () => {
    const {showNotification, showMessage} = useAppNotifications();
    const handleCart = useContext(HandleCart);

    const handleCreateOrderItem =  async (value: ICreateOrderItem) => {
        if (!value.orderId) {
            showMessage("error", "Please select order to add product.");
            return null;
        }
        try {
            const result = await createOrderItem(value);
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

    const handleUpdateOrderItem =  async (value: IUpdateOrderItem) => {
        try {
            const result = await updateOrderItem(value);
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

    const handleUpdateQuantityOrderItem = async (value: IUpdateOrderItem) => {
        try {
            const result = await updateQuantityOrderItem(value);
            return result;
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
        }
    }

    return {handleCreateOrderItem, handleUpdateOrderItem, handleUpdateQuantityOrderItem};
}
export default useOrderItem;