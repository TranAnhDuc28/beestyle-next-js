'use client';

import React, { useState } from "react";
import { Image, Tooltip } from "antd";
import Link from "next/link";
import useSWR from "swr";
import {
    getOfferingProduct,
    URL_API_PRODUCT_OFFER
} from "@/services/user/ProductAreaService";
import ProductQuickLookupModal from "../../ProductCommonUser/ProductQuickLookupModal";
import { TiEye } from "react-icons/ti";

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
                                            <Image
                                                preview={{
                                                    mask: (
                                                        <div className="flex items-center justify-center h-full">
                                                            <Tooltip
                                                                title={
                                                                    <span style={{ fontSize: 12, padding: 0 }}>
                                                                        Xem nhanh
                                                                    </span>
                                                                }
                                                                color="#F7941D"
                                                            >
                                                                <TiEye size={25} color="#fff"
                                                                    className="hover:!text-orange-400"
                                                                    onClick={() => handleOpenModal(product)}
                                                                />
                                                            </Tooltip>
                                                        </div>
                                                    ),
                                                    maskClassName: 'flex items-center justify-center bg-black bg-opacity-50',
                                                    visible: false,
                                                }}
                                                src={product.imageUrl}
                                                alt={product.productName}
                                                loading="lazy"
                                                style={{ width: "100%", height: "auto", objectFit: "cover", aspectRatio: "3/4" }}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12 no-padding">
                                            <div className="content">
                                                <p className="title">
                                                    <Link href={`/product/${product.id}/variant`}
                                                        className="link-no-decoration text-dark fs-6">{product.productName}</Link>
                                                </p>
                                                <p className="price with-discount">
                                                    {product.minDiscountedPrice.toLocaleString()} đ
                                                </p>
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
