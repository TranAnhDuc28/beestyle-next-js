import React, {useState, useEffect} from 'react';
import {Modal, Button, Input, Carousel, Rate} from 'antd';
import Image from 'next/image';
import {useProductImages, useProduct} from '@/services/user/SingleProductService';
import ColorPickers from '@/components/User/ShopSingle/Properties/ColorPickers';
import SizePickers from '@/components/User/ShopSingle/Properties/SizePickers';
interface IProps {
    visible: boolean;
    onClose: () => void;
    product: any;
}

const ProductQuickLookupModal: React.FC<IProps> = ({visible, onClose, product}) => {
    if (!product) return null;

    const images = Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl];

    const productId = product.id;
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const {data: productData, error: productError} = useProduct(productId, selectedColor, selectedSize);
    // const {data: images, error: imagesError} = useProductImages(productId);

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
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{flex: 1, marginRight: '20px'}}>
                    <Carousel
                        arrows
                        autoplay
                        infinite={false}
                        style={{textAlign: 'center'}}
                    >
                        {images ? images.map((imgSrc: any, index: number) => (
                            <div key={index}>
                                <Image width={569} height={528} src={imgSrc} alt={product.productName}/>
                            </div>
                        )) : (
                            <Image width={569} height={528} src={"/no-img.png"} alt={product.productName}/>
                        )
                        }
                    </Carousel>
                </div>
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
        </Modal>
    );
};

export default ProductQuickLookupModal;
