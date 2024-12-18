'use client';

import { ProFormText, ProFormCheckbox } from '@ant-design/pro-components';
import Link from 'next/link';
import { IoLockClosedOutline } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';

const LoginFormComponent = () => {
    return (
        <>
            <ProFormText
                name="email"
                fieldProps={{
                    size: 'large',
                    prefix: <MdOutlineMailOutline size={20} className="prefixIcon mr-2" />,
                    className: 'py-2'
                }}
                placeholder="Vui lòng nhập Email của bạn"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập Email!',
                    },
                    {
                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: 'Email không đúng định dạng!',
                    },
                ]}
            />
            <ProFormText.Password
                name="password"
                fieldProps={{
                    size: 'large',
                    prefix: <IoLockClosedOutline size={20} className="prefixIcon mr-2" />,
                    className: 'py-2'
                }}
                placeholder="Vui lòng nhập mật khẩu"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                ]}
            />
            <div style={{ marginBlockEnd: 24 }}>
                <ProFormCheckbox noStyle name="autoLogin">
                    <span className="d-block">Ghi nhớ đăng nhập</span>
                </ProFormCheckbox>
                <Link href="/" style={{ float: 'right', textDecoration: 'none', color: '#F7941D' }}>
                    Quên mật khẩu?
                </Link>
            </div>
        </>
    );
};

export default LoginFormComponent;
