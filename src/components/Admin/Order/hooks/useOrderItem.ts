import useAppNotifications from "@/hooks/useAppNotifications";
import {ICreateOrUpdateOrderItem} from "@/types/IOrderItem";
import {
    createOrderItem, createOrderItems, deleteOrderItem,
    updateOrderItem,
    updateQuantityOrderItem, URL_API_ORDER_ITEM,
} from "@/services/OrderItemService";


const useOrderItem = () => {
    const {showNotification, showMessage} = useAppNotifications();

    const handleCreateOrderItem =  async (value: ICreateOrUpdateOrderItem) => {
        if (value.orderId && !isNaN(value.orderId)) throw new Error("ID hóa đơn không hợp lệ, Vui lòng chọn hóa đơn thêm sản phẩm.");

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

    const handleCreateOrderItems =  async (orderId: number, value: ICreateOrUpdateOrderItem[]) => {
        const paramString = new URLSearchParams();

        if (!orderId || isNaN(orderId)) throw new Error("ID hóa đơn không hợp lệ, Vui lòng chọn hóa đơn thêm sản phẩm.");

        paramString.append("orderId", orderId.toString());

        try {
            const result = await createOrderItems(`${URL_API_ORDER_ITEM.creates}?${paramString}`, value);
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

    const handleUpdateOrderItem =  async (value: ICreateOrUpdateOrderItem) => {
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

    const handleDeleteOrderItem = async (id: number) => {
        try {
            const result = await deleteOrderItem(id);
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

    const handleUpdateQuantityOrderItem = async (value: ICreateOrUpdateOrderItem) => {
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



    return {handleCreateOrderItem, handleCreateOrderItems, handleUpdateOrderItem, handleUpdateQuantityOrderItem, handleDeleteOrderItem};
}
export default useOrderItem;