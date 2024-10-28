import React, {memo, useEffect, useState} from 'react';
import {Form, Input, Modal, notification, Select, DatePicker, InputNumber, Row, Col, Table, Tag, Image} from 'antd';
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

    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [productDetails, setProductDetails] = useState([]);

    const handleCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
        setSelectedProducts([]);
        setProductDetails([]);
    };

    const {data, error, isLoading} =
        useSWR(`${URL_API_PRODUCT.get}${params.size !== 0 ? `?${params.toString()}` : ''}`,
            getProducts,
            {revalidateOnFocus: false, revalidateOnReconnect: false}
        );

    const columnsProduct = [
        {
            title: '', dataIndex: 'imageUrl', key: 'imageUrl', align: 'center', width: 70,
            render: (value) => (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        width={35}
                        height={35}
                        src={value || "/no-img.png"}
                        fallback="/no-img.png"
                    />
                </div>
            ),
        },
        {title: 'Tên sản phẩm', dataIndex: 'productName', key: 'productName'},
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status', align: 'center', width: 140,
            render: (value: keyof typeof STATUS) => {
                const color = value === 'ACTIVE' ? 'green' : 'default';
                return (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Tag color={color}>{STATUS[value]}</Tag>
                    </div>
                );
            },
        },
    ];
    const fetchProductDetails = async (data: IPromotion) => {
        try {
            const details = await getProductDetails(data); // Lấy tất cả sản phẩm chi tiết
            setProductDetails(details); // Lưu trữ thông tin chi tiết vào state
        } catch (err) {
            console.error(err);
            showNotification("error", { message: "Error fetching product details" });
        }
    };

    useEffect(() => {
        fetchProductDetails(data); // Gọi hàm để lấy thông tin chi tiết sản phẩm khi component mount
    }, []);

    const columnsProductDetail = [
        {
            title: '', dataIndex: 'imageUrl', key: 'imageUrl', align: 'center', width: 70,
            render: (value) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        width={35}
                        height={35}
                        src={value ? value : "/no-img.png"}
                        fallback="/no-img.png"
                    />
                </div>
            )
        },
        { title: 'Tên sản phẩm', dataIndex: 'productName', key: 'productName' },
        { title: 'Thương hiệu', dataIndex: 'brandName', key: 'brandName' },
        { title: 'Chất liệu', dataIndex: 'materialName', key: 'materialName' },
        { title: 'Màu sắc', dataIndex: 'colorName', key: 'colorName' },
        { title: 'Kích thước', dataIndex: 'sizeName', key: 'sizeName' },
        { title: 'Giá bán', dataIndex: 'originalPrice', key: 'originalPrice' },
        { title: 'Số lượng', dataIndex: 'quantityInStock', key: 'quantityInStock' }
    ];
    useEffect(() => {
        if (error) {
            showNotification("error", {
                message: error?.message, description: error?.response?.data?.message || "Error fetching products",
            });
        }
    }, [error]);

    let result: any;
    if (!isLoading && data) {
        result = data?.data;
    }
    const onFinish = async (value: IPromotion) => {
        try {
            const result = await createPromotion({...value, selectedProducts}); // Gửi cả danh sách sản phẩm đã chọn
            mutate();
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
                    style: {background: "#00b96b"},
                }}
                width={1200} style={{top: 20}}
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
                                       rules={[{required: true, message: 'Vui lòng nhập tên chương trình'}]}>
                                <Input placeholder="Nhập tên chương trình"/>
                            </Form.Item>

                            <Form.Item
                                label="Giá trị giảm giá"
                                rules={[{required: true, message: "Vui lòng nhập giá trị giảm giá và chọn kiểu!"}]}
                            >
                                <Input.Group compact>
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
                                        <Select
                                            style={{width: '30%'}}
                                            placeholder="Chọn kiểu"
                                        >
                                            <Option value="0" icon={<PercentageOutlined/>}>%</Option>
                                            <Option value="1" icon={<EuroOutlined/>}>VND </Option>
                                        </Select>
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>

                            <Form.Item
                                name="startDate"
                                label="Ngày bắt đầu"
                                rules={[{required: true, message: "Vui lòng chọn ngày bắt đầu!"}]}
                            >
                                <DatePicker style={{width: '100%'}}/>
                            </Form.Item>
                            <Form.Item
                                name="endDate"
                                label="Ngày kết thúc"
                                rules={[{required: true, message: "Vui lòng chọn ngày kết thúc!"}]}
                            >
                                <DatePicker style={{width: '100%'}}/>
                            </Form.Item>
                            <Form.Item name="description" label="Mô tả">
                                <Input.TextArea rows={3} placeholder="Nhập mô tả"/>
                            </Form.Item>
                        </Form>
                    </Col>

                    {/* Danh Sách Sản Phẩm */}
                    <Col span={12}>
                        <h3>Danh Sách Sản Phẩm</h3>
                        <TablePagination
                            rowSelection={{
                                type: 'checkbox',
                                onChange: (_, selectedRows) => setSelectedProducts(selectedRows.map(row => row.key)),
                            }}
                            loading={isLoading}
                            columns={columnsProduct}
                            data={result?.items ? result.items : []}
                            current={result?.pageNo}
                            pageSize={result?.pageSize}
                            total={result?.totalElements}
                        >
                        </TablePagination>
                    </Col>
                </Row>
                {/* Danh Sách Chi Tiết Sản Phẩm */}
                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <h3>Danh Sách Chi Tiết Sản Phẩm</h3>
                        <TablePagination
                            rowSelection={{
                                type: 'checkbox',
                                onChange: (_, selectedRows) => setSelectedProducts(selectedRows.map(row => row.key)),
                            }}
                            loading={isLoading}
                            columns={columnsProductDetail}
                            data={result?.items ? result.items : []}
                            current={result?.pageNo}
                            pageSize={result?.pageSize}
                            total={result?.totalElements}
                        >
                        </TablePagination>
                        <TablePagination
                            loading={isLoading}
                            columns={columnsProductDetail}
                            data={data}
                            current={1}
                            pageSize={productDetails.length}
                            total={productDetails.length}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default memo(CreatePromotion);

