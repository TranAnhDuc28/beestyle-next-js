import React, {memo} from 'react';
import {Form, Input, Modal, notification} from 'antd';
import {IBrand} from "@/types/IBrand";
import {createBrand} from "@/services/BrandService";

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateBrand = (props: IProps) => {
    // console.log("Create Material render");
    const [api, contextHolder] = notification.useNotification();
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
                title="Thêm mới thương hiệu"
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