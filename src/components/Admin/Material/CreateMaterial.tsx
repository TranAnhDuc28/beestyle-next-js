"use client"
import { memo } from 'react';
import { Form, Input, Modal, notification } from 'antd';
import { IMaterial } from '@/types/IMaterial';
import { createMaterial} from '@/services/MaterialService';

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateMaterial = (props: IProps) => {
    const [api, contextHolder] = notification.useNotification();
    const { isCreateModalOpen, setIsCreateModalOpen, mutate} = props;
    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (value: IMaterial) => {
        // console.log('Success:', value);
        try {
            const result = await createMaterial(value);
            mutate();
            if (result.data) {
                handleCloseCreateModal();
                api.success({
                    message: result.message,
                    showProgress: true,
                    duration: 2
                });
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
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Thêm mới chất liệu"
                open={isCreateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                cancelText="Hủy"
                okText="Lưu"
                okButtonProps={{
                    style: { background: "#00b96b" }
                }}
            >
                <Form
                    form={form}
                    name="create"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="materialName"
                        label="Tên chất liệu"
                        rules={[{ required: true, message: "Vui lòng nhập tên chất liệu!" }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default memo(CreateMaterial);