'use client';

import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {ProFormText, ProFormCheckbox} from '@ant-design/pro-components';
import Link from 'next/link';

const LoginFormComponent = () => {
    return (
        <>
            <ProFormText
                name="username"
                fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className="prefixIcon mr-2"/>,
                }}
                placeholder="Tên đăng nhập"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên đăng nhập!',
                    },
                ]}
            />
            <ProFormText.Password
                name="password"
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className="prefixIcon mr-2"/>,
                }}
                placeholder="Mật khẩu"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                ]}
            />
            <div style={{marginBlockEnd: 24}}>
                <ProFormCheckbox noStyle name="autoLogin">
                    <span className="d-block mb-3">Ghi nhớ đăng nhập</span>
                </ProFormCheckbox>
                <Link href="#" style={{float: 'right', textDecoration: 'none', color: '#F7941D'}}>
                    Quên mật khẩu?
                </Link>
            </div>
        </>
    );
};

export default LoginFormComponent;
