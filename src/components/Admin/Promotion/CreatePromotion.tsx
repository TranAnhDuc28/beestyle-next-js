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
    Table,
    Tag,
    Image,
    Space
} from 'antd';
import {createPromotion} from '@/services/PromotionService';
import {EuroOutlined, PercentageOutlined} from '@ant-design/icons';
import useAppNotifications from "../../../hooks/useAppNotifications";
import {IPromotion} from "../../../types/IPromotion";
import {useSearchParams} from "next/navigation";
import useSWR from "swr";
import {getProductDetails, getProducts, URL_API_PRODUCT} from "../../../services/ProductService";
import {IProduct} from "../../../types/IProduct";
import {STATUS} from "../../../constants/Status";
import TablePagination from "../../Table/TablePagination";
import {GENDER_PRODUCT} from "../../../constants/GenderProduct";
import {DISCOUNT_TYPE} from "../../../constants/DiscountType";
import {IProductVariant} from "../../../types/IProductVariant";

const {Option} = Select;

interface IProps {
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (value: boolean) => void;
    mutate: any;
}

const CreatePromotion = (props: IProps) => {
    const {showNotification} = useAppNotifications();
    const {isCreateModalOpen, setIsCreateModalOpen, mutate} = props;
    const [form] = Form.useForm();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
    const [productDetails, setProductDetails] = useState<IProductVariant[]>([]);
    const [selectedDetailProducts, setSelectedDetailProducts] = useState([]);


    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
        setSelectedProducts([]);
        setProductDetails([]);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts('/admin/product');
                console.log("Fetched products:", response.data);
                setProducts(response.data.items || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleRowSelectionChange = async (selectedRowKeys: React.Key[], selectedRows: IProduct[]) => {
        setSelectedProducts(selectedRows);

        const detailsPromises = selectedRows.map(async (product) => {
            try {
                const detailsResponse = await getProductDetails(product.id);
                console.log("Fetched product details:", detailsResponse);
                return Array.isArray(detailsResponse) ? detailsResponse.map(item => ({
                    id: item[0],
                    productVariantName: item[1],
                    brandName: item[2],
                    materialName: item[3],
                    quantityInStock: item[9],
                    sku: item[5],
                    colorName: item[6],
                    sizeName: item[7],
                    originalPrice: item[8],
                    createdAt: item[10],
                })) : [];
            } catch (error) {
                console.error("Error fetching product details:", error);
                return [];
            }
        });

        const allProductDetails = await Promise.all(detailsPromises);
        setProductDetails(allProductDetails.flat());
    };
    const rowSelectionDetails = {
        selectedRowKeys: selectedDetailProducts,
        onChange: (selectedRowKeys) => {
            setSelectedDetailProducts(selectedRowKeys);
        },
    };
    const productColumns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {title: 'Tên sản phẩm', dataIndex: 'productName', key: 'productName'},
        {
            title: 'Giới tính', dataIndex: 'genderProduct', key: 'genderProduct',
            render(value: keyof typeof GENDER_PRODUCT, record, index) {
                return (
                    <span key={record.id}>{GENDER_PRODUCT[value]}</span>
                );
            },
        },
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status',
            render(value: keyof typeof STATUS, record, index) {
                let color: string = value === 'ACTIVE' ? 'green' : 'red';
                return (
                    <Tag color={color} key={record.id}>{STATUS[value]}</Tag>
                );
            },
        },
    ];

    const detailColumns = [

        {
            title: '', dataIndex: 'imageUrl', key: 'imageUrl', align: 'center', width: 70,
            render: (value, record) => {
                return (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Image width={35} height={35}
                               src={value ? value : "/no-img.png"}
                               fallback="/no-img.png"
                        />
                    </div>
                );
            }
        },
        {title: "SKU", dataIndex: "sku", key: "sku"},
        {title: "Tên sản phẩm", dataIndex: "productVariantName", key: "productVariantName"},
        {title: 'Thương hiệu', dataIndex: 'brandName', key: 'brandName',},
        {title: 'Chất liệu', dataIndex: 'materialName', key: 'materialName', width: 120},
        {title: "Màu sắc", dataIndex: "colorName", key: "colorName"},
        {title: "Kích thước", dataIndex: "sizeName", key: "sizeName"},
        {title: "Giá gốc", dataIndex: "originalPrice", key: "originalPrice"},
        {title: "Số lượng", dataIndex: "quantityInStock", key: "quantityInStock"},
    ];

    // Thiết lập rowSelection
    const rowSelection = {
        onChange: handleRowSelectionChange,
    };
    const onFinish = async (value: IPromotion) => {
        try {
            const result = await createPromotion({...value, selectedProducts});
            mutate();
            // if (result.data) {
            //
            //     const newPromotionId = result.data.id;
            //
            //     // Cập nhật ID của đợt giảm giá mới cho sản phẩm chi tiết đã chọn
            //     const updatePromises = selectedDetailProducts.map(async (detailId) => {
            //         // Giả sử bạn có hàm updateProductVariantPromotion để cập nhật ID của sản phẩm chi tiết
            //         await updateProductVariantPromotion(detailId, newPromotionId);
            //     });
            //
            //     await Promise.all(updatePromises);
            //     mutate(); // Cập nhật lại danh sách sau khi thực hiện các thay đổi
            //     handleCloseCreateModal();
            //     showNotification("success", {message: result.message});
            // }
            if (result.data) {
                handleCloseCreateModal();
                showNotification("success", {message: result.message});
            }

        } catch (error: any) {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage && typeof errorMessage === 'object') {
                Object.entries(errorMessage).forEach(([field, message]) => {
                    showNotification("error", {message: String(message)});
                });
            } else {
                showNotification("error", {
                    message: error?.message,
                    description: errorMessage,
                });
            }
        }
    };

    return (
        <>
            <Modal
                title="Thêm mới đợt giảm giá"
                open={isCreateModalOpen}
                onOk={() => form.submit()}
                onCancel={handleCloseCreateModal}
                cancelText="Hủy"
                okText="Lưu"
                okButtonProps={{
                    style: { background: "#00b96b" },
                }}
                width={1200} style={{ top: 20 }}
            >
                <Row gutter={16}>
                    {/* Form thêm mới */}
                    <Col span={12}>
                        <Form
                            form={form}
                            name="createPromotion"
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item name="promotionName" label="Tên chương trình"
                                       rules={[{ required: true, message: 'Vui lòng nhập tên chương trình' }]}>
                                <Input placeholder="Nhập tên chương trình" />
                            </Form.Item>

                            <Form.Item
                                label="Giá trị giảm giá"
                                rules={[{ required: true, message: "Vui lòng nhập giá trị giảm giá và chọn kiểu!" }]}
                            >
                                <Space.Compact style={{ width: '100%' }}>
                                    <Form.Item
                                        name="discountValue"
                                        noStyle
                                        rules={[
                                            { required: true, message: "Giá trị giảm là bắt buộc!" },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (getFieldValue("discountType") === "PERCENTAGE" && value > 100) {
                                                        return Promise.reject(new Error("Giá trị giảm không được vượt quá 100%"));
                                                    }
                                                    return Promise.resolve();
                                                },
                                            }),
                                        ]}
                                    >
                                        <InputNumber style={{ width: '70%' }} placeholder="Giá trị giảm" />
                                    </Form.Item>
                                    <Form.Item
                                        name="discountType"
                                        noStyle
                                        rules={[{ required: true, message: "Kiểu giảm là bắt buộc!" }]}
                                    >
                                        <Select
                                            style={{ width: '30%' }}
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
                                rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss" // Định dạng hiển thị cho ngày và giờ
                                />
                            </Form.Item>

                            <Form.Item
                                name="endDate"
                                label="Ngày kết thúc"
                                rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss" // Định dạng hiển thị cho ngày và giờ
                                />
                            </Form.Item>

                            <Form.Item name="description" label="Mô tả">
                                <Input.TextArea rows={3} placeholder="Nhập mô tả" />
                            </Form.Item>
                        </Form>
                    </Col>

                    {/* Danh Sách Sản Phẩm */}
                    <Col span={12}>
                        <div>
                            <h2 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Danh sách sản phẩm</h2>
                            <Table
                                columns={productColumns}
                                dataSource={products}
                                rowKey="id"
                                rowSelection={rowSelection} // Sử dụng rowSelection
                            />
                        </div>
                    </Col>
                </Row>

                {/* Danh Sách Chi Tiết Sản Phẩm */}
                <Row style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        {selectedProducts.length > 0 && productDetails.length > 0 && (
                            <div style={{ marginTop: '20px' }}>
                                <h2 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Chi tiết sản phẩm đã chọn</h2>
                                <Table
                                    columns={detailColumns}
                                    dataSource={productDetails.map((variant) => ({
                                        ...variant,
                                        key: `${variant.sku}-${variant.productId}`,
                                    }))}
                                    rowKey="key"
                                    rowSelection={rowSelectionDetails} // Thêm rowSelection cho bảng chi tiết
                                />
                            </div>
                        )}
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default memo(CreatePromotion);