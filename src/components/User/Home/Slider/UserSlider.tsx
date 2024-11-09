import React from "react";
import SmallBaner from "./SmallBanner";
import Link from "next/link";

export default function Slider() {
    return (
        <>
            <section className="hero-slider">
                <div className="single-slider">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-lg-9 offset-lg-3 col-12">
                                <div className="text-inner">
                                    <div className="row">
                                        <div className="col-lg-7 col-12">
                                            <div className="hero-text">
                                                <h1><span>GIẢM GIÁ LÊN ĐẾN 50% </span>Shirt For Women</h1>
                                                <p>
                                                    Đừng bỏ lỡ cơ hội sở hữu những trang phục yêu thích của bạn – từ áo
                                                    khoác, quần jeans, váy, áo sơ
                                                    mi đến phụ kiện thời trang phong cách. Chương trình chỉ diễn ra
                                                    trong thời gian giới hạn, hãy nhanh <br/>
                                                    tay để không bỏ lỡ ưu đãi hấp dẫn này.
                                                </p>
                                                <div className="button">
                                                    <Link href="#" className="btn">Mua ngay</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <SmallBaner/>
        </>
    )
}