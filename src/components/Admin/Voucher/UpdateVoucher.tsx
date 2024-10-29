"use client";
import React, { memo, useEffect } from 'react';
import { Form, Input, Modal, notification, Select, DatePicker, InputNumber, Row, Col } from 'antd';
import { updateVoucher } from '@/services/VoucherService';
import dayjs from 'dayjs';
import {EuroOutlined, PercentageOutlined} from "@ant-design/icons"; // Thay thế moment bằng dayjs
import useAppNotifications from "../../../hooks/useAppNotifications";
import {STATUS} from "@/constants/Status";
import {DISCOUNTTYPE} from "@/constants/DiscountType";
const { Option } = Select;


// interface IProps {
//     isUpdateModalOpen: boolean;
//     setIsUpdateModalOpen: (v: boolean) => void;
//     mutate: any;
//     dataUpdate: IVoucher | null;
//     setDataUpdate: (data: IVoucher | null) => void;
// }
interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    mutate: any
    dataUpdate: any;
    setDataUpdate: any;
}

const UpdateVoucher = (props: IProps) => {
    const {showNotification} =useAppNotifications();
    const { isUpdateModalOpen, setIsUpdateModalOpen, mutate, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                voucherName: dataUpdate.voucherName,
                voucherCode: dataUpdate.voucherCode,
                discountValue: dataUpdate.discountValue,
                discountType: dataUpdate.discountType,
                maxDiscount: dataUpdate.maxDiscount,
                startDate: dayjs(dataUpdate.startDate),
                endDate: dayjs(dataUpdate.endDate),
                minOrderValue: dataUpdate.minOrderValue,
                usageLimit: dataUpdate.usageLimit,
                usagePerUser: dataUpdate.usagePerUser,
                status: dataUpdate.status,
            });
        }
    }, [dataUpdate]);

    const handleCloseUpdateModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    };

    const onFinish = async (values: any) => {
        try {
            const { startDate, endDate } = values;

            // Kiểm tra tính hợp lệ của ngày (giá trị từ DatePicker đã là đối tượng dayjs)
            if (startDate && !startDate.isValid()) {
                showNotification("error",{message: "Ngày bắt đầu không hợp lệ!",});

                return;
            }

            if (endDate && !endDate.isValid()) {
                showNotification("error",{message: "Ngày kết thúc không hợp lệ!",});

                return;
            }

            // Xử lý khi update voucher
            if (dataUpdate) {
                const data = {
                    ...values,
                    id: dataUpdate.id,
                    startDate: startDate.toISOString(),  // Chuyển về định dạng chuỗi nếu cần
                    endDate: endDate.toISOString(),
                };
                const result = await updateVoucher(data);
                mutate();

                if (result.data) {
                    handleCloseUpdateModal();
                    showNotification("success",{message: "Sửa thành công!",});
                    // api.success({
                    //     message: result.message,
                    //     showProgress: true,
                    //     duration: 2,
                    // });
                }
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error",{message: String(message)});

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
                title="Chỉnh sửa phiếu giảm giá"
                open={isUpdateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseUpdateModal()}
                cancelText="Hủy"
                okText="Lưu"
                okButtonProps={{
                    style: { background: "#00b96b" },
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
                                            <Option value="PERCENTAGE" icon={<PercentageOutlined/>}>%</Option>
                                            <Option value="CASH" icon={<EuroOutlined/>}>VND </Option>
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
                                rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss" // Định dạng hiển thị cho ngày và giờ
                                />
                            </Form.Item>

                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="endDate"
                                label="Ngày kết thúc"
                                rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss" // Định dạng hiển thị cho ngày và giờ
                                />
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


                        <Col span={12}>
                            <Form.Item name="status" label="Trạng thái"
                                       rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
                                <Select
                                    options={(Object.keys(STATUS) as Array<keyof typeof STATUS>).map(
                                        (key) => (
                                            {value: key, label: STATUS[key]}
                                        )
                                    )}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        </>
    );
};

export default memo(UpdateVoucher);
