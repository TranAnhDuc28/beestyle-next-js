import React, {memo} from 'react';
import {Form, Input, Modal, notification} from 'antd';
import {IBrand} from "@/types/IBrand";
import {createBrand} from "@/services/BrandService";
import {IColor} from "@/types/IColor";
import {createColor} from "@/services/ColorService";

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateColor = (props: IProps) => {
    const [api, contextHolder] = notification.useNotification();
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
                title="Thêm mới màu sắc"
                open={isCreateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                cancelText="Hủy"
                okText="Lưu"
                okButtonProps={{
                    style: {background: "#00b96b"}
                }}
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