import React, {useState} from 'react';
import {Form, Input, Select, Radio, Divider} from 'antd';
import {EditOutlined, MailOutlined, PhoneOutlined, UserOutlined, HomeOutlined, ShopOutlined} from '@ant-design/icons';
import styles from '@/css/user/styles/checkout.module.css';

const {Option} = Select;

const CheckoutForm = () => {
    const [selectedMethod, setSelectedMethod] = useState('home');
    const [selectedShipping, setSelectedShipping] = useState('standard');

    const onChangeMethod = (e) => {
        setSelectedMethod(e.target.value);
    };

    const onChangeShipping = (e) => {
        setSelectedShipping(e.target.value);
    };

    return (
        <div className={styles['checkout-form']}>
            <h3 className={styles['heading']} style={{fontSize: 20}}>Người nhận</h3>
            <Form layout="vertical" className={styles['form']} method="post" action="#">
                <Form.Item
                    name="customerName"
                    rules={[{required: true, message: "Vui lòng nhập tên khách hàng!"}]}
                >
                    <Input
                        placeholder="Tên khách hàng"
                        prefix={<UserOutlined className="pr-2"/>}
                        className={styles['input-checkout']}
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    rules={[{required: true, message: "Vui lòng nhập số điện thoại!"}]}
                >
                    <Input
                        placeholder="Số điện thoại"
                        prefix={<PhoneOutlined className="pr-2"/>}
                        className={styles['input-checkout']}
                    />
                </Form.Item>

                <Form.Item name="email">
                    <Input
                        placeholder="Địa chỉ email (Không bắt buộc)"
                        prefix={<MailOutlined className="pr-2"/>}
                        className={styles['input-checkout']}
                    />
                </Form.Item>

                <div className={`${styles['delivery-method']} mt-5`}>
                    <h3 className={styles['heading']}>Hình thức nhận hàng</h3>
                    <Radio.Group onChange={onChangeMethod} value={selectedMethod}
                                 className={styles['delivery-radio-group']}>
                        <div className="d-flex">
                            <div className="mr-5">
                                <Radio.Button
                                    value="home"
                                    className={`${styles['delivery-option']} ${selectedMethod === 'home' ? styles['selected'] : ''}`}
                                    style={{padding: 30}}
                                >
                                    <div style={{marginTop: '-15px'}}>
                                        <HomeOutlined style={{fontSize: '24px', margin: '0 10px 0 5px'}}/>
                                        Giao hàng tận nhà
                                    </div>
                                </Radio.Button>
                            </div>
                            <div>
                                <Radio.Button
                                    value="store"
                                    className={`${styles['delivery-option']} ${selectedMethod === 'store' ? styles['selected'] : ''}`}
                                    style={{padding: 30}}
                                >
                                    <div style={{marginTop: '-15px'}}>
                                        <ShopOutlined style={{fontSize: '24px', margin: '0 10px 0 5px'}}/>
                                        Lấy tại cửa hàng
                                    </div>
                                </Radio.Button>
                            </div>
                        </div>
                    </Radio.Group>
                </div>

                <Form.Item
                    label="Địa chỉ của bạn"
                    name="province"
                    rules={[{required: true, message: "Vui lòng nhập địa chỉ!"}]}
                    className="mt-4"
                >
                    <Select placeholder="Chọn Tỉnh/Thành Phố">
                        <Option value="" selected disabled={true}>Chọn Tỉnh/Thành Phố</Option>
                        <Option value="hanoi">Hà Nội</Option>
                        <Option value="hcm">TP Hồ Chí Minh</Option>
                        <Option value="danang">Đà Nẵng</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="district" rules={[{required: true, message: "Vui lòng nhập địa chỉ!"}]}>
                    <Select placeholder="Chọn Quận/Huyện">
                        <Option value="" selected disabled={true}>Chọn Quận/Huyện</Option>
                        <Option value="hanoi">Hà Nội</Option>
                        <Option value="hcm">TP Hồ Chí Minh</Option>
                        <Option value="danang">Đà Nẵng</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="ward" rules={[{required: true, message: "Vui lòng nhập địa chỉ!"}]}>
                    <Select placeholder="Chọn Phường/Xã">
                        <Option value="" selected disabled={true}>Chọn Phường/Xã</Option>
                        <Option value="hanoi">Hà Nội</Option>
                        <Option value="hcm">TP Hồ Chí Minh</Option>
                        <Option value="danang">Đà Nẵng</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Nhập địa chỉ (VD: Số 15, Đường St)"
                    name="detailedAddress"
                    rules={[{required: true, message: "Vui lòng nhập địa chỉ chi tiết!"}]}
                >
                    <Input
                        placeholder="Nhập địa chỉ chi tiết"
                        className={styles['input-checkout']}
                        prefix={<EditOutlined className="pr-2"/>}
                    />
                </Form.Item>

                <div className={styles['shipping-method']}>
                    <h3 className={styles['heading']}>Phương thức vận chuyển</h3>

                    <Radio.Group onChange={onChangeShipping} value={selectedShipping}
                                 className={styles['shipping-radio-group']}>
                        <div className={styles['shipping-option']} style={{width: '310px'}}>
                            <Radio value="standard" className={styles['shipping-radio']}>
                                <div className={styles['shipping-content']}>
                                    <div className={styles['shipping-info']}>
                                        <span className={styles['shipping-title']}>Tiêu chuẩn</span>
                                        <span className={styles['shipping-price']}>20.000 ₫</span>
                                    </div>
                                    <div className={styles['shipping-description']}>Đảm bảo nhận hàng từ 3 - 5 ngày
                                    </div>
                                </div>
                            </Radio>
                            <Divider/>
                            <Radio value="flash" className={`${styles['shipping-radio']}`}>
                                <div className={styles['shipping-content']}>
                                    <div className={styles['shipping-info']}>
                                        <span className={styles['shipping-title']}>Hoả tốc</span>
                                        <span className={styles['shipping-price']}>65.000 ₫</span>
                                    </div>
                                    <div className={styles['shipping-description']}>Đảm bảo nhận hàng ngay trong ngày
                                    </div>
                                </div>
                            </Radio>
                        </div>
                    </Radio.Group>
                </div>
            </Form>
        </div>
    );
};

export default CheckoutForm;
