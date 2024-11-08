'use client';

import React, {useState} from 'react';
import Link from "next/link";
import {Button, Input, Rate} from 'antd';
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {FaRegHeart} from "react-icons/fa";
import {LiaCompressArrowsAltSolid} from "react-icons/lia";

const ProductDescription = () => {

    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    const handleIncrement = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, 1000));
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setQuantity(value);
        }
    };

    const handleInputBlur = () => {
        let value = parseInt(String(quantity), 10);
        if (isNaN(value) || value < 1) {
            value = 1;
        } else if (value > 1000) {
            value = 1000;
        }
        setQuantity(value);
    };

    return (
        <div className="product-des">
            <div className="short">
                <h4>Tên sản phẩm</h4>
                <div className="rating-main">
                    <ul className="rating">
                        <li><Rate disabled defaultValue={5} style={{marginLeft: -35}}/></li>
                    </ul>
                    <Link href="#" className="total-review link-no-decoration">(102) Đánh giá</Link>
                </div>
                <p className="price"><span className="discount">$70.00</span><s>$80.00</s></p>
                <p className="description">Sản phẩm được thiết kế tiện lợi và phù hợp cho mọi gia đình...</p>
            </div>
            <div
                className="color"
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                }}
            >
                <h4
                    style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                    }}
                >
                    Tùy chọn có sẵn <span>Màu sắc</span>
                </h4>
                <ul
                    style={{
                        display: "flex",
                        listStyle: "none",
                        padding: "0",
                        margin: "0",
                    }}
                >
                    <li
                        style={{
                            marginRight: "10px",
                        }}
                    >
                        <Link href="#" className="one">
                            <i className="ti-check"></i>
                        </Link>
                    </li>
                    <li
                        style={{
                            marginRight: "10px",
                        }}
                    >
                        <Link href="#" className="two">
                            <i className="ti-check"></i>
                        </Link>
                    </li>
                    <li
                        style={{
                            marginRight: "10px",
                        }}
                    >
                        <Link href="#" className="three">
                            <i className="ti-check"></i>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="four">
                            <i className="ti-check"></i>
                        </Link>
                    </li>
                </ul>
            </div>

            <div
                className="size"
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                }}
            >
                <h4
                    style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                    }}
                >
                    Kích cỡ
                </h4>
                <ul
                    style={{
                        display: "flex",
                        listStyle: "none",
                        padding: "0",
                        margin: "0",
                    }}
                >
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <li key={size} style={{ marginRight: "10px" }}>
                            <Link
                                href="#"
                                className={
                                    selectedSize === size
                                        ? 'selected-size link-no-decoration'
                                        : 'link-no-decoration'
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSizeClick(size);
                                }}
                            >
                                {size}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="product-buy">
                <div className="quantity">
                    <h6>Số lượng :</h6>
                    <div className="input-group">
                        <div className="button minus">
                            <button
                                type="button"
                                className="btn btn-primary btn-number"
                                onClick={handleDecrement}
                                disabled={quantity <= 1}
                            >
                                <AiOutlineMinus size={20} className="ml-2"/>
                            </button>
                        </div>
                        <Input
                            type="text"
                            name="quant[1]"
                            className="input-number"
                            value={quantity}
                            onInput={handleInputChange}
                            onBlur={handleInputBlur}
                            style={{border: '1px solid #333', textAlign: 'center'}}
                            variant={"borderless"}
                        />
                        <div className="button plus">
                            <button
                                type="button"
                                className="btn btn-primary btn-number"
                                onClick={handleIncrement}
                                disabled={quantity >= 1000}
                            >
                                <AiOutlinePlus size={20}/>
                            </button>
                        </div>
                    </div>
                    {/*<div className="input-group">*/}
                    {/*    <Button*/}
                    {/*        icon={<AiOutlineMinus style={{color: '#fff'}} />}*/}
                    {/*        onClick={handleDecrement}*/}
                    {/*        disabled={quantity <= 1}*/}
                    {/*        style={{background: '#F7941D', height: "50px"}}*/}
                    {/*    />*/}
                    {/*    <Input*/}
                    {/*        type="text"*/}
                    {/*        name="quant[1]"*/}
                    {/*        className="input-number"*/}
                    {/*        value={quantity}*/}
                    {/*        onInput={handleInputChange}*/}
                    {/*        onBlur={handleInputBlur}*/}
                    {/*        style={{width: "60px", border: '1px solid #333', textAlign: "center"}}*/}
                    {/*        readOnly*/}
                    {/*    />*/}
                    {/*    <Button*/}
                    {/*        icon={<AiOutlinePlus style={{color: '#fff'}} />}*/}
                    {/*        onClick={handleIncrement}*/}
                    {/*        disabled={quantity >= 1000}*/}
                    {/*        style={{background: '#F7941D'}}*/}
                    {/*    />*/}
                    {/*</div>*/}

                </div>
                <div className="add-to-cart">
                    <Link href={"/cart"} className="btn">Thêm vào giỏ hàng</Link>
                </div>
                <p className="cat">Danh mục :<Link href="#" className="link-no-decoration">Áo</Link></p>
                <p className="availability">Tình trạng : 180 Sản phẩm còn hàng</p>
            </div>
        </div>
    );
};

export default ProductDescription;