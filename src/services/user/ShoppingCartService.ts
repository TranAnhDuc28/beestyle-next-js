export const CART_KEY = 'shopping_cart';

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

export const addToCart = (product: any, quantity: any, images: any) => {
    const cart = getCart();

    const existingIndex = cart.findIndex((item: any) =>
        item.product_variant_id === product.id &&
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
            product_name: product.productName,
            color: product.colorName,
            size: product.sizeName,
            quantity: quantity,
            original_price: product.originalPrice,
            discounted_price: product.salePrice,
            total_price: quantity * product.salePrice,
            description: product.description,
            images: images
        };
        cart.push(newItem);
    }
    saveCart(cart);

    window.dispatchEvent(new Event('cartUpdated'));
};

export const removeItemFromCart = (shoppingCartId: string) => {
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const updatedCart = cartItems.filter(item => item.shopping_cart_id !== shoppingCartId);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
};