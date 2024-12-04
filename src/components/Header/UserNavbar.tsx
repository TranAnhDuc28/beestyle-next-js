import { useEffect, useState } from "react";
import Link from "next/link";
import { Layout, Menu, Badge, Button, Dropdown } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { usePathname } from "next/navigation";
import styles from "./css/navbar.module.css";
import Image from "next/image";
import { LuShoppingBag } from "react-icons/lu";
import CartDrawer from "@/components/User/Cart/CartDrawer";
import { CART_KEY } from "@/services/user/ShoppingCartService";

const { Header } = Layout;

const categories: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link href="#" className="link-no-decoration">
        Áo sơ mi
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link href="#" className="link-no-decoration">
        Áo thun
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link href="#" className="link-no-decoration">
        Áo khoác
      </Link>
    ),
  },
];

const collections: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link href="#" className="link-no-decoration">
        Xuân Hè 2024
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link href="#" className="link-no-decoration">
        Thu Đông 2023
      </Link>
    ),
  },
];

const menuItems: MenuProps["items"] = [
  {
    key: "category",
    label: (
      <Dropdown menu={{ items: categories }}>
        <span>Danh mục</span>
      </Dropdown>
    ),
  },
  {
    key: "sale",
    label: (
      <Link href="#" className="link-no-decoration">
        Sale
      </Link>
    ),
  },
  {
    key: "product",
    label: (
      <Link href={"/category"} className="link-no-decoration">
        Sản phẩm
      </Link>
    ),
  },
  {
    key: "collection",
    label: (
      <Dropdown menu={{ items: collections }}>
        <span>Bộ sưu tập</span>
      </Dropdown>
    ),
  },
  {
    key: "news",
    label: (
      <Link href={"/news"} className="link-no-decoration">
        Tin thời trang
      </Link>
    ),
  },
  {
    key: "contact",
    label: (
      <Link href={"/contact"} className="link-no-decoration">
        Liên hệ
      </Link>
    ),
  },
];

export default function Navbar() {
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

  return (
    <Header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="BeeStyle"
          className={styles.logo}
          width={100}
          height={90}
        />
      </Link>

      <div className={styles.menuContainer}>
        <Menu
          mode="horizontal"
          className="border-none w-max"
          items={menuItems}
          selectedKeys={[activeKey]}
        />
      </div>

      <div className={styles.iconGroup}>
        <div className={styles.iconButton}>
          <Button
            type="text"
            icon={<SearchOutlined style={{ fontSize: 20 }} />}
          />
        </div>
        <div className={styles.iconButton}>
          <Button
            type="text"
            icon={<UserOutlined style={{ fontSize: 20 }} />}
          />
        </div>
        <div className={styles.iconButton} style={{ marginTop: 5 }}>
          <Badge
            count={cartCount}
            size="default"
            style={{ backgroundColor: "#F7941D" }}
          >
            <Button
              type="text"
              icon={
                <LuShoppingBag
                  style={{ fontSize: 20 }}
                  onClick={() => setIsCartOpen(true)}
                />
              }
            />
          </Badge>
          <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>
    </Header>
  );
}
