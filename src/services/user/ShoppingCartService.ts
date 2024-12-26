import { useState } from "react";

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
            sku: product.sku,
            color: product.colorName,
            size: product.sizeName,
            product_quantity: product.quantityInStock,
            quantity: quantity,
            sale_price: product.salePrice,
            discounted_price: product.discountPrice,
            total_price: quantity * product.discountPrice,
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

export const checkShoppingCartData = async () => {
    const cartItems = getCart();

    if (cartItems && cartItems.length > 0) {
        const cartDataToCheck = cartItems.map(item => ({
            sku: item.sku,
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedCartDataFromBE = await response.json();

            const updatedCartItems = cartItems.map(item => {
                const matchingItemFromBE = updatedCartDataFromBE.find(beItem =>
                    beItem.sku === item.sku &&
                    beItem.salePrice === item.sale_price &&
                    beItem.discountPrice === item.discounted_price &&
                    beItem.quantityInStock === item.product_quantity
                );
                if (matchingItemFromBE) {
                    return {
                        ...item,
                    };
                } else {
                    return {

                    };
                }
            });

            const finalCartItems = updatedCartItems.filter(item => item.is_valid !== false);

            saveCart(finalCartItems);
            window.dispatchEvent(new Event('cartUpdated'));
            console.log("Dữ liệu giỏ hàng:", finalCartItems);

        } catch (error) {
            console.error(error);
        }
    }
}
