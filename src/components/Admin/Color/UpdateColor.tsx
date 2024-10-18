import { STATUS } from "@/constants/Status";
import { Form, Input, Modal, notification, Radio } from "antd";
import { memo, useEffect } from "react";
import {updateBrand} from "@/services/BrandService";
import {IColor} from "@/types/IColor";
import {updateColor} from "@/services/ColorService";

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    mutate: any
    dataUpdate: any;
    setDataUpdate: any;
}

const UpdateColor = (props: IProps) => {
    const [api, contextHolder] = notification.useNotification();
    const { isUpdateModalOpen, setIsUpdateModalOpen, mutate, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                colorName: dataUpdate.colorName,
                status: dataUpdate.status,
            });
        }
    }, [dataUpdate]);

    const handleCloseUpdateModal = () => {
        form.resetFields()
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    }

    const onFinish = async (value: IColor) => {
        console.log(value);
        try {
            if (dataUpdate) {
                const data = {
                    ...value,
                    id: dataUpdate.id
                }
                const result = await updateColor(data);
                mutate();
                if (result.data) {
                    handleCloseUpdateModal();
                    api.success({
                        message: result.message,
                        showProgress: true,
                        duration: 2
                    });
                }
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    api.error({
                        message: String(message),
                        showProgress: true,
                        duration: 2
                    });
                });
            } else {
                api.error({
                    message: error?.message,
                    description: errorMessage,
                    showProgress: true,
                    duration: 2
                });
            }
        }

    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Chỉnh sửa màu sắc"
                open={isUpdateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseUpdateModal()}
                cancelText="Hủy"
                okText="Lưu"
                okButtonProps={{
                    style: { background: "#00b96b" }
                }}
            >
                <Form
                    form={form}
                    name="updateColor"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="colorName"
                        label="Tên màu sắc"
                        rules={[{ required: true, message: "Vui lòng nhập tên màu sắc!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Trạng thái"
                        rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
                    >
                        <Radio.Group>
                            {(Object.keys(STATUS) as Array<keyof typeof STATUS>).map(
                                (key) => (
                                    <Radio value={key} key={key}>{STATUS[key]}</Radio>
                                )
                            )}
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default memo(UpdateColor);
