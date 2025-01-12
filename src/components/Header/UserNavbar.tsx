import React, {memo, useContext, useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {Layout, Menu, Badge, Button, Flex, Typography, Tooltip} from "antd";
import {SearchOutlined, UserOutlined} from "@ant-design/icons";
import type {MenuProps} from "antd";
import {usePathname} from "next/navigation";
import styles from "./css/navbar.module.css";
import {LuShoppingBag} from "react-icons/lu";
import CartDrawer from "@/components/User/Cart/CartDrawer";
import {CART_KEY, checkShoppingCartData} from "@/services/user/ShoppingCartService";
import SearchDrawer from "../User/Home/Search/SearchDrawer";
import {useAuthentication} from "@/components/Context/AuthenticationProvider";

const {Header} = Layout;
const {Text} = Typography;

const Navbar: React.FC = () => {
    const authentication = useAuthentication();
    const [cartCount, setCartCount] = useState<number>(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const pathname = usePathname();

    const fetchCartItems = () => {
        const cartItems = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        setCartCount(cartItems.length);
    };

    useEffect(() => {
        fetchCartItems();
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 110);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener('cartUpdated', fetchCartItems);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('cartUpdated', fetchCartItems);
        };
    }, []);

    const handleCartOpen = async () => {
        if (pathname.includes('/cart') || pathname.includes('/checkout') || pathname.includes('/vnpay')) {
            setIsCartOpen(false);
        } else {
            await checkShoppingCartData();
            setIsCartOpen(true);
        }
    }

    const handleSearchOpen = () => setSearchOpen(true);

    const menuItems: MenuProps["items"] = useMemo(() => [
        {
            key: "category",
            label: (
                <Link href={"/home"} className="link-no-decoration">
                    <Text style={{fontSize: 18}} strong></Text>
                </Link>
            )
        },
        {
            key: "home",
            label: (
                <Link href={"/"} className="link-no-decoration">
                    <Text style={{fontSize: 18}} strong>Trang chủ</Text>
                </Link>
            )
        },
        {
            key: "product",
            label: (
                <Link href={"/product"} className="link-no-decoration">
                    <Text style={{fontSize: 18}} strong>Sản phẩm</Text>
                </Link>
            )
        },
        {
            key: "news",
            label: (
                <Link href={"/news"} className="link-no-decoration">
                    <Text style={{fontSize: 18}} strong>Tin thời trang</Text>
                </Link>
            )
        },
        {
            key: "contact",
            label: (
                <Link href={"/contact"} className="link-no-decoration">
                    <Text style={{fontSize: 18}} strong>Liên hệ</Text>
                </Link>
            )
        },
        {
            key: "order-lookup",
            label: (
                <Link href={"/order-lookup"} className="link-no-decoration">
                    <Text style={{fontSize: 18}} strong>Tra cứu đơn hàng</Text>
                </Link>
            )
        },
    ], []);

    return (
        <Header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
            <Link href="/">
                <img
                    src="/logo.png"
                    alt="BeeStyle"
                    width={150}
                    height="auto"
                />
            </Link>

            <Menu
                mode="horizontal"
                className={styles.menuContainer}
                items={menuItems}
            />

            <Flex align="center" gap={15}>
                <div className={styles.iconButton}>
                    <Tooltip
                        title={
                            <span style={{fontSize: 12, padding: 0}}>
                                Tìm kiếm
                            </span>
                        }
                        color="#F7941D"
                    >
                        <Button
                            type="text"
                            icon={<SearchOutlined style={{fontSize: 20}}/>}
                            onClick={handleSearchOpen}
                        />
                    </Tooltip>
                </div>
                <div className={styles.iconButton}>
                    <Tooltip
                        title={
                            <span style={{fontSize: 12, padding: 0}}>
                                Tài khoản
                            </span>
                        }
                        color="#F7941D"
                    >
                        <Link href={authentication?.authentication ? '/user-profile' : '/account'} passHref>
                            <Button
                                type="text"
                                icon={<UserOutlined style={{fontSize: 20}}/>}
                            />
                        </Link>
                    </Tooltip>
                </div>
                <div className={styles.iconButton} style={{marginTop: 5}}>
                    <Tooltip
                        title={
                            <span style={{fontSize: 12, padding: 0}}>
                                Giỏ hàng
                            </span>
                        }
                        color="#F7941D"
                    >
                        <Badge
                            count={cartCount}
                            size="default"
                            style={{backgroundColor: "#F7941D"}}
                        >
                            <Button
                                type="text"
                                icon={<LuShoppingBag style={{fontSize: 20}} onClick={handleCartOpen}/>}
                            />
                        </Badge>
                    </Tooltip>
                    <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)}/>
                    <SearchDrawer open={isSearchOpen} onClose={() => setSearchOpen(false)}/>
                </div>
            </Flex>
        </Header>
    );
}
export default memo(Navbar);
