"use client";

import React, { memo, useEffect, useState } from "react";
import { Modal, Row, Col, Table, Image, Empty } from "antd";
import { getProductDetails } from "../../../services/ProductVariantService";
import { IProductVariant } from "../../../types/IProductVariant";

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
                                              onSelectProductVariants,
                                              onProductSelect,
                                          }) => {
    const [productDetails, setProductDetails] = useState<IProductVariant[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

    const handleCloseProductVariantModal = () => {
        setIsProductVariantOpen(false);
        setProductDetails([]);
        setSelectedRowKeys([]);
    };

    useEffect(() => {
        if (isProductVariantOpen) {
            setSelectedRowKeys([]); // Reset lựa chọn khi mở modal
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
        { title: "SKU", dataIndex: "sku", key: "sku" },
        { title: "Tên sản phẩm", dataIndex: "productVariantName", key: "productVariantName" },
        { title: "Thương hiệu", dataIndex: "brandName", key: "brandName" },
        { title: "Chất liệu", dataIndex: "materialName", key: "materialName" },
        { title: "Màu sắc", dataIndex: "colorName", key: "colorName" },
        { title: "Kích thước", dataIndex: "sizeName", key: "sizeName" },
        { title: "Đang áp dụng", dataIndex: "promotionName", key: "promotionName" },
    ];

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
                style: { background: "#00b96b" },
            }}
            width={1000}
            style={{ top: 20 }}
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
                            rowKey="key"
                            bordered
                            style={{ backgroundColor: "#fafafa" }}
                        />
                    ) : (
                        <Empty
                            description="Không có dữ liệu chi tiết sản phẩm."
                            style={{ padding: "20px" }}
                        />
                    )}
                </Col>
            </Row>
        </Modal>
    );
};

export default memo(ProductVariant);
