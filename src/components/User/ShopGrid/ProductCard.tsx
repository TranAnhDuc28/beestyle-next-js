"use client";
import React, {memo, useState} from "react";
import ProductModal from "../Home/Modal/ProductModal";
import {Badge, Button, Card, Flex, Image, Rate, Skeleton, Typography} from "antd";
import {EyeOutlined} from "@ant-design/icons";

const {Meta} = Card;
const {Text, Title} = Typography;

const ProductCard = ({product}: any) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpenModal = (product: any) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
        console.log(product);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
    };
    return (
        <>
            <Badge.Ribbon text="Test" color="red">
                <Card
                    hoverable
                    styles={{body: {padding: 0, overflow: 'hidden'}}}
                    bordered={false}
                    style={{borderRadius: 0}}
                >
                    <Image
                        alt="avatar"
                        src={product?.imageUrl}
                        style={{width: "auto", height: "auto"}}
                        preview={{
                            mask: <span><EyeOutlined /> Xem nhanh</span>,
                            visible: false,
                            destroyOnClose: true,
                        }}
                        onClick={handleOpenModal}
                    />
                    <div className="flex flex-col flex-grow justify-between p-2.5">
                        <Title level={5}>
                            {product?.productName}
                        </Title>
                        {/*<Rate value={5} disabled />*/}
                        <div className="product-price">
                            <span>{product?.minSalePrice}</span>
                        </div>
                        {/*<Button type="primary">Thêm vào giỏ</Button>*/}
                    </div>
                </Card>
            </Badge.Ribbon>

            <ProductModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </>
    )
        ;
};

export default memo(ProductCard);
