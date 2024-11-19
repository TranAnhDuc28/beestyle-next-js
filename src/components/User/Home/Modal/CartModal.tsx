import Link from "next/link";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {ImCross} from "react-icons/im";
import Image from "next/image";
import React from "react";

function CartModal () {
    return (
        <div className="col-lg-2 col-md-3 col-12">
            <div className="right-bar">
                <div className="sinlge-bar shopping">
                    <Link href={"/cart"} className="single-icon">
                        <AiOutlineShoppingCart size={30}/>
                        <span className="total-count">2</span></Link>
                    <div className="shopping-item">
                        <div className="dropdown-cart-header">
                            <span>2 sản phẩm</span>
                            <Link href={"/cart"} style={{textDecoration: 'none'}}>Xem giỏ hàng</Link>
                        </div>
                        <ul className="shopping-list">
                            <li>
                                <Link
                                    href="#"
                                    className="remove d-flex justify-content-center align-items-center"
                                    title="Xoá khỏi giỏ hàng"
                                >
                                    <ImCross/>
                                </Link>
                                <Link className="cart-img" href="#">
                                    <Image
                                        src="https://via.placeholder.com/70x70"
                                        alt="IMG"
                                        width={70}
                                        height={70}
                                    />
                                </Link>
                                <h4><Link href="#" className="link-no-decoration">Woman Ring</Link></h4>
                                <p className="quantity">1x - <span className="amount">350.000 VND</span></p>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="remove d-flex justify-content-center align-items-center"
                                    title="Xoá khỏi giỏ hàng"
                                >
                                    <ImCross/>
                                </Link>
                                <Link className="cart-img" href="#">
                                    <Image
                                        src="https://via.placeholder.com/70x70"
                                        alt="IMG"
                                        width={70}
                                        height={70}
                                    />
                                </Link>
                                <h4><Link href="#" className="link-no-decoration">Woman Necklace</Link></h4>
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
    )
}

export default CartModal;