import { Button, Form, Input, InputNumber, Radio, DatePicker, Space } from 'antd';
import { useState } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

const AddVoucherForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Submitted Values:', values);
        // Gọi API để thêm phiếu giảm giá với các giá trị từ form
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                discountType: 'percent',
                startDate: [moment(), moment().add(7, 'days')], // Mặc định 7 ngày từ hiện tại
                status: 1
            }}
        >
            {/* Mã phiếu giảm giá */}
            <Form.Item
                label="Mã phiếu giảm giá"
                name="voucherCode"
                rules={[{ required: true, message: 'Hãy nhập mã phiếu giảm giá!' }]}
            >
                <Input placeholder="Nhập mã phiếu giảm giá" />
            </Form.Item>

            {/* Tên phiếu giảm giá */}
            <Form.Item
                label="Tên phiếu giảm giá"
                name="voucherName"
                rules={[{ required: true, message: 'Hãy nhập tên phiếu giảm giá!' }]}
            >
                <Input placeholder="Nhập tên phiếu giảm giá" />
            </Form.Item>

            <Space>
                {/* Giá trị giảm */}
                <Form.Item
                    label="Giá trị giảm"
                    name="discountValue"
                    rules={[{ required: true, message: 'Hãy nhập giá trị giảm!' }]}
                >
                    <InputNumber min={0} placeholder="0" />
                </Form.Item>

                {/* Giảm tối đa */}
                <Form.Item
                    label="Giá trị tối đa"
                    name="maxDiscount"
                    rules={[{ required: true, message: 'Hãy nhập giá trị giảm tối đa!' }]}
                >
                    <InputNumber min={0} placeholder="0" />
                </Form.Item>
            </Space>

            {/* Loại giảm giá */}
            <Form.Item
                label="Loại giảm giá"
                name="discountType"
            >
                <Radio.Group>
                    <Radio value="percent">%</Radio>
                    <Radio value="amount">$</Radio>
                </Radio.Group>
            </Form.Item>

            <Space>
                {/* Điều kiện đơn hàng tối thiểu */}
                <Form.Item
                    label="Điều kiện"
                    name="minOrderValue"
                >
                    <InputNumber min={0} placeholder="0" />
                </Form.Item>

                {/* Số lượng */}
                <Form.Item
                    label="Số lượng"
                    name="usageLimit"
                    rules={[{ required: true, message: 'Hãy nhập số lượng!' }]}
                >
                    <InputNumber min={1} placeholder="0" />
                </Form.Item>
            </Space>

            {/* Ngày bắt đầu và kết thúc */}
            <Form.Item
                label="Ngày áp dụng"
                name="startDate"
                rules={[{ required: true, message: 'Hãy chọn ngày bắt đầu và kết thúc!' }]}
            >
                <RangePicker />
            </Form.Item>

            {/* Trạng thái */}
            <Form.Item label="Trạng thái" name="status">
                <Radio.Group>
                    <Radio value={1}>Công khai</Radio>
                    <Radio value={0}>Cá nhân</Radio>
                </Radio.Group>
            </Form.Item>

            {/* Nút Submit */}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm phiếu giảm giá
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddVoucherForm;
