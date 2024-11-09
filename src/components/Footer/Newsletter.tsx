import React from "react";
import {Form, Input} from "antd";

export default function Newsletter() {
    return (
        <section className="shop-newsletter section">
            <div className="container">
                <div className="inner-top">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 col-12">
                            <div className="inner">
                                <h4 className="mb-3">Tin tức</h4>
                                <p> Đăng ký nhận bản tin của chúng tôi để nhận được giảm giá <span>10%</span> cho lần mua hàng đầu tiên của bạn.</p>
                                <Form action="" method="get" target="_blank" className="newsletter-inner">
                                    <Input className="newsletter-input" name="EMAIL" placeholder="Nhập email của bạn" required type="email" />
                                    <button className="btn">Đăng ký ngay</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}