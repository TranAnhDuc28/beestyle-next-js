"use client"
import {
    Col, Collapse, Flex, Form, Input, InputNumber, Modal, Row, Select,
    Tabs, TabsProps, TreeSelect, Typography, UploadFile
} from "antd";
import useAppNotifications from "@/hooks/useAppNotifications";
import React, {memo, useCallback, useEffect, useState} from "react";
import {IProduct} from "@/types/IProduct";
import UploadImage from "@/components/Upload/UploadImage";
import SelectSearchOptionLabel from "@/components/Select/SelectSearchOptionLabel";
import useOptionMaterial from "@/components/Admin/Material/hooks/useOptionMaterial";
import useOptionBrand from "@/components/Admin/Brand/hooks/useOptionBrand";
import {GENDER_PRODUCT} from "@/constants/GenderProduct";
import useTreeSelectCategory from "@/components/Admin/Category/hooks/useTreeSelectCategory";
import TableEditRows from "@/components/Admin/Product/CreateProductVariantTable";
import ColorOptionSelect from "@/components/Select/ColorOptionSelect";
import {IProductImageCreate} from "@/types/IProductImage";
import {IProductVariantCreate, IProductVariantRows} from "@/types/IProductVariant";
import SizeOptionSelect from "@/components/Select/SizeOptionSelect";
import TextArea from "antd/es/input/TextArea";

const {Title} = Typography;

const generateProductVariants = (
    colors: { value: number; label: string }[],
    sizes: { value: number; label: string }[]
) => {
    return colors.flatMap((color, index) =>
        sizes.map((size) => ({
            key: `${color.value}-${size.value}`,
            sku: `SKU-${color.label}-${size.label}`,
            productVariantName: `${color.label} - ${size.label}`,
            colorId: color.value,
            sizeId: size.value,
            originalPrice: 1000,
            salePrice: 1200,
            quantityInStock: 10,
        }))
    );
};

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any
}

