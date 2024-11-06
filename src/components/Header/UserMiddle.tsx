import React from "react";
import {FaRegHeart, FaRegUserCircle} from "react-icons/fa";
import {TfiSearch} from "react-icons/tfi";
import {AiOutlineShoppingCart} from "react-icons/ai";
import Image from 'next/image';
import Link from 'next/link';
import {Button, Form, Input} from "antd";

export default function MiddleBar() {
    return (
        <div className="middle-inner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-12">
                        <div className="logo">
                            <Link href={"/home"}>
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={135}
                                    height={50}
                                />
                            </Link>
                        </div>
                        <div className="search-top">
                            <div className="top-search">
                                <Link href="#">
                                    <button value="search" type="submit"><TfiSearch/></button>
                                </Link>
                            </div>
                            <div className="search-top">
                                <form className="search-form">
                                    <input type="text" placeholder="Search here..." name="search"/>
                                    <button value="search" type="submit"><i className="ti-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="mobile-nav"></div>
                    </div>
                    <div className="col-lg-8 col-md-7 col-12">
                        <div className="search-bar-top">
                            <div className="search-bar" style={{borderRadius: 50}}>
                                <Form layout="inline">
                                    <Form.Item style={{marginRight: 0}}>
                                        <Input placeholder="Tìm kiếm sản phẩm tại đây....." variant={"borderless"}/>
                                    </Form.Item>
                                    <Form.Item style={{marginRight: 0}}>
                                        <Button icon={<TfiSearch/>} className="btnn"/>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-12">
                        <div className="right-bar">
                            <div className="sinlge-bar">
                                <Link href="#" className="single-icon"><FaRegHeart aria-hidden="true"/></Link>
                            </div>
                            <div className="sinlge-bar">
                                <Link href="#" className="single-icon"><FaRegUserCircle aria-hidden="true"/></Link>
                            </div>
                            <div className="sinlge-bar shopping">
                                <Link href="#" className="single-icon">
                                    <AiOutlineShoppingCart size={24}/>
                                    <span className="total-count">2</span></Link>
                                <div className="shopping-item">
                                    <div className="dropdown-cart-header">
                                        <span>2 sản phẩm</span>
                                        <Link href="#" style={{textDecoration: 'none'}}>Xem giỏ hàng</Link>
                                    </div>
                                    <ul className="shopping-list">
                                        <li>
                                            <Link href="#" className="remove" title="Remove this item"><i
                                                className="fa fa-remove"></i></Link>
                                            <Link className="cart-img" href="#">
                                                <Image
                                                    src="https://via.placeholder.com/70x70"
                                                    alt="IMG"
                                                    width={70}
                                                    height={70}
                                                />
                                            </Link>
                                            <h4><Link href="#">Woman Ring</Link></h4>
                                            <p className="quantity">1x - <span className="amount">350.000 VND</span></p>
                                        </li>
                                        <li>
                                            <Link href="#" className="remove" title="Remove this item"><i
                                                className="fa fa-remove"></i></Link>
                                            <Link className="cart-img" href="#">
                                                <Image
                                                    src="https://via.placeholder.com/70x70"
                                                    alt="IMG"
                                                    width={70}
                                                    height={70}
                                                />
                                            </Link>
                                            <h4><Link href="#">Woman Necklace</Link></h4>
                                            <p className="quantity">1x - <span className="amount">400.000 VND</span></p>
                                        </li>
                                    </ul>
                                    <div className="bottom">
                                        <div className="total">
                                            <span>Tổng</span>
                                            <span className="total-amount">750.000 VND</span>
                                        </div>
                                        <Link href={"/checkout"} className="btn animate">Thanh toán</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}