import React from 'react';
import {Button, Col, Form, Input, Row, Typography} from "antd";
import Link from "next/link";

const TotalAmount = ({cartItems}: any) => {

    const {Text} = Typography;

    const totalAmount = cartItems.reduce((total, item) => total + item.total_price, 0);

    return (
        <div className="total-amount">
            <div className="row">
                <div className="left mb-5" style={{marginTop: -25}}>
                    <div className="coupon">
                        <Form action="#" target="_blank">
                            <Input name="Coupon" placeholder="Nhập mã giảm giá của bạn" style={{width: 300}}/>
                            <Button className="btn">Áp dụng</Button>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="row">
                <div>
                    <div style={{
                        padding: '20px',
                        borderTop: '1px solid #e8e8e8',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Row gutter={16}>
                            <Col>
                                <Link href="/" className="btn" style={{borderColor: '#333'}}>
                                    TIẾP TỤC MUA HÀNG
                                </Link>
                            </Col>
                        </Row>

                        <Row align="middle">
                            <Col>
                                <div className="text-center">
                                    <Text>Tổng đơn đặt hàng {totalAmount} VND</Text>
                                    <br/>
                                    <Text type="secondary">* Đã bao gồm thuế VAT</Text>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Link href={"/checkout"} className="btn text-white"
                                      style={{backgroundColor: '#000', borderColor: '#000'}}>
                                    THANH TOÁN
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalAmount;
