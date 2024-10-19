import { STATUS } from "@/constants/Status";
import {Form, Input, Modal, notification, Radio, TreeSelect} from "antd";
import {memo, useEffect} from "react";
import {ICategory} from "@/types/ICategory";
import {updateCategory} from "@/services/CategoryService";
import useTreeSelectCategory from "@/components/Admin/Category/hooks/useTreeSelectCategory";

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    mutate: any
    dataUpdate: any;
    setDataUpdate: any;
}

const transformData = (data: any) => {
    return data.map((item: any) => ({
        title: item.categoryName,
        value: item.id,
        key: item.id.toString(),
        children: transformData(item.categoryChildren),
    }));
};

const UpdateCategory = (props: IProps) => {
    const [api, contextHolder] = notification.useNotification();
    const { isUpdateModalOpen, setIsUpdateModalOpen, mutate, dataUpdate, setDataUpdate } = props;
    const [form] = Form.useForm();
    const {dataTreeSelectCategory, error, isLoading} = useTreeSelectCategory(isUpdateModalOpen);

    useEffect(() => {
        if(error && isUpdateModalOpen) {
            api.error({
                message: error?.message || "Error fetching category input select",
                description: error?.response?.data?.message,
                showProgress: true,
                duration: 2,
                placement: "topRight"
            });
        }
    }, [isUpdateModalOpen]);

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                categoryName: dataUpdate.categoryName,
                slug: dataUpdate.slug,
                parentCategoryId: dataUpdate.parentCategoryId,
                status: dataUpdate.status,
            });
        }
    }, [dataUpdate]);

    const handleCloseUpdateModal = () => {
        form.resetFields()
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    }

    const onFinish = async (value: ICategory) => {
        console.log(value);
        try {
            if (dataUpdate) {
                const data = {
                    ...value,
                    id: dataUpdate.id
                }
                const result = await updateCategory(data);
                mutate();
                if (result.data) {
                    handleCloseUpdateModal();
                    api.success({message: result.message, showProgress: true, duration: 2});
                }
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
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Chỉnh sửa danh mục"
                open={isUpdateModalOpen}
                onOk={() => form.submit()}
                onCancel={() => handleCloseUpdateModal()}
                cancelText="Hủy"
                okText="Lưu"
                okButtonProps={{
                    style: { background: "#00b96b" }
                }}
            >
                <Form form={form} name="updateCategory" layout="vertical" onFinish={onFinish}>
                    <Form.Item name="categoryName" label="Tên danh mục"
                        rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="slug" label="Slug"
                               rules={[{ required: true, message: "Vui lòng nhập slug cho danh mục!"}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="parentCategoryId" label="Danh mục cha">
                        <TreeSelect
                            placeholder={isLoading ? "Đang tải..." : "---Lựa chọn---"}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
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
                    <Form.Item name="status" label="Trạng thái"
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

export default memo(UpdateCategory);