const CreateProduct = (props: IProps) => {
    const [form] = Form.useForm();
    const {showNotification} = useAppNotifications();
    const {isCreateModalOpen, setIsCreateModalOpen, mutate} = props;

    const [activeKeyCollapse, setActiveKeyCollapse] = useState<string[]>([]);
    const [productVariantRows, setProductVariantRows] = useState<IProductVariantRows[]>([]);
    const [selectedColors, setSelectedColors] = useState<{ value: number; label: any }[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<{ value: number; label: any }[]>([]);

    const {dataOptionBrand, error: errorDataOptionBrand, isLoading: isLoadingDataOptionBrand}
        = useOptionBrand(isCreateModalOpen);
    const {dataTreeSelectCategory, error: errorDataTreeSelectCategory, isLoading: isLoadingDataTreeSelectCategory}
        = useTreeSelectCategory(isCreateModalOpen);
    const {dataOptionMaterial, error: errorDataOptionMaterial, isLoading: isLoadingDataOptionMaterial}
        = useOptionMaterial(isCreateModalOpen);

    const handleCloseCreateModal = () => {
        form.resetFields();
        setProductVariantRows([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setIsCreateModalOpen(false);
    };

    const handleProductImages = useCallback((fileList: UploadFile[]) => {
        const images: IProductImageCreate[] = fileList.map((file, index) => (
            {
                imagUrl: `/${file.url || file.name || file.originFileObj?.name || 'no-img.png'}`,
                isDefault: index === 0,
            }
        )).filter(Boolean);
        form.setFieldsValue({productImages: images});
    }, []);

    const handleSelectChange = useCallback(
        (type: 'colors' | 'sizes', selectedOptions: { value: number; label: string }[]) => {
            if (type === 'colors') {
                setSelectedColors(selectedOptions);
            } else {
                setSelectedSizes(selectedOptions);
            }
        },
        []
    );

    const handleCollapseChange = (key: string | string[]) => {
        if (key.includes('thuoc-tinh')) {
            setActiveKeyCollapse(['thuoc-tinh', 'danh-sach-san-pham-cung-loai']);
        } else {
            setActiveKeyCollapse(key as string[]);
        }
    };

    useEffect(() => {
        if (selectedColors.length > 0 || selectedSizes.length > 0) {
            const variants = generateProductVariants(selectedColors, selectedSizes);
            console.log("Variants:", variants);
            setProductVariantRows(variants);
        }
    }, [selectedColors, selectedSizes]);

    useEffect(() => {
        if (!isCreateModalOpen) {
            setActiveKeyCollapse([]);
        }
    }, [isCreateModalOpen]);

    const onFinish = async (value: IProduct) => {
        const productVariants: IProductVariantCreate[] =
            productVariantRows.map(({key, productVariantName, ...rest}) => rest);
        const product = {...value, productVariants};
        console.log('Success json:', JSON.stringify(product, null, 2));
        // try {
        //     const result = await createMaterial(value);
        //     mutate();
        //     if (result.data) {
        handleCloseCreateModal();
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
                        </Col>
                        <Col span={10}>
                            <Form.Item label="Giá vốn" initialValue={0} layout="horizontal">
                                <InputNumber style={{width: '100%'}} min={0} placeholder={"0"}/>
                            </Form.Item>
                            <Form.Item label="Giá bán" initialValue={0}>
                                <InputNumber style={{width: '100%'}} min={0} placeholder={"0"}/>
                            </Form.Item>
                            <Form.Item label="Tồn kho" initialValue={0}>
                                <InputNumber style={{width: '100%'}} min={0} placeholder={"0"}/>
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
                    <Row style={{margin: "10px 0px"}}>
                        <Col span={24}>
                            <Collapse
                                activeKey={activeKeyCollapse}
                                onChange={handleCollapseChange}
                                collapsible="icon"
                                size="small" expandIconPosition="end"
                                items={[{
                                    key: 'thuoc-tinh',
                                    label: <Title level={5} style={{margin: '0px 10px'}}>Thuộc tính</Title>,
                                    children: (
                                        <>
                                            <Flex vertical gap={16}>
                                                <div>
                                                    <Typography.Title level={5}>Màu sắc:</Typography.Title>
                                                    <ColorOptionSelect
                                                        selectedValues={selectedColors}
                                                        onChange={
                                                            (selectedOptions: { value: number; label: string }[]) => {
                                                                console.log("Selected colors:", selectedOptions);
                                                                handleSelectChange("colors", selectedOptions);
                                                            }}
                                                        onClear={() => {
                                                            setSelectedColors([]);
                                                            setProductVariantRows([]);
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <Typography.Title level={5}>Kích cỡ</Typography.Title>
                                                    <SizeOptionSelect
                                                        selectedValues={selectedSizes}
                                                        onChange={
                                                            (selectedOptions: { value: number; label: string }[]) => {
                                                                console.log("Selected sizes:", selectedOptions);
                                                                handleSelectChange("sizes", selectedOptions);
                                                            }
                                                        }
                                                        onClear={() => {
                                                            setSelectedSizes([])
                                                            setProductVariantRows([]);
                                                        }}
                                                    />
                                                </div>
                                            </Flex>
                                        </>
                                    )
                                }]}
                            />
                        </Col>
                    </Row>
                    <Row style={{margin: "10px 0px"}}>
                        <Col span={24}>
                            <Collapse
                                activeKey={activeKeyCollapse}
                                onChange={handleCollapseChange}
                                collapsible="icon"
                                size="small" expandIconPosition="end"
                                items={[{
                                    key: 'danh-sach-san-pham-cung-loai',
                                    label: (
                                        <Title level={5} style={{margin: '0px 10px'}}>
                                            Danh sách sản phẩm cùng loại
                                        </Title>),
                                    children: (
                                        <Form.Item name="productVariants">
                                            <TableEditRows
                                                productVariantRows={productVariantRows}
                                                setProductVariantRows={setProductVariantRows}
                                            />
                                        </Form.Item>
                                    )
                                }]}
                            />
                        </Col>
                    </Row>
                </>
            ),
        },
        {
            key: "description-detail",
            label: "Mô tả chi tiết",
            children: (
                <>
                    <Row style={{margin: "10px 0px"}}>
                        <Col span={24}>
                            <Form.Item name="description" label="Mô tả sản phẩm" layout="horizontal"
                                       tooltip="Mô tả chi tiết sản phẩm"
                            >
                                <TextArea showCount style={{height: 120, resize: 'none'}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )
        },
    ];

    return (
        <>
            <Modal title="Thêm sản phẩm" cancelText="Hủy" okText="Lưu" width={1200} style={{top: 20}}
                   maskClosable={false}
                   open={isCreateModalOpen}
                   onOk={() => form.submit()}
                   onCancel={() => handleCloseCreateModal()}
                   okButtonProps={{style: {background: "#00b96b"}}}

            >
                <Form form={form} name="createProduct" onFinish={onFinish}
                      labelCol={{span: 6}} labelAlign="left" labelWrap
                >
                    <Tabs defaultActiveKey="info" items={itemTabs}/>
                </Form>
            </Modal>
        </>
    );
}
export default memo(CreateProduct);
