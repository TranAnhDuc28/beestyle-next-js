"use client";

import React, {memo, useEffect, useState, useMemo} from "react";
import {
    Modal,
    Row,
    Col,
    Table,
    Empty,
    Tag,
    Typography,
} from "antd";
import {getProductDetails} from "../../../services/ProductVariantService";
import {IProductVariant} from "../../../types/IProductVariant";
import useOptionColor from "@/components/Admin/Color/hooks/useOptionColor";
import useOptionSize from "@/components/Admin/Size/hooks/useOptionSize";

const {Text} = Typography;

interface IProps {
    isProductVariantOpen: boolean;
    setIsProductVariantOpen: (value: boolean) => void;
    productId: number;
    onSelectProductVariants: (selectedVariants: IProductVariant[]) => void;
    onProductSelect: (selectedDetails: IProductVariant[]) => void;
}

const ProductVariant: React.FC<IProps> = ({
                                              isProductVariantOpen,
                                              setIsProductVariantOpen,
                                              productId,
                                              onProductSelect,
                                          }) => {
    const [productDetails, setProductDetails] = useState<IProductVariant[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

    // Fetch color and size options
    const {dataOptionColor, error: errorDataOptionColor, isLoading: isLoadingDataOptionColor}
        = useOptionColor(isProductVariantOpen);
    const colorMap = useMemo(() => new Map(dataOptionColor.map(item => [item.label, item.code])), [dataOptionColor]);


    const handleCloseProductVariantModal = () => {
        setIsProductVariantOpen(false);
        setProductDetails([]);
        setSelectedRowKeys([]);
    };

    useEffect(() => {
        if (isProductVariantOpen) {
            setSelectedRowKeys([]);
        }
    }, [isProductVariantOpen]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const detailsResponse = await getProductDetails(productId);
                const productDetails = Array.isArray(detailsResponse)
                    ? detailsResponse.map((item) => ({
                        id: item[4],
                        productVariantName: item[1],
                        brandName: item[2],
                        materialName: item[3],
                        quantityInStock: item[9],
                        sku: item[5],
                        colorName: item[6],
                        sizeName: item[7],
                        originalPrice: item[8],
                        promotionName: item[11],
                        imageUrl: item[10] || "/no-img.png",
                    }))
                    : [];
                setProductDetails(productDetails);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu chi tiết sản phẩm:", error);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    const handleOk = () => {
        const selectedVariants = productDetails.filter((variant) =>
            selectedRowKeys.includes(variant.id)
        );
        onProductSelect(selectedVariants);
        handleCloseProductVariantModal();
    };

    const detailColumns = [
        {title: "SKU", dataIndex: "sku", key: "sku"},
        {
            title: "Tên sản phẩm",
            key: "productVariantName",
            render: (record: IProductVariant) => {
                const colorName = record?.colorName || "_";
                const colorCode = colorMap.get(record?.colorName) || "";
                const sizeName = record?.sizeName ? record.sizeName : "_";
                return (
                    <span>
                        <Text>{record.productVariantName}</Text>
                        <Text type="secondary" style={{display: "flex", alignItems: "center"}}>
                            <span style={{marginInlineEnd: 4}}>
                                {`Màu: ${colorName}`}
                            </span>
                            {colorCode ? <Tag className="custom-tag" color={colorCode}/> : ""} |
                            {` Kích cỡ: ${sizeName}`}
                        </Text>
                    </span>
                );
            },
        },
        {
            title: "Đang áp dụng",
            dataIndex: "promotionName",
            key: "promotionName",
            render: (promotion: string) => (
                <Tag color={promotion ? "green" : "red"}>
                    {promotion || "Không có khuyến mãi"}
                </Tag>
            ),
        },
    ];
    useEffect(() => {
        console.log(dataOptionColor);
    }, [dataOptionColor]);
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: number[]) => {
            setSelectedRowKeys(newSelectedRowKeys);
        },
    };

    return (
        <Modal
            title="Chọn sản phẩm chi tiết"
            open={isProductVariantOpen}
            onCancel={handleCloseProductVariantModal}
            onOk={handleOk}
            cancelText="Hủy"
            okText="Chọn"
            okButtonProps={{
                style: {background: "#00b96b"},
            }}
            width={1000}
            style={{top: 20}}
        >
            <Row>
                <Col span={24}>
                    {productDetails.length > 0 ? (
                        <Table
                            rowSelection={rowSelection}
                            columns={detailColumns}
                            dataSource={productDetails.map((variant) => ({
                                ...variant,
                                key: variant.id,
                            }))}
                            rowKey="id"
                            bordered
                            pagination={{pageSize: 5}}
                            style={{backgroundColor: "#fafafa"}}
                        />
                    ) : (
                        <Empty
                            description="Không có dữ liệu chi tiết sản phẩm."
                            style={{padding: "20px"}}
                        />
                    )}
                </Col>
            </Row>
        </Modal>
    );
};

export default memo(ProductVariant);
