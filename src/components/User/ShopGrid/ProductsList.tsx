"use client";
import Link from "next/link";
import Image from "next/image";
import { TiChartPie, TiEye, TiHeart } from "react-icons/ti";
import React, { useState } from "react";
import ProductModal from "../Home/Modal/ProductModal";

const ProductList = ({ product }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product:any) => {
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
      <div className="single-product">
        <div className="product-img">
          <Link href={"/product"}>
            <Image
              width={550}
              height={750}
              className="default-img"
              src={product.image}
              alt={product.title}
            />
            <Image
              width={550}
              height={750}
              className="hover-img"
              src={product.image}
              alt={product.title}
            />
          </Link>
          <div className="button-head">
            <div className="product-action-2 ml-2">
              <Link
                title="Add to cart"
                className="link-no-decoration link-action"
                href="/cart"
              >
                Thêm vào giỏ hàng
              </Link>
            </div>
            <div className="product-action mt-3 mr-2">
              <a
                onClick={() => handleOpenModal(product)}
                className="link-action"
              >
                <TiEye size={18} />
                <span style={{ marginLeft: "0.5rem" }}>Xem ngay</span>
              </a>
              <Link href="#" className="link-action">
                <TiChartPie size={18} />
                <span style={{ marginLeft: "0.5rem" }}>So sánh</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="product-content">
          <h3>
            <Link href="#" className="link-action link-no-decoration">
              {product.title}
            </Link>
          </h3>
          <div className="product-price">
            <span>{product.price}</span>
          </div>
        </div>
      </div>
      <ProductModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductList;
