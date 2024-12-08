import React from "react";
import {IoPricetagsOutline, IoReloadSharp, IoRocketOutline} from "react-icons/io5";
import {CiLock} from "react-icons/ci";

export default function ShopServices() {
    return (
        <section className="shop-services section home">
            <div className="container">
                <div className="col-12">
                    <div className="row">
                        <div className="col-4">
                            <div className="single-service">
                                <i><IoRocketOutline/></i>
                                <div className="ml-14">
                                    <h4>Miễn phí vận chuyển</h4>
                                    <p>Dành cho đơn hàng từ 500.000 đ</p>
                                </div>
                            </div>
                        </div>
                        {/*<div className="col-3">*/}
                        {/*    <div className="single-service">*/}
                        {/*        <div className="single-service">*/}
                        {/*            <i><IoReloadSharp/></i>*/}
                        {/*            <div className="ml-14">*/}
                        {/*                <h4>Miễn phí đổi trả</h4>*/}
                        {/*                <p>Trả hàng trong vòng 30 ngày</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="col-4">
                            <div className="single-service">
                                <div className="single-service">
                                    <i><CiLock/></i>
                                    <div className="ml-14">
                                        <h4>Thanh toán an toàn</h4>
                                        <p>Thanh toán an toàn 100%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="single-service">
                                <i><IoPricetagsOutline/></i>
                                <div className="ml-14">
                                    <h4>Giá tốt nhất</h4>
                                    <p>Mua hàng ngay với mức giá ưu đãi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}