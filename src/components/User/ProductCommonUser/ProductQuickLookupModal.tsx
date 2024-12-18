'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Carousel, Tag, InputNumber } from 'antd';
import Image from 'next/image';
import { useProductImages, useProduct } from '@/services/user/SingleProductService';
import ColorPickers from '@/components/User/ShopSingle/Properties/ColorPickers';
import SizePickers from '@/components/User/ShopSingle/Properties/SizePickers';
import Link from 'next/link';
import { addToCart } from '@/services/user/ShoppingCartService';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface IProps {
    visible: boolean;
    onClose: () => void;
    product: { id: string | number };
}

const ProductQuickLookupModal: React.FC<IProps> = ({ visible, onClose, product }) => {
    const productId = product?.id || null;
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const { data: productData, error: productError } = useProduct(productId, selectedColor, selectedSize);
    const { data: images, error: imagesError } = useProductImages(productId);

    useEffect(() => {
        setQuantity(1);
        setSelectedColor(null);
        setSelectedSize(null);
    }, [visible]);

    const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));
    const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, productData?.quantity || 1000));

    const handleAddToCart = (product: any, quantity: number, images: any) => {
        if (selectedColor) addToCart(product, quantity, images);
        else document.querySelector('#warning-selected-color')?.classList.remove('d-none');
    }

    const slides = images
        ? images.map((image: any, index: number) => (
            <div key={index.toString()} className="flex justify-center">
                <Image
                    width={569}
                    height={528}
                    src={image.imageUrl}
                    alt={product?.productName}
                    className="object-contain"
                />
            </div>
        ))
        : [
            <div key="0" className="flex justify-center">
                <Image width={569} height={528} src="/no-img.png" alt={product?.productName} className="object-contain" />
            </div>,
        ];

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={'auto'}
            centered
            className="!w-[50vw]"
            closable
        >
            <div className="flex">
                <div className="w-1/2 pr-0">
                    <Carousel
                        arrows
                        autoplay
                        infinite={false}
                        style={{ textAlign: 'center' }}
                    >
                        {slides}
                    </Carousel>
                    <div className="mt-4 flex gap-2 overflow-x-auto">
                        {images &&
                            images.map((image: any, index: number) => (
                                <div key={index} className="w-20 h-20 flex-shrink-0">
                                    <Image
                                        width={80}
                                        height={80}
                                        src={image.imageUrl}
                                        alt={product.productName}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                <div className="w-1/2 pl-8">
                    <h2 className="text-xl font-bold mb-2">{productData?.productName || 'No product data'}</h2>
                    <p className="mb-2">
                        <span className="font-semibold">SKU:</span> {productData?.sku} |{' '}
                        <span className="font-semibold">Tình trạng:</span>{' '}
                        {productData?.quantity > 0 ? (
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
                            {productData?.salePrice?.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="text-gray-500 text-lg line-through ml-2">
                            {productData?.originalPrice?.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="text-red-500 font-bold ml-2">
                            -{Math.round(((productData?.originalPrice - productData?.salePrice) / productData?.originalPrice) * 100)}%
                        </span>
                    </div>

                    <ColorPickers
                        productId={productId}
                        selectedColor={selectedColor}
                        onColorSelect={setSelectedColor}
                        style={{ maxWidth: '300px', overflowX: 'auto', whiteSpace: 'nowrap' }}
                    />

                    <span className={selectedColor ? 'd-none' : 'text-red-600 my-1 d-none'} id='warning-selected-color'>
                        Vui lòng chọn màu sắc!
                    </span>

                    <div className={selectedColor ? '' : 'd-none'}>
                        <SizePickers
                            productId={productId}
                            colorCode={selectedColor}
                            selectedSize={selectedSize}
                            onSizeSelect={setSelectedSize}
                        />
                    </div>
                    <div className="flex items-center my-4">
                        <p className="text-black font-semibold mr-4">Số lượng</p>
                        <div className="flex items-center">
                            <Button
                                onClick={handleDecrement}
                                className="!bg-gray-200 hover:!bg-gray-300 !text-black !font-bold relative z-10
                                           !border-none !rounded-none !w-10 !h-10 flex items-center justify-center"
                                icon={<MinusOutlined />}
                            />
                            <InputNumber
                                min={1}
                                value={quantity}
                                style={{ lineHeight: '40px' }}
                                className="!text-black !font-semibold !border-0 !w-14 !h-10 !text-center"
                                readOnly
                                controls={false}
                            />
                            <Button
                                onClick={handleIncrement}
                                className="!bg-gray-200 hover:!bg-gray-300 !text-black !font-bold relative z-10
                                           !border-none !rounded-none !w-10 !h-10 flex items-center justify-center"
                                icon={<PlusOutlined />}
                            />
                        </div>
                    </div>
                    <Button
                        type="primary"
                        block size="large"
                        className="bg-red-500 text-white"
                        onClick={() => handleAddToCart(productData, quantity, images)}
                    >
                        Thêm vào giỏ
                    </Button>
                    <div className="mt-2 flex justify-center">
                        <Link href={`/product/${productId}/variant`} className="!text-blue-500">
                            Xem chi tiết sản phẩm
                        </Link>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductQuickLookupModal;
