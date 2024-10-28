import {STATUS} from "@/constants/Status";
import {App, Form, Input, Modal, notification, Radio, Select} from "antd";
import {memo, useEffect} from "react";
import {IBrand} from "@/types/IBrand";
import {updateBrand} from "@/services/BrandService";
import useAppNotifications from "@/hooks/useAppNotifications";

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    mutate: any
    dataUpdate: any;
    setDataUpdate: any;
}

const UpdateBrand = (props: IProps) => {
    const {showNotification} = useAppNotifications();
    const {isUpdateModalOpen, setIsUpdateModalOpen, mutate, dataUpdate, setDataUpdate} = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                brandName: dataUpdate.brandName,
                status: dataUpdate.status,
            });
        }
    }, [dataUpdate]);

    const handleCloseUpdateModal = () => {
        form.resetFields()
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    }

    const onFinish = async (value: IBrand) => {
        console.log(value);
        try {
            if (dataUpdate) {
                const data = {
                    ...value,
                    id: dataUpdate.id
                }
                const result = await updateBrand(data);
                mutate();
                if (result.data) {
                    handleCloseUpdateModal();
                    showNotification("success", {message: result.message});
                }
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

    };

    return (
        <>
            <Modal title="Chỉnh sửa thương hiệu" cancelText="Hủy" okText="Lưu" style={{top: 20}}
                   open={isUpdateModalOpen}
                   onOk={() => form.submit()}
                   onCancel={() => handleCloseUpdateModal()}
                   okButtonProps={{style: {background: "#00b96b"}}}
            >
                <Form form={form} name="updateBrand" layout="vertical" onFinish={onFinish}>
                    <Form.Item name="brandName" label="Tên thương hiệu"
                               rules={[{required: true, message: "Vui lòng nhập tên thương liệu!"}]}
                               validateTrigger="onBlur"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item name="status" label="Trạng thái"
                               rules={[{required: true, message: "Vui lòng chọn trạng thái!"}]}>
                        <Select
                            options={(Object.keys(STATUS) as Array<keyof typeof STATUS>).map(
                                (key) => ({value: key, label: STATUS[key]})
                            )}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default memo(UpdateBrand);
