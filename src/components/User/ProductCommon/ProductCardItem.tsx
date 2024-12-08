"use client";
import React, {memo, useState} from "react";
import ProductQuickLookupModal from "./ProductQuickLookupModal";
import {Badge, Button, Card, ConfigProvider, Flex, Image, Rate, Skeleton, Tooltip, Typography} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";
import ColorButton from "@/components/Button/ColorButton";
import {LuShoppingBag} from "react-icons/lu";
import {IProduct} from "@/types/IProduct";

const {Text, Title} = Typography;

interface IProps {
    product: IProduct;
}

const ProductCardItem: React.FC<IProps> = (props) => {
    const {product} = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

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
            <Badge.Ribbon text="Test" color="red">
                <Card
                    hoverable
                    styles={{body: {padding: 0, overflow: 'hidden'}}}
                    bordered={false}
                    style={{borderRadius: 0}}
                >
                    <Flex justify="center">
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBgMask: "transparent"
                                },
                            }}
                        >
                            <Image
                                loading="lazy"
                                alt="avatar"
                                src={product?.imageUrl}
                                style={{width: "100%", height: "410px", objectFit: "cover"}}
                                preview={{
                                    mask: (
                                        <>
                                            <Flex gap={10}>
                                                <ColorButton
                                                    style={{borderRadius: 4, padding: "0px 30px"}}
                                                    size="large"
                                                    type="primary"
                                                    bgColor="#F7941D"
                                                    icon={<LuShoppingBag style={{}}/>}
                                                    onClick={() => console.log("add cart")}
                                                >
                                                    Thêm vào giỏ
                                                </ColorButton>
                                                <Tooltip
                                                    title={<span style={{fontSize: 12, padding: 0}}>Xem nhanh</span>}>
                                                    <Button
                                                        style={{borderRadius: 4}}
                                                        size="large"
                                                        color="default"
                                                        variant="solid"
                                                        icon={<EyeOutlined/>}
                                                        onClick={handleOpenModal}
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
                        </ConfigProvider>
                    </Flex>

                    <div className="flex flex-col flex-grow justify-between gap-2 px-2.5 py-1.5">
                        <Typography.Paragraph style={{minHeight: 45, fontSize: 15, margin: 0}} ellipsis={{rows: 2}}>
                            {product?.productName}
                        </Typography.Paragraph>

                        {/*<Rate value={5} disabled />*/}

                        <Text style={{display: "block", marginBottom: 0, marginTop: "auto", fontSize: 17}}
                              strong={true}>
                            {product.minSalePrice ? `${product.minSalePrice}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',') : 0}
                        </Text>
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
