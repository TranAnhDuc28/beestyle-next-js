import React from "react";
import {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {usePathname} from 'next/navigation';
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCategories = () => {
        setIsOpen(!isOpen);
    };

    const pathname = usePathname();

    return (
        <div className="header-inner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="all-category">
                            <h3 className="cat-heading" onClick={toggleCategories}>
                                {isOpen ? (
                                    <FaAngleUp className="mr-2 arrow-icon" aria-hidden="true"/>
                                ) : (
                                    <FaAngleDown className="mr-2 arrow-icon" aria-hidden="true"/>
                                )}
                                CATEGORIES
                            </h3>
                            {isOpen && (
                                <ul className="main-category">
                                    <li>
                                        <Link href="#" className="link-no-decoration">New Arrivals <i
                                            className="fa fa-angle-right"
                                            aria-hidden="true"></i></Link>
                                        <ul className="sub-category">
                                            <li><Link href="#" className="link-no-decoration">accessories</Link></li>
                                            <li><Link href="#" className="link-no-decoration">best selling</Link></li>
                                            <li><Link href="#" className="link-no-decoration">top 100 offer</Link></li>
                                            <li><Link href="#" className="link-no-decoration">sunglass</Link></li>
                                            <li><Link href="#" className="link-no-decoration">watch</Link></li>
                                            <li><Link href="#" className="link-no-decoration">man’s product</Link></li>
                                            <li><Link href="#" className="link-no-decoration">ladies</Link></li>
                                            <li><Link href="#" className="link-no-decoration">westrn dress</Link></li>
                                            <li><Link href="#" className="link-no-decoration">denim</Link></li>
                                        </ul>
                                    </li>
                                    <li className="main-mega">
                                        <Link href="#" className="link-no-decoration">best selling <i
                                            className="fa fa-angle-right"
                                            aria-hidden="true"></i></Link>
                                        <ul className="mega-menu">
                                            <li className="single-menu">
                                                <Link href="#" className="title-link link-no-decoration">Shop
                                                    Kid&#39;s</Link>
                                                <div className="image">
                                                    <Image width={225} height={155}
                                                           src="https://via.placeholder.com/225x155" alt="#"/>
                                                </div>
                                                <div className="inner-link">
                                                    <Link href="#" className="link-no-decoration">Kids Toys</Link>
                                                    <Link href="#" className="link-no-decoration">Kids Travel Car</Link>
                                                    <Link href="#" className="link-no-decoration">Kids Color
                                                        Shape</Link>
                                                    <Link href="#" className="link-no-decoration">Kids Tent</Link>
                                                </div>
                                            </li>
                                            <li className="single-menu">
                                                <Link href="#" className="title-link link-no-decoration">Shop
                                                    Men&#39;s</Link>
                                                <div className="image">
                                                    <Image width={225} height={155}
                                                           src="https://via.placeholder.com/225x155" alt="#"/>
                                                </div>
                                                <div className="inner-link">
                                                    <Link href="#" className="link-no-decoration">Watch</Link>
                                                    <Link href="#" className="link-no-decoration">T-shirt</Link>
                                                    <Link href="#" className="link-no-decoration">Hoodies</Link>
                                                    <Link href="#" className="link-no-decoration">Formal Pant</Link>
                                                </div>
                                            </li>
                                            <li className="single-menu">
                                                <Link href="#" className="title-link link-no-decoration">Shop
                                                    Women&#39;s</Link>
                                                <div className="image">
                                                    <Image width={225} height={155}
                                                           src="https://via.placeholder.com/225x155" alt="#"/>
                                                </div>
                                                <div className="inner-link">
                                                    <Link href="#" className="link-no-decoration">Ladies Shirt</Link>
                                                    <Link href="#" className="link-no-decoration">Ladies Frog</Link>
                                                    <Link href="#" className="link-no-decoration">Ladies Sun
                                                        Glass</Link>
                                                    <Link href="#" className="link-no-decoration">Ladies Watch</Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><Link href="#" className="link-no-decoration">accessories</Link></li>
                                    <li><Link href="#" className="link-no-decoration">top 100 offer</Link></li>
                                    <li><Link href="#" className="link-no-decoration">sunglass</Link></li>
                                    <li><Link href="#" className="link-no-decoration">watch</Link></li>
                                    <li><Link href="#" className="link-no-decoration">man’s product</Link></li>
                                    <li><Link href="#" className="link-no-decoration">ladies</Link></li>
                                    <li><Link href="#" className="link-no-decoration">westrn dress</Link></li>
                                    <li><Link href="#" className="link-no-decoration">denim</Link></li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-9 col-12">
                        <div className="menu-area">
                            <nav className="navbar navbar-expand-lg">
                                <div className="navbar-collapse">
                                    <div className="nav-inner">
                                        <ul className="nav main-menu menu navbar-nav">
                                            <li className={pathname === "/home" ? "active" : ""}>
                                                <Link href={"/home"} className="link-no-decoration px-4">Home</Link>
                                            </li>
                                            <li className={pathname === "/category" ? "active" : ""}>
                                                <Link href={"/category"} className="link-no-decoration">Product</Link>
                                            </li>
                                            <li className={pathname === "/service" ? "active" : ""}>
                                                <Link href="#" className="link-no-decoration">Service</Link>
                                            </li>
                                            <li className={pathname?.startsWith("/shop") ? "active" : ""}>
                                                <Link href="#" className="link-no-decoration">
                                                    <div className="d-flex align-items-center">
                                                        Shop <FaAngleDown className="ml-1"/>
                                                    </div>
                                                    <span className="new">New</span>
                                                </Link>
                                                <ul className="dropdown">
                                                    <li><Link href="#" className="link-no-decoration">Shop Grid</Link>
                                                    </li>
                                                    <li><Link href="#" className="link-no-decoration">Shop List</Link>
                                                    </li>
                                                    <li><Link href="#" className="link-no-decoration">Shop Single</Link>
                                                    </li>
                                                    <li><Link href="#" className="link-no-decoration">Cart</Link></li>
                                                    <li><Link href="#" className="link-no-decoration">Checkout</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className={pathname?.startsWith("/pages") ? "active" : ""}>
                                                <Link href="#" className="link-no-decoration">
                                                    <div className="d-flex align-items-center">
                                                        Pages <FaAngleDown className="ml-1"/>
                                                    </div>
                                                </Link>
                                                <ul className="dropdown">
                                                    <li><Link href="#" className="link-no-decoration">About Us</Link>
                                                    </li>
                                                    <li><Link href="#" className="link-no-decoration">Login</Link></li>
                                                    <li><Link href="#" className="link-no-decoration">Register</Link>
                                                    </li>
                                                    <li><Link href="#" className="link-no-decoration">Mail
                                                        Success</Link></li>
                                                    <li><Link href="#" className="link-no-decoration">404</Link></li>
                                                </ul>
                                            </li>
                                            <li className={pathname?.startsWith("/blog") ? "active" : ""}>
                                                <Link href="#" className="link-no-decoration">
                                                    <div className="d-flex align-items-center">
                                                        Blog <FaAngleDown className="ml-1"/>
                                                    </div>
                                                </Link>
                                                <ul className="dropdown">
                                                    <li><Link href="#" className="link-no-decoration">Blog Grid</Link>
                                                    </li>
                                                    <li><Link href="#" className="link-no-decoration">Blog Grid
                                                        Sidebar</Link></li>
                                                    <li><Link href="#" className="link-no-decoration">Blog Single</Link>
                                                    </li>
                                                    <li><Link href="#" className="link-no-decoration">Blog Single
                                                        Sidebar</Link></li>
                                                </ul>
                                            </li>
                                            <li className={pathname === "/contact" ? "active" : ""}>
                                                <Link href={"/contact"} className="link-no-decoration">Contact Us</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}