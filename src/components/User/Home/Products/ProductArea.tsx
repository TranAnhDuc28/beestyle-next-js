import React from "react";
import Link from "next/link";
import Image from "next/image";
import {TiChartPie, TiEye, TiHeart} from 'react-icons/ti';

function ProductArea() {
    return (
        <div className="product-area section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <h2>Trending Item</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="product-info">
                            <div className="nav-main">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#"
                                                                role="tab">Man</a></li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#"
                                                                role="tab">Woman</a></li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#"
                                                                role="tab">Kids</a></li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#"
                                                                role="tab">Accessories</a></li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#"
                                                                role="tab">Essential</a></li>
                                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#"
                                                                role="tab">Prices</a></li>
                                </ul>
                            </div>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="man" role="tabpanel">
                                    <div className="tab-single">
                                        <div className="row">
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <Link href={"/product"}>
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </Link>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}> Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Hot Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <Link href={"/product"}>
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </Link>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Pink Show</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="new">New</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Pant Collectons</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="price-dec">30% Off</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Cap For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Polo Dress For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="out-of-stock">Hot</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Black Sunglass For Women</a></h3>
                                                        <div className="product-price">
                                                            <span className="old">$60.00</span>
                                                            <span>$50.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="women" role="tabpanel">
                                    <div className="tab-single">
                                        <div className="row">
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Hot Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Pink Show</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="new">New</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Pant Collectons</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="price-dec">30% Off</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Cap For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Polo Dress For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="out-of-stock">Hot</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Black Sunglass For Women</a></h3>
                                                        <div className="product-price">
                                                            <span className="old">$60.00</span>
                                                            <span>$50.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="kids" role="tabpanel">
                                    <div className="tab-single">
                                        <div className="row">
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Hot Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Pink Show</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="new">New</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Pant Collectons</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="price-dec">30% Off</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Cap For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Polo Dress For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="out-of-stock">Hot</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Black Sunglass For Women</a></h3>
                                                        <div className="product-price">
                                                            <span className="old">$60.00</span>
                                                            <span>$50.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="accessories" role="tabpanel">
                                    <div className="tab-single">
                                        <div className="row">
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Hot Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Pink Show</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="new">New</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Pant Collectons</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="price-dec">30% Off</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Cap For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Polo Dress For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="out-of-stock">Hot</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Black Sunglass For Women</a></h3>
                                                        <div className="product-price">
                                                            <span className="old">$60.00</span>
                                                            <span>$50.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="essential" role="tabpanel">
                                    <div className="tab-single">
                                        <div className="row">
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Hot Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Pink Show</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="new">New</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Pant Collectons</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="price-dec">30% Off</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Cap For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Polo Dress For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="out-of-stock">Hot</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Black Sunglass For Women</a></h3>
                                                        <div className="product-price">
                                                            <span className="old">$60.00</span>
                                                            <span>$50.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="prices" role="tabpanel">
                                    <div className="tab-single">
                                        <div className="row">
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Hot Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Pink Show</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="new">New</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Women Pant Collectons</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Bags Collection</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="price-dec">30% Off</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Awesome Cap For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Polo Dress For Women</a></h3>
                                                        <div className="product-price">
                                                            <span>$29.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                <div className="single-product">
                                                    <div className="product-img">
                                                        <a href="#">
                                                            <Image width={550} height={750} className="default-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <Image width={550} height={750} className="hover-img"
                                                                   src="/img550x750.png" alt="#"/>
                                                            <span className="out-of-stock">Hot</span>
                                                        </a>
                                                        <div className="button-head">
                                                            <div className="product-action">
                                                                <Link href="#" title="Quick View" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiEye/>
                                                                        <span
                                                                            style={{marginLeft: '0.5rem'}}>Quick Shop</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Wishlist" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiHeart/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>
                                                                    </span>
                                                                </Link>
                                                                <Link href="#" title="Compare" passHref>
                                                                    <span
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <TiChartPie/>
                                                                        <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="product-action-2 ml-2">
                                                                <a title="Add to cart" href="#">Add to cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-content">
                                                        <h3><a href="#">Black Sunglass For Women</a></h3>
                                                        <div className="product-price">
                                                            <span className="old">$60.00</span>
                                                            <span>$50.00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default ProductArea;