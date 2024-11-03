import React from "react";
import {useState} from 'react';
import Link from "next/link";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCategories = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="header-inner">
            <div className="container">
                <div className="cat-nav-head">
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
                                            <Link href="#">New Arrivals <i className="fa fa-angle-right"
                                                                           aria-hidden="true"></i></Link>
                                            <ul className="sub-category">
                                                <li><Link href="#">accessories</Link></li>
                                                <li><Link href="#">best selling</Link></li>
                                                <li><Link href="#">top 100 offer</Link></li>
                                                <li><Link href="#">sunglass</Link></li>
                                                <li><Link href="#">watch</Link></li>
                                                <li><Link href="#">man’s product</Link></li>
                                                <li><Link href="#">ladies</Link></li>
                                                <li><Link href="#">westrn dress</Link></li>
                                                <li><Link href="#">denim</Link></li>
                                            </ul>
                                        </li>
                                        <li className="main-mega">
                                            <Link href="#">best selling <i className="fa fa-angle-right"
                                                                           aria-hidden="true"></i></Link>
                                            <ul className="mega-menu">
                                                <li className="single-menu">
                                                    <Link href="#" className="title-link">Shop Kid's</Link>
                                                    <div className="image">
                                                        <img src="https://via.placeholder.com/225x155" alt="#"/>
                                                    </div>
                                                    <div className="inner-link">
                                                        <Link href="#">Kids Toys</Link>
                                                        <Link href="#">Kids Travel Car</Link>
                                                        <Link href="#">Kids Color Shape</Link>
                                                        <Link href="#">Kids Tent</Link>
                                                    </div>
                                                </li>
                                                <li className="single-menu">
                                                    <Link href="#" className="title-link">Shop Men's</Link>
                                                    <div className="image">
                                                        <img src="https://via.placeholder.com/225x155" alt="#"/>
                                                    </div>
                                                    <div className="inner-link">
                                                        <Link href="#">Watch</Link>
                                                        <Link href="#">T-shirt</Link>
                                                        <Link href="#">Hoodies</Link>
                                                        <Link href="#">Formal Pant</Link>
                                                    </div>
                                                </li>
                                                <li className="single-menu">
                                                    <Link href="#" className="title-link">Shop Women's</Link>
                                                    <div className="image">
                                                        <img src="https://via.placeholder.com/225x155" alt="#"/>
                                                    </div>
                                                    <div className="inner-link">
                                                        <Link href="#">Ladies Shirt</Link>
                                                        <Link href="#">Ladies Frog</Link>
                                                        <Link href="#">Ladies Sun Glass</Link>
                                                        <Link href="#">Ladies Watch</Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><Link href="#">accessories</Link></li>
                                        <li><Link href="#">top 100 offer</Link></li>
                                        <li><Link href="#">sunglass</Link></li>
                                        <li><Link href="#">watch</Link></li>
                                        <li><Link href="#">man’s product</Link></li>
                                        <li><Link href="#">ladies</Link></li>
                                        <li><Link href="#">westrn dress</Link></li>
                                        <li><Link href="#">denim</Link></li>
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
                                                <li className="active"><Link href="#">Home<i
                                                    className="ti-angle-down"></i></Link>
                                                    <ul className="dropdown">
                                                        <li><Link href={"/home"}>Trang chủ</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link href={"/category"}>Product</Link></li>
                                                <li><Link href="#">Service</Link></li>
                                                <li><Link href="#">Shop<i className="ti-angle-down"></i><span
                                                    className="new">New</span></Link>
                                                    <ul className="dropdown">
                                                        <li><Link href="#">Shop Grid</Link></li>
                                                        <li><Link href="#">Shop List</Link></li>
                                                        <li><Link href="#">shop Single</Link></li>
                                                        <li><Link href="#">Cart</Link></li>
                                                        <li><Link href="#">Checkout</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link href="#">Pages<i className="ti-angle-down"></i></Link>
                                                    <ul className="dropdown">
                                                        <li><Link href="#">About Us</Link></li>
                                                        <li><Link href="#">Login</Link></li>
                                                        <li><Link href="#">Register</Link></li>
                                                        <li><Link href="#">Mail Success</Link></li>
                                                        <li><Link href="#">404</Link></li>
                                                    </ul>
                                                </li>
                                                <li><Link href="#">Blog<i className="ti-angle-down"></i></Link>
                                                    <ul className="dropdown">
                                                        <li><Link href="#">Blog Grid</Link></li>
                                                        <li><Link href="#">Blog Grid Sidebar</Link></li>
                                                        <li><Link href="#">Blog Single</Link></li>
                                                        <li><Link href="#">Blog Single Sidebar</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li><Link href={"/contact"}>Contact Us</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}