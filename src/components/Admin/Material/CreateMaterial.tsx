"use client"
import { memo } from 'react';
import {App, Form, Input, Modal} from 'antd';
import { IMaterial } from '@/types/IMaterial';
import {createMaterial} from '@/services/MaterialService';
import useAppNotifications from "@/hooks/useAppNotifications";

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateMaterial = (props: IProps) => {
    // console.log("Create Material render");
    const { showNotification } = useAppNotifications();
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
                showNotification("success", {message: result.message});
            }

        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error", {message: String(message)});
                });
            } else {
                showNotification("error", {message: error?.message, description: errorMessage,});
            }
        }
    }

    return (
        <>
            <Modal title="Thêm mới chất liệu" cancelText="Hủy" okText="Lưu" style={{top: 20}}
                open={isCreateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                okButtonProps={{style: { background: "#00b96b" }}}
            >
                <Form
                    form={form}
                    name="createMaterial"
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