import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import useEmailSender from '@/hooks/useEmailSender';

const { Title, Text } = Typography;

const ContactForm = () => {
    const [form] = Form.useForm();
    const { sendEmail, loading, error, success } = useEmailSender();

    const onFinish = async (values) => {
        await sendEmail(values);
        if (success) {
            message.success('Email sent successfully!');
            form.resetFields();
        } else {
            message.error(error || 'Failed to send email.');
        }
    };

    return (
        <div className='py-4'>
            <Title level={2} className="text-2xl font-bold mb-4">
                Gửi thắc mắc cho chúng tôi
            </Title>
            <Text className="mb-4 block">
                Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ
                liên lạc lại với bạn sớm nhất có thể.
            </Text>
            <Form
                form={form}
                name="contact"
                onFinish={onFinish}
                layout="vertical"
                className="space-y-4"
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                >
                    <Input
                        placeholder="Tên của bạn"
                        className="w-full p-3 border border-gray-300 rounded"
                        size="large"
                    />
                </Form.Item>
                <Form.Item shouldUpdate={(prevValues, currentValues) => prevValues.email !== currentValues.email || prevValues.phone !== currentValues.phone}>
                    {({ getFieldValue }) => {
                        return (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email của bạn!' },
                                        { type: 'email', message: 'Email không hợp lệ!' },
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        placeholder="Email của bạn"
                                        className="w-full p-3 border border-gray-300 rounded"
                                        size="large"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập số điện thoại của bạn!',
                                        },
                                        {
                                            pattern: /^0\d{9}$/,
                                            message: 'Số điện thoại không hợp lệ!',
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        placeholder="Số điện thoại của bạn"
                                        className="w-full p-3 border border-gray-300 rounded"
                                        size="large"
                                    />
                                </Form.Item>
                            </div>
                        )
                    }}
                </Form.Item>
                <Form.Item
                    name="message"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                >
                    <Input.TextArea
                        placeholder="Nội dung"
                        className="w-full p-3 border border-gray-300 rounded h-32"
                        autoSize={{ minRows: 4, maxRows: 8 }}
                        size="large"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-black hover:!bg-orange-400 text-white px-6 py-3 rounded mt-2"
                        size="large"
                        loading={loading}
                    >
                        GỬI CHO CHÚNG TÔI
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ContactForm;
