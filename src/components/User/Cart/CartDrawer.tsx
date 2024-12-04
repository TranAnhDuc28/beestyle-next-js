import {useEffect, useState} from 'react';
import {Drawer, Button, Progress, Empty} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import Link from 'next/link';
import styles from './css/cartdrawer.module.css';
import Image from "next/image";
import {CART_KEY, removeItemFromCart} from "@/services/user/ShoppingCartService";
import QuantityControl from "@/components/User/Cart/QuantityControl";
import {FaShippingFast} from "react-icons/fa";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({open, onClose}: CartDrawerProps) {
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

    const condition = 498000;
    const totalAmount = cartItems.reduce((total, item) => total + item.total_price, 0);
    const result = (totalAmount / condition) * 100;
    const progress = result > 100 ? 100 : result;
    const remainingForFreeShipping = condition - totalAmount;
    const iconPosition = `${progress > 100 ? 100 : progress}%`;

    const handleQuantityChange = (index: number, newQuantity: number) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity = newQuantity;
        newCartItems[index].total_price = newQuantity * newCartItems[index].discounted_price;
        setCartItems(newCartItems);
        localStorage.setItem(CART_KEY, JSON.stringify(newCartItems));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <Drawer
            title={
                <>
                    <div className={styles.cartHeader}>
                        <h3 className={styles.cartTitle}>Giỏ hàng</h3>
                        <Button type="text" icon={<CloseOutlined style={{fontSize: 20}}/>} onClick={onClose}/>
                    </div>
                    <div className={cartItems && cartItems.length ? styles.shippingProgress : 'd-none'}>
                        <p className={styles.shippingText} style={{fontSize: 14}}>
                            {remainingForFreeShipping > 0 ? (
                                <>
                                    Bạn cần mua thêm
                                    <span
                                        className={styles.amountNeeded}> {remainingForFreeShipping.toLocaleString('vi-VN')}₫ </span>
                                    để được
                                    <span className="text-uppercase fw-bold"> miễn phí vận chuyển</span>
                                </>
                            ) : (
                                <>Bạn đã được <span className="text-uppercase fw-bold">miễn phí vận chuyển</span></>
                            )}
                        </p>
                        <div style={{position: "relative"}}>
                            <Progress
                                percent={progress}
                                showInfo={false}
                                strokeColor={progress < 100 ? '#f7941d' : '#3D9851'}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "-5px",
                                    left: iconPosition,
                                    transform: "translateX(-50%)",
                                    backgroundColor: progress < 100 ? "#f7941d" : "#3D9851",
                                    borderRadius: "50%",
                                    padding: "8px",
                                    transition: "left 0.4s ease-out"
                                }}
                            >
                                <FaShippingFast size={18} color="#333"/>
                            </div>
                        </div>
                    </div>
                </>
            }
            placement="right"
            onClose={onClose}
            open={open}
            width={500}
            closable={false}
        >
            {cartItems && cartItems.length ? cartItems.map((item, index) => (
                    <div className={styles.cartItem} key={index.toString()}>
                        <Link
                            href={`/product/${item.product_variant_id}/variant`}
                            onClick={onClose}
                        >
                            <Image
                                width={100}
                                height={100}
                                src={item.images[0].imageUrl}
                                alt={item.product_name}
                                className={styles.itemImage}
                            />
                        </Link>

                        <div className={styles.itemInfo}>
                            <Link
                                href={`/product/${item.product_variant_id}/variant`}
                                className="link-no-decoration"
                                onClick={onClose}
                            >
                                <span className={styles.itemTitle}>{item.product_name}</span>
                            </Link>
                            <p className={styles.itemVariant}>{item.color} / {item.size}</p>
                            <div className={styles.quantityControl}>
                                <QuantityControl
                                    value={item.quantity}
                                    onChange={(value) => handleQuantityChange(index, value)}
                                    onIncrement={() => handleQuantityChange(index, item.quantity + 1)}
                                    onDecrement={() => handleQuantityChange(index, Math.max(1, item.quantity - 1))}
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                                type="text"
                                onClick={(e) => {
                                    e.preventDefault();
                                    removeItemFromCart(item.shopping_cart_id);
                                }}
                                icon={<CloseOutlined/>}
                                className="ml-5"
                            />
                            <div className="d-flex flex-column align-items-center mt-4">
                                <span className={styles.itemPrice + ' mb-1'}>{item.discounted_price.toLocaleString('vi-VN')}₫</span>
                                <span className={styles.originalPrice}>{item.original_price.toLocaleString('vi-VN')}₫</span>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <>
                    <Empty
                        image="/cart_banner_image.png"
                        style={{marginTop: 15}}
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
                        <span className={styles.totalValue}>{totalAmount.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <Button type="primary" className={styles.checkoutButton}>
                        THANH TOÁN
                    </Button>
                </div>

                <div className={styles.footerLinks}>
                    {cartItems && cartItems.length ?
                        (<Link href={"/cart"} className={styles.footerLink}>Xem giỏ hàng</Link>) :
                        (<Link href="/" className={styles.footerLink}>Trở về trang sản phẩm</Link>)
                    }
                    <Link href="/" className={styles.footerLink}>
                        Khuyến mãi dành cho bạn
                    </Link>
                </div>
            </div>
        </Drawer>
    );
}