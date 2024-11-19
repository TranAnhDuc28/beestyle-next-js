import React from 'react';
import Link from "next/link";
import {Button, Checkbox, Form, Input} from "antd";

const TotalAmount = () => {
    return (
        <div className="total-amount">
            <div className="row">
                <div className="col-lg-8 col-md-5 col-12">
                    <div className="left">
                        <div className="coupon">
                            <Form action="#" target="_blank">
                                <Input name="Coupon" placeholder="Nhập mã giảm giá của bạn" style={{width: 300}}/>
                                <Button className="btn">Áp dụng</Button>
                            </Form>
                        </div>

                    </div>
                </div>
                <div className="col-lg-4 col-md-7 col-12">
                    <div className="right">
                        <ul>
                            <li>Tổng tiền<span>330.000 VND</span></li>
                            <li>Phí vận chuyển<span>Miễn phí</span></li>
                            <li>Tiết kiệm<span>20.000 VND</span></li>
                            <li className="last">Bạn phải trả<span>310.000 VND</span></li>
                        </ul>
                        <div className="button5">
                            <Link
                                href="/checkout"
                                className="btn btn-dark d-flex align-items-center justify-content-center"
                            >
                                Thanh toán
                            </Link>
                            <Link
                                href="/category"
                                className="btn btn-dark d-flex align-items-center justify-content-center"
                            >
                                Tiếp tục mua hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalAmount;