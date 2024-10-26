"use client";
import {memo} from 'react';
import {Form, Input, Modal, notification, Select, DatePicker, InputNumber, Row, Col} from 'antd';
import {createVoucher} from '@/services/VoucherService';
import {EuroOutlined, PercentageOutlined} from '@ant-design/icons';
import useAppNotifications from "../../../hooks/useAppNotifications";
import {STATUS} from "@/constants/Status";
import {DISCOUNTTYPE} from "@/constants/DiscountType";

const {Option} = Select;

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any;
}

const CreateVoucher = (props: IProps) => {
    const {showNotification} =useAppNotifications();
    const {isCreateModalOpen, setIsCreateModalOpen, mutate} = props;
    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (value: IVoucher) => {
        try {
            const result = await createVoucher(value);
            mutate();
            if (result.data) {
                handleCloseCreateModal();
                showNotification("success",{message: result.message,});
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error",{message: String(message),});
                });
            } else {
                showNotification("error",{message: error?.message,
                    description: errorMessage,});
            }
        }
    };

    return (
        <>
            <Modal
                title="Thêm mới phiếu giảm giá"
                open={isCreateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                cancelText="Hủy"
                okText="Lưu"
                okButtonProps={{
                    style: {background: "#00b96b"},
                }}
                width={800} // Kích thước modal
                style={{ body: {padding: '20px'} }}
            >
                <Form
                    form={form}
                    name="createVoucher"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Row gutter={16}>

                        <Col span={12}>
                            <Form.Item
                                name="voucherName"
                                label="Tên phiếu giảm giá"
                                rules={[{required: true, message: "Vui lòng nhập tên phiếu giảm giá!"}]}
                            >
                                <Input style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>


                        <Col span={12}>
                            <Form.Item
                                name="voucherCode"
                                label="Mã phiếu giảm giá"
                                rules={[{required: true, message: "Vui lòng nhập mã phiếu giảm giá!"}]}
                            >
                                <Input style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>

                        <Col span={12}>
                            <Form.Item
                                label="Giá trị giảm giá"
                                rules={[{required: true, message: "Vui lòng nhập giá trị giảm giá và chọn kiểu!"}]}
                            >
                                <Input.Group compact>
                                    <Form.Item
                                        name="discountValue"
                                        noStyle
                                        rules={[{required: true, message: "Giá trị giảm là bắt buộc!"}]}
                                    >
                                        <InputNumber style={{width: '70%'}} placeholder="Giá trị giảm"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="discountType"
                                        noStyle
                                        rules={[{required: true, message: "Kiểu giảm là bắt buộc!"}]}
                                    >
                                        <Select
                                            style={{width: '30%'}}
                                            placeholder="Chọn kiểu"
                                            suffixIcon={null}
                                        >
                                            <Option value="0" icon={<PercentageOutlined/>}>%</Option>
                                            <Option value="1" icon={<EuroOutlined/>}>VND </Option>
                                        </Select>
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                        </Col>


                        <Col span={12}>
                            <Form.Item
                                name="maxDiscount"
                                label="Giảm tối đa"
                                rules={[{required: true, message: "Vui lòng nhập giảm giá tối đa!"}]}
                            >
                                <InputNumber style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>

                        <Col span={12}>
                            <Form.Item
                                name="startDate"
                                label="Ngày bắt đầu"
                                rules={[{required: true, message: "Vui lòng chọn ngày bắt đầu!"}]}
                            >
                                <DatePicker style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="endDate"
                                label="Ngày kết thúc"
                                rules={[{required: true, message: "Vui lòng chọn ngày kết thúc!"}]}
                            >
                                <DatePicker style={{width: '100%'}}/>
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row gutter={16}>

                        <Col span={12}>
                            <Form.Item
                                name="minOrderValue"
                                label="Giá trị đơn hàng tối thiểu"
                                rules={[{required: true, message: "Vui lòng nhập giá trị đơn hàng tối thiểu!"}]}
                            >
                                <InputNumber style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>


                        <Col span={12}>
                            <Form.Item
                                name="usageLimit"
                                label="Số lượng "
                                rules={[{required: true, message: "Vui lòng nhập giới hạn sử dụng!"}]}
                            >
                                <InputNumber style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>

                        <Col span={12}>
                            <Form.Item
                                name="usagePerUser"
                                label="Số lần sử dụng mỗi người"
                                rules={[{required: true, message: "Vui lòng nhập số lần sử dụng mỗi người!"}]}
                            >
                                <InputNumber style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>


                        {/*<Col span={12}>*/}
                        {/*    <Form.Item*/}
                        {/*        name="status"*/}
                        {/*        label="Trạng thái"*/}
                        {/*        rules={[{required: true, message: "Vui lòng chọn trạng thái!"}]}*/}
                        {/*    >*/}
                        {/*        <Select placeholder="Chọn trạng thái" style={{width: '100%'}}>*/}
                        {/*            <Option value={1}>Đang diễn ra </Option>*/}
                        {/*            <Option value={0}>Kết thúc </Option>*/}
                        {/*        </Select>*/}
                        {/*    </Form.Item>*/}
                        {/*</Col>*/}
                    </Row>

                </Form>
            </Modal>
        </>
    );


};

export default memo(CreateVoucher);
