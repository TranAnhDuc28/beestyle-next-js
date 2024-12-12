'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import useSWR from "swr";
import {
    getOfferingProduct,
    URL_API_PRODUCT_OFFER
} from "@/services/user/ProductAreaService";
import ProductQuickLookupModal from "../../ProductCommon/ProductQuickLookupModal";

function ShopHome() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data: products } = useSWR(URL_API_PRODUCT_OFFER, getOfferingProduct);

    const handleOpenModal = (product: any) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <section className="shop-home-list section pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 d-flex">
                            <div className="col-10">
                                <div className="shop-section-title">
                                    <h1>Ưu đãi</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {products && Array.isArray(products) ? (products.map((product) => (
                            <div className="col-lg-4 col-md-6 col-12" key={product.id}>
                                <div className="single-list">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="list-image overlay">
                                                <Image
                                                    width={115}
                                                    height={140}
                                                    src={product.imageUrl}
                                                    alt="#"
                                                    unoptimized
                                                />
                                                <Link
                                                    href="#"
                                                    className={"buy d-flex justify-content-center align-items-center"}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleOpenModal(product);
                                                    }}
                                                >
                                                    <FiShoppingBag size={20} />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12 no-padding">
                                            <div className="content">
                                                <p className="title">
                                                    <Link href={`/product/${product.id}/variant`}
                                                        className="link-no-decoration text-dark text-uppercase">{product.productName}</Link>
                                                </p>
                                                <p className="price with-discount">{product.salePrice.toLocaleString('vi-VN')} đ</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        ) : (
                            <div>No products available</div>
                        )}
                    </div>
                </div>
            </section>
            <ProductQuickLookupModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </>
    );
}

export default ShopHome;
