"use client";
import React, {memo, useEffect, useState} from 'react';
import {
    Form,
    Input,
    Modal,
    notification,
    Select,
    DatePicker,
    InputNumber,
    Row,
    Col,
    Space,
    Table,
    Tag,
    Image
} from 'antd';
import {updatePromotion} from '@/services/PromotionService';
import dayjs from 'dayjs';
import {EuroOutlined, PercentageOutlined} from "@ant-design/icons";
import useAppNotifications from "../../../hooks/useAppNotifications";
import {STATUS} from "@/constants/Status";
import {DISCOUNTTYPE} from "@/constants/DiscountType";
import {DISCOUNT_TYPE} from "../../../constants/DiscountType";
import Search from "antd/es/input/Search";
import {IProduct} from "../../../types/IProduct";
import {IProductVariant} from "../../../types/IProductVariant";
import {getProducts} from "../../../services/ProductService";
import {GENDER_PRODUCT} from "../../../constants/GenderProduct";

import {
    getProductDetails,
    updateProductVariant,
    updateProductVariantUpdate
} from "../../../services/ProductVariantService";
import {getProductsByPromotionId} from "../../../services/PromotionService";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const {Option} = Select;


interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    mutate: any;
    dataUpdate: any;
    setDataUpdate: any;
}

