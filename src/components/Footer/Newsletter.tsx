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
                                <h4>Newsletter</h4>
                                <p> Subscribe to our newsletter and get <span>10%</span> off your first purchase</p>
                                <Form action="" method="get" target="_blank" className="newsletter-inner">
                                    <Input className="newsletter-input" name="EMAIL" placeholder="Your email address" required type="email" />
                                    <button className="btn">Subscribe</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}