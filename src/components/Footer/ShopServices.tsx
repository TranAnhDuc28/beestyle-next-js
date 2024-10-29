import React from "react";

export default function ShopServices() {
    return (
        <section className="shop-services section home">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-service">
                            <i className="ti-rocket" />
                            <h4>Free shiping</h4>
                            <p>Orders over $100</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-service">
                            <i className="ti-reload" />
                            <h4>Free Return</h4>
                            <p>Within 30 days returns</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-service">
                            <i className="ti-lock" />
                            <h4>Sucure Payment</h4>
                            <p>100% secure payment</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-service">
                            <i className="ti-tag" />
                            <h4>Best Peice</h4>
                            <p>Guaranteed price</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}