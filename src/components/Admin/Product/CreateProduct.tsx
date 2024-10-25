"use client"
import {
    Col,
    Collapse,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    Tabs,
    TabsProps,
    TreeSelect,
    Typography
} from "antd";
import useAppNotifications from "@/hooks/useAppNotifications";
import React, {memo, useState} from "react";
import {IProduct} from "@/types/IProduct";
import UploadImage from "@/components/Upload/UploadImage";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";
import useOptionMaterial from "@/components/Admin/Material/hooks/useOptionMaterial";
import useOptionBrand from "@/components/Admin/Brand/hooks/useOptionBrand";
import {GENDER_PRODUCT} from "@/constants/GenderProduct";
import useTreeSelectCategory from "@/components/Admin/Category/hooks/useTreeSelectCategory";
import TableEditRows from "@/components/Table/TableEditRows";
import ColorPickerCustomize from "@/components/ColorPicker/ColorPickerCustomize";
import ColorOptionSelect from "@/components/Select/ColorOptionSelect";

const {TextArea} = Input;
const {Title} = Typography;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    console.log(e?.fileList)
    return e?.fileList;
};

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateProduct = (props: IProps) => {
    const {showNotification} = useAppNotifications();
    const {isCreateModalOpen, setIsCreateModalOpen, mutate} = props;
    const [colorHex, setColorHex] = useState<string>('');

    const {dataOptionBrand, error: errorDataOptionBrand, isLoading: isLoadingDataOptionBrand}
        = useOptionBrand(isCreateModalOpen);
    const {dataTreeSelectCategory, error: errorDataTreeSelectCategory, isLoading: isLoadingDataTreeSelectCategory}
        = useTreeSelectCategory(isCreateModalOpen);
    const {dataOptionMaterial, error: errorDataOptionMaterial, isLoading: isLoadingDataOptionMaterial}
        = useOptionMaterial(isCreateModalOpen);
    const [form] = Form.useForm();

    const handleColorChange = () => {

    }

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
                <>
                    <Row gutter={40} style={{margin: "10px 0px"}}>
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
                                    error={errorDataOptionBrand}
                                    isLoading={isLoadingDataOptionBrand}
                                    onChange={(value) => form.setFieldsValue({materialId: value})}
                                />
                            </Form.Item>
                            <Form.Item name="description" label="Mô tả sản phẩm"
                                       tooltip="Mô tả chi tiết sản phẩm"
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item name="originalPrice" label="Giá vốn" initialValue={0} layout="horizontal">
                                {/*<Title level={5}>Giá vốn:</Title>*/}
                                <InputNumber style={{width: '100%'}}/>
                            </Form.Item>
                            <Form.Item name="salePrice" label="Giá bán" initialValue={0}>
                                <InputNumber style={{width: '100%'}}/>
                            </Form.Item>
                            <Form.Item name="quantityInStock" label="Tồn kho" initialValue={0}>
                                <InputNumber style={{width: '100%'}}/>
                            </Form.Item>
                            <Form.Item label="ColorPicker" name="color">
                                <ColorPickerCustomize
                                    onChange={(value) => form.setFieldsValue({color: value})}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{margin: "10px 0px"}}>
                        <Col span={24}>
                            <Form.Item name="imageUrl" valuePropName="fileList" getValueFromEvent={normFile}>
                                <UploadImage countFileImage={6}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{margin: "10px 0px"}}>
                        <Col span={24}>
                            <Collapse size="small" expandIconPosition="end"
                                items={[{
                                    key: 'thuoc-tinh',
                                    label: <Title level={5} style={{margin: '0px 10px'}}>Thuộc tính</Title>,
                                    children: (
                                        <>
                                            <Form.Item label="Màu sắc" name="colorId" style={{marginTop: 24}}>
                                                <ColorOptionSelect
                                                    // onChange={(value) => form.setFieldsValue({colorId: value})}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Kích cỡ" name="sizeId">
                                                <ColorOptionSelect/>
                                            </Form.Item>
                                        </>
                                    )
                                }]}
                            />
                        </Col>
                    </Row>
                    <Row style={{margin: "10px 0px"}}>
                        <Col span={24}>
                            <Collapse size="small" expandIconPosition="end"
                                items={[{
                                    key: 'danh-sach-san-pham-cung-loai',
                                    label: (
                                        <Title level={5} style={{margin: '0px 10px'}}>
                                            Danh sách sản phẩm cùng loại
                                        </Title>),
                                    children: (<TableEditRows/>)
                                }]}
                            />
                        </Col>
                    </Row>
                </>
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
                      labelCol={{span: 5}}
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