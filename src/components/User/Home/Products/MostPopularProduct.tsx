'use client';

import Link from "next/link";
import { Card, Tooltip, Image, Badge } from 'antd';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState } from "react";
import ProductQuickLookupModal from "@/components/User/ProductCommonUser/ProductQuickLookupModal";
import { useSellingProducts } from "@/services/user/ProductHomeService";
import { TiEye, TiArrowLeft, TiArrowRight } from 'react-icons/ti';

const CustomPrevArrow = ({ onClick }) => (
    <div
        className="custom-arrow prev-arrow hover:!bg-orange-300"
        onClick={onClick}
        style={{
            position: "absolute",
            left: "-20px",
            top: "40%",
            transform: "translateY(-50%)",
            backgroundColor: "#FFA500",
            padding: "5px",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 2,
        }}
    >
        <TiArrowLeft size={25} color="white" />
    </div>
);

const CustomNextArrow = ({ onClick }) => (
    <div
        className="custom-arrow next-arrow hover:!bg-orange-300"
        onClick={onClick}
        style={{
            position: "absolute",
            right: "-20px",
            top: "40%",
            transform: "translateY(-50%)",
            backgroundColor: "#FFA500",
            padding: "5px",
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 2,
        }}
    >
        <TiArrowRight size={25} color="white" />
    </div>
);

function MostPopularProduct() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { products } = useSellingProducts();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: <CustomPrevArrow onClick={undefined} />,
        nextArrow: <CustomNextArrow onClick={undefined} />
    };

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
            {products && Array.isArray(products) && products.length > 0 ? (
                <>
                    <div className="product-area most-popular section pb-0">
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
                                        {products.map((product) => (
                                            <div key={product.id}>
                                                <Card className="product-card">
                                                    <Badge.Ribbon text={`${product.discountValue}%`} color="red">
                                                        <div className="product-image-wrapper">
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
                                                                    maskClassName:
                                                                        'flex items-center justify-center bg-black bg-opacity-50',
                                                                    visible: false,
                                                                }}
                                                                src={product.imageUrl}
                                                                alt={product.productName}
                                                                loading="lazy"
                                                                style={{ width: "100%", height: "auto", objectFit: "cover", aspectRatio: "3/4" }}
                                                            />
                                                            {product?.label && (
                                                                <span className="product-label">{product.productName}</span>
                                                            )}
                                                        </div>
                                                        <div className="product-content">
                                                            <h3>
                                                                <Link
                                                                    href={`/product/${product.id}/variant`}
                                                                    className="product-title fs-6 fw-semibold"
                                                                >
                                                                    {product.productName}
                                                                </Link>
                                                            </h3>
                                                            <div className="product-price">
                                                                <span className="old-price">{product.minSalePrice.toLocaleString()} đ</span>
                                                                <span
                                                                    className="current-price ml-2">{product.minDiscountedPrice.toLocaleString()} đ</span>
                                                            </div>
                                                        </div>
                                                    </Badge.Ribbon>
                                                </Card>
                                            </div>
                                        ))}
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
            ) : (<div className="p-4"></div>)}
        </>
    );
}

export default MostPopularProduct;
