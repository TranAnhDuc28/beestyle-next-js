import { Form, Input, Button } from 'antd';
import '@/css/user/styles/checkout.module.css';
import Image from "next/image";

const ContactForm = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log('Form values:', values);
    };

    return (
        <div className="col-lg-8 col-12">
            <div className="form-main">
                <div className="title mb-5">
                    <h4 className="mb-2">Nếu bạn đang gặp vấn đề</h4>
                    <h3>Gửi tin nhắn ngay cho chúng tôi</h3>
                </div>
                <Form
                    form={form}
                    className="form"
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <Form.Item
                                name="name"
                                label="Tên khách hàng"
                                rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                            >
                                <Input rootClassName={"input-checkout"} placeholder="Nhập vào tên đầy đủ của bạn" />
                            </Form.Item>
                        </div>
                        <div className="col-lg-6 col-12">
                            <Form.Item
                                name="subject"
                                label="Tiêu đề"
                                rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                            >
                                <Input rootClassName={"input-checkout"} placeholder="Nhập vào chủ đề bạn muốn được hỗ trợ" />
                            </Form.Item>
                        </div>
                        <div className="col-lg-6 col-12 mt-2">
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input rootClassName={"input-checkout"} placeholder="Nhập vào số điện thoại của bạn" />
                            </Form.Item>
                        </div>
                        <div className="col-lg-6 col-12 mt-2">
                            <Form.Item
                                name="email"
                                label="Email"
                            >
                                <Input rootClassName={"input-checkout"} placeholder="Nhập vào địa chỉ email của bạn" />
                            </Form.Item>
                        </div>
                        <div className="col-12 mt-2">
                            <Form.Item
                                name="message"
                                label="Nội dung"
                                rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                            >
                                <Input.TextArea placeholder="Nhập vào mô tả cụ thể về vấn đề cần được hỗ trợ" rows={4} />
                            </Form.Item>
                        </div>
                        <div className="col-12 mt-2">
                            <Form.Item className="form-group button">
                                <Button
                                    type="primary"
                                    className="btn btn-dark px-5"
                                    htmlType="submit"
                                >
                                    Gửi yêu cầu
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ContactForm;