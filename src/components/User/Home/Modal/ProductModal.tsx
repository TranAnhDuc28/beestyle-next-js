import React, {useState} from 'react';
import {Modal, Select, Button, Input, Carousel, Rate} from 'antd';
import Image from 'next/image';

const {Option} = Select;

const ProductModal = ({visible, onClose, product}) => {
    if (!product) return null;

    const images = Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl];

    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={900}
            style={{padding: '20px'}}
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
                        {images ? images.map((imgSrc, index) => (
                            <div key={index}>
                                <Image width={569} height={528} src={imgSrc} alt={product.productName}/>
                            </div>
                        )) : (
                            <Image width={569} height={528} src="" alt={product.productName}/>
                        )
                        }
                    </Carousel>
                </div>

                <div style={{flex: 1}}>
                    <h2>{product.productName}</h2>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                        <span><Rate disabled defaultValue={5} style={{fontSize: 13}}/></span>
                        <span style={{marginLeft: '8px'}}>(2 lượt đánh giá)</span>
                        <span style={{marginLeft: '8px', color: '#28a745'}}>Còn 23 sản phẩm</span>
                    </div>
                    <h3 style={{color: '#333'}}>{product.salePrice}</h3>
                    <p className="mt-4">
                        Khám phá sự kết hợp hoàn hảo giữa phong cách và thoải mái với Áo Thun Basic Comfort từ Beestyle.
                        Được thiết kế tinh tế dành cho cả nam và nữ, chiếc áo thun này là lựa chọn lý tưởng để làm mới
                        tủ đồ hàng ngày của bạn.
                    </p>

                    <div style={{display: 'flex', marginBottom: '20px'}}>
                        <div style={{marginRight: '20px'}} className="d-flex flex-column">
                            <label className="mr-3 mb-2">Size</label>
                            <Select defaultValue="S" style={{width: 170}}>
                                <Option value="S">S</Option>
                                <Option value="M">M</Option>
                                <Option value="L">L</Option>
                                <Option value="XL">XL</Option>
                            </Select>
                        </div>
                        <div className="ml-4 d-flex flex-column">
                            <label className="mr-3 mb-2">Color</label>
                            <Select defaultValue="Orange" style={{width: 170}}>
                                <Option value="Orange">Orange</Option>
                                <Option value="Blue">Blue</Option>
                                <Option value="Black">Black</Option>
                                <Option value="White">White</Option>
                            </Select>
                        </div>
                    </div>

                    <div style={{marginBottom: '20px'}}>
                        <div className="d-flex">
                            <Input.Group compact>
                                <Button onClick={handleDecrement}>-</Button>
                                <Input
                                    style={{width: 95, height: 32, textAlign: 'center'}}
                                    defaultValue={1} value={quantity}
                                />
                                <Button onClick={handleIncrement}>+</Button>
                            </Input.Group>
                        </div>
                        <div className="mt-4 d-flex justify-content-center">
                            <Button
                                className="btn btn-dark px-5 py-3 d-flex mr-5"
                                style={{fontSize: 13, borderRadius: 0}}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductModal;
