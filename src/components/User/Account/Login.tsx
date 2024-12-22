'use client';

import { LoginForm, ProConfigProvider } from '@ant-design/pro-components';
import { Tabs, theme, ConfigProvider } from 'antd';
import { useState } from 'react';
import viVN from 'antd/lib/locale/vi_VN';
import LoginFormComponent from "@/components/User/Account/LoginFormComponent";
import RegisterFormComponent from "@/components/User/Account/RegisterFormComponent";
import Image from "next/image";
import TabPane from "antd/es/tabs/TabPane";

type LoginType = 'phone' | 'account';

const Login = () => {
    const { token } = theme.useToken();
    const [loginType, setLoginType] = useState<LoginType>('account');

    return (
        <>
            <div className="flex justify-center items-center p-5 my-4">
                <div style={{ borderRight: '1px solid #eee' }}>
                    <Image
                        src="/pd-login.png"
                        alt="IMG"
                        width={675}
                        height={445}
                        unoptimized
                    />
                </div>
                <ConfigProvider locale={viVN}>
                    <ProConfigProvider hashed={false}>
                        <div style={{ backgroundColor: token.colorBgContainer }}>
                            <LoginForm
                                logo=""
                                title={<Image src={'/logo.png'} alt='Logo' width={210} height={55} unoptimized />}
                                subTitle="Vui lòng đăng nhập hoặc đăng ký để sử dụng dịch vụ tốt hơn"
                                submitter={{
                                    searchConfig: {
                                        submitText: loginType === 'account' ? 'Đăng nhập' : 'Đăng ký',
                                    },
                                    render: () => (
                                        <div style={{ textAlign: 'center' }}>
                                            <button
                                                type="submit"
                                                style={{
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    border: '1px solid black',
                                                    padding: '5px 20px',
                                                    fontSize: '16px',
                                                    cursor: 'pointer',
                                                    borderRadius: '5px',
                                                    width: '100%',
                                                }}
                                            >
                                                {loginType === 'account' ? 'Đăng nhập' : 'Đăng ký'}
                                            </button>
                                        </div>
                                    ),
                                }}
                            >
                                <Tabs
                                    centered
                                    activeKey={loginType}
                                    onChange={(activeKey) => setLoginType(activeKey)}
                                    className="custom-tabs"
                                >
                                    <TabPane
                                        key="account"
                                        tab={
                                            <span style={{ color: loginType === 'account' ? '#F7941D' : '#333' }}>
                                                Đăng nhập
                                            </span>
                                        }
                                    />
                                    <TabPane
                                        key="phone"
                                        tab={
                                            <span style={{ color: loginType === 'phone' ? '#F7941D' : '#333' }}>
                                                Đăng ký
                                            </span>
                                        }
                                    />
                                </Tabs>
                                {loginType === 'account' ? (
                                    <LoginFormComponent />
                                ) : (
                                    <RegisterFormComponent />
                                )}
                            </LoginForm>
                        </div>
                    </ProConfigProvider>
                </ConfigProvider>
            </div>
        </>
    );
};

export default Login;
