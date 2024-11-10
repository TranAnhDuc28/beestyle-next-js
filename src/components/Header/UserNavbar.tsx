import React from "react";
import {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {usePathname} from 'next/navigation';
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const openCategories = () => setIsOpen(true);
    const closeCategories = () => setIsOpen(false);

    const pathname = usePathname();

    return (
        <div className="header-inner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3" style={{marginLeft: 160}}>
                        <div
                            className="all-category"
                            onMouseEnter={openCategories}
                            onMouseLeave={closeCategories}
                        >
                            <h3 className="cat-heading">
                                {isOpen ? (
                                    <FaAngleUp className="mr-2 arrow-icon" aria-hidden="true"/>
                                ) : (
                                    <FaAngleDown className="mr-2 arrow-icon" aria-hidden="true"/>
                                )}
                                DANH MỤC
                            </h3>
                            {isOpen && (
                                <ul className="main-category">
                                    <li>
                                        <Link href="#" className="link-no-decoration ">
                                            Hàng mới về <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        </Link>
                                        <ul className="sub-category">
                                            <li><Link href="#" className="link-no-decoration ">Phụ kiện</Link></li>
                                            <li><Link href="#" className="link-no-decoration ">Bán chạy</Link></li>
                                            <li><Link href="#" className="link-no-decoration ">Giảm giá sốc</Link></li>
                                            <li><Link href="#" className="link-no-decoration ">Áo thun nam</Link></li>
                                            <li><Link href="#" className="link-no-decoration ">Áo polo nam</Link></li>
                                            <li><Link href="#" className="link-no-decoration ">Áo thun nữ</Link></li>
                                            <li><Link href="#" className="link-no-decoration ">Áo polo nữ</Link></li>
                                        </ul>
                                    </li>
                                    <li className="main-mega">
                                        <Link href="#" className="link-no-decoration ">
                                            Bán chạy nhất <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        </Link>
                                        <ul className="mega-menu">
                                            <li className="single-menu">
                                                <Link href="#" className="title-link link-no-decoration ">Trẻ em</Link>
                                                <div className="image">
                                                    <Image width={225} height={155}
                                                           src="https://via.placeholder.com/225x155" alt="#"/>
                                                </div>
                                                <div className="inner-link">
                                                    <Link href="#" className="link-no-decoration ">Kids Toys</Link>
                                                    <Link href="#" className="link-no-decoration ">Kids Travel
                                                        Car</Link>
                                                    <Link href="#" className="link-no-decoration ">Kids Color
                                                        Shape</Link>
                                                    <Link href="#" className="link-no-decoration ">Kids Tent</Link>
                                                </div>
                                            </li>
                                            <li className="single-menu">
                                                <Link href="#" className="title-link link-no-decoration ">Shop
                                                    Nam</Link>
                                                <div className="image">
                                                    <Image width={225} height={155}
                                                           src="https://via.placeholder.com/225x155" alt="#"/>
                                                </div>
                                                <div className="inner-link">
                                                    <Link href="#" className="link-no-decoration ">Watch</Link>
                                                    <Link href="#" className="link-no-decoration ">T-shirt</Link>
                                                    <Link href="#" className="link-no-decoration ">Hoodies</Link>
                                                    <Link href="#" className="link-no-decoration ">Formal Pant</Link>
                                                </div>
                                            </li>
                                            <li className="single-menu">
                                                <Link href="#" className="title-link link-no-decoration ">Shop Nữ</Link>
                                                <div className="image">
                                                    <Image width={225} height={155}
                                                           src="https://via.placeholder.com/225x155" alt="#"/>
                                                </div>
                                                <div className="inner-link">
                                                    <Link href="#" className="link-no-decoration ">Ladies Shirt</Link>
                                                    <Link href="#" className="link-no-decoration ">Ladies Frog</Link>
                                                    <Link href="#" className="link-no-decoration ">Ladies Sun
                                                        Glass</Link>
                                                    <Link href="#" className="link-no-decoration ">Ladies Watch</Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><Link href="#" className="link-no-decoration ">Thời trang nam</Link></li>
                                    <li><Link href="#" className="link-no-decoration ">Thời trang nữ</Link></li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="col-lg-7 col-12">
                        <div className="menu-area">
                            <nav className="navbar navbar-expand-lg">
                                <div className="navbar-collapse">
                                    <div className="nav-inner" style={{width: 600}}>
                                        <ul className="nav main-menu menu navbar-nav">
                                            <li className={pathname === "/home" ? "active m-0" : "m-0"}>
                                                <Link href={"/home"} className="link-no-decoration text-center"
                                                      style={{width: 150}}>Trang
                                                    chủ</Link>
                                            </li>
                                            <li className={pathname === "/category" ? "active m-0" : "m-0"}>
                                                <Link href={"/category"} className="link-no-decoration text-center"
                                                      style={{width: 150}}>Sản phẩm</Link>
                                            </li>
                                            <li className={pathname?.startsWith("/blog") ? "active m-0" : "m-0"}>
                                                <Link href="#" className="link-no-decoration text-center"
                                                      style={{width: 150}}>
                                                    <div className="d-flex align-items-center">
                                                        Tin thời trang
                                                    </div>
                                                </Link>
                                            </li>
                                            <li className={pathname === "/contact" ? "active" : ""}>
                                                <Link href={"/contact"} className="link-no-decoration text-center"
                                                      style={{width: 150}}>Liên hệ</Link>
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