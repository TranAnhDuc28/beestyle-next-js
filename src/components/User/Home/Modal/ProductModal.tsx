import React, {useState, useEffect} from 'react';
import {Modal, Button, Input, Carousel, Rate} from 'antd';
import Image from 'next/image';
import {useProductImages, useProduct} from '@/services/user/SingleProductService';
import ColorPickers from '@/components/User/ShopSingle/Properties/ColorPickers';
import SizePickers from '@/components/User/ShopSingle/Properties/SizePickers';

const ProductModal = ({visible, onClose, product}) => {
    if (!visible) return null;

    const productId = product.id;
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const {data: productData, error: productError} = useProduct(productId, selectedColor, selectedSize);
    const {data: images, error: imagesError} = useProductImages(productId);

    useEffect(() => {
        setQuantity(1);
    }, [visible]);

    const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));
    const handleIncrement = () => setQuantity(prev => Math.min(prev + 1, productData?.quantity || 1000));

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={"auto"}
            style={{ maxWidth: "60vw" }}
            centered
        >
            <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
                <Carousel autoplay infinite={false}>
                    {images ? images.map((image, index) => (
                        <div key={index} className="flex justify-center">
                            <Image
                                width={350}
                                height={500}
                                src={image.imageUrl}
                                alt={productData?.productName}
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    )) : <div>Loading...</div>}
                </Carousel>
            </div>

            {/* Cột Product Details */}
            <div className="w-full">
                <h2 className="text-xl font-bold mb-2">{productData?.productName || "No product data"}</h2>
                <div className="flex items-center mb-4">
                    <Rate disabled defaultValue={5} style={{ fontSize: 16 }} />
                    <span className="ml-2 text-sm">({productData?.reviewsCount || 0} đánh giá)</span>
                </div>
                <h3 className="text-red-500 text-2xl mb-4">
                    {productData?.salePrice?.toLocaleString("vi-VN")} đ
                </h3>

                {/* Color Picker */}
                <ColorPickers
                    productId={productId}
                    selectedColor={selectedColor}
                    onColorSelect={setSelectedColor}
                />

                {/* Size Picker */}
                <SizePickers
                    productId={productId}
                    colorCode={selectedColor}
                    selectedSize={selectedSize}
                    onSizeSelect={setSelectedSize}
                />

                {/* Quantity Selector */}
                <div className="flex items-center my-4">
                    <Button onClick={handleDecrement}>-</Button>
                    <Input value={quantity} className="mx-2 text-center" readOnly style={{ width: 50 }} />
                    <Button onClick={handleIncrement}>+</Button>
                </div>

                {/* Add to Cart Button */}
                <Button type="primary" block size="large">
                    Thêm vào giỏ hàng
                </Button>
            </div>
        </div>

        </Modal>
    );
};

export default ProductModal;
