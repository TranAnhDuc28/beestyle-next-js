export const CART_KEY = 'shopping_cart';

export interface ICartItem {
    shopping_cart_id: number;
    product_variant_id: string;
    product_id: string;
    product_name: string;
    sku: string;
    color: string;
    size: string;
    product_quantity: number;
    quantity: number;
    sale_price: number;
    discounted_price: number;
    total_price: number;
    description: string;
    image?: object[];
}

const getCart = () => {
    if (typeof window !== 'undefined') {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    }
    return [];
};

const saveCart = (cart: any[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product: any, quantity: number) => {
    const cart = getCart();

    const existingIndex = cart.findIndex((item: ICartItem) =>
        item.product_id === product.productId &&
        item.color === product.colorName &&
        item.size === product.sizeName
    );

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
        cart[existingIndex].total_price = cart[existingIndex].quantity * cart[existingIndex].discounted_price;
    } else {
        const newItem = {
            shopping_cart_id: Date.now(),
            product_variant_id: product.id,
            product_id: product.productId,
            product_name: product.productName,
            sku: product.sku,
            color: product.colorName,
            size: product.sizeName,
            product_quantity: product.quantityInStock,
            quantity: quantity,
            sale_price: product.salePrice,
            discounted_price: product.discountPrice,
            total_price: quantity * product.discountPrice,
            description: product.description,
            image: product.images.find((image: { isDefault: boolean; }) => image.isDefault)
        };
        cart.push(newItem);
    }
    saveCart(cart);

    window.dispatchEvent(new Event('cartUpdated'));
};

export const removeItemFromCart = (shoppingCartId: string) => {
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const updatedCart = cartItems.filter((item: { shopping_cart_id: string; }) => item.shopping_cart_id !== shoppingCartId);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
};

export const checkShoppingCartData = async () => {
    const cartItems = getCart();

    if (cartItems && cartItems.length > 0) {
        const cartDataToCheck = cartItems.map((
            item: {
                product_variant_id: string;
                quantity: number;
            }
        ) => ({
            id: item.product_variant_id,
            quantity: item.quantity
        }));

        try {
            const response = await fetch('http://localhost:8080/api/v1/cart/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartDataToCheck),
            });

            if (!response.ok) {
                throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
            }

            const updatedCartDataFromBE = await response.json();

            const updatedCartItems = cartItems.map((item: ICartItem) => {
                const matchingItemFromBE = updatedCartDataFromBE.find((beItem: { id: string; }) =>
                    beItem.id === item.product_variant_id
                );
                if (matchingItemFromBE) {
                    const updatedItem: ICartItem = { ...item };
                    if (matchingItemFromBE.salePrice !== item.sale_price) {
                        updatedItem.sale_price = matchingItemFromBE.salePrice;
                    }

                    if (matchingItemFromBE.discountPrice !== item.discounted_price) {
                        updatedItem.discounted_price = matchingItemFromBE.discountPrice;
                    }

                    if (matchingItemFromBE.quantityInStock !== item.product_quantity) {
                        updatedItem.product_quantity = matchingItemFromBE.quantityInStock;
                    }

                    if (matchingItemFromBE.productName !== item.product_name) {
                        updatedItem.product_name = matchingItemFromBE.productName;
                    }

                    if (matchingItemFromBE.colorName !== item.color) {
                        updatedItem.color = matchingItemFromBE.colorName;
                    }

                    if (matchingItemFromBE.sizeName !== item.size) {
                        updatedItem.size = matchingItemFromBE.sizeName;
                    }

                    if (updatedItem.discounted_price !== item.discounted_price) {
                        updatedItem.total_price = item.quantity * updatedItem.discounted_price;
                    }
                    return updatedItem;
                } else {
                    console.warn(`Không tìm thấy Product Variant với ID: ${item.product_variant_id}.`);
                }
            });

            saveCart(updatedCartItems);
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Đã xảy ra lỗi trong quá trình đồng bộ dữ liệu', error);
        }
    }
}
