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
            width={900}
            centered
        >
            <div className="flex">
                <div className="w-1/2 mr-4">
                    <Carousel autoplay infinite={false}>
                        {images ? images.map((image, index) => (
                            <div key={index}>
                                <Image
                                    width={400}
                                    height={528}
                                    src={image.imageUrl}
                                    alt={productData?.productName}
                                />
                            </div>
                        )) : <div>Loading...</div>}
                    </Carousel>
                </div>

                <div className="w-1/2">
                    <h2>{productData?.productName || 'No product data'}</h2>
                    <div className="flex items-center mb-4">
                        <Rate disabled defaultValue={5} style={{fontSize: 16}}/>
                        <span className="ml-2">({productData?.reviewsCount || 0} reviews)</span>
                    </div>
                    <h3 className="text-red-500">{productData?.salePrice?.toLocaleString('vi-VN')} đ</h3>

                    <div className="my-4">
                        <ColorPickers
                            productId={productId}
                            selectedColor={selectedColor}
                            onColorSelect={setSelectedColor}
                        />
                        <SizePickers
                            productId={productId}
                            colorCode={selectedColor}
                            selectedSize={selectedSize}
                            onSizeSelect={setSelectedSize}
                        />
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center my-4">
                        <Button onClick={handleDecrement}>-</Button>
                        <Input value={quantity} className="mx-2 text-center" readOnly style={{width: 50}}/>
                        <Button onClick={handleIncrement}>+</Button>
                    </div>

                    {/* Add to Cart Button */}
                    <Button type="primary" block>
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModal;
