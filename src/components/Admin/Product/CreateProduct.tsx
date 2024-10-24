"use client"
import {Col, Form, Input, InputNumber, Modal, Radio, Row, Select, Tabs, TabsProps, TreeSelect} from "antd";
import useAppNotifications from "@/hooks/useAppNotifications";
import React, {memo} from "react";
import {IProduct} from "@/types/IProduct";
import UploadImage from "@/components/Upload/UploadImage";
import SelectSearchOptionLabel from "@/components/SelectSearch/SelectSearchOptionLabel";
import useOptionMaterial from "@/components/Admin/Material/hooks/useOptionMaterial";
import useOptionBrand from "@/components/Admin/Brand/hooks/useOptionBrand";
import {GENDER_PRODUCT} from "@/constants/GenderProduct";
import useTreeSelectCategory from "@/components/Admin/Category/hooks/useTreeSelectCategory";

const {TextArea} = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    console.log(e?.fileList)
    return e?.fileList;
};

const formItemLayout = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    },
};

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateProduct = (props: IProps) => {
    const {showNotification} = useAppNotifications();
    const {isCreateModalOpen, setIsCreateModalOpen, mutate} = props;
    const {dataOptionBrand, error: errorDataOptionBrand, isLoading: isLoadingDataOptionBrand}
        = useOptionBrand(isCreateModalOpen);
    const {dataTreeSelectCategory, error: errorDataTreeSelectCategory, isLoading: isLoadingDataTreeSelectCategory}
        = useTreeSelectCategory(isCreateModalOpen);
    const [form] = Form.useForm();

    console.log(dataOptionBrand);

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
                <Row gutter={[40, 16]} style={{paddingTop: 10}}>
                    <Col span={14}>
                        <Form.Item
                            name="productName"
                            label="Tên sản phẩm"
                            validateTrigger="onBlur"
                            rules={[{required: true, message: "Vui lòng nhập tên sản phẩm!"}]}
                            hasFeedback
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item name="gender" label="Giới tính" initialValue="UNISEX">
                            <Select
                                options={Object.keys(GENDER_PRODUCT).map((key) => (
                                    {
                                        value: key,
                                        label: GENDER_PRODUCT[key as keyof typeof GENDER_PRODUCT]
                                    }
                                ))}
                            />
                        </Form.Item>
                        <Form.Item
                            name="parentCategoryId"
                            label="Danh mục cha"
                            validateStatus={errorDataTreeSelectCategory ? "error" : "success"}
                            help={errorDataTreeSelectCategory ? "Error fetching categories" : ""}
                        >
                            <TreeSelect
                                placeholder={isLoadingDataTreeSelectCategory ? "Đang tải..." : "---Lựa chọn---"}
                                dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                treeData={dataTreeSelectCategory}
                                loading={isLoadingDataTreeSelectCategory}
                                showSearch
                                placement="bottomLeft"
                                allowClear
                                filterTreeNode={(search, item) => {
                                    let title = item.title?.toString() || "";
                                    return title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="brandId"
                            label="Thương hiệu"
                            validateStatus={errorDataOptionBrand ? "error" : "success"}
                            help={errorDataOptionBrand ? "Error fetching brands" : ""}
                        >
                            <SelectSearchOptionLabel
                                data={dataOptionBrand}
                                error={errorDataOptionBrand}
                                isLoading={isLoadingDataOptionBrand}
                                onChange={(value) => form.setFieldsValue({brandId: value})}
                            />
                        </Form.Item>
                        <Form.Item
                            name="materialId"
                            label="Chất liệu"
                            validateStatus={errorDataOptionBrand ? "error" : "success"}
                            help={errorDataOptionBrand ? "Error fetching brands" : ""}
                        >
                            <SelectSearchOptionLabel
                                data={dataOptionBrand}
                                error={errorDataOptionBrand}
                                isLoading={isLoadingDataOptionBrand}
                                onChange={(value) => form.setFieldsValue({materialId: value})}
                            />
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả sản phẩm" layout="vertical"
                                   tooltip="Mô tả chi tiết sản phẩm"
                        >
                            <TextArea/>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item name="imageUrl" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                            <UploadImage countFileImage={1}/>
                        </Form.Item>
                        <Form.Item name="originalPrice" label="Giá vốn">
                            <InputNumber style={{width: '100%'}}/>
                        </Form.Item>
                        <Form.Item name="salePrice" label="Giá bán">
                            <InputNumber style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
            ),
        },

    ];

    return (
        <>
            <Modal title="Thêm sản phẩm" cancelText="Hủy" okText="Lưu" width={1200} style={{top: 20}}
                   open={isCreateModalOpen}
                   onOk={() => form.submit()}
                   onCancel={() => handleCloseCreateModal()}
                   okButtonProps={{style: {background: "#00b96b"}}}
            >
                <Form form={form} name="createProduct" onFinish={onFinish}
                      labelCol={{ span: 5 }}
                      labelAlign="left"
                      labelWrap
                >
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