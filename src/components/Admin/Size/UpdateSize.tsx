import { STATUS } from "@/constants/Status";
import { Form, Input, Modal, notification, Radio } from "antd";
import { memo, useEffect } from "react";
import {ISize} from "@/types/ISize";
import {updateSize} from "@/services/SizeService";

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    mutate: any
    dataUpdate: any;
    setDataUpdate: any;
}

const UpdateSize = (props: IProps) => {
    const [api, contextHolder] = notification.useNotification();
    const { isUpdateModalOpen, setIsUpdateModalOpen, mutate, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                sizeName: dataUpdate.sizeName,
                status: dataUpdate.status,
            });
        }
    }, [dataUpdate]);

    const handleCloseUpdateModal = () => {
        form.resetFields()
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    }

    const onFinish = async (value: ISize) => {
        console.log(value);
        try {
            if (dataUpdate) {
                const data = {
                    ...value,
                    id: dataUpdate.id
                }
                const result = await updateSize(data);
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
                title="Chỉnh sửa kích thước"
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
                    name="updateSize"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="sizeName"
                        label="Tên kích thước"
                        rules={[{ required: true, message: "Vui lòng nhập tên kích thước!" }]}>
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

export default memo(UpdateSize);
