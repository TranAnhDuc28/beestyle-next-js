"use client"
import {Col, Form, Input, Modal, Row, Select, TreeSelect, UploadFile} from "antd";
import {STATUS_PRODUCT} from "@/constants/StatusProduct";
import React, {memo, useCallback} from "react";
import useAppNotifications from "@/hooks/useAppNotifications";
import {IProduct} from "@/types/IProduct";
import useOptionBrand from "@/components/Admin/Brand/hooks/useOptionBrand";
import useTreeSelectCategory from "@/components/Admin/Category/hooks/useTreeSelectCategory";
import useOptionMaterial from "@/components/Admin/Material/hooks/useOptionMaterial";
import UploadImage from "@/components/Upload/UploadImage";
import {IProductImageCreate} from "@/types/IProductImage";
import {GENDER_PRODUCT} from "@/constants/GenderProduct";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    mutate: any
    dataUpdate: any;
    setDataUpdate: any;
}

const UpdateProduct: React.FC<IProps> = (props) => {
    const {showNotification} = useAppNotifications();
    const {isUpdateModalOpen, setIsUpdateModalOpen, mutate, dataUpdate, setDataUpdate} = props;
    const [form] = Form.useForm();

    const {dataOptionBrand, error: errorDataOptionBrand, isLoading: isLoadingDataOptionBrand}
        = useOptionBrand(isUpdateModalOpen);
    const {dataTreeSelectCategory, error: errorDataTreeSelectCategory, isLoading: isLoadingDataTreeSelectCategory}
        = useTreeSelectCategory(isUpdateModalOpen);
    const {dataOptionMaterial, error: errorDataOptionMaterial, isLoading: isLoadingDataOptionMaterial}
        = useOptionMaterial(isUpdateModalOpen);

    const handleCloseUpdateModal = () => {
        form.resetFields()
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
    }

    const handleProductImages = useCallback((fileList: UploadFile[]) => {
        const images: IProductImageCreate[] = fileList.map((file, index) => (
            {
                imageUrl: `/${file.url || file.name || file.originFileObj?.name || 'no-img550x750.png'}`,
                isDefault: index === 0,
            }
        )).filter(Boolean);
        form.setFieldsValue({productImages: images});
    }, []);

    const onFinish = async (value: IProduct) => {
        console.log("Product update: ", JSON.stringify(value, null, 2));
        // try {
        //     if (dataUpdate) {
        //         const data = {
        //             ...value,
        //             id: dataUpdate.id
        //         }
        //         const result = await updateSize(data);
        //         mutate();
        //         if (result.data) {
        //             handleCloseUpdateModal();
        //             showNotification("success", {message: result.message});
        //         }
        //     }
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
    };

    return (
        <>
            <Modal title="Chỉnh sửa sản phẩm" cancelText="Hủy" okText="Lưu" style={{top: 20}} width={710}
                   open={isUpdateModalOpen}
                   onOk={() => form.submit()}
                   onCancel={() => handleCloseUpdateModal()}
                   okButtonProps={{style: {background: "#00b96b"}}}
            >
                <Form form={form} name="updateSize" layout="vertical" onFinish={onFinish}>
                    <Row gutter={24} style={{margin: "20px 0px"}}>
                        <Col span={12}>
                            <Form.Item
                                name="productCode"
                                label="Mã sản phẩm"
                            >
                                <Input placeholder="Mã tự động"/>
                            </Form.Item>
                            <Form.Item
                                name="productName"
                                label="Tên sản phẩm"
                                validateTrigger="onBlur"
                                rules={[{required: true, message: "Vui lòng nhập tên sản phẩm!"}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item name="genderProduct" label="Giới tính" initialValue="UNISEX">
                                <Select
                                    options={Object.keys(GENDER_PRODUCT).map((key) => (
                                        {
                                            value: key,
                                            label: GENDER_PRODUCT[key as keyof typeof GENDER_PRODUCT]
                                        }
                                    ))}
                                />
                            </Form.Item>
                            <Form.Item name="status" label="Trạng thái"
                                       rules={[{required: true, message: "Vui lòng chọn trạng thái!"}]}>
                                <Select
                                    options={(Object.keys(STATUS_PRODUCT) as Array<keyof typeof STATUS_PRODUCT>).map(
                                        (key) => (
                                            {value: key, label: STATUS_PRODUCT[key]}
                                        )
                                    )}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="categoryId"
                                label="Danh mục"
                                validateStatus={errorDataTreeSelectCategory ? "error" : "success"}
                                help={errorDataTreeSelectCategory ? "Error fetching categories" : ""}
                            >
                                <TreeSelect
                                    allowClear
                                    showSearch
                                    placement="bottomLeft"
                                    placeholder={isLoadingDataTreeSelectCategory ? "Đang tải..." : "---Lựa chọn---"}
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                                    treeData={dataTreeSelectCategory}
                                    loading={isLoadingDataTreeSelectCategory}
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
                                    data={dataOptionMaterial}
                                    error={errorDataOptionMaterial}
                                    isLoading={isLoadingDataOptionMaterial}
                                    onChange={(value) => form.setFieldsValue({materialId: value})}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{margin: "10px 0px"}}>
                        <Col span={24}>
                            <Form.Item name="productImages">
                                <UploadImage countFileImage={6} onChange={handleProductImages}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
        ;
}
export default memo(UpdateProduct);