const UpdatePromotion = (props: IProps) => {
    const {showNotification} = useAppNotifications();
    const {isUpdateModalOpen, setIsUpdateModalOpen, mutate, dataUpdate, setDataUpdate} = props;
    const [form] = Form.useForm();

    const [products, setProducts] = useState<IProduct[]>([]);
    const [productDetails, setProductDetails] = useState<IProductVariant[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<React.Key[]>([]);
    const [selectedDetailProducts, setSelectedDetailProducts] = useState<React.Key[]>([]);

    useEffect(() => {
        const fetchProductsAndDetails = async () => {
            if (dataUpdate && dataUpdate.id) {
                try {
                    const {productIds, productDetailIds} = await getProductsByPromotionId(dataUpdate.id);
                    if (productIds && productDetailIds) {
                        setSelectedProducts(productIds);
                        setSelectedDetailProducts(productDetailIds);
                        await fetchProductDetails(productIds);
                    }
                } catch (error) {
                    console.error('Error loading products or details:', error);
                }
            }
        };
        fetchProductsAndDetails();
    }, [dataUpdate]);
    const fetchProductDetails = async (productIds: number[]) => {
        const detailsPromises = productIds.map(async (id) => {
            try {
                const details = await getProductDetails(id);
                return Array.isArray(details) ? details.map(detail => ({
                    id: detail[4],
                    productVariantName: detail[1],
                    brandName: detail[2],
                    materialName: detail[3],
                    quantityInStock: detail[9],
                    sku: detail[5],
                    colorName: detail[6],
                    sizeName: detail[7],
                    originalPrice: detail[8],
                    promotionName: detail[11],
                })) : [];
            } catch (error) {
                console.error("Error fetching details:", error);
                return [];
            }
        });
        const allDetails = await Promise.all(detailsPromises);
        setProductDetails(allDetails.flat());
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts('/admin/product');
                setProducts(response.data.items || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);


    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                promotionName: dataUpdate.promotionName,
                discountType: dataUpdate.discountType,
                discountValue: dataUpdate.discountValue,
                startDate: dayjs(dataUpdate.startDate),
                endDate: dayjs(dataUpdate.endDate),
                description: dataUpdate.description,
            });
        }
    }, [dataUpdate]);
    const productColumns = [
        {title: 'Tên sản phẩm', dataIndex: 'productName', key: 'productName'},
        {
            title: 'Giới tính', dataIndex: 'genderProduct', key: 'genderProduct',
            render(value: keyof typeof GENDER_PRODUCT) {
                return <span>{GENDER_PRODUCT[value]}</span>;
            },
        },
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status',
            render(value: keyof typeof STATUS) {
                const color: string = value === 'ACTIVE' ? 'green' : 'red';
                return <Tag color={color}>{STATUS[value]}</Tag>;
            },
        },
    ];

    const detailColumns = [
        {
            title: '', dataIndex: 'imageUrl', key: 'imageUrl', align: 'center', width: 70,
            render: (value) => (
                <Image width={35} height={35}
                       src={value || "/no-img.png"}
                       fallback="/no-img.png"
                />
            )
        },
        {title: "SKU", dataIndex: "sku", key: "sku"},
        {title: "Tên sản phẩm", dataIndex: "productVariantName", key: "productVariantName"},
        {title: 'Thương hiệu', dataIndex: 'brandName', key: 'brandName'},
        {title: 'Chất liệu', dataIndex: 'materialName', key: 'materialName', width: 120},
        {title: "Màu sắc", dataIndex: "colorName", key: "colorName"},
        {title: "Kích thước", dataIndex: "sizeName", key: "sizeName"},
        {title: "Đang áp dụng", dataIndex: "promotionName", key: "promotionName"},
    ];
    const handleCloseUpdateModal = () => {
        form.resetFields();
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
        setSelectedProducts([]);
        setSelectedDetailProducts([]);
    };

    const handleRowSelectionChange = async (selectedRowKeys: React.Key[], selectedRows: IProduct[]) => {
        setSelectedProducts(selectedRowKeys);

        const detailsPromises = selectedRows.map(async (product) => {
            try {
                const detailsResponse = await getProductDetails(product.id);
                console.log("Fetched product details:", detailsResponse);
                return Array.isArray(detailsResponse) ? detailsResponse.map(item => ({
                    id: item[4],
                    productVariantName: item[1],
                    brandName: item[2],
                    materialName: item[3],
                    quantityInStock: item[9],
                    sku: item[5],
                    colorName: item[6],
                    sizeName: item[7],
                    originalPrice: item[8],
                    promotionName: item[11],
                })) : [];
            } catch (error) {
                console.error("Error fetching product details:", error);
                return [];
            }
        });

        const allProductDetails = await Promise.all(detailsPromises);
        setProductDetails(allProductDetails.flat());
    };

    const detailRowSelection = {
        selectedRowKeys: selectedDetailProducts,
        onChange: (selectedRowKeys) => {
            console.log("Selected row keys:", selectedRowKeys);
            setSelectedDetailProducts(selectedRowKeys);
        },
    };

    const onFinish = async (values: any) => {
        try {
            const {startDate, endDate} = values;

            if (startDate && !startDate.isValid()) {
                showNotification("error", {message: "Ngày bắt đầu không hợp lệ!"});
                return;
            }

            if (endDate && !endDate.isValid()) {
                showNotification("error", {message: "Ngày kết thúc không hợp lệ!"});
                return;
            }

            if (dataUpdate) {
                const data = {
                    ...values,
                    id: dataUpdate.id,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    productIds: selectedProducts, // Thêm productIds vào dữ liệu gửi
                    productDetailIds: selectedDetailProducts, // Thêm productDetailIds vào dữ liệu gửi
                };

                const result = await updatePromotion(data);
                mutate(); // Cập nhật lại danh sách khuyến mãi

                if (result.data && result.data.id) {
                    const updatedPromotionId = result.data.id;

                    // Kiểm tra và chỉ cập nhật khi có sản phẩm chi tiết
                    if (selectedDetailProducts.length > 0) {
                        const numericDetailIds = selectedDetailProducts.filter((id): id is number => typeof id === 'number');

                        const updatePromises = numericDetailIds.map(async (detailId) => {
                            console.log("Selected Detail Products to Update:", detailId);
                            return updateProductVariantUpdate(updatedPromotionId, [detailId]);
                        });

                        await Promise.all(updatePromises);
                    }

                    mutate();
                    handleCloseUpdateModal();
                    showNotification("success", {message: "Sửa thành công!"});
                } else {
                    showNotification("error", {message: "Không tìm thấy ID khuyến mãi để cập nhật!"});
                }
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
    };

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const params = new URLSearchParams(searchParams);
    const [searchKeyword, setSearchKeyword] = useState("");

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log("Searching:", value); // Kiểm tra giá trị tìm kiếm
        if (info?.source === "input" && value) {
            setSearchKeyword(value);
            params.set("keyword", value);
            params.set("page", "1");
            replace(`${pathname}?${params.toString()}`);
        } else {
            console.log("Clearing search keyword"); // Kiểm tra khi xóa từ khóa
            setSearchKeyword("");
            params.delete("keyword");
            replace(`${pathname}?${params.toString()}`);
        }
    };

    useEffect(() => {
        console.log("Current search keyword:", searchKeyword); // Kiểm tra từ khóa hiện tại
        if (searchKeyword) {
            setFilteredProducts(products.filter(product =>
                product.productName?.toLowerCase().includes(searchKeyword.toLowerCase())
            ));
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchKeyword]);


    return (
        <Modal
            title="Chỉnh sửa đợt khuyễn mại"
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={handleCloseUpdateModal}
            cancelText="Hủy"
            okText="Lưu"
            okButtonProps={{
                style: {background: "#00b96b"},
            }}
            width={1200} style={{top: 20}}
        >
            <Row gutter={16}>
                {/* Form thêm mới */}
                <Col span={10}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Tên khuyến mại"
                            name="promotionName"
                            rules={[{required: true, message: 'Vui lòng nhập tên khuyến mại'}]}
                        >
                            <Input placeholder="Nhập tên khuyến mại"/>
                        </Form.Item>

                        <Form.Item
                            label="Giá trị giảm giá"
                            rules={[{required: true, message: "Vui lòng nhập giá trị giảm giá và chọn kiểu!"}]}
                        >
                            <Space.Compact style={{width: '100%'}}>
                                <Form.Item
                                    name="discountValue"
                                    noStyle
                                    rules={[
                                        {required: true, message: "Giá trị giảm là bắt buộc!"},
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (getFieldValue("discountType") === "PERCENTAGE" && value > 100) {
                                                    return Promise.reject(new Error("Giá trị giảm không được vượt quá 100%"));
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                >
                                    <InputNumber style={{width: '70%'}} placeholder="Giá trị giảm"/>
                                </Form.Item>
                                <Form.Item
                                    name="discountType"
                                    noStyle
                                    rules={[{required: true, message: "Kiểu giảm là bắt buộc!"}]}
                                >
                                    <Select
                                        style={{width: '30%'}}
                                        placeholder="Chọn kiểu"
                                        suffixIcon={null}
                                    >
                                        {Object.keys(DISCOUNT_TYPE).map((key) => (
                                            <Option key={key} value={key}>
                                                {DISCOUNT_TYPE[key as keyof typeof DISCOUNT_TYPE]}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>

                        <Form.Item
                            name="startDate"
                            label="Ngày bắt đầu"
                            rules={[{required: true, message: "Vui lòng chọn ngày bắt đầu!"}]}

                        >
                            <DatePicker
                                style={{width: '100%'}}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                disabledDate={current => current && current < dayjs().startOf('day')}
                            />
                        </Form.Item>

                        <Form.Item
                            name="endDate"
                            label="Ngày kết thúc"
                            dependencies={['startDate']}
                            rules={[
                                {required: true, message: "Vui lòng chọn ngày kết thúc!"},
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        const startDate = getFieldValue("startDate");
                                        if (!value || !startDate || value.isAfter(startDate)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("Ngày kết thúc phải lớn hơn ngày bắt đầu!")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <DatePicker
                                style={{width: '100%'}}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </Form.Item>

                        <Form.Item name="description" label="Mô tả">
                            <Input.TextArea placeholder="Nhập mô tả"/>
                        </Form.Item>
                    </Form>
                </Col>

                {/* Danh sách sản phẩm */}
                <Col span={14}>
                    <div>
                        <h2 style={{fontWeight: 'bold', marginBottom: '16px'}}>Danh sách sản phẩm</h2>
                        <div className="flex-grow max-w-96">
                            <Search
                                placeholder="Theo tên sản phẩm"
                                allowClear
                                onSearch={onSearch}
                                style={{width: '100%'}}
                            />
                        </div>
                        <Table
                            columns={productColumns}
                            dataSource={filteredProducts}
                            rowKey="id"
                            pagination={{pageSize: 10}}
                            rowSelection={{
                                type: 'checkbox',
                                selectedRowKeys: selectedProducts,
                                onChange: handleRowSelectionChange,
                            }}
                            pagination={false}
                        />

                    </div>

                </Col>

                {/* Chi tiết sản phẩm */}
                <Col span={24}>
                    <h4>Chi tiết sản phẩm:</h4>
                    <Table
                        rowKey="id"
                        columns={detailColumns}
                        dataSource={productDetails}
                        rowSelection={{
                            type: 'checkbox',
                            selectedRowKeys: selectedDetailProducts,
                            ...detailRowSelection,
                        }}
                        pagination={false}
                    />
                </Col>
            </Row>
        </Modal>
    );
};

export default memo(UpdatePromotion);

