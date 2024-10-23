"use client"
import {Col, Form, Input, Modal, Row, Tabs, TabsProps} from "antd";
import useAppNotifications from "@/hooks/useAppNotifications";
import {memo} from "react";
import {IProduct} from "@/types/IProduct";
import UploadImage from "@/components/Upload/UploadImage";
import TiptapEditor from "@/components/EditorText/EditorText";
import EditorText from "@/components/EditorText/EditorText";

const {TextArea} = Input;

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateProduct = (props: IProps) => {
    const {showNotification} = useAppNotifications();
    const {isCreateModalOpen, setIsCreateModalOpen, mutate} = props;
    const [form] = Form.useForm();

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (value: IProduct) => {
        console.log('Success:', value);
        // try {
        //     const result = await createMaterial(value);
        //     mutate();
        //     if (result.data) {
        //         handleCloseCreateModal();
        //         showNotification("success", {message: result.message});
        //     }
        //
        // } catch (error: any) {
        //     const errorMessage = error?.response?.data?.message;
        //     if (errorMessage && typeof errorMessage === 'object') {
        //         Object.entries(errorMessage).forEach(([field, message]) => {
        //             showNotification("error", {message: String(message)});
        //         });
        //     } else {
        //         showNotification("error", {message: error?.message, description: errorMessage,});
        //     }
        // }
    }

    const itemTabs: TabsProps['items'] = [
        {
            key: "info",
            label: "Thông tin",
            children: (
                <Row gutter={[32, 16]} style={{paddingTop: 10}}>
                    <Col span={14}>
                        <Form.Item name="productName" label="Tên sản phẩm">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minWidth: 200,
                                minHeight: 200
                            }}
                        >
                            <UploadImage countFileImage={5}/>
                        </div>
                        <Form.Item name="productDescription" label="Giá vốn">
                            <Input/>
                        </Form.Item>
                        <Form.Item name="productDescription" label="Giá vốn">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
            ),
        },
        {
            key: "description",
            label: "Mô tả chi tiết",
            children: (
                <>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="productDescription" label="Mô tả sản phẩm">
                                {/*<EditorText/>*/}
                                <TextArea rows={4}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            ),
        },
    ];

    return (
        <>
            <Modal title="Thêm sản phẩm" cancelText="Hủy" okText="Lưu" width={1000} style={{top: 20}}
                   open={isCreateModalOpen}
                   onOk={() => form.submit()}
                   onCancel={() => handleCloseCreateModal()}
                   okButtonProps={{style: {background: "#00b96b"}}}
            >
                <Form form={form} name="createProduct" onFinish={onFinish}>
                    <Tabs
                        defaultActiveKey="info"
                        items={itemTabs}
                    />
                </Form>
            </Modal>
        </>
    );
}
export default memo(CreateProduct);