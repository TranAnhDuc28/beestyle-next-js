import Link from "next/link";
import Image from "next/image";
import {TiChartPie, TiEye, TiHeart} from "react-icons/ti";
import React from "react";

const ProductList = ({product}) => {
    return (
        <div className="single-product">
            <div className="product-img">
                <Link href={"/product"}>
                    <Image width={550} height={750} className="default-img"
                           src={product.image} alt={product.title}
                    />
                    <Image width={550} height={750} className="hover-img"
                           src={product.image} alt={product.title}
                    />
                </Link>
                <div className="button-head">
                    <div className="product-action-2 ml-2">
                        <Link title="Add to cart" className="link-no-decoration link-action" href="#">
                            Thêm vào giỏ hàng
                        </Link>
                    </div>
                    <div className="product-action mt-3 mr-2">
                        <Link href="#" className="link-action" title="Quick View">
                            <TiEye size={18}/>
                            <span style={{marginLeft: '0.5rem'}}>Xem nhanh</span>
                        </Link>
                        {/*<Link href="#" className="link-action" title="Wishlist">*/}
                        {/*    <TiHeart size={18}/>*/}
                        {/*    <span style={{marginLeft: '0.5rem'}}>Add to Wishlist</span>*/}
                        {/*</Link>*/}
                        {/*<Link href="#" className="link-action" title="Compare">*/}
                        {/*    <TiChartPie size={18}/>*/}
                        {/*    <span style={{marginLeft: '0.5rem'}}>Add to Compare</span>*/}
                        {/*</Link>*/}
                    </div>
                </div>

            </div>
            <div className="product-content">
                <h3><Link href="#" className="link-action link-no-decoration">{product.title}</Link>
                </h3>
                <div className="product-price">
                    <span>{product.price}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
