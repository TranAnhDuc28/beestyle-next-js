import React, { useState } from 'react';
import Link from "next/link";
import { Button, Flex, Input, InputNumber, Rate } from 'antd';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useProduct } from "@/services/user/SingleProductService";
import { useParams } from "next/navigation";
import ColorPickers from "@/components/User/ShopSingle/Properties/ColorPickers";
import SizePickers from "@/components/User/ShopSingle/Properties/SizePickers";
import { addToCart } from "@/services/user/ShoppingCartService";
import { EyeOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import InfoSection from "@/components/User/ShopSingle/Properties/InfoSession";

const ProductDescription = (props: any) => {
    const params = useParams();
    const productId = params?.id;
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const { data: product, error } = useProduct(productId, selectedColor, selectedSize);

    const handleDecrement = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    const handleIncrement = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, 1000));
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setSelectedSize(null);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    return (
        <div className="product-des">
            <div className="short">
                <h6 className="text-capitalize fw-bold mb-0">{product?.productName || 'No product variant'}</h6>
                <div className="rating-main" style={{ fontSize: '13px' }}>
                    <span className="pe-2" style={{ borderRight: '2px solid #EDF0F5' }}>
                        SKU: {product?.sku}
                    </span>

                    <ul className="rating ps-5">
                        <li>
                            <div>
                                <Rate disabled defaultValue={5}
                                    style={{ marginLeft: -35, fontSize: 16, color: '#FCAF17' }} />
                                <span className="ps-2">
                                    <span className="fw-bold me-2">4.9</span>
                                    <span style={{ color: '#7a7a7a' }}>({Math.floor(Math.random() * 120) + 1})</span>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className="ml-2" style={{ borderLeft: '2px solid #EDF0F5' }}>
                                <span className="ml-2">Thương hiệu:</span>
                                <span className="fw-bold"> {product?.brandName}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <p className="price px-3 py-4 m-0" style={{ backgroundColor: '#FAFAFA', borderRadius: '5px' }}>
                    <span className="discount text-center">
                        {product?.salePrice ? `${product.salePrice.toLocaleString()} đ` : '0 đ'}
                    </span>
                    {/* <s className={product?.originalPrice ? "fw-medium" : "hidden"} style={{ color: '#838383' }}>
                        {product?.originalPrice.toLocaleString() + ' đ'}
                    </s> */}
                </p>
            </div>

            <div className="mt-4">
                <div className="flex items-center mb-4">
                    <EyeOutlined style={{ fontSize: 20 }} />
                    <span
                        className="ml-2"><b>{Math.floor(Math.random() * 50) + 1}</b> người đang xem sản phẩm này</span>
                </div>

                <div className="mb-4">
                    <span className="text-gray-800">Chỉ còn <b>{product?.quantityInStock}</b> sản phẩm trong kho!</span>
                </div>
            </div>

            <div className="d-flex flex-column">
                <div className="color">
                    <ColorPickers
                        productId={productId}
                        selectedColor={selectedColor}
                        onColorSelect={handleColorSelect}
                    />
                </div>

                <div className="size">
                    <SizePickers
                        productId={productId}
                        colorCode={selectedColor}
                        selectedSize={selectedSize}
                        onSizeSelect={handleSizeSelect}
                    />
                </div>
            </div>

            <div className="product-buy">
                <Flex align='end' className='mb-4'>
                    <div className="quantity">
                        <h6>Số lượng:</h6>
                        <div className="flex items-center mt-3">
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
                                disabled={quantity >= product?.quantityInStock}
                            />
                        </div>
                    </div>
                    <div className="add-to-cart">
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product, quantity, props.images);
                            }}
                            className="btn"
                            style={{ margin: '0 0 0 20px', padding: '0 151px' }}
                        >
                            Thêm vào giỏ hàng
                        </Link>
                    </div>
                </Flex>
                <div className="add-to-cart">
                    <Link
                        href={"/cart"}
                        onClick={() => {
                            addToCart(product, quantity, props.images);
                        }}
                        className="btn"
                        style={{ width: '635px' }}
                    >
                        Mua ngay
                    </Link>
                </div>

                <InfoSection />
            </div>
        </div>
    );
};

export default ProductDescription;
