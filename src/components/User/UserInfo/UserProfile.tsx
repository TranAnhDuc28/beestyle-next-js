'use client';

import React from 'react';
import { Form, Input, Select, Button, DatePickerProps, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import Title from 'antd/es/typography/Title';
import { AiOutlineUser } from 'react-icons/ai';
import { IoLocationOutline, IoMailOpenOutline } from 'react-icons/io5';
import { CiPhone } from 'react-icons/ci';
import Image from 'next/image';
import { Dayjs } from 'dayjs';

const { Option } = Select;

const UserProfile: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div className="container my-4 p-4 bg-white rounded-lg shadow-md">
            <Title level={3} className='mb-4'>Cập nhật thông tin</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    gender: '',
                    dob: '',
                }}
            >
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <Form.Item
                            name="fullName"
                            label={<span className="font-semibold text-gray-600">Họ & tên</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                            <Input placeholder="" className="border-gray-400" prefix={<AiOutlineUser />} />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<span className="font-semibold text-gray-600">Email</span>}
                            rules={[
                                { type: 'email', message: 'Email không hợp lệ!' },
                            ]}
                        >
                            <Input
                                placeholder=""
                                className="border-gray-400"
                                prefix={<IoMailOpenOutline />}
                            />
                        </Form.Item>

                        <div className='d-flex'>
                            <div className="w-[35%]">
                                <Form.Item
                                    name="phoneNumber"
                                    label={<span className="font-semibold text-gray-600">Số điện thoại</span>}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số điện thoại!' },
                                    ]}
                                >
                                    <Input
                                        placeholder="0865405630"
                                        className="border-gray-400"
                                        prefix={<CiPhone />}
                                    />
                                </Form.Item>
                            </div>

                            <div className="ml-5">
                                <Form.Item
                                    name="dob"
                                    label={<span className="font-semibold text-gray-600">Ngày sinh</span>}
                                >
                                    <DatePicker onChange={onChange} locale={locale} className='w-52' needConfirm />
                                </Form.Item>
                            </div>

                            <div className="w-[25%] ml-5">
                                <Form.Item
                                    name="gender"
                                    label={<span className="font-semibold text-gray-600">Giới tính</span>}
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn giới tính!' },
                                    ]}
                                >
                                    <Select placeholder="Nam" className="border-gray-400">
                                        <Option value="Nam">Nam</Option>
                                        <Option value="Nữ">Nữ</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>

                        <div className='d-flex'>
                            <div className="w-[32%]">
                                <Form.Item
                                    name=""
                                    label={<span className="font-semibold text-gray-600">Tỉnh / Thành phố</span>}
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn tỉnh / thành phố!' },
                                    ]}
                                >
                                    <Select placeholder="Chọn Tỉnh / Thành phố" className="border-gray-400">
                                        <Option value="1">Hà Nội</Option>
                                        <Option value="2">TP Hồ Chí Minh</Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="w-[31%] ml-5">
                                <Form.Item
                                    name=""
                                    label={<span className="font-semibold text-gray-600">Quận / Huyện</span>}
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn quận / huyện!' },
                                    ]}
                                >
                                    <Select placeholder="Chọn Quận / Huyện " className="border-gray-400">
                                        <Option value="1">Hà Nội</Option>
                                        <Option value="2">TP Hồ Chí Minh</Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="w-[31%] ml-5">
                                <Form.Item
                                    name=""
                                    label={<span className="font-semibold text-gray-600">Phường / Xã</span>}
                                    rules={[
                                        { required: true, message: 'Vui lòng chọn phường / xã!' },
                                    ]}
                                >
                                    <Select placeholder="Chọn Phường / Xã" className="border-gray-400">
                                        <Option value="1">Hà Nội</Option>
                                        <Option value="2">TP Hồ Chí Minh</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item
                            name="address"
                            label={<span className="font-semibold text-gray-600">Địa chỉ</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập địa chỉ' },
                            ]}
                        >
                            <Input placeholder="Nhập địa chỉ chi tiết" className="border-gray-400" prefix={<IoLocationOutline />} />
                        </Form.Item>
                    </div>
                    <div className="w-full flex justify-center p-3 rounded-md" style={{ backgroundColor: '#FCFBFC' }}>
                        <Image
                            src={'/user-profile.png'}
                            alt="IMG" width={400} height={400}
                            unoptimized
                        />
                    </div>
                </div>
                <Form.Item className='mt-3'>
                    <Button
                        type="primary" htmlType="submit"
                        className="bg-black hover:!bg-orange-400 w-[15%] px-8 rounded-md"
                    >
                        Cập nhật
                    </Button>
                    <Button
                        type="primary"
                        className="bg-slate-500 hover:!bg-orange-400 w-[15%] px-8 ml-5 rounded-md"
                    >
                        Đổi mật khẩu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserProfile;
