'use client';

import {
    LockOutlined,
    MobileOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';

import {Tabs, message, theme, ConfigProvider} from 'antd';
import {useState} from 'react';
import Link from "next/link";
import viVN from 'antd/lib/locale/vi_VN';

type LoginType = 'phone' | 'account';

const Login = () => {

    const {token} = theme.useToken();
    const [loginType, setLoginType] = useState<LoginType>('phone');

    return (
        <ConfigProvider locale={viVN}>
            <ProConfigProvider hashed={false}>
                <div style={{backgroundColor: token.colorBgContainer}}>
                    <LoginForm
                        logo=""
                        title="BeeStyle"
                        subTitle="Vui lòng đăng ký để thanh toán nhanh hơn"
                    >
                        <Tabs
                            centered
                            activeKey={loginType}
                            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                        >
                            <Tabs.TabPane key={'account'} tab={'Đăng nhập'}/>
                            <Tabs.TabPane key={'phone'} tab={'Đăng ký'}/>
                        </Tabs>
                        {loginType === 'account' && (
                            <>
                                <ProFormText
                                    name="username"
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <UserOutlined className={'prefixIcon mr-2'}/>,
                                    }}
                                    placeholder={'Tên đăng nhập'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng điền tên đăng nhập!',
                                        },
                                    ]}
                                />
                                <ProFormText.Password
                                    name="password"
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <LockOutlined className={'prefixIcon mr-2'}/>,
                                        strengthText:
                                            'Password should contain numbers, letters and special characters, at least 8 characters long.',
                                        statusRender: (value) => {
                                            const getStatus = () => {
                                                if (value && value.length > 12) {
                                                    return 'ok';
                                                }
                                                if (value && value.length > 6) {
                                                    return 'pass';
                                                }
                                                return 'poor';
                                            };
                                            const status = getStatus();
                                            if (status === 'pass') {
                                                return (
                                                    <div style={{color: token.colorWarning}}>
                                                        Mật khẩu Trung bình
                                                    </div>
                                                );
                                            }
                                            if (status === 'ok') {
                                                return (
                                                    <div style={{color: token.colorSuccess}}>
                                                        Mật khẩu Tốt
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div style={{color: token.colorError}}>Mật khẩu Yếu</div>
                                            );
                                        },
                                    }}
                                    placeholder={'Mật khẩu'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng điền mật khẩu!',
                                        },
                                    ]}
                                />
                                <div
                                    style={{
                                        marginBlockEnd: 24,
                                    }}
                                >
                                    <ProFormCheckbox noStyle name="autoLogin">
                                        Lưu mật khẩu
                                    </ProFormCheckbox>
                                    <Link
                                        style={{
                                            float: 'right',
                                            textDecoration: "none"
                                        }}
                                        href="#">
                                        Quên mật khẩu
                                    </Link>
                                </div>
                            </>
                        )}
                        {loginType === 'phone' && (
                            <>
                                <ProFormText
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <MobileOutlined className={'prefixIcon mr-2'}/>,
                                    }}
                                    name="mobile"
                                    placeholder={'Số điện thoại'}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại!',
                                        },
                                        {
                                            pattern: /^0\d{9}$/,
                                            message: 'Số điện thoại không đúng định dạng!',
                                        },
                                    ]}
                                />
                                <ProFormCaptcha
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <LockOutlined className={'prefixIcon mr-2'}/>,
                                    }}
                                    captchaProps={{
                                        size: 'large',
                                    }}
                                    placeholder={'Mật khẩu'}
                                    captchaTextRender={(timing, count) => {
                                        if (timing) {
                                            return `Gửi lại sau ${count}s`;
                                        }
                                        return 'Gửi mã xác nhận';
                                    }}
                                    name="captcha"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu!',
                                        },
                                    ]}
                                    onGetCaptcha={async () => {
                                        message.success('Mã xác nhận của bạn là: 1234');
                                    }}
                                />
                            </>
                        )}
                    </LoginForm>
                </div>
            </ProConfigProvider>
        </ConfigProvider>
    )
}

export default Login;