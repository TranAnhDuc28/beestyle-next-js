import React, {memo, useEffect} from 'react';
import {App, Form, Input, Modal, TreeSelect} from 'antd';
import {createCategory, URL_API_CATEGORY} from "@/services/CategoryService";
import {ICategory} from "@/types/ICategory";
import useTreeSelectCategory from "@/hooks/useTreeSelectCategory";
import useAppNotifications from "@/hooks/useAppNotifications";
import {mutate} from "swr";

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateCategory = (props: IProps) => {
    const { showNotification } = useAppNotifications();
    const {isCreateModalOpen, setIsCreateModalOpen, mutate: mutateCategories} = props;
    const [form] = Form.useForm();
    const {dataTreeSelectCategory, error, isLoading} = useTreeSelectCategory(isCreateModalOpen);

    useEffect(() => {
        if (error && isCreateModalOpen) {
            showNotification("error",{
                message: error?.message || "Error fetching category input select",
                description: error?.response?.data?.message,
            });
        }
    }, [isCreateModalOpen]);

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (value: ICategory) => {
        console.log('Success:', value);
        try {
            const result = await createCategory(value);
            mutateCategories();
            if (result.data) {
                handleCloseCreateModal();
                showNotification("success", {message: result.message});
                await mutate(URL_API_CATEGORY.options);
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error", {message: String(message)});
                });
            } else {
                showNotification("error", {message: error?.message, description: errorMessage});
            }
        }
    }

    return (
        <>
            <Modal title="Thêm mới danh mục" okText="Lưu" cancelText="Hủy" style={{top: 20}}
                   open={isCreateModalOpen}
                   onOk={() => form.submit()}
                   onCancel={() => handleCloseCreateModal()}
                   okButtonProps={{style: {background: "#00b96b"}}}
            >
                <Form form={form} name="createCategory" layout="vertical" onFinish={onFinish}>
                    <Form.Item name="categoryName" label="Tên danh mục"
                               rules={[{required: true, message: "Vui lòng nhập tên thương hiệu!"}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="slug" label="Slug">
                        <Input placeholder="Tự động tạo theo tên danh mục nếu không nhập."/>
                    </Form.Item>
                    <Form.Item name="parentCategoryId" label="Danh mục cha">
                        <TreeSelect
                            placeholder={isLoading ? "Đang tải..." : "---Lựa chọn---"}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            treeData={dataTreeSelectCategory}
                            loading={isLoading}
                            showSearch
                            placement="bottomLeft"
                            allowClear
                            filterTreeNode={(search, item) => {
                                let title = item.title?.toString() || "";
                                return title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default memo(CreateCategory);