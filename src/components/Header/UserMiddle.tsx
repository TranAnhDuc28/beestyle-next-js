import Image from 'next/image';
import Link from 'next/link';

export default function MiddleBar() {
    return (
        <div className="middle-inner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-12">
                        <div className="logo">
                            <Link href="/">
                                <Image
                                    src="https://theme.hstatic.net/1000290074/1001116344/14/logo.png?v=5722"
                                    alt="logo"
                                    width={135}
                                    height={50} // Set appropriate height
                                />
                            </Link>
                        </div>
                        <div className="search-top">
                            <div className="top-search">
                                <Link href="#0">
                                    <i className="ti-search"></i>
                                </Link>
                            </div>
                            <div className="search-top">
                                <form className="search-form">
                                    <input type="text" placeholder="Search here..." name="search" />
                                    <button value="search" type="submit"><i className="ti-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="mobile-nav"></div>
                    </div>
                    <div className="col-lg-8 col-md-7 col-12">
                        <div className="search-bar-top">
                            <div className="search-bar">
                                <select>
                                    <option selected>All Category</option>
                                    <option>watch</option>
                                    <option>mobile</option>
                                    <option>kid’s item</option>
                                </select>
                                <form>
                                    <input name="search" placeholder="Tìm kiếm sản phẩm....." type="search" />
                                    <button className="btnn"><i className="ti-search"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-12">
                        <div className="right-bar">
                            <div className="sinlge-bar">
                                <Link href="#" className="single-icon"><i className="fa fa-heart-o" aria-hidden="true"></i></Link>
                            </div>
                            <div className="sinlge-bar">
                                <Link href="#" className="single-icon"><i className="fa fa-user-circle-o" aria-hidden="true"></i></Link>
                            </div>
                            <div className="sinlge-bar shopping">
                                <Link href="#" className="single-icon"><i className="ti-bag"></i> <span className="total-count">2</span></Link>
                                <div className="shopping-item">
                                    <div className="dropdown-cart-header">
                                        <span>2 Items</span>
                                        <Link href="#">View Cart</Link>
                                    </div>
                                    <ul className="shopping-list">
                                        <li>
                                            <Link href="#" className="remove" title="Remove this item"><i className="fa fa-remove"></i></Link>
                                            <Link className="cart-img" href="#"><img src="https://via.placeholder.com/70x70" alt="#" /></Link>
                                            <h4><Link href="#">Woman Ring</Link></h4>
                                            <p className="quantity">1x - <span className="amount">$99.00</span></p>
                                        </li>
                                        <li>
                                            <Link href="#" className="remove" title="Remove this item"><i className="fa fa-remove"></i></Link>
                                            <Link className="cart-img" href="#"><img src="https://via.placeholder.com/70x70" alt="#" /></Link>
                                            <h4><Link href="#">Woman Necklace</Link></h4>
                                            <p className="quantity">1x - <span className="amount">$35.00</span></p>
                                        </li>
                                    </ul>
                                    <div className="bottom">
                                        <div className="total">
                                            <span>Total</span>
                                            <span className="total-amount">$134.00</span>
                                        </div>
                                        <Link href="checkout.html" className="btn animate">Checkout</Link>
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