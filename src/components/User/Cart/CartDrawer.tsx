import React, { useEffect, useState } from 'react';
import { Drawer, Button, Empty, Popconfirm } from 'antd';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './css/cartdrawer.module.css';
import Image from "next/image";
import { CART_KEY, removeItemFromCart } from "@/services/user/ShoppingCartService";
import QuantityControl from "@/components/User/Cart/Properties/QuantityControl";
import ProgressShipping from './Properties/ProgressShipping';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { FREE_SHIPPING_THRESHOLD } from '@/constants/AppConstants';
import { calculateUserCartTotalAmount } from '@/utils/AppUtil';

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    });

    useEffect(() => {
        const handleCartUpdate = () => {
            setCartItems(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
        };
        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const condition = FREE_SHIPPING_THRESHOLD;
    const totalAmount = calculateUserCartTotalAmount(cartItems);

    const handleQuantityChange = (index: number, newQuantity: number) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity = newQuantity;
        newCartItems[index].total_price = newQuantity * newCartItems[index].discounted_price;
        setCartItems(newCartItems);
        localStorage.setItem(CART_KEY, JSON.stringify(newCartItems));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleRemoveCartItem = (cartId: string) => {
        removeItemFromCart(cartId);
    }

    return (
        <Drawer
            title={
                <>
                    <div className={styles.cartHeader}>
                        <h3 className={styles.cartTitle}>Giỏ hàng</h3>
                        <Button type="text" icon={<CloseOutlined style={{ fontSize: 20 }} />} onClick={onClose} />
                    </div>
                    <div className={cartItems && cartItems.length ? styles.shippingProgress : 'd-none'}>
                        <ProgressShipping totalAmount={totalAmount} condition={condition} />
                    </div>
                </>
            }
            placement="right"
            onClose={onClose}
            open={open}
            width={500}
            closable={false}
            style={{
                maxHeight: cartItems.length > 2 ? 'calc(100vh - 140px)' : ''
            }}
        >
            {cartItems && cartItems.length ? cartItems.map((
                item: {
                    product_id: string;
                    image: { imageUrl: string | StaticImport; };
                    product_name: string;
                    color: string;
                    size: string;
                    quantity: number;
                    product_quantity: number;
                    shopping_cart_id: string;
                    discounted_price: { toLocaleString: () => string | number | bigint };
                    sale_price: { toLocaleString: () => string | number | bigint };
                }, index: number) => (
                <div className={styles.cartItem} key={index}>
                    <Link
                        href={`/product/${item.product_id}/variant`}
                        onClick={onClose}
                    >
                        <Image
                            width={100}
                            height={100}
                            src={item.image ? item.image.imageUrl : ''}
                            alt={item.product_name}
                            className={styles.itemImage}
                        />
                    </Link>

                    <div className={styles.itemInfo}>
                        <Link
                            href={`/product/${item.product_id}/variant`}
                            className="no-underline"
                            onClick={onClose}
                        >
                            <span className={styles.itemTitle + ' text-black'}>{item.product_name}</span>
                        </Link>
                        <p className={styles.itemVariant}>{item.color} / {item.size}</p>
                        <div className={styles.quantityControl}>
                            <QuantityControl
                                quantity={item.quantity}
                                quantityInStock={item.product_quantity}
                                onIncrement={() => handleQuantityChange(index, item.quantity + 1)}
                                onDecrement={() => handleQuantityChange(index, Math.max(1, item.quantity - 1))}
                            />
                        </div>
                    </div>

                    <div>
                        <Popconfirm
                            title="Xoá sản phẩm"
                            description="Bạn chắc chắn muốn xoá sản phẩm này?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            placement="leftTop"
                            okText="Xoá"
                            cancelText="Không"
                            onConfirm={() => handleRemoveCartItem(item.shopping_cart_id)}
                        >
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                className="ml-5"
                            />
                        </Popconfirm>
                        <div className="d-flex flex-column align-items-center mt-4">
                            <span className={item.sale_price > item.discounted_price
                                ? styles.itemPrice : styles.itemPrice + ' mt-7'
                            }
                            >
                                {item && item.discounted_price.toLocaleString()}₫</span>
                            <span
                                className={item.sale_price > item.discounted_price
                                    ? styles.salePrice : 'd-none'
                                }
                            >
                                {item && item.sale_price.toLocaleString()}₫
                            </span>
                        </div>
                    </div>
                </div>
            )
            ) : (
                <>
                    <Empty
                        image="/cart_banner_image.png"
                        style={{ marginTop: 15 }}
                        description={
                            <span
                                className="empty-description fs-5 text-black">Chưa có sản phẩm trong giỏ hàng...</span>
                        }
                        imageStyle={{
                            width: '400px',
                            height: 'auto',
                            display: 'block',
                            margin: '0 auto'
                        }}
                    />
                </>
            )}

            <div className={styles.cartFooter}>
                <div className={cartItems && cartItems.length ? '' : 'd-none'}>
                    <div className={styles.totalAmount}>
                        <span className={styles.totalLabel}>TỔNG TIỀN:</span>
                        <span className={styles.totalValue}>{totalAmount.toLocaleString()}₫</span>
                    </div>
                    <Link href={"/checkout"}
                        className={styles.checkoutButton + ' btn text-white'}
                        onClick={onClose}
                    >
                        THANH TOÁN
                    </Link>
                </div>

                <div className={styles.footerLinks}>
                    {cartItems && cartItems.length ?
                        (<Link
                            href={"/cart"}
                            className={styles.footerLink} onClick={onClose}>Xem giỏ hàng</Link>) :
                        (<Link href="/" className={styles.footerLink} onClick={onClose}>Trở về trang chủ</Link>)
                    }
                    <Link href={"/product"} className={styles.footerLink} onClick={onClose}>
                        Khuyến mãi dành cho bạn
                    </Link>
                </div>
            </div>
        </Drawer>
    );
}
