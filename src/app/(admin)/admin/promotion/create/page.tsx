"use client"
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
    Space, GetProps, Pagination, Breadcrumb, Button, Tooltip, Card
} from "antd";
import React, {memo, useEffect, useState} from "react";
import {IProduct} from "../../../../../types/IProduct";
import {IProductVariant} from "../../../../../types/IProductVariant";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {getProducts} from "../../../../../services/ProductService";
import {getProductDetails, updateProductVariant} from "../../../../../services/ProductVariantService";
import {GENDER_PRODUCT} from "../../../../../constants/GenderProduct";
import {STATUS} from "../../../../../constants/Status";
import {IPromotion} from "../../../../../types/IPromotion";
import {createPromotion} from "../../../../../services/PromotionService";
import {mutate} from "swr";
import useAppNotifications from "../../../../../hooks/useAppNotifications";
import {DISCOUNT_TYPE} from "../../../../../constants/DiscountType";
import dayjs from "dayjs";
import Search from "antd/es/input/Search";
import Link from "next/link";
import {
    CheckCircleTwoTone,
    DeleteTwoTone,
    HomeOutlined
} from "@ant-design/icons";
import ProductVariant from "../../../../../components/Admin/Promotion/ProductVariant";

type SearchProps = GetProps<typeof Input.Search>;
const {Option} = Select;

interface IProps {
    isProductVariantOpen: boolean;
    setIsProductVariantOpen: (value: boolean) => void;
    mutate: any;
    productId: number;
}

