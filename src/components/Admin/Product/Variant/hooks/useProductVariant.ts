import useAppNotifications from "@/hooks/useAppNotifications";
import {StockAction, updateQuantityInStockProductVariants} from "@/services/ProductVariantService";
import {IProductVariant} from "@/types/IProductVariant";

const useProductVariant = () => {
    const {showNotification, showMessage} = useAppNotifications();

    const handleUpdateQuantityInStockProductVariant= async (value: IProductVariant, action: StockAction) => {
        try {
            const result = await updateQuantityInStockProductVariants(value, action);
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

    return {handleUpdateQuantityInStockProductVariant};
}
export default useProductVariant;