import React, {memo} from 'react';
import {Form, Input, Modal, notification, TreeSelect} from 'antd';
import {createCategory} from "@/services/CategoryService";
import {ICategory} from "@/types/ICategory";

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateCategory = (props: IProps) => {
    const [api, contextHolder] = notification.useNotification();
    const {isCreateModalOpen, setIsCreateModalOpen, mutate} = props;
    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (value: ICategory) => {
        // console.log('Success:', value);
        try {
            const result = await createCategory(value);
            mutate();
            if (result.data) {
                handleCloseCreateModal();
                api.success({message: result.message, showProgress: true, duration: 2});
            }

        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    api.error({message: String(message), showProgress: true, duration: 2});
                });
            } else {
                api.error({message: error?.message, description: errorMessage, showProgress: true, duration: 2});
            }
        }
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Thêm mới danh mục"
                open={isCreateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseCreateModal()}
                cancelText="Hủy"
                okText="Lưu"
                okButtonProps={{
                    style: {background: "#00b96b"}
                }}
            >
                <Form form={form} name="createCategory" layout="vertical" onFinish={onFinish}>
                    <Form.Item name="categoryName" label="Tên danh mục"
                        rules={[{required: true, message: "Vui lòng nhập tên thương hiệu!"}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name="slug" label="Slug"
                               rules={[{ required: true, message: "Vui lòng nhập slug cho danh mục!"}]}>
                        <Input />
                    </Form.Item>

                    {/*<Form.Item name="parentCategoryId" label="Danh mục cha">*/}
                    {/*    <TreeSelect*/}
                    {/*        placeholder={isLoading ? "Đang tải..." : "---Lựa chọn---"}*/}
                    {/*        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}*/}
                    {/*        treeData={treeData}*/}
                    {/*        loading={isLoading}*/}
                    {/*        showSearch*/}
                    {/*        placement="bottomLeft"*/}
                    {/*        allowClear*/}
                    {/*        filterTreeNode={(search, item) => {*/}
                    {/*            let title = item.title?.toString() || "";*/}
                    {/*            return title.toLowerCase().indexOf(search.toLowerCase()) >= 0;*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        </>
    );
};

export default memo(CreateCategory);