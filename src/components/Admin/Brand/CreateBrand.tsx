import React, {memo} from 'react';
import {App, Form, Input, Modal, notification} from 'antd';
import {IBrand} from "@/types/IBrand";
import {createBrand} from "@/services/BrandService";
import useAppNotifications from "@/hooks/useAppNotifications";

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateBrand = (props: IProps) => {
    const { showNotification } = useAppNotifications();
    const {isCreateModalOpen, setIsCreateModalOpen, mutate} = props;
    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (value: IBrand) => {
        // console.log('Success:', value);
        try {
            const result = await createBrand(value);
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
            <Modal title="Thêm mới thương hiệu" cancelText="Hủy" okText="Lưu" style={{top: 20}}
                open={isCreateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                okButtonProps={{style: {background: "#00b96b"}}}
            >
                <Form
                    form={form}
                    name="createBrand"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="brandName"
                        label="Tên thương hiệu"
                        rules={[{required: true, message: "Vui lòng nhập tên thương hiệu!"}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default memo(CreateBrand);