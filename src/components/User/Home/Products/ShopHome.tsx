import React from "react";
import Image from "next/image";
import Link from "next/link";
import {FiShoppingBag} from "react-icons/fi";

const products = [
    { id: 1, title: "Licity jelly leg flat Sandals", price: "$59", image: "/img115x140.png" },
    { id: 2, title: "Licity jelly leg flat Sandals", price: "$44", image: "/img115x140.png" },
    { id: 3, title: "Licity jelly leg flat Sandals", price: "$89", image: "/img115x140.png" },
    { id: 4, title: "Licity jelly leg flat Sandals", price: "$65", image: "/img115x140.png" },
    { id: 5, title: "Licity jelly leg flat Sandals", price: "$33", image: "/img115x140.png" },
    { id: 6, title: "Licity jelly leg flat Sandals", price: "$77", image: "/img115x140.png" },
    { id: 7, title: "Licity jelly leg flat Sandals", price: "$22", image: "/img115x140.png" },
    { id: 8, title: "Licity jelly leg flat Sandals", price: "$35", image: "/img115x140.png" },
    { id: 9, title: "Licity jelly leg flat Sandals", price: "$99", image: "/img115x140.png" },
];

function ShopHome() {
    return (
        <section className="shop-home-list section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 d-flex">
                        <div className="col-10">
                            <div className="shop-section-title">
                                <h1>On sale</h1>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className="shop-section-title">
                                <h1>Best Seller</h1>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className="shop-section-title">
                                <h1>Top viewed</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {products.map((product) => (
                        <div className="col-lg-4 col-md-6 col-12" key={product.id}>
                            <div className="single-list">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <div className="list-image overlay">
                                            <Image width={115} height={140} src={product.image} alt="#" />
                                            <Link
                                                href="#"
                                                className={"buy d-flex justify-content-center align-items-center"}
                                            >
                                                <FiShoppingBag size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 no-padding">
                                        <div className="content">
                                            <h5 className="title"><Link href="#"
                                                                        className="link-no-decoration">{product.title}</Link>
                                            </h5>
                                            <p className="price with-discount">{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ShopHome;
