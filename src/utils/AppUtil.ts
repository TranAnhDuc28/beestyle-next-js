import {IOrderItem} from "@/types/IOrderItem";
import {IAddress} from "@/types/IAddress";
import {IVoucher} from "@/types/IVoucher";
import {DISCOUNT_TYPE} from "@/constants/DiscountType";
import {FREE_SHIPPING_THRESHOLD} from "@/constants/AppConstants";
import {ghtkCalculateShippingFee} from "@/services/GhtkCalculateShippingFee";


/**
 * tính tổng tiền hàng trong giỏ
 * @param dataCart
 */
export const calculateCartTotalAmount = (dataCart: IOrderItem[]): number => {
    return dataCart.reduce((total, item) => total + (item.salePrice ?? 0) * item.quantity, 0);
};


/**
 * tính số lượng sản phẩm trong giỏ
 * @param dataCart
 */
export const calculateCartTotalQuantity = (dataCart: IOrderItem[]): number => {
    return dataCart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * tính tiền giảm giá dựa trên tổng giá trị đơn hàng
 * @param voucher
 * @param totalAmount
 */
export const calculateInvoiceDiscount = (voucher: IVoucher | undefined, totalAmount: number): number => {
    // nếu không áp dụng voucher trả về 0
    if (!voucher) return 0;

    let discountAmount: number = 0;

    // Nếu áp dụng voucher giảm giá theo giá trị %
    if (voucher.discountType === DISCOUNT_TYPE.PERCENTAGE.key) {
        // tính tiền giảm dự trên tổng tiền hàng
        discountAmount = totalAmount * (voucher.discountValue / 100);

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
 * @param totalAmount
 * @param shippingAddress
 */
export const calculateShippingFee = async (totalAmount: number, shippingAddress: IAddress | undefined): Promise<number> => {
    if (totalAmount > FREE_SHIPPING_THRESHOLD || !shippingAddress) return 0;

    const paramCalculateFee: Record<string, any> = {
        pick_province: shippingAddress?.city,
        pick_district: shippingAddress?.district,
        pick_ward: shippingAddress?.commune,
        pick_street: shippingAddress?.addressName,
        province: shippingAddress?.city,
        district: shippingAddress?.district,
        ward: shippingAddress?.commune,
        address: shippingAddress?.addressName,
        weight: 300,
        value: totalAmount,
        transport: "road",
    };

    let response;
    try {
        response = await ghtkCalculateShippingFee(paramCalculateFee);
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
export const calculateFinalAmount = (totalAmount: number, discountAmount: number, shippingFee: number): number => {
    const finalTotalAmount = totalAmount - discountAmount + shippingFee;
    return finalTotalAmount;
};


/**
 * tính tiền khách cần trả
 * @param finalTotalAmount
 */
export const calculateAmountDue = (finalTotalAmount: number): number => {
    const finalAmount = finalTotalAmount;
    return finalAmount;
};


/**
 * format địa chỉ theo dạng chuỗi ngăn cách bởi dấu ,
 * @param address
 */
export const formatAddress = (address: IAddress | undefined): string | undefined => {
    if (!address) return undefined;

    const {addressName, commune, district, city} = address;

    // Tạo một mảng chứa các phần của địa chỉ, chỉ thêm những phần không rỗng hoặc không undefined
    const addressParts = [addressName, commune, district, city]
        .filter(part => part);  // Loại bỏ các phần tử rỗng hoặc undefined

    // Kết hợp các phần với dấu " - " để tạo chuỗi địa chỉ
    return addressParts.join(', ');
}
