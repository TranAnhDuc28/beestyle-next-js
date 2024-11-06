import { Form, Input, Button } from 'antd';
import '@/css/user/styles/checkout.module.css';

const ContactForm = () => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log('Form values:', values);
    };

    return (
        <div className="col-lg-8 col-12">
            <div className="form-main">
                <div className="title">
                    <h4>Get in touch</h4>
                    <h3>Write us a message</h3>
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
                                label="Your Name"
                                rules={[{ required: true, message: 'Please enter your name' }]}
                            >
                                <Input rootClassName={"input-checkout"} placeholder="Your Name" />
                            </Form.Item>
                        </div>
                        <div className="col-lg-6 col-12">
                            <Form.Item
                                name="subject"
                                label="Your Subject"
                                rules={[{ required: true, message: 'Please enter the subject' }]}
                            >
                                <Input rootClassName={"input-checkout"} placeholder="Your Subject" />
                            </Form.Item>
                        </div>
                        <div className="col-lg-6 col-12">
                            <Form.Item
                                name="email"
                                label="Your Email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input rootClassName={"input-checkout"} placeholder="Your Email" />
                            </Form.Item>
                        </div>
                        <div className="col-lg-6 col-12">
                            <Form.Item
                                name="phone"
                                label="Your Phone"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input rootClassName={"input-checkout"} placeholder="Your Phone" />
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item
                                name="message"
                                label="Your Message"
                                rules={[{ required: true, message: 'Please enter your message' }]}
                            >
                                <Input.TextArea placeholder="Your Message" rows={4} />
                            </Form.Item>
                        </div>
                        <div className="col-12">
                            <Form.Item className="form-group button">
                                <Button type="primary" htmlType="submit">
                                    Send Message
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