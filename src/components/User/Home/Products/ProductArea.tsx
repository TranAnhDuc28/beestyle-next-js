import React from "react";
import Link from "next/link";
import Image from "next/image";
import {TiChartPie, TiEye, TiHeart} from 'react-icons/ti';
import MenuProductArea from "@/components/User/Home/Products/MenuProductArea";

function ProductArea() {

    const products = [
        {
            id: 1, title: "Women Hot Collection", price: "$29.00",
            image: "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-phao-nu-yody-pvn6012-den-qjn3072-tra-11.jpg"
        },
        {
            id: 2, title: "Elegant Dress", price: "$45.00",
            image: "https://m.yodycdn.com/fit-in/filters:format(webp)/products/set6054-den-8.jpg"
        },
        {
            id: 3, title: "Casual T-Shirt", price: "$19.00",
            image: "https://m.yodycdn.com/fit-in/filters:format(webp)/products/phn6040-vac-qjn5056-den-4.jpg"
        },
        {
            id: 4, title: "Stylish Pants", price: "$35.00",
            image: "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-polo-nu-yody-apn7120-vag-6.jpg"
        },
        {
            id: 5, title: "Cool Jacket", price: "$59.00", image: "/img550x750.png"
        },
        {
            id: 6, title: "Fashionable Blouse", price: "$42.00", image: "/img550x750.png"
        },
        {
            id: 7, title: "Summer Dress", price: "$39.00", image: "/img550x750.png"
        },
        {
            id: 8, title: "Classic Shirt", price: "$25.00", image: "/img550x750.png"
        }
    ];

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
                            <MenuProductArea/>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="man" role="tabpanel">
                                    <div className="tab-single">
                                        <div className="row">
                                            {products.map((product) => (
                                                <div key={product.id} className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                    <div className="single-product">
                                                        <div className="product-img">
                                                            <Link href={"/product"}>
                                                                <Image width={550} height={750} className="default-img"
                                                                       src={product.image} alt={product.title}/>
                                                                <Image width={550} height={750} className="hover-img"
                                                                       src={product.image} alt={product.title}/>
                                                            </Link>
                                                            <div className="button-head">
                                                                <div className="product-action-2 ml-2">
                                                                    <Link title="Add to cart" className="link-no-decoration link-action" href="#">
                                                                        Add to cart
                                                                    </Link>
                                                                </div>
                                                                <div className="product-action mt-3 mr-2">
                                                                    <Link href="#" className="link-action" title="Quick View">
                                                                        <TiEye size={18}/>
                                                                        <span style={{ marginLeft: '0.5rem' }}>Quick Shop</span>
                                                                    </Link>
                                                                    <Link href="#" className="link-action" title="Wishlist">
                                                                        <TiHeart size={18}/>
                                                                        <span style={{ marginLeft: '0.5rem' }}>Add to Wishlist</span>
                                                                    </Link>
                                                                    <Link href="#" className="link-action" title="Compare">
                                                                        <TiChartPie size={18}/>
                                                                        <span style={{ marginLeft: '0.5rem' }}>Add to Compare</span>
                                                                    </Link>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="product-content">
                                                            <h3><Link href="#" className="link-action link-no-decoration">{product.title}</Link>
                                                            </h3>
                                                            <div className="product-price">
                                                                <span>{product.price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
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