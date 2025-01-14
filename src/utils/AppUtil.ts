import { IOrderItem } from "@/types/IOrderItem";
import { IAddress } from "@/types/IAddress";
import { IVoucher, IVoucherUser } from "@/types/IVoucher";
import { DISCOUNT_TYPE } from "@/constants/DiscountType";
import { FREE_SHIPPING_THRESHOLD } from "@/constants/AppConstants";
import { ghtkCalculateShippingFee } from "@/services/GhtkCalculateShippingFee";
import { ICartItem } from "@/services/user/ShoppingCartService";


/**
 * tính tổng tiền hàng trong giỏ
 * @param dataCart
 */
export const calculateCartOriginAmount = (dataCart: IOrderItem[]): number => {
    return dataCart.reduce((total, item) => total + (item.salePrice ?? 0) * item.quantity, 0);
};

/**
 * tính tổng tiền hàng trong giỏ User-client
 * @param dataCart
 */
export const calculateUserCartTotalAmount = (dataCart: ICartItem[]): number => {
    if (dataCart && dataCart.length > 0) {
        return dataCart.reduce((total, item) => total + (item?.sale_price ?? 0) * item?.quantity, 0);
    }
    return 0;
};

/**
 * tính số lượng sản phẩm trong giỏ
 * @param dataCart
 */
export const calculateCartTotalQuantity = (dataCart: IOrderItem[]): number => {
    return dataCart.reduce((total, item) => total + item.quantity, 0);
};

export const calculateUserCartTotalAmountWithVoucherAndShippingFee = (
    originalAmount: number,
    discountAmount: number,
    shippingFee: number
) => {
    const amount = originalAmount >= FREE_SHIPPING_THRESHOLD ? originalAmount - discountAmount :
        (originalAmount - discountAmount) + shippingFee;
    return amount;
}

/**
 * tính tiền giảm giá dựa trên tổng giá trị đơn hàng
 * @param voucher
 * @param originalAmount
 */
export const calculateInvoiceDiscount = (
    voucher: IVoucher | IVoucherUser | null | undefined,
    originalAmount: number | undefined): number => {
    // nếu không áp dụng voucher trả về 0
    if (!voucher || !originalAmount) return 0;

    let discountAmount: number = 0;

    // Nếu áp dụng voucher giảm giá theo giá trị %
    if (voucher.discountType === DISCOUNT_TYPE.PERCENTAGE.key) {
        // tính tiền giảm dự trên tổng tiền hàng
        discountAmount = originalAmount * (voucher.discountValue / 100);

        // Nếu giá trị giảm lớn hơn giới hạn giảm giá, trả về giới hạn giảm giá
        if (discountAmount > voucher.maxDiscount) {
            discountAmount = voucher.maxDiscount;
        }

    } else if (voucher.discountType === DISCOUNT_TYPE.CASH.key) {  // Nếu áp dụng voucher giảm giá theo giá trị tiền mặt

        // lấy giá trị tiền mặt và luôn nhỏ hơn giá trị giới hạn giảm giá cho voucher
        discountAmount = Math.min(voucher.discountValue, voucher.maxDiscount);
    }

    return discountAmount;
}

/**
 * tính toán phí free ship theo ngưỡng tổng tiền hóa đơn được chỉ định
 * @param originalAmount
 * @param shippingAddress
 */
export const calculateShippingFee = async (originalAmount: number | undefined, shippingAddress: IAddress | undefined): Promise<number> => {
    if (!originalAmount || originalAmount === 0 || Number(originalAmount) >= FREE_SHIPPING_THRESHOLD || !shippingAddress) return 0;

    const paramCalculateFee: Record<string, any> = {
        pick_province: "Hà Nội",
        pick_district: "Huyện Hoài Đức",
        // address: "123 Đường ABC",
        weight: 100,
        // value: 500000,
        transport: "road",
        province: shippingAddress?.city,    
        district: shippingAddress?.district,  
        // // weight: 100,
        value: originalAmount,
        // // deliver_option: "xteam",
        // transport: "road",
    };

    let response;
    try {
        response = await ghtkCalculateShippingFee(paramCalculateFee);
        console.log(response);
        
        return response.fee.fee;
    } catch (error) {
        throw new Error(response.message || "Không tính được phí vận chuyển");
    }
};

/**
 * tính tổng tiền cần thanh toán
 * @param totalAmount
 * @param discountAmount
 * @param shippingFee
 */
export const calculateFinalAmount = (originAmount: number | undefined, discountAmount: number, shippingFee: number): number => {
    if (!originAmount) return 0;
    const finalTotalAmount = Math.max(originAmount - discountAmount + shippingFee);
    return finalTotalAmount;
};


/**
 * format địa chỉ theo dạng chuỗi ngăn cách bởi dấu ,
 * @param address
 */
export const formatAddress = (address: IAddress | undefined): string | undefined => {
    if (!address) return undefined;

    const { addressName, commune, district, city } = address;

    // Tạo một mảng chứa các phần của địa chỉ, chỉ thêm những phần không rỗng hoặc không undefined
    const addressParts = [addressName, commune, district, city]
        .filter(part => part);  // Loại bỏ các phần tử rỗng hoặc undefined

    // Kết hợp các phần với dấu " - " để tạo chuỗi địa chỉ
    return addressParts.join(', ');
}
