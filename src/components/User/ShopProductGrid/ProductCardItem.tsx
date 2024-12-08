"use client";
import React, {memo, useState} from "react";
import ProductQuickLookupModal from "../ProductQuickLookupModal";
import {Badge, Button, Card, Flex, Image, Rate, Skeleton, Typography} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";

const {Meta} = Card;
const {Text, Title} = Typography;

const ProductCardItem = ({product}: any) => {
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
                    <Flex justify="center">
                        <Image
                            loading="lazy"
                            alt="avatar"
                            src={product?.imageUrl}
                            style={{width: "100%", height: "420px", objectFit: "cover"}}
                            preview={{
                                mask: <span><EyeOutlined/> Xem nhanh</span>,
                                visible: false,
                                destroyOnClose: true,
                            }}
                            onClick={handleOpenModal}
                        />
                    </Flex>

                    <div className="flex flex-col flex-grow justify-between gap-2 px-2.5 py-1.5">
                        <Typography.Paragraph style={{minHeight: 50, fontSize: 15, margin: 0}} ellipsis={{rows: 2}}>
                            {product?.productName} {product?.productName}
                        </Typography.Paragraph>

                        {/*<Rate value={5} disabled />*/}

                        <Title level={5} style={{display: "block", marginBottom: 0, marginTop: "auto"}}>
                            {product.minSalePrice ? `${product.minSalePrice}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',') : 0}
                        </Title>
                        {/*<Button type="primary">Thêm vào giỏ</Button>*/}
                    </div>
                </Card>
            </Badge.Ribbon>

            <ProductQuickLookupModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </>
    )
        ;
};

export default memo(ProductCardItem);