//
// "use client";
// import { memo, useState } from 'react';
// import { Form, Input, Modal, Select, DatePicker, InputNumber, Table, Row, Col } from 'antd';
// import { createPromotion } from '@/services/PromotionService';
// import { EuroOutlined, PercentageOutlined } from '@ant-design/icons';
// import useAppNotifications from "../../../hooks/useAppNotifications";
// import { IPromotion } from "../../../types/IPromotion";
//
// const { Option } = Select;
//
// interface IProps {
//     isCreateModalOpen: boolean;
//     setIsCreateModalOpen: (value: boolean) => void;
//     mutate: any;
// }
//
// const productData = [
//     { key: '1', productCode: 'AO01', productName: 'Áo Sơmi Cuban Linen', status: 'Đang Bán' },
//     { key: '2', productCode: 'SM001', productName: 'Áo Sơ mi Chrysanthemum', status: 'Đang Bán' },
//     { key: '3', productCode: 'SPRE', productName: 'Áo Sơ mi Semi Spread', status: 'Đang Bán' },
// ];
//
// const CreatePromotion = (props: IProps) => {
//     const { showNotification } = useAppNotifications();
//     const { isCreateModalOpen, setIsCreateModalOpen, mutate } = props;
//     const [form] = Form.useForm();
//     const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
//
//     const handleCloseCreateModal = () => {
//         form.resetFields();
//         setIsCreateModalOpen(false);
//     };
//
//     const onFinish = async (value: IPromotion) => {
//         try {
//             const result = await createPromotion(value);
//             mutate();
//             if (result.data) {
//                 handleCloseCreateModal();
//                 showNotification("success", { message: result.message });
//             }
//         } catch (error: any) {
//             showNotification("error", { message: error?.message });
//         }
//     };
//
//     const productColumns = [
//         { title: 'Mã Sản Phẩm', dataIndex: 'productCode', key: 'productCode' },
//         { title: 'Tên Sản Phẩm', dataIndex: 'productName', key: 'productName' },
//         { title: 'Trạng Thái', dataIndex: 'status', key: 'status' },
//     ];
//
//     const detailColumns = [
//         { title: 'Mã Sản Phẩm', dataIndex: 'productCode', key: 'productCode' },
//         { title: 'Tên Sản Phẩm', dataIndex: 'productName', key: 'productName' },
//         { title: 'Số Lượng Tồn', dataIndex: 'stock', key: 'stock' },
//         { title: 'Giá', dataIndex: 'price', key: 'price' },
//         { title: 'Kiểu', dataIndex: 'type', key: 'type' },
//     ];
//
//     return (
//         <>
//             <Modal
//                 title="Thêm mới đợt giảm giá"
//                 open={isCreateModalOpen}
//                 onOk={() => form.submit()}
//                 onCancel={() => handleCloseCreateModal()}
//                 cancelText="Hủy"
//                 okText="Lưu"
//                 width={1000} // Đặt chiều rộng modal rộng hơn để hiển thị hết nội dung
//                 bodyStyle={{ padding: '20px' }}
//             >
//                 <Row gutter={16}>
//                     {/* Form thêm mới */}
//                     <Col span={12}>
//                         <Form form={form} name="createPromotion" layout="vertical" onFinish={onFinish}>
//                             <Form.Item name="promotionName" label="Tên chương trình"
//                                        rules={[{ required: true, message: 'Vui lòng nhập tên chương trình' }]}>
//                                 <Input placeholder="Nhập tên chương trình" />
//                             </Form.Item>
//
//                             <Form.Item label="Giá trị giảm giá">
//                                 <Input.Group compact>
//                                     <Form.Item
//                                         name="discountValue"
//                                         noStyle
//                                         rules={[{ required: true, message: "Giá trị giảm là bắt buộc!" }]}
//                                     >
//                                         <InputNumber style={{ width: '70%' }} placeholder="Giá trị giảm" />
//                                     </Form.Item>
//                                     <Form.Item
//                                         name="discountType"
//                                         noStyle
//                                         rules={[{ required: true, message: "Kiểu giảm là bắt buộc!" }]}
//                                     >
//                                         <Select style={{ width: '30%' }} placeholder="Chọn kiểu">
//                                             <Option value="0"><PercentageOutlined /> %</Option>
//                                             <Option value="1"><EuroOutlined /> VND</Option>
//                                         </Select>
//                                     </Form.Item>
//                                 </Input.Group>
//                             </Form.Item>
//
//                             <Form.Item name="startDate" label="Ngày bắt đầu"
//                                        rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}>
//                                 <DatePicker style={{ width: '100%' }} />
//                             </Form.Item>
//                             <Form.Item name="endDate" label="Ngày kết thúc"
//                                        rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}>
//                                 <DatePicker style={{ width: '100%' }} />
//                             </Form.Item>
//                             <Form.Item name="description" label="Mô tả">
//                                 <Input.TextArea rows={3} placeholder="Nhập mô tả" />
//                             </Form.Item>
//                         </Form>
//                     </Col>
//
//                     {/* Danh Sách Sản Phẩm */}
//                     <Col span={12}>
//                         <h3>Danh Sách Sản Phẩm</h3>
//                         <Table
//                             rowSelection={{
//                                 type: 'checkbox',
//                                 onChange: (_, selectedRows) => setSelectedProducts(selectedRows.map(row => row.key)),
//                             }}
//                             columns={productColumns}
//                             dataSource={productData}
//                             pagination={{ pageSize: 5 }}
//                             scroll={{ y: 200 }}
//                         />
//                     </Col>
//                 </Row>
//
//                 {/* Danh Sách Chi Tiết Sản Phẩm */}
//                 <Row style={{ marginTop: '20px' }}>
//                     <Col span={24}>
//                         <h3>Danh Sách Chi Tiết Sản Phẩm</h3>
//                         <Table
//                             columns={detailColumns}
//                             dataSource={selectedProducts.map(productId => ({
//                                 key: productId,
//                                 productCode: productId,
//                                 productName: productData.find(p => p.key === productId)?.productName || '',
//                                 stock: '100',
//                                 price: '200000',
//                                 type: 'Default'
//                             }))}
//                             pagination={false}
//                             scroll={{ y: 200 }}
//                         />
//                     </Col>
//                 </Row>
//             </Modal>
//         </>
//     );
// };
//
// export default memo(CreatePromotion);
