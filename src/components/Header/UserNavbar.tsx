import React from "react";
import { useState } from 'react';

export default function NavBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleCategories = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="header-inner">
            <div className="container">
                <div className="cat-nav-head">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="all-category">
                                <h3 className="cat-heading" onClick={toggleCategories}>
                                    <i className="fa fa-bars" aria-hidden="true"></i> CATEGORIES
                                    <i className={`fa ${isOpen ? 'fa-angle-up' : 'fa-angle-down'} ml-2`} aria-hidden="true"></i>
                                </h3>
                                {isOpen && (
                                    <ul className="main-category">
                                        <li>
                                            <a href="#">New Arrivals <i className="fa fa-angle-right" aria-hidden="true"></i></a>
                                            <ul className="sub-category">
                                                <li><a href="#">accessories</a></li>
                                                <li><a href="#">best selling</a></li>
                                                <li><a href="#">top 100 offer</a></li>
                                                <li><a href="#">sunglass</a></li>
                                                <li><a href="#">watch</a></li>
                                                <li><a href="#">man’s product</a></li>
                                                <li><a href="#">ladies</a></li>
                                                <li><a href="#">westrn dress</a></li>
                                                <li><a href="#">denim</a></li>
                                            </ul>
                                        </li>
                                        <li className="main-mega">
                                            <a href="#">best selling <i className="fa fa-angle-right" aria-hidden="true"></i></a>
                                            <ul className="mega-menu">
                                                <li className="single-menu">
                                                    <a href="#" className="title-link">Shop Kid's</a>
                                                    <div className="image">
                                                        <img src="https://via.placeholder.com/225x155" alt="#" />
                                                    </div>
                                                    <div className="inner-link">
                                                        <a href="#">Kids Toys</a>
                                                        <a href="#">Kids Travel Car</a>
                                                        <a href="#">Kids Color Shape</a>
                                                        <a href="#">Kids Tent</a>
                                                    </div>
                                                </li>
                                                <li className="single-menu">
                                                    <a href="#" className="title-link">Shop Men's</a>
                                                    <div className="image">
                                                        <img src="https://via.placeholder.com/225x155" alt="#" />
                                                    </div>
                                                    <div className="inner-link">
                                                        <a href="#">Watch</a>
                                                        <a href="#">T-shirt</a>
                                                        <a href="#">Hoodies</a>
                                                        <a href="#">Formal Pant</a>
                                                    </div>
                                                </li>
                                                <li className="single-menu">
                                                    <a href="#" className="title-link">Shop Women's</a>
                                                    <div className="image">
                                                        <img src="https://via.placeholder.com/225x155" alt="#" />
                                                    </div>
                                                    <div className="inner-link">
                                                        <a href="#">Ladies Shirt</a>
                                                        <a href="#">Ladies Frog</a>
                                                        <a href="#">Ladies Sun Glass</a>
                                                        <a href="#">Ladies Watch</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><a href="#">accessories</a></li>
                                        <li><a href="#">top 100 offer</a></li>
                                        <li><a href="#">sunglass</a></li>
                                        <li><a href="#">watch</a></li>
                                        <li><a href="#">man’s product</a></li>
                                        <li><a href="#">ladies</a></li>
                                        <li><a href="#">westrn dress</a></li>
                                        <li><a href="#">denim</a></li>
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
                                                <li className="active"><a href="#">Home<i className="ti-angle-down"></i></a>
                                                    <ul className="dropdown">
                                                        <li><a href="index.html">Home Ecommerce V1</a></li>
                                                        <li><a href="index2.html">Home Ecommerce V2</a></li>
                                                        <li><a href="index3.html">Home Ecommerce V3</a></li>
                                                        <li><a href="index4.html">Home Ecommerce V4</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Product</a></li>
                                                <li><a href="#">Service</a></li>
                                                <li><a href="#">Shop<i className="ti-angle-down"></i><span className="new">New</span></a>
                                                    <ul className="dropdown">
                                                        <li><a href="shop-grid.html">Shop Grid</a></li>
                                                        <li><a href="shop-list.html">Shop List</a></li>
                                                        <li><a href="shop-single.html">shop Single</a></li>
                                                        <li><a href="cart.html">Cart</a></li>
                                                        <li><a href="checkout.html">Checkout</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Pages<i className="ti-angle-down"></i></a>
                                                    <ul className="dropdown">
                                                        <li><a href="about-us.html">About Us</a></li>
                                                        <li><a href="login.html">Login</a></li>
                                                        <li><a href="register.html">Register</a></li>
                                                        <li><a href="mail-success.html">Mail Success</a></li>
                                                        <li><a href="404.html">404</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#">Blog<i className="ti-angle-down"></i></a>
                                                    <ul className="dropdown">
                                                        <li><a href="blog-grid.html">Blog Grid</a></li>
                                                        <li><a href="blog-grid-sidebar.html">Blog Grid Sidebar</a></li>
                                                        <li><a href="blog-single.html">Blog Single</a></li>
                                                        <li><a href="blog-single-sidebar.html">Blog Single Sidebar</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="contact.html">Contact Us</a></li>
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