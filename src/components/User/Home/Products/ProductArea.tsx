'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Badge, Button, Flex, Image, Tooltip, Row, Col, Card, Typography } from "antd";
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
                                <div className="mt-4">
                                    <div className="tab-pane fade show active" id="man" role="tabpanel">
                                        <Row gutter={[16, 16]} >
                                            {products && Array.isArray(products) ? (
                                                products.map((product) => (
                                                    <Col key={product.id} xs={24} sm={12} md={12} lg={8} xl={6}>
                                                        <Badge.Ribbon text={`${product.discountValue}%`} color="red">
                                                            <Card
                                                                className="product-card flex flex-col justify-between"
                                                                cover={
                                                                    <div className="product-img-container">
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
                                                                        </Link>
                                                                    </div>
                                                                }
                                                            >
                                                                <Typography.Paragraph
                                                                    style={{ minHeight: 45, fontSize: 16, margin: 0 }}
                                                                    ellipsis={{ rows: 2 }}
                                                                    className="fw-semibold text-uppercase"
                                                                >
                                                                    {product?.productName}
                                                                </Typography.Paragraph>

                                                                <div className="product-price">
                                                                    <span
                                                                        className="old-price"
                                                                    >
                                                                        {product.minSalePrice.toLocaleString()} đ
                                                                    </span>
                                                                    <span
                                                                        className="current-price ml-2"
                                                                    >
                                                                        {product.minDiscountedPrice.toLocaleString()} đ
                                                                    </span>
                                                                </div>
                                                            </Card>
                                                        </Badge.Ribbon>
                                                    </Col>
                                                ))
                                            ) : (
                                                <div>No products available</div>
                                            )}
                                        </Row>
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
