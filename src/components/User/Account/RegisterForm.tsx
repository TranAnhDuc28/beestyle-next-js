'use client';

import {LockOutlined, UserOutlined} from '@ant-design/icons';
import { ProFormText, ProFormCaptcha, ProFormRadio, ProFormDatePicker } from '@ant-design/pro-components';
import {Button, Flex, Form, Input, message, Typography} from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineMailOutline } from 'react-icons/md';
import Link from "next/link";

const {Text} = Typography;

const RegisterForm = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };


    return (

        <Flex justify="center" align="center">
            <Form
                name="login"
                initialValues={{remember: true}}
                onFinish={onFinish}
                style={{width: "90%"}}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {required: true, message: 'Vui lòng nhập Email!'},
                        {
                            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: 'Email không đúng định dạng!',
                        },
                    ]}
                    style={{width: "100%", marginTop: 10}}
                >
                    <Input size="large" placeholder="Email" prefix={<UserOutlined/>}/>
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[
                        {required: true, message: 'Vui lòng nhập Email!'},
                        {
                            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: 'Email không đúng định dạng!',
                        },
                    ]}
                    style={{width: "100%", marginTop: 10}}
                >
                    <Input size="large" placeholder="Email" prefix={<UserOutlined/>}/>
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[
                        {required: true, message: 'Vui lòng nhập Email!'},
                        {
                            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: 'Email không đúng định dạng!',
                        },
                    ]}
                    style={{width: "100%", marginTop: 10}}
                >
                    <Input size="large" placeholder="Email" prefix={<UserOutlined/>}/>
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[
                        {required: true, message: 'Vui lòng nhập Email!'},
                        {
                            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: 'Email không đúng định dạng!',
                        },
                    ]}
                    style={{width: "100%", marginTop: 10}}
                >
                    <Input size="large" placeholder="Email" prefix={<UserOutlined/>}/>
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[
                        {required: true, message: 'Vui lòng nhập Email!'},
                        {
                            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: 'Email không đúng định dạng!',
                        },
                    ]}
                    style={{width: "100%", marginTop: 10}}
                >
                    <Input size="large" placeholder="Email" prefix={<UserOutlined/>}/>
                </Form.Item>


                <Form.Item
                    name="password"
                    rules={[
                        {
                            validator: (_, value) => {
                                if (value && value.length >= 5 && value.length <= 10) {
                                    return Promise.resolve(); // Hợp lệ
                                }
                                return Promise.reject(new Error('Mật khẩu phải có độ dài từ 5 đến 10 ký tự!'));
                            }
                        }

                    ]}
                    style={{width: "100%"}}
                >
                    <Input size="large" prefix={<LockOutlined/>} type="password" placeholder="Mật khẩu"/>
                </Form.Item>

                <Form.Item label={null}>
                    <Flex justify="center" align="center">
                        <Button type="primary" htmlType="submit" size="large">
                            Đăng nhập
                        </Button>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Flex justify="center" align="center">
                        Bạn chưa có tài khoản?
                        <Text style={{
                            marginInlineStart: 4,
                            textDecoration: 'none',
                            color: '#F7941D',
                            cursor: "pointer"
                        }}>
                            Đăng ký
                        </Text>
                    </Flex>
                    <Flex justify="center" align="center">
                        <Text>
                            Bạn quên mật khẩu?
                            <Link href="/" style={{marginInlineStart: 4, textDecoration: 'none', color: '#F7941D'}}>
                                Quên mật khẩu?
                            </Link>
                        </Text>
                    </Flex>
                </Form.Item>


            </Form>
        </Flex>
    );
};

export default RegisterForm;
