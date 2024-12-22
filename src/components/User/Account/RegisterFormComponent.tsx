'use client';

import { LockOutlined } from '@ant-design/icons';
import { ProFormText, ProFormCaptcha, ProFormRadio, ProFormDatePicker } from '@ant-design/pro-components';
import { message } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineMailOutline } from 'react-icons/md';

const RegisterFormComponent = () => {
    return (
        <>
            <ProFormText
                fieldProps={{
                    size: 'large',
                    prefix: <AiOutlineUser className="prefixIcon mr-2" />,
                }}
                name="fullName"
                placeholder="Họ và tên"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập họ & tên',
                    },
                ]}
            />
            <ProFormText
                fieldProps={{
                    size: 'large',
                    prefix: <MdOutlineMailOutline className="prefixIcon mr-2" />,
                }}
                name="email"
                placeholder="Email"
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
                name="newPassword"
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className="prefixIcon mr-2" />,
                }}
                placeholder="Mật khẩu mới"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới!',
                    },
                ]}
            />
            <ProFormText.Password
                name="newPasswordComfirm"
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className="prefixIcon mr-2" />,
                }}
                placeholder="Xác nhận mật khẩu mới"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng xác nhận mật khẩu!',
                    },
                ]}
            />
            <ProFormCaptcha
                fieldProps={{
                    size: 'large',
                    prefix: <GiConfirmed className="prefixIcon mr-2" />,
                }}
                captchaProps={{
                    size: 'large',
                }}
                placeholder="Mã xác nhận"
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
                        message: 'Vui lòng nhập mã xác nhận!',
                    },
                ]}
                onGetCaptcha={async () => {
                    message.success('Mã xác nhận của bạn là: 1234');
                }}
            />
        </>
    );
};

export default RegisterFormComponent;
