"use client";
import {
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
    Row,
    Col,
    Table,
    Tag,
    Image,
    Space, GetProps, Pagination, Breadcrumb, Button, Tooltip
} from "antd";
import React, {memo, useEffect, useState} from "react";
import {IProduct} from "../../../../../../types/IProduct";
import {IProductVariant} from "../../../../../../types/IProductVariant";
import {getProducts} from "../../../../../../services/ProductService";
import {GENDER_PRODUCT} from "../../../../../../constants/GenderProduct";
import useAppNotifications from "../../../../../../hooks/useAppNotifications";
import {DISCOUNT_TYPE} from "../../../../../../constants/DiscountType";
import dayjs from "dayjs";
import Search from "antd/es/input/Search";
import Link from "next/link";
import {CheckCircleTwoTone, DeleteTwoTone, HomeOutlined} from "@ant-design/icons";
import {useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import {getProductsByPromotionId, getPromotionById, updatePromotion} from "../../../../../../services/PromotionService";
import {
    getProductDetails,
    removePromotionFromNonSelectedVariants,
    updateProductVariant
} from "../../../../../../services/ProductVariantService";
import {IPromotion} from "../../../../../../types/IPromotion";
import ProductVariant from "../../../../../../components/Admin/Promotion/ProductVariant";
import {mutate} from "swr";

type SearchProps = GetProps<typeof Input.Search>;
const {Option} = Select;

interface IProps {
    mutate: any;
    dataUpdate: any;
    isProductVariantOpen: boolean;
    setIsProductVariantOpen: (value: boolean) => void;
}

const UpdatePromotion = (props: IProps) => {
    const {showNotification} = useAppNotifications();
    const [form] = Form.useForm();

    const searchParams = useSearchParams();
    const router = useRouter();
    const { id } = useParams()

    const [promotionData, setPromotionData] = useState<IPromotion | null>(null);
    const [isProductVariantOpen, setIsProductVariantOpen] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const [products, setProducts] = useState<IProduct[]>([]);
    const [productDetails, setProductDetails] = useState<IProductVariant[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<React.Key[]>([]);
    const [selectedDetailProducts, setSelectedDetailProducts] = useState<React.Key[]>([]);


    const pathname = usePathname();
    const {replace} = useRouter();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const params = new URLSearchParams(searchParams);
    const [searchKeyword, setSearchKeyword] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const data = await getPromotionById(id);
                setPromotionData(data);  // Cập nhật state promotion
                console.log("data:", data);
            } catch (err) {
                console.error(err);
            }
        };

        if (id) {
            fetchPromotion();
        }
    }, [id]);

    useEffect(() => {
        const fetchProductsAndDetails = async () => {
            try {
                if (promotionData?.data?.id) {
                    const promotionId = promotionData.data.id;
                    const { productIds, productDetailIds } = await getProductsByPromotionId(promotionId);
                    console.log("productIds:", productIds);
                    console.log("productDetailIds:", productDetailIds);

                    if (Array.isArray(productIds) && Array.isArray(productDetailIds)) {
                        setSelectedProducts(productIds);
                        setSelectedDetailProducts(productDetailIds);
                        if (productIds.length > 0) {
                            const fetchedDetails = await fetchProductDetails(productIds);
                            if (Array.isArray(fetchedDetails)) {
                                const filteredDetails = fetchedDetails.filter((detail) =>
                                    productDetailIds.includes(detail.id) // chỉ giữ chi tiết có id thuộc đợt giảm giá hiện tại
                                );
                                setProductDetails(filteredDetails);
                            } else {
                                console.warn("No valid details fetched:", fetchedDetails);
                            }
                        }
                    } else {
                        console.warn("Invalid productIds or productDetailIds format:", { productIds, productDetailIds });
                    }
                } else {
                    console.warn("Invalid promotionData or missing ID:", promotionData);
                }
            } catch (error) {
                console.error("Error loading products or details:", error);
            }
        };

        fetchProductsAndDetails();
    }, [promotionData]);

    const fetchProductDetails = async (productIds: number[]) => {
        const detailsPromises = productIds.map(async (id) => {
            try {
                const details = await getProductDetails(id);
                // Kiểm tra nếu `details` là mảng
                if (Array.isArray(details)) {
                    return details.map(detail => ({
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
                    }));
                } else {
                    console.warn(`No valid details for productId ${id}`, details);
                    return [];
                }
            } catch (error) {
                console.error("Error fetching details:", error);
                return [];
            }
        });

        const allDetails = await Promise.all(detailsPromises);
        return allDetails.flat(); // Mở rộng tất cả các mảng con thành một mảng
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = `/admin/product?page=${currentPage}&size=${pageSize}`;
                const response = await getProducts(url);
                console.log("Fetched products:", response.data);
                setProducts(response.data.items || []);
                setTotalItems(response.data.totalElements || 0);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [currentPage, pageSize]);

    const handlePageChange = (page: number, size?: number) => {
        setCurrentPage(page);
        if (size) setPageSize(size);
    }

    useEffect(() => {
        if (promotionData && promotionData.data) {
            form.setFieldsValue({
                promotionName: promotionData.data.promotionName,
                discountType: promotionData.data.discountType,
                discountValue: promotionData.data.discountValue,
                startDate: dayjs(promotionData.data.startDate),
                endDate: dayjs(promotionData.data.endDate),
                description: promotionData.data.description,
            });
        }
    }, [promotionData, form]);

    const handleProductClick = (productId: number) => {
        setIsProductVariantOpen(true);
        setSelectedProductId(productId);
        console.log(productId)
    };
    const productColumns = [
        {title: 'Tên sản phẩm', dataIndex: 'productName', key: 'productName'},
        {
            title: 'Giới tính', dataIndex: 'genderProduct', key: 'genderProduct',
            render(value: keyof typeof GENDER_PRODUCT, record, index) {
                return (
                    <span key={record.id}>{GENDER_PRODUCT[value]}</span>
                );
            },
        },
        {title: 'Thương hiệu', dataIndex: 'brandName', key: 'brandName',},
        {title: 'Chất liệu', dataIndex: 'materialName', key: 'materialName'},
        {
            title: 'Hành động',
            align: 'center',
            render: (record: IProduct) => (
                <>
                    <Tooltip placement="top" title="Chọn">
                        <CheckCircleTwoTone
                            twoToneColor={"#f57800"}
                            style={{
                                cursor: "pointer",
                                padding: "5px",
                                border: "1px solid #f57800",
                                borderRadius: "5px",
                                marginRight: "8px"
                            }}
                            onClick={() => handleProductClick(record.id)}
                        />
                    </Tooltip>
                </>
            )
        },
    ];

    const detailColumns = [
        {title: "SKU", dataIndex: "sku", key: "sku"},
        {title: "Tên sản phẩm", dataIndex: "productVariantName", key: "productVariantName"},
        {title: 'Thương hiệu', dataIndex: 'brandName', key: 'brandName',},
        {title: 'Chất liệu', dataIndex: 'materialName', key: 'materialName'},
        {title: "Màu sắc", dataIndex: "colorName", key: "colorName"},
        {title: "Kích thước", dataIndex: "sizeName", key: "sizeName"},
        {title: "Đang áp dụng", dataIndex: "promotionName", key: "promotionName"},
        {
            title: 'Hành động',
            align: 'center',
            render: (record: IPromotion) => (
                <>
                    <Tooltip placement="top" title="Xóa">
                        <DeleteTwoTone
                            twoToneColor={"#ff4d4f"}
                            style={{
                                cursor: "pointer",
                                padding: "5px",
                                border: "1px solid #ff4d4f",
                                borderRadius: "5px"
                            }}
                            onClick={() => onDelete(record)}
                        />
                    </Tooltip>
                </>
            )
        },
    ];
    // const onDelete = (record) => {
    //     setProductDetails((prevDetails) => {
    //         return prevDetails.filter((detail) => detail.id !== record.id);
    //     });
    //     // Nếu cần, cập nhật lại selectedProducts để đồng bộ với chi tiết
    //     setSelectedProducts((prevProducts) => {
    //         return prevProducts.filter((product) => product.id !== record.id);
    //     });
    // };
    const onDelete = async (record) => {id
        try {
            await removePromotionFromNonSelectedVariants(id, record.id);
            setProductDetails((prevDetails) => {
                return prevDetails.filter((detail) => detail.id !== record.id);
            });


            setSelectedProducts((prevProducts) => {
                return prevProducts.filter((product) => product.id !== record.id);
            });

            console.log(`Product with id ${record.id} has been removed from both UI and DB.`);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleCloseUpdateModal = () => {
        form.resetFields();
        setSelectedProducts([]);
        setSelectedDetailProducts([]);
    };

    const handleRowSelectionChange = async (selectedRowKeys: React.Key[], selectedRows: IProduct[]) => {
        setSelectedProducts(selectedRowKeys);

        const selectedProductIds = selectedRows.map(product => product.id);

        const detailsPromises = selectedRows.map(async (product) => {
            try {
                const existingDetails = productDetails.filter(detail => detail.id === product.id);
                if (existingDetails.length > 0) {
                    return existingDetails;
                }
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
        setProductDetails(prevDetails => {
            // Kết hợp chi tiết mới với chi tiết cũ và loại bỏ trùng lặp
            const updatedDetails = [...prevDetails];
            allProductDetails.flat().forEach(newDetail => {
                if (!updatedDetails.some(existingDetail => existingDetail.id === newDetail.id)) {
                    updatedDetails.push(newDetail);
                }
            });
            return updatedDetails;
        });
    };

    const onFinish = async (values: any) => {
        try {
            const { startDate, endDate } = values;

            // Kiểm tra ngày hợp lệ
            if (startDate && !startDate.isValid()) {
                showNotification("error", { message: "Ngày bắt đầu không hợp lệ!" });
                return;
            }

            if (endDate && !endDate.isValid()) {
                showNotification("error", { message: "Ngày kết thúc không hợp lệ!" });
                return;
            }

            if (promotionData.data) {
                // Lấy danh sách chi tiết sản phẩm từ productDetails
                const allDetailIds = productDetails.map((detail) => detail.id);

                const data = {
                    ...values,
                    id: promotionData.data.id,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    productIds: selectedProducts,
                    productDetailIds: allDetailIds,
                };

                const result = await updatePromotion(data);
                mutate();

                if (result.data && result.data.id) {
                    const updatedPromotionId = result.data.id;

                    // Cập nhật sản phẩm chi tiết
                    if (allDetailIds.length > 0) {
                        const updatePromises = allDetailIds.map(async (detailId) => {
                            return updateProductVariant(updatedPromotionId, [detailId]);
                        });

                        await Promise.all(updatePromises);
                    }

                    mutate();
                    handleCloseUpdateModal();
                    showNotification("success", { message: "Sửa thành công!" });
                    router.push('/admin/promotion');
                } else {
                    showNotification("error", { message: "Không tìm thấy ID khuyến mãi để cập nhật!" });
                }
            }
        } catch (error: any) {

            const errorMessage = error?.response?.data?.message || error.message;
            showNotification("error", { message: "Có lỗi xảy ra!", description: errorMessage });
        }
    };



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
        if (searchKeyword) {
            setFilteredProducts(products.filter(product =>
                product.productName?.toLowerCase().includes(searchKeyword.toLowerCase())
            ));
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchKeyword]);

    const handleAddProductDetails = (newDetails) => {
        setProductDetails((prevDetails) => {
            // Lọc những chi tiết chưa có trong danh sách hiện tại
            const updatedDetails = [
                ...prevDetails,
                ...newDetails.filter((detail) => !prevDetails.some((item) => item.id === detail.id))
            ];

            return updatedDetails;
        });
    };
    let breadcrumbTitle;
    if (pathname === '/admin/promotion/create') {
        breadcrumbTitle = 'Thêm mới khuyến mại';
    } else if (pathname.startsWith('/admin/promotion') && pathname.endsWith('/update')) {
        breadcrumbTitle = 'Cập nhật khuyến mại';
    } else {
        breadcrumbTitle = 'Khuyến mại';
    }
    return (
        <>
            <Breadcrumb
                items={[
                    { title: <Link href="/admin"><HomeOutlined /></Link> },
                    { title: <Link href="/admin/promotion">Khuyến mại</Link> },
                    { title: breadcrumbTitle },
                ]}
            />
            <Row gutter={16}>
                {/* Form thêm mới */}
                <Col span={10}>
                    <h2 style={{fontWeight: 'bold', marginBottom: '16px'}}>Cập nhât đợt giảm giá</h2>
                    <Form
                        form={form}
                        name="updatePromotion"
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

                {/* Danh Sách Sản Phẩm */}
                <Col span={14}>
                    <h2 style={{fontWeight: 'bold', marginBottom: '16px'}}>Danh sách sản phẩm</h2>
                    <div>
                        <div className="flex-grow max-w-96" style={{marginBottom: '10px'}}>
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
                            rowSelection={{
                                type: 'checkbox',
                                selectedRowKeys: selectedProducts,
                                onChange: handleRowSelectionChange,
                            }}
                            pagination={false}
                            scroll={{y: 350}}
                        />
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalItems}
                            onChange={handlePageChange}
                            showSizeChanger
                            pageSizeOptions={['10', '20', '50', '100']}
                        />

                    </div>
                </Col>
                <ProductVariant
                    isProductVariantOpen={isProductVariantOpen}
                    setIsProductVariantOpen={setIsProductVariantOpen}
                    productId={selectedProductId}
                    onSelectProductVariants={handleAddProductDetails}
                    onProductSelect={handleAddProductDetails}
                />
            </Row>

            {/* Danh Sách Chi Tiết Sản Phẩm */}
            <Row>
                <Col span={24}>
                    <>
                        <div style={{marginTop: '20px'}}>
                            <h2 style={{fontWeight: 'bold', marginBottom: '16px'}}>Chi tiết sản phẩm đã chọn</h2>

                            <Table
                                columns={detailColumns}
                                dataSource={productDetails.map((variant) => ({
                                    ...variant,
                                    key: variant.id,
                                }))}
                                rowKey="key"
                                bordered
                                pagination={{ pageSize: 10 }}
                                showSizeChanger
                                pageSizeOptions={['10', '20', '50', '100']}
                                style={{ backgroundColor: '#fafafa' }}
                            />

                        </div>
                    </>
                </Col>
            </Row>
            <Row justify="end" style={{marginTop: '20px'}}>
                <Col>
                    <Button type="default"
                            style={{marginRight: '10px', backgroundColor: '#fadb14', borderColor: '#d9d9d9'}}>
                        <Link href="/admin/promotion">Quay lại</Link>
                    </Button>

                    <Button
                        type="primary"
                        htmlType="submit"
                        form="updatePromotion"
                        style={{backgroundColor: '#00b96b', borderColor: '#1890ff'}}
                    >
                        Lưu
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default memo(UpdatePromotion);

