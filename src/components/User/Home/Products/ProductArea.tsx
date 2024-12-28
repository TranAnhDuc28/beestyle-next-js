'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Badge, Button, Flex, Image, Tooltip, Row, Col, Card, Typography } from "antd";
import MenuProductArea from "@/components/User/Home/Products/MenuProductArea";
import ProductQuickLookupModal from "@/components/User/ProductCommonUser/ProductQuickLookupModal";
import { useProducts } from "@/services/user/ProductHomeService";
import ColorButton from "@/components/Button/ColorButton";
import { LuShoppingBag } from "react-icons/lu";
import { EyeOutlined } from "@ant-design/icons";

function ProductArea() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { products } = useProducts();

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
                                                    {products.map((product) => (
                                                        <Col key={product.id} xs={24} sm={12} md={12} lg={8} xl={6}>
                                                            <Badge.Ribbon
                                                                text={`${product.discountValue}%`}
                                                                className={product.discountValue > 0 ? '' : 'd-none'}
                                                                color="red"
                                                            >
                                                                <Card
                                                                    hoverable
                                                                    className="product-card flex flex-col justify-between"
                                                                    cover={
                                                                        <div className="product-img-container">
                                                                            <Link
                                                                                href={`/product/${product.id}/variant`}
                                                                                onClick={() => {
                                                                                    localStorage.setItem('productImages', JSON.stringify(product.images));
                                                                                }}
                                                                            >
                                                                                {product.images
                                                                                    .filter((image: { isDefault: boolean; }) => image.isDefault)
                                                                                    .map((image: { id: React.Key | null | undefined; }, index: number) => {
                                                                                        if (!image) return null;
                                                                                        return (
                                                                                            <Image
                                                                                                key={image.id}
                                                                                                loading="lazy"
                                                                                                src={product.images.find((image: { isDefault: boolean; }) => image.isDefault)?.imageUrl}
                                                                                                alt={`${product.name} image ${index + 1}`}
                                                                                                style={{ width: "100vh", height: "410px", objectFit: "cover" }}
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
                                                                                                                    title={<span style={{ fontSize: 12, padding: 0 }}>Xem nhanh</span>}
                                                                                                                >
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
                                                                                        );
                                                                                    })}
                                                                            </Link>
                                                                        </div>
                                                                    }
                                                                >
                                                                    <Typography.Paragraph
                                                                        style={{ minHeight: 45, fontSize: 16, margin: 0 }}
                                                                        ellipsis={{ rows: 2 }}
                                                                        className="fw-semibold"
                                                                    >
                                                                        {product?.productName}
                                                                    </Typography.Paragraph>

                                                                    <div className="product-price">
                                                                        <span
                                                                            className={product.minSalePrice > product.minDiscountedPrice
                                                                                ? 'old-price' : 'd-none'
                                                                            }
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
                                                    ))}
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
            ) : (<div className="p-4"></div>)}
        </>
    )
}

export default ProductArea;
