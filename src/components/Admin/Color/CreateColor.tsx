import React, {memo} from 'react';
import {App, Form, Input, Modal, notification} from 'antd';
import {IColor} from "@/types/IColor";
import {createColor} from "@/services/ColorService";
import useAppNotifications from "@/hooks/useAppNotifications";

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateColor = (props: IProps) => {
    const { showNotification } = useAppNotifications();
    const {isCreateModalOpen, setIsCreateModalOpen, mutate} = props;
    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (value: IColor) => {
        // console.log('Success:', value);
        try {
            const result = await createColor(value);
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
            <Modal title="Thêm mới màu sắc" cancelText="Hủy" okText="Lưu" style={{top: 20}}
                open={isCreateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                okButtonProps={{style: {background: "#00b96b"}}}
            >
                <Form
                    form={form}
                    name="createColor"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="colorName"
                        label="Tên màu sắc"
                        rules={[{required: true, message: "Vui lòng nhập tên màu sắc!"}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default memo(CreateColor);