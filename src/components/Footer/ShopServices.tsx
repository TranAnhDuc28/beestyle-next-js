import React from "react";
import {IoPricetagsOutline, IoReloadSharp, IoRocketOutline} from "react-icons/io5";
import {CiLock} from "react-icons/ci";

export default function ShopServices() {
    return (
        <section className="shop-services section home">
            <div className="container">
                <div className="col-12">
                    <div className="row">
                        <div className="col-3">
                            <div className="single-service">
                                <i><IoRocketOutline/></i>
                                <div className="ml-14">
                                    <h4>Free Shipping</h4>
                                    <p>Orders over $100</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="single-service">
                                <div className="single-service">
                                    <i><IoReloadSharp/></i>
                                    <div className="ml-14">
                                        <h4>Free Return</h4>
                                        <p>Within 30 days returns</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="single-service">
                                <div className="single-service">
                                    <i><CiLock/></i>
                                    <div className="ml-14">
                                        <h4>Secure Payment</h4>
                                        <p>100% secure payment</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="single-service">
                                <i><IoPricetagsOutline/></i>
                                <div className="ml-14">
                                    <h4>Best Price</h4>
                                    <p>Guaranteed price</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}