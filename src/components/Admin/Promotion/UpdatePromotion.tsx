"use client";
import { memo, useEffect } from 'react';
import { Form, Input, Modal, notification, Select, DatePicker, InputNumber, Row, Col } from 'antd';
import { updatePromotion } from '@/services/PromotionService';
import dayjs from 'dayjs';
import {EuroOutlined, PercentageOutlined} from "@ant-design/icons";
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

const UpdatePromotion = (props: IProps) => {
    const {showNotification} =useAppNotifications();
    const { isUpdateModalOpen, setIsUpdateModalOpen, mutate, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                promotionName: dataUpdate.promotionName,
                discountType: dataUpdate.discountType,
                discountValue: dataUpdate.discountValue,
                startDate: dayjs(dataUpdate.startDate),
                endDate: dayjs(dataUpdate.endDate),
                description: dataUpdate.description,
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
                const result = await updatePromotion(data);
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
                title="Chỉnh sửa đợt khuyễn mại"
                open={isUpdateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseUpdateModal()}
                cancelText="Hủy"
                okText="Lưu"
                okButtonProps={{
                    style: { background: "#00b96b" },
                }}
                width={800} // Kích thước modal
                bodyStyle={{ padding: '20px' }}
            >
                <Form
                    form={form}
                    name="updatePromotion"
                    layout="vertical"
                    onFinish={onFinish}
                >

                    <Form.Item name="promotionName" label="Tên chương trình"
                               rules={[{required: true, message: 'Vui lòng nhập tên chương trình'}]}>
                        <Input placeholder="Nhập tên chương trình"/>
                    </Form.Item>

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

                    <Form.Item
                        name="startDate"
                        label="Ngày bắt đầu"
                        rules={[{required: true, message: "Vui lòng chọn ngày bắt đầu!"}]}
                    >
                        <DatePicker style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        label="Ngày kết thúc"
                        rules={[{required: true, message: "Vui lòng chọn ngày kết thúc!"}]}
                    >
                        <DatePicker style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea rows={3} placeholder="Nhập mô tả"/>
                    </Form.Item>
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

                </Form>
            </Modal>
        </>
    );
};

export default memo(UpdatePromotion);
