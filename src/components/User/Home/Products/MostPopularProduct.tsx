'use client';

import Image from "next/image";
import Link from "next/link";
import {Card} from 'antd';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {TiEye, TiHeart, TiChartPie, TiArrowLeft, TiArrowRight} from 'react-icons/ti';
import React from "react";

function MostPopularProduct() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <TiArrowLeft />,
        nextArrow: <TiArrowRight />
    };

    const products = [
        {
            title: 'Black Sunglass For Women',
            oldPrice: '$60.00',
            price: '$50.00',
            image: '/img550x750.png',
            label: 'Hot',
        },
        {
            title: 'Women Hot Collection',
            price: '$50.00',
            image: '/img550x750.png',
        },
        {
            title: 'Awesome Pink Show',
            price: '$50.00',
            image: '/img550x750.png',
            label: 'New',
        },
        {
            title: 'Awesome Bags Collection',
            price: '$50.00',
            image: '/img550x750.png',
        },
        {
            title: 'Stylish Shoes',
            price: '$70.00',
            image: '/img550x750.png',
        },
        {
            title: 'Modern Hat',
            price: '$20.00',
            image: '/img550x750.png',
        }
    ];

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
                        <Slider {...settings}>
                            {products.map((product, index) => (
                                <div key={index}>
                                    <Card className="product-card">
                                        <div className="product-image-wrapper">
                                            <Link href="#">
                                                <Image
                                                    width={550}
                                                    height={750}
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="product-image"
                                                />
                                                {product?.label && (
                                                    <span className="product-label">{product.label}</span>
                                                )}
                                            </Link>
                                            <div className="product-overlay">
                                                <div className="overlay-actions">
                                                    <Link href="#" title="Quick View"
                                                          className="overlay-action">
                                                        <TiEye size={20} className="icon-action"/>
                                                        <span className="action-tooltip">Quick Shop</span>
                                                    </Link>
                                                    <Link href="#" title="Wishlist" className="overlay-action">
                                                        <TiHeart size={20} className="icon-action"/>
                                                        <span className="action-tooltip">Add to Wishlist</span>
                                                    </Link>
                                                    <Link href="#" title="Compare" className="overlay-action">
                                                        <TiChartPie size={20} className="icon-action"/>
                                                        <span className="action-tooltip">Add to Compare</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-content">
                                            <h3>
                                                <Link href="#" className="product-title">{product.title}</Link>
                                            </h3>
                                            <div className="product-price">
                                                {product?.oldPrice && (
                                                    <span className="old-price">{product.oldPrice}</span>
                                                )}
                                                <span className="current-price">{product.price}</span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MostPopularProduct;
