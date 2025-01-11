"use client"
import useAppNotifications from "@/hooks/useAppNotifications";
import {useRouter} from "next/navigation";
import {Button, Flex, Form, Input, Typography} from "antd";
import {IAuthResponse, ISignIn} from "@/types/IAuth";
import {signIn} from "@/services/AuthService";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import {useAuthentication} from "@/components/Context/AuthenticationProvider";

const {Text} = Typography;

const AuthenticationAdminComponent: React.FC = () => {
    const {showNotification} = useAppNotifications();
    const authenticationAdmin = useAuthentication();
    const router = useRouter();
    const [form] = Form.useForm();

    const onFinish = async (value: ISignIn) => {
        try {
            const result: IAuthResponse = await signIn(value);

            if (result) {
                authenticationAdmin?.login(result);
                form.resetFields();
                router.push("/admin");
            }
        } catch (error: any) {
            const errorMessage = error?.response?.message;
            console.log(error)
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error", {message: String(message)});
                });
            } else {
                showNotification("error", {message: error?.message, description: errorMessage,});
            }
        }
    };

    return (
        <Flex justify="center" align="center">
            <Form
                name="login"
                initialValues={{remember: true}}
                onFinish={onFinish}
                style={{width: "90%"}}
            >
                <Form.Item<ISignIn>
                    name="username"
                    rules={[
                        {required: true, message: 'Vui lòng nhập tài khoản!'},
                    ]}
                    style={{width: "100%", marginTop: 10}}
                >
                    <Input size="large" placeholder="Email" prefix={<UserOutlined/>}/>
                </Form.Item>

                <Form.Item<ISignIn>
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
}
export default AuthenticationAdminComponent;