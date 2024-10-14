"use client"
import { memo, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}


const CreateMaterial = (props: IProps) => {
    // console.log("CreateMaterial Component");
    const { isCreateModalOpen, setIsCreateModalOpen } = props;
    const [form] = Form.useForm();

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (value: any) => {
        console.log("Form value: ", value);
        
    }

    return (
        <>
            <Modal
                title="Thêm mới chất liệu"
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