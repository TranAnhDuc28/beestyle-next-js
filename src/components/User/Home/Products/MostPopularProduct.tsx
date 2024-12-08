'use client';

import Image from "next/image";
import Link from "next/link";
import {Card} from 'antd';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, {useState} from "react";
import ProductQuickLookupModal from "@/components/User/ProductQuickLookupModal";
import useSWR from "swr";
import {getSellingProduct, URL_API_PRODUCT_SELLER} from "@/services/user/ProductAreaService";
import {TiEye, TiArrowLeft, TiArrowRight} from 'react-icons/ti';

const CustomPrevArrow = ({onClick}) => (
    <div
        className="custom-arrow prev-arrow"
        onClick={onClick}
        style={{
            position: "absolute",
            left: "-25px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#FFA500",
            padding: "10px",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 2,
        }}
    >
        <TiArrowLeft size={25} color="white"/>
    </div>
);

const CustomNextArrow = ({onClick}) => (
    <div
        className="custom-arrow next-arrow"
        onClick={onClick}
        style={{
            position: "absolute",
            right: "-25px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#FFA500",
            padding: "10px",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 2,
        }}
    >
        <TiArrowRight size={25} color="white"/>
    </div>
);

function MostPopularProduct() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const {data: products} = useSWR(URL_API_PRODUCT_SELLER, getSellingProduct);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow/>,
        nextArrow: <CustomNextArrow/>
    };

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
            <div className="product-area most-popular section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <h2>Top sản phẩm bán chạy</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Slider {...settings}>
                                {products && Array.isArray(products) ? (
                                    products.map((product) => (
                                        <div key={product.id}>
                                            <Card className="product-card">
                                                <div className="product-image-wrapper">
                                                    <Link href="#">
                                                        <Image
                                                            width={550}
                                                            height={750}
                                                            src={product.imageUrl}
                                                            alt={product.productName}
                                                            className="product-image"
                                                            unoptimized
                                                        />
                                                        {product?.label && (
                                                            <span className="product-label">{product.productName}</span>
                                                        )}
                                                    </Link>
                                                    <div className="product-overlay">
                                                        <div className="overlay-actions">
                                                            <a
                                                                onClick={() => handleOpenModal(product)}
                                                                className="overlay-action"
                                                            >
                                                                <TiEye size={20} className="icon-action"/>
                                                                <span className="action-tooltip">Quick Shop</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-content">
                                                    <h3>
                                                        <Link href="#" className="product-title fs-6 text-uppercase">
                                                            {product.productName}
                                                        </Link>
                                                    </h3>
                                                    <div className="product-price">
                                                        {product?.originalPrice && (
                                                            <span className="old-price">{product.originalPrice} đ</span>
                                                        )}
                                                        <span
                                                            className="current-price ml-2">{product.salePrice} đ</span>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <div>No products available</div>
                                )}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            <ProductQuickLookupModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </>
    );
}

export default MostPopularProduct;