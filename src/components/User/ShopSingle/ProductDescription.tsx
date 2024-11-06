'use client';

import React, {useState} from 'react';
import Link from "next/link";
import {Input, Rate} from 'antd';
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
                <h4>Nonstick Dishwasher PFOA</h4>
                <div className="rating-main">
                    <ul className="rating">
                        <li><Rate disabled defaultValue={5} style={{marginLeft: -35}}/></li>
                    </ul>
                    <Link href="#" className="total-review link-no-decoration">(102) Review</Link>
                </div>
                <p className="price"><span className="discount">$70.00</span><s>$80.00</s></p>
                <p className="description">eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam,
                    purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus
                    nisi posuere nisl, in</p>
            </div>
            <div className="color">
                <h4>Available Options <span>Color</span></h4>
                <ul>
                    <li><Link href="#" className="one"><i className="ti-check"></i></Link></li>
                    <li><Link href="#" className="two"><i className="ti-check"></i></Link></li>
                    <li><Link href="#" className="three"><i className="ti-check"></i></Link></li>
                    <li><Link href="#" className="four"><i className="ti-check"></i></Link></li>
                </ul>
            </div>
            <div className="size">
                <h4>Size</h4>
                <ul>
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <li key={size}>
                            <Link
                                href="#"
                                className={
                                    selectedSize === size ?
                                        'selected-size link-no-decoration' :
                                        'link-no-decoration'
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
                    <h6>Quantity :</h6>
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
                </div>
                <div className="add-to-cart">
                    <Link href={"/cart"} className="btn">Add to cart</Link>
                    <Link href="#" className="btn min"><FaRegHeart size={24} className="mt-2"/></Link>
                    <Link href="#" className="btn min"><LiaCompressArrowsAltSolid size={24} className="mt-2"/></Link>
                </div>
                <p className="cat">Category :<Link href="#" className="link-no-decoration">Clothing</Link></p>
                <p className="availability">Availability : 180 Products In Stock</p>
            </div>
        </div>
    );
};

export default ProductDescription;