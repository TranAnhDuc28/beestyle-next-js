'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Carousel, Tag, InputNumber, Image } from 'antd';
import { useProductImages, useProduct } from '@/services/user/SingleProductService';
import ColorPickers from '@/components/User/ShopSingle/Properties/ColorPickers';
import SizePickers from '@/components/User/ShopSingle/Properties/SizePickers';
import Link from 'next/link';
import { useRef } from 'react';
import { addToCart } from '@/services/user/ShoppingCartService';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styles from "./css/modal.module.css";

interface IProps {
    visible: boolean;
    onClose: () => void;
    product: { id: string | number } | any;
}

const ProductQuickLookupModal: React.FC<IProps> = ({ visible, onClose, product }) => {
    const productId = product?.id || null;
    const carouselRef = useRef<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSliding, setIsSliding] = useState(false);

    const { data: productData, error: productError } = useProduct(productId, selectedColor, selectedSize);
    const { data: images, error: imagesError } = useProductImages(productId);

    useEffect(() => {
        setQuantity(1);
        setSelectedColor(null);
        setSelectedSize(null);
        setCurrentSlide(0);

        if (productError) console.log(productError);
        if (imagesError) console.log(imagesError);
    }, [productId, visible]);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setSelectedSize(null);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));
    const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, productData?.quantity || 1000));

    const handleAddToCart = (product: any, quantity: number, images: any) => {
        if (selectedColor && selectedSize) addToCart(product, quantity, images);
        else return;
    }

    const goToSlide = (index: number) => {
        if (isSliding) return;
        setIsSliding(true);

        carouselRef.current?.goTo(index);
        setCurrentSlide(index);

        setTimeout(() => setIsSliding(false), 500);
    };

    const slides = images
        ? images.map((image: any, index: number) => (
            <div key={index.toString()} className="flex justify-center">
                <Image
                    loading="lazy"
                    style={{ width: "100%", height: "auto", objectFit: "cover", aspectRatio: "3/4" }}
                    src={image.imageUrl}
                    alt={product?.productName}
                    preview={false}
                />
            </div>
        ))
        : [
            <div key="0" className="flex justify-center">
                <Image
                    loading="lazy"
                    style={{ width: "100%", height: "auto", objectFit: "cover", aspectRatio: "3/4" }}
                    src="/no-img.png"
                    alt={product?.productName}
                />
            </div>,
        ];

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            className={`!w-[50vw] ${styles.customModal}`}
            closable
        >
            <div className="flex">
                <div className="flex flex-col gap-2 me-1">
                    {images &&
                        images.map((image: any, index: number) => (
                            <div
                                key={index}
                                className={`w-15 h-[84px] flex-shrink-0 cursor-pointer border-2 me-2
                                        ${currentSlide === index ? 'border-orange-400' : 'border-transparent'}`}
                                onClick={() => goToSlide(index)}
                            >
                                <Image
                                    width={60}
                                    height={"auto"}
                                    src={image.imageUrl}
                                    alt={product.productName}
                                    preview={false}
                                />
                            </div>
                        ))}
                </div>
                <div className='w-1/2 pe-2'>
                    <Carousel
                        ref={carouselRef}
                        autoplay={false}
                        infinite={false}
                        dots={false}
                        style={{ textAlign: 'center' }}
                        afterChange={(index) => setCurrentSlide(index)}
                        initialSlide={currentSlide}
                    >
                        {slides}
                    </Carousel>
                </div>
                <div className="w-1/2 pl-8 flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-2">{productData?.productName || 'No product data'}</h2>
                        <p className="mb-2">
                            <span className="font-semibold">SKU:</span> {productData?.sku} |{' '}
                            <span className="font-semibold">Tình trạng:</span>{' '}
                            {productData?.quantityInStock > 0 ? (
                                <Tag color="green">Còn hàng</Tag>
                            ) : (
                                <Tag color="red">Hết hàng</Tag>
                            )}
                        </p>
                        <p className="mb-4">
                            <span className="font-semibold">Thương hiệu:</span>{' '}
                            <span className="text-blue-500">{productData?.brandName}</span>
                        </p>
                        <div className="flex items-center mb-4">
                            <span className="text-orange-400 text-2xl font-bold">
                                {productData?.salePrice?.toLocaleString()} đ
                            </span>
                            {/* <span className="text-gray-500 text-lg line-through ml-2">
                                {productData?.originalPrice?.toLocaleString()} đ
                            </span>
                            <span className="text-red-500 font-bold ml-2">
                                -{Math.round(((productData?.originalPrice - productData?.salePrice) / productData?.originalPrice) * 100)}%
                            </span> */}
                        </div>

                        <ColorPickers
                            productId={productId}
                            selectedColor={selectedColor}
                            onColorSelect={handleColorSelect}
                            style={{ maxWidth: '300px', overflowX: 'auto', whiteSpace: 'nowrap' }}
                        />

                        <SizePickers
                            productId={productId}
                            colorCode={selectedColor}
                            selectedSize={selectedSize}
                            onSizeSelect={handleSizeSelect}
                        />
                        <div className="flex items-center my-4">
                            <p className="text-black font-semibold mr-5 mb-0">Số lượng</p>
                            <div className="flex items-center">
                                <Button
                                    onClick={handleDecrement}
                                    className="!bg-gray-200 hover:!bg-gray-300 !text-black !font-bold relative z-10
                                               !border-none !rounded-none !w-10 !h-10 flex items-center justify-center"
                                    icon={<MinusOutlined />}
                                    disabled={quantity <= 1}
                                />

                                <InputNumber
                                    min={1}
                                    value={quantity}
                                    style={{ lineHeight: '40px', textAlignLast: 'center' }}
                                    className="!text-black !font-semibold !border-0 !w-16 !h-10 custom-input"
                                    readOnly
                                    controls={false}
                                />

                                <Button
                                    onClick={handleIncrement}
                                    className="!bg-gray-200 hover:!bg-gray-300 !text-black !font-bold relative z-10
                                               !border-none !rounded-none !w-10 !h-10 flex items-center justify-center"
                                    icon={<PlusOutlined />}
                                    disabled={quantity >= productData?.quantity}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonCustom}>
                        <Button
                            type="primary"
                            block
                            size="large"
                            className="bg-black text-white hover:!bg-orange-400"
                            onClick={() => handleAddToCart(productData, quantity, images)}
                        >
                            Thêm vào giỏ
                        </Button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-2">
                <Link href={`/product/${productId}/variant`} className="!text-blue-500">
                    Xem chi tiết sản phẩm
                </Link>
            </div>
        </Modal>
    );
};

export default ProductQuickLookupModal;
