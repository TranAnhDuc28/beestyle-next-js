'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Button, Flex, Image, Tooltip } from "antd";
import MenuProductArea from "@/components/User/Home/Products/MenuProductArea";
import ProductQuickLookupModal from "@/components/User/ProductCommonUser/ProductQuickLookupModal";
import useSWR from 'swr';
import { getProductForUser, URL_API_PRODUCT_AREA } from "@/services/user/ProductAreaService";
import ColorButton from "@/components/Button/ColorButton";
import { LuShoppingBag } from "react-icons/lu";
import { EyeOutlined } from "@ant-design/icons";

function ProductArea() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data: products } = useSWR(URL_API_PRODUCT_AREA, getProductForUser);

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
                                <MenuProductArea />
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
                                                                            loading="lazy"
                                                                            alt="avatar"
                                                                            src={product?.imageUrl}
                                                                            style={{ width: "100%", height: "410px", objectFit: "cover" }}
                                                                            className="default-img"
                                                                            preview={{
                                                                                mask: (
                                                                                    <>
                                                                                        <Flex gap={10}>
                                                                                            <ColorButton
                                                                                                style={{ borderRadius: 4, padding: "0px 30px" }}
                                                                                                size="large"
                                                                                                type="primary"
                                                                                                bgColor="#F7941D"
                                                                                                icon={<LuShoppingBag style={{}} />}
                                                                                                onClick={(e) => {
                                                                                                    e.preventDefault();
                                                                                                    handleOpenModal(product);
                                                                                                }}
                                                                                            >
                                                                                                Thêm vào giỏ
                                                                                            </ColorButton>
                                                                                            <Tooltip
                                                                                                title={<span style={{ fontSize: 12, padding: 0 }}>Xem nhanh</span>}>
                                                                                                <Button
                                                                                                    style={{ borderRadius: 4 }}
                                                                                                    size="large"
                                                                                                    color="default"
                                                                                                    variant="solid"
                                                                                                    icon={<EyeOutlined />}
                                                                                                    onClick={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        handleOpenModal(product);
                                                                                                    }}
                                                                                                />
                                                                                            </Tooltip>
                                                                                        </Flex>
                                                                                    </>
                                                                                ),
                                                                                maskClassName: "custom-mask-img",
                                                                                visible: false,
                                                                                destroyOnClose: true,
                                                                            }}
                                                                        />
                                                                        <Image
                                                                            loading="lazy"
                                                                            alt="avatar"
                                                                            src={product?.imageUrl}
                                                                            style={{ width: "100%", height: "410px", objectFit: "cover" }}
                                                                            className="hover-img"
                                                                        />
                                                                    </Link>
                                                                </div>
                                                                <div className="product-content mt-1 mb-3">
                                                                    <h3>
                                                                        <Link href="#"
                                                                            className="link-action link-no-decoration text-dark fs-6">
                                                                            {product.productName}
                                                                        </Link>
                                                                    </h3>
                                                                    <div className="product-price">
                                                                        <span
                                                                            className="old-price">{product.originalPrice.toLocaleString('vi-VN')} đ</span>
                                                                        <span
                                                                            className="current-price ml-2">{product.salePrice.toLocaleString('vi-VN')} đ</span>
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
            <ProductQuickLookupModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </>
    )
}

export default ProductArea;
