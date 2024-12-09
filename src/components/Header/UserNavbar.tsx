import React, {memo, useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {Layout, Menu, Badge, Button, Dropdown, Flex, Typography} from "antd";
import {SearchOutlined, UserOutlined} from "@ant-design/icons";
import type {MenuProps} from "antd";
import {usePathname} from "next/navigation";
import styles from "./css/navbar.module.css";
import Image from "next/image";
import {LuShoppingBag} from "react-icons/lu";
import CartDrawer from "@/components/User/Cart/CartDrawer";
import {CART_KEY} from "@/services/user/ShoppingCartService";

const {Header} = Layout;
const {Text} = Typography;

const categories: MenuProps["items"] = [
    {key: "1", label: <Link href="#" className="link-no-decoration">Áo sơ mi</Link>},
    {key: "2", label: <Link href="#" className="link-no-decoration">Áo thun</Link>},
    {key: "3", label: <Link href="#" className="link-no-decoration">Áo khoác</Link>},
];

const Navbar: React.FC = () => {
    const [cartCount, setCartCount] = useState<number>(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
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
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const activeKey = pathname === "/" || pathname === "/home" ? "" : pathname;

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
                <Link href={"/home"} className="link-no-decoration">
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
    ], [categories]);

    return (
        <Header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="BeeStyle"
                    width={100}
                    height={90}
                />
            </Link>

            <Menu
                mode="horizontal"
                className={styles.menuContainer}
                items={menuItems}
                selectedKeys={[activeKey]}
            />

            <Flex align="center" gap={15}>
                <div className={styles.iconButton}>
                    <Button type="text" icon={<SearchOutlined style={{fontSize: 20}}/>}/>
                </div>
                <div className={styles.iconButton}>
                    <Button type="text" icon={<UserOutlined style={{fontSize: 20}}/>}/>
                </div>
                <div className={styles.iconButton} style={{marginTop: 5}}>
                    <Badge
                        count={cartCount}
                        size="default"
                        style={{backgroundColor: "#F7941D"}}
                    >
                        <Button
                            type="text"
                            icon={<LuShoppingBag style={{fontSize: 20}} onClick={() => setIsCartOpen(true)}/>}
                        />
                    </Badge>
                    <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)}/>
                </div>
            </Flex>
        </Header>
    );
}
export default memo(Navbar)
