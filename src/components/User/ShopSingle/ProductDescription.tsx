import React from 'react';
import Link from "next/link";

const ProductDescription = () => {
    return (
        <div className="product-des">
            <div className="short">
                <h4>Nonstick Dishwasher PFOA</h4>
                <div className="rating-main">
                    <ul className="rating">
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star-half-o"></i></li>
                        <li className="dark"><i className="fa fa-star-o"></i></li>
                    </ul>
                    <a href="#" className="total-review">(102) Review</a>
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
                    <li><a href="#" className="one"><i className="ti-check"></i></a></li>
                    <li><a href="#" className="two"><i className="ti-check"></i></a></li>
                    <li><a href="#" className="three"><i className="ti-check"></i></a></li>
                    <li><a href="#" className="four"><i className="ti-check"></i></a></li>
                </ul>
            </div>
            <div className="size">
                <h4>Size</h4>
                <ul>
                    <li><a href="#" className="one">S</a></li>
                    <li><a href="#" className="two">M</a></li>
                    <li><a href="#" className="three">L</a></li>
                    <li><a href="#" className="four">XL</a></li>
                    <li><a href="#" className="four">XXL</a></li>
                </ul>
            </div>
            <div className="product-buy">
                <div className="quantity">
                    <h6>Quantity :</h6>
                    <div className="input-group">
                        <div className="button minus">
                            <button type="button" className="btn btn-primary btn-number" disabled="disabled"
                                    datatype="minus" data-field="quant[1]">
                                <i className="ti-minus"></i>
                            </button>
                        </div>
                        <input type="text" name="quant[1]" className="input-number" data-min="1" data-max="1000"
                               value="1"/>
                        <div className="button plus">
                            <button type="button" className="btn btn-primary btn-number" datatype="plus"
                                    data-field="quant[1]">
                                <i className="ti-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="add-to-cart">
                    <Link href={"/cart"} className="btn">Add to cart</Link>
                    <a href="#" className="btn min"><i className="ti-heart"></i></a>
                    <a href="#" className="btn min"><i className="fa fa-compress"></i></a>
                </div>
                <p className="cat">Category :<a href="#">Clothing</a></p>
                <p className="availability">Availability : 180 Products In Stock</p>
            </div>
        </div>
    );
};

export default ProductDescription;