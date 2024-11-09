'use client';

import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import { ProFormText, ProFormCaptcha } from '@ant-design/pro-components';
import { message } from 'antd';
import {Md123} from "react-icons/md";
import {GiConfirmed} from "react-icons/gi";

const RegisterFormComponent = () => {
    return (
        <>
            <ProFormText
                fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className="prefixIcon mr-2" />,
                }}
                name="mobile"
                placeholder="Số điện thoại"
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
