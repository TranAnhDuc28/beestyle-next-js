'use client';

import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {TiEye} from 'react-icons/ti';
import MenuProductArea from "@/components/User/Home/Products/MenuProductArea";
import ProductModal from "@/components/User/Home/Modal/ProductModal";
import useSWR from 'swr';
import {getProductForUser, URL_API_PRODUCT_AREA} from "@/services/user/ProductAreaService";

function ProductArea() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const {data: products} = useSWR(URL_API_PRODUCT_AREA, getProductForUser);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <div className="product-area section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>Sản Phẩm Nổi Bật</h2>
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
                                                {products && Array.isArray(products) ? (
                                                    products.map((product) => (
                                                        <div key={product.id}
                                                             className="col-xl-3 col-lg-4 col-md-4 col-12">
                                                            <div className="single-product">
                                                                <div className="product-img">
                                                                    <Link
                                                                        href={`/product/${product.id}/variant`}
                                                                    >
                                                                        <Image
                                                                            width={550}
                                                                            height={750}
                                                                            className="default-img"
                                                                            src={product.imageUrl}
                                                                            alt={product.productName}
                                                                            unoptimized
                                                                        />
                                                                        <Image
                                                                            width={550}
                                                                            height={750}
                                                                            className="hover-img"
                                                                            src={product.imageUrl}
                                                                            alt={product.productName}
                                                                            unoptimized
                                                                        />
                                                                    </Link>
                                                                    <div className="button-head">
                                                                        <div className="product-action-2 ml-2">
                                                                            <Link
                                                                                title="Add to cart"
                                                                                className="link-no-decoration link-action"
                                                                                href={"/cart"}
                                                                            >
                                                                                Thêm vào giỏ hàng
                                                                            </Link>
                                                                        </div>
                                                                        <div className="product-action mt-3 mr-3">
                                                                            <a onClick={() => handleOpenModal(product)}
                                                                               className="link-action">
                                                                                <TiEye size={18}/>
                                                                                <span style={{marginLeft: "0.5rem"}}>Xem ngay</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="product-content">
                                                                    <h3>
                                                                        <Link href="#"
                                                                              className="link-action link-no-decoration text-dark fs-6 text-uppercase">
                                                                            {product.productName}
                                                                        </Link>
                                                                    </h3>
                                                                    <div className="product-price">
                                                                        <span
                                                                            className="old-price">{product.originalPrice} đ</span>
                                                                        <span
                                                                            className="current-price ml-2">{product.salePrice} đ</span>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </>
    )
}

export default ProductArea;