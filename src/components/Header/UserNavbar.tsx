import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Layout, Menu, Badge, Button, Dropdown} from 'antd';
import {SearchOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import styles from './css/navbar.module.css';
import Image from "next/image";
import {LuShoppingBag} from "react-icons/lu";
import CartDrawer from "@/components/User/Cart/CartDrawer";
import {CART_KEY} from "@/services/user/ShoppingCartService";

const {Header} = Layout;

const categories: MenuProps['items'] = [
    {key: '1', label: 'Áo sơ mi'},
    {key: '2', label: 'Áo thun'},
    {key: '3', label: 'Áo khoác'},
];

const collections: MenuProps['items'] = [
    {key: '1', label: 'Xuân Hè 2024'},
    {key: '2', label: 'Thu Đông 2023'},
];

export default function Navbar() {
    const [cartCount, setCartCount] = useState<number>(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const fetchCartItems = () => {
        const cartItems = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        setCartCount(cartItems.length);
    };

    useEffect(() => {

        fetchCartItems();

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            fetchCartItems();
        };   

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <Link href="/">
                <Image src="/logo.png" alt="BeeStyle" className={styles.logo} width={100} height={90}/>
            </Link>

            <div className={styles.menuContainer}>
                <div className={styles.menu}>
                    <Menu mode="horizontal" className="border-none w-auto">
                        <Menu.Item key="product">
                            <Link href="" className="link-no-decoration">Sản phẩm</Link>
                        </Menu.Item>
                        <Menu.Item key="sale">
                            <Link className="link-no-decoration" href="">Sale</Link>
                        </Menu.Item>
                        <Menu.Item key="category">
                            <Dropdown menu={{items: categories}}>
                                <span>Danh mục</span>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item key="collection">
                            <Dropdown menu={{items: collections}}>
                                <span>Bộ sưu tập</span>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item key="news">
                            <span>Tin thời trang</span>
                        </Menu.Item>
                        <Menu.Item key="contact">
                            <Link href="" className="link-no-decoration">Liên hệ</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </div>

            <div className={styles.iconGroup}>
                <div className={styles.iconButton}>
                    <Button type="text" icon={<SearchOutlined style={{fontSize: 20}}/>}/>
                </div>
                <div className={styles.iconButton}>
                    <Button type="text" icon={<UserOutlined style={{fontSize: 20}}/>}/>
                </div>
                <div className={styles.iconButton} style={{marginTop: 5}}>
                    <Badge count={cartCount} size="default" style={{backgroundColor: '#F7941D'}}>
                        <Button type="text"
                                icon={<LuShoppingBag style={{fontSize: 20}} onClick={() => setIsCartOpen(true)}/>}/>
                    </Badge>

                    <CartDrawer
                        open={isCartOpen}
                        onClose={() => setIsCartOpen(false)}
                    />
                </div>
            </div>
        </Header>
    );
}