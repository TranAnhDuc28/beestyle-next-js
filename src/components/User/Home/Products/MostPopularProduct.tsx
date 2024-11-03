import Image from "next/image";
import Link from "next/link";

function MostPopularProduct() {
    return (
        <div className="product-area most-popular section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <h2>Hot Item</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="owl-carousel popular-slider">
                            <div className="single-product">
                                <div className="product-img">
                                    <Link href="#">
                                        <Image width={550} height={750} className="default-img" src="/img550x750.png"
                                               alt="#"/>
                                        <Image width={550} height={750} className="hover-img" src="/img550x750.png"
                                               alt="#"/>
                                        <span className="out-of-stock">Hot</span>
                                    </Link>
                                    <div className="button-head">
                                        <div className="product-action">
                                            <Link data-toggle="modal" data-target="#exampleModal" title="Quick View"
                                                  href="#"><i className=" ti-eye"></i><span>Quick Shop</span></Link>
                                            <Link title="Wishlist" href="#"><i className=" ti-heart "></i><span>Add to Wishlist</span></Link>
                                            <Link title="Compare" href="#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></Link>
                                        </div>
                                        <div className="product-action-2">
                                            <Link title="Add to cart" href="#">Add to cart</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h3><Link href="#">Black Sunglass For Women</Link></h3>
                                    <div className="product-price">
                                        <span className="old">$60.00</span>
                                        <span>$50.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="single-product">
                                <div className="product-img">
                                    <Link href="#">
                                        <Image width={550} height={750} className="default-img" src="/img550x750.png"
                                               alt="#"/>
                                        <Image width={550} height={750} className="hover-img" src="/img550x750.png"
                                               alt="#"/>
                                    </Link>
                                    <div className="button-head">
                                        <div className="product-action">
                                            <Link data-toggle="modal" data-target="#exampleModal" title="Quick View"
                                                  href="#"><i className=" ti-eye"></i><span>Quick Shop</span></Link>
                                            <Link title="Wishlist" href="#"><i className=" ti-heart "></i><span>Add to Wishlist</span></Link>
                                            <Link title="Compare" href="#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></Link>
                                        </div>
                                        <div className="product-action-2">
                                            <Link title="Add to cart" href="#">Add to cart</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h3><Link href="#">Women Hot Collection</Link></h3>
                                    <div className="product-price">
                                        <span>$50.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="single-product">
                                <div className="product-img">
                                    <Link href="#">
                                        <Image width={550} height={750} className="default-img" src="/img550x750.png"
                                               alt="#"/>
                                        <Image width={550} height={750} className="hover-img" src="/img550x750.png"
                                               alt="#"/>
                                        <span className="new">New</span>
                                    </Link>
                                    <div className="button-head">
                                        <div className="product-action">
                                            <Link data-toggle="modal" data-target="#exampleModal" title="Quick View"
                                                  href="#"><i className=" ti-eye"></i><span>Quick Shop</span></Link>
                                            <Link title="Wishlist" href="#"><i className=" ti-heart "></i><span>Add to Wishlist</span></Link>
                                            <Link title="Compare" href="#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></Link>
                                        </div>
                                        <div className="product-action-2">
                                            <Link title="Add to cart" href="#">Add to cart</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h3><Link href="#">Awesome Pink Show</Link></h3>
                                    <div className="product-price">
                                        <span>$50.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="single-product">
                                <div className="product-img">
                                    <Link href="#">
                                        <Image width={550} height={750} className="default-img" src="/img550x750.png"
                                               alt="#"/>
                                        <Image width={550} height={750} className="hover-img" src="/img550x750.png"
                                               alt="#"/>
                                    </Link>
                                    <div className="button-head">
                                        <div className="product-action">
                                            <Link data-toggle="modal" data-target="#exampleModal" title="Quick View"
                                                  href="#"><i className=" ti-eye"></i><span>Quick Shop</span></Link>
                                            <Link title="Wishlist" href="#"><i className=" ti-heart "></i><span>Add to Wishlist</span></Link>
                                            <Link title="Compare" href="#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></Link>
                                        </div>
                                        <div className="product-action-2">
                                            <Link title="Add to cart" href="#">Add to cart</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h3><Link href="#">Awesome Bags Collection</Link></h3>
                                    <div className="product-price">
                                        <span>$50.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MostPopularProduct;