const CreatePromotion = (props: IProps) => {
    const {showNotification} = useAppNotifications();
    const [form] = Form.useForm();
    const router = useRouter();

    const [isProductVariantOpen, setIsProductVariantOpen] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
    const [productDetails, setProductDetails] = useState<IProductVariant[]>([]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const params = new URLSearchParams(searchParams);
    const [searchKeyword, setSearchKeyword] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const handleCloseProductVariantModal = () => {
        form.resetFields();
        setIsProductVariantOpen(false);
        setSelectedProducts([]);
        setProductDetails([]);
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
    const handleRowSelectionChange = async (selectedRowKeys: React.Key[], selectedRows: IProduct[]) => {
        setSelectedProducts(selectedRows);

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
    const onDelete = (record) => {
        setProductDetails((prevDetails) => {
            return prevDetails.filter((detail) => detail.id !== record.id);
        });
        // Nếu cần, cập nhật lại selectedProducts để đồng bộ với chi tiết
        setSelectedProducts((prevProducts) => {
            return prevProducts.filter((product) => product.id !== record.id);
        });

        console.log(`Deleted record: ${record.id}`);
    };

    const rowSelection = {
        onChange: handleRowSelectionChange,
    };
    const onFinish = async (value: IPromotion) => {
        try {

            const result = await createPromotion({...value, selectedProducts});
            mutate();

            if (result.data) {
                const newPromotionId = result.data.id;
                const allDetailIds = productDetails.map((detail) => detail.id);
                const updatePromises = allDetailIds.map(async (detailId) => {
                    return updateProductVariant(newPromotionId, [detailId]);
                });
                await Promise.all(updatePromises);
                mutate();
                showNotification("success", {message: result.message});
                router.push('/admin/promotion');
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error.message;
            showNotification("error", {
                message: "Có lỗi xảy ra!",
                description: errorMessage,
            });
        }
    };


    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log("Searching:", value); // Kiểm tra giá trị tìm kiếm
        if (info?.source === "input" && value) {
            setSearchKeyword(value); // Cập nhật từ khóa tìm kiếm
            params.set("keyword", value); // Cập nhật URL query
            params.set("page", "1"); // Đặt lại trang về 1 khi tìm kiếm
            replace(`${pathname}?${params.toString()}`); // Thay thế URL
        } else {
            console.log("Clearing search keyword"); // Kiểm tra khi xóa từ khóa
            setSearchKeyword("");
            params.delete("keyword"); // Xóa từ khóa trong URL
            replace(`${pathname}?${params.toString()}`); // Thay thế URL
        }
    };

    useEffect(() => {
        console.log("Current search keyword:", searchKeyword);
        if (searchKeyword) {

            setCurrentPage(1);

            const filteredResults = products.filter(product =>
                product.productName?.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            setFilteredProducts(filteredResults);
        } else {
            setFilteredProducts(products);
        }
    }, [searchKeyword, products]);

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
    } else if (pathname === '/admin/promotion/update') {
        breadcrumbTitle = 'Cập nhật khuyến mại';
    } else {
        breadcrumbTitle = 'Khuyến mại';
    }
    return (
        <>
            <Breadcrumb
                items={[
                    {title: <Link href="/admin"><HomeOutlined/></Link>},
                    {title: <Link href="/admin/promotion">Khuyến mại</Link>},
                    {title: breadcrumbTitle},
                ]}
            />
            <Row gutter={16}>
                {/* Form thêm mới */}
                <Col span={10}>
                    <Card
                        title="Thêm mới đợt giảm giá"
                        style={{backgroundColor: '#fff', borderRadius: '8px'}}
                    >
                        <Form
                            form={form}
                            name="createPromotion"
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item name="promotionName" label="Tên chương trình"
                                       rules={[{required: true, message: 'Vui lòng nhập tên chương trình'}]}>
                                <Input placeholder="Nhập tên chương trình"/>
                            </Form.Item>

                            <Form.Item
                                label="Giá trị giảm giá"
                                rules={[{required: true, message: "Vui lòng nhập giá trị giảm giá và chọn kiểu!"}]}
                            >
                                <Space.Compact style={{width: '100%'}}>
                                    <Form.Item
                                        name="discountValue"
                                        noStyle
                                        rules={[{required: true, message: "Giá trị giảm là bắt buộc!"}]}
                                    >
                                        <InputNumber style={{width: '70%'}} placeholder="Giá trị giảm"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="discountType"
                                        noStyle
                                        rules={[{required: true, message: "Kiểu giảm là bắt buộc!"}]}
                                    >
                                        <Select style={{width: '30%'}} placeholder="Chọn kiểu" suffixIcon={null}>
                                            {Object.keys(DISCOUNT_TYPE).map((key) => (
                                                <Option key={key} value={key}>
                                                    {DISCOUNT_TYPE[key as keyof typeof DISCOUNT_TYPE]}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Space.Compact>
                            </Form.Item>

                            <Form.Item name="startDate" label="Ngày bắt đầu"
                                       rules={[{required: true, message: "Vui lòng chọn ngày bắt đầu!"}]}>
                                <DatePicker style={{width: '100%'}} showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>

                            <Form.Item name="endDate" label="Ngày kết thúc" dependencies={['startDate']}
                                       rules={[{required: true, message: "Vui lòng chọn ngày kết thúc!"}]}>
                                <DatePicker style={{width: '100%'}} showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>

                            <Form.Item name="description" label="Mô tả">
                                <Input.TextArea rows={3} placeholder="Nhập mô tả"/>
                            </Form.Item>
                        </Form>
                        <div style={{textAlign: 'center', marginTop: '16px'}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                form="createPromotion"
                                style={{backgroundColor: '#00b96b', borderColor: '#1890ff'}}
                            >
                                Lưu
                            </Button>
                        </div>
                    </Card>
                </Col>

                {/* Danh Sách Sản Phẩm */}
                <Col span={14}>
                    <Card
                        title="Danh sách sản phẩm"
                        style={{backgroundColor: '#fff', borderRadius: '8px'}}
                    >
                        <div>
                            <div className="flex-grow max-w-96" style={{marginBottom: '5px'}}>
                                <Search
                                    placeholder="Theo tên sản phẩm"
                                    allowClear
                                    onSearch={onSearch}
                                    style={{width: '100%'}}
                                />
                            </div>
                            <Table
                                rowSelection={rowSelection}
                                columns={productColumns}
                                dataSource={filteredProducts}
                                rowKey="id"
                                pagination={{
                                    current: currentPage,
                                    pageSize: pageSize,
                                    total: totalItems,
                                    onChange: handlePageChange,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['10', '20', '50', '100'],
                                }}
                                scroll={{y: 350}}
                            />

                        </div>
                    </Card>
                </Col>
                <ProductVariant
                    isProductVariantOpen={isProductVariantOpen}
                    setIsProductVariantOpen={setIsProductVariantOpen}
                    productId={selectedProductId}
                    onSelectProductVariants={handleAddProductDetails}
                    onProductSelect={handleAddProductDetails}
                />

                {/* Danh Sách Chi Tiết Sản Phẩm */}
                <Col span={24}>
                    <Card
                        title="Chi tiết sản phẩm đã chọn"
                        style={{backgroundColor: '#fff', borderRadius: '8px', marginTop: '20px'}}
                    >
                        <Table
                            columns={detailColumns}
                            dataSource={productDetails.map((variant) => ({
                                ...variant,
                                key: variant.id, // Tạo key duy nhất cho mỗi dòng
                            }))}
                            rowKey="key"
                            bordered
                            pagination={{pageSize: 10}}
                            showSizeChanger
                            pageSizeOptions={['10', '20', '50', '100']}
                            style={{backgroundColor: '#fafafa'}}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );

};

export default memo(CreatePromotion);
