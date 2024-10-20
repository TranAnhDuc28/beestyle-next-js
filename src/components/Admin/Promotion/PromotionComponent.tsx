"use client";
import { useState } from 'react';
import { Flex, Layout, Menu, MenuProps, Space, TableColumnsType, Typography, Button, Popconfirm, Modal, Form, Input, DatePicker, Select, message } from "antd";
import { PlusOutlined, MenuFoldOutlined, MenuUnfoldOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import dayjs from 'dayjs';

import type { IPromotion } from "@/types/IPromotion";
import TablePagination from "@/components/Table/TablePagination";
import ColorButton from "@/components/Button/ColorButton";
import {getPromotions, URL_API_PROMOTION} from "@/services/PromotionService";
import { OptionsParams } from "@/utils/HttpInstance";
import useSWR, { mutate } from "swr";

const { Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
    {
        key: '1',
        label: 'Trạng thái',
        children: [
            { key: '1.1', label: 'Upcoming' },
            { key: '1.2', label: 'Active' },
            { key: '1.3', label: 'Expired' },
        ]
    },
    {
        key: '2',
        label: 'Loại giảm giá',
        children: [
            { key: '2.1', label: 'Phần trăm' },
            { key: '2.2', label: 'Tiền mặt' },
        ]
    }
];

const PromotionComponent: React.FC<any> = (props: any) => {

    // Load dữ liệu
    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState<IPromotion | null>(null);
    const [form] = Form.useForm();
    const options: OptionsParams = props.options;

    const { data, error, isLoading, mutate } = useSWR(
        URL_API_PROMOTION.get,
        getPromotions,
        {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    }
    );

    if (error) {
        return <div>{error?.response?.data?.message || "Error fetching promotions"}</div>;
    }

    let result: any;
    if (!isLoading) result = data?.data;

    // Bảng dữ liệu
    const columns: TableColumnsType<IPromotion> = [
        { title: 'Tên chương trình', dataIndex: 'promotionName', key: 'promotionName' },
        {
            title: 'Loại giảm giá', dataIndex: 'discountType', key: 'discountType',
            render: (value: string) => value === 'PERCENTAGE' ? 'Phần trăm' : 'Tiền mặt'
        },
        { title: 'Giá trị', dataIndex: 'discountValue', key: 'discountValue' },
        {
            title: 'Bắt đầu', dataIndex: 'startDate', key: 'startDate',
            render: (date: string) => dayjs(date).format('DD-MM-YYYY')
        },
        {
            title: 'Kết thúc', dataIndex: 'endDate', key: 'endDate',
            render: (date: string) => dayjs(date).format('DD-MM-YYYY')
        },
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status',
            render: (value: string) => {
                switch (value) {
                    case 'UPCOMING':
                        return 'Sắp tới';
                    case 'ACTIVE':
                        return 'Đang hoạt động';
                    case 'EXPIRED':
                        return 'Hết hạn';
                    default:
                        return 'Unknown';
                }
            }
        },
        { title: 'Mô tả', dataIndex: 'description', key: 'description', width: 200},
        {
            title: "Hành động", key: "actions", width: 180,
            render: (text: any, record: any) => (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button icon={<EditOutlined />} onClick={() => handleEditPromotion(record)} />
                    <Popconfirm
                        title="Bạn có chắc muốn xóa khuyến mãi này?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => handleDeletePromotion(record.id, mutate)}
                    >
                        <Button icon={<DeleteOutlined />} />
                    </Popconfirm>
                    <Button>Áp dụng</Button>
                </div>
            ),
        },
    ];

    // Load dữ liệu form update
    const handleEditPromotion = (promotion: IPromotion) => {
        setSelectedPromotion(promotion);
        form.setFieldsValue({
            promotionName: promotion.promotionName,
            discountType: promotion.discountType,
            discountValue: promotion.discountValue,
            dateRange: [dayjs(promotion.startDate), dayjs(promotion.endDate)],
            description: promotion.description,
        });
        setIsUpdateModalVisible(true);
    };

    // Update
    const handleUpdatePromotion = () => {
        form.validateFields().then(async (values) => {
            const { promotionName, discountType, discountValue, dateRange, description} = values;
            const startDate = dayjs(dateRange[0]).format('YYYY-MM-DD');
            const endDate = dayjs(dateRange[1]).format('YYYY-MM-DD');

            const updatedData = {
                promotionName,
                discountType,
                discountValue,
                startDate,
                endDate,
                description,
                status: "ACTIVE",
                updatedBy: 1, // Cập nhật sau
                updatedAt: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
            };

            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/promotion/update/${selectedPromotion?.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Promotion updated successfully:', result);

                    message.success('Khuyến mãi đã được cập nhật thành công!');
                    setIsUpdateModalVisible(false);
                    mutate();
                } else {
                    const errorData = await response.json();
                    console.error('Failed to update promotion:', errorData);

                    message.error(`Không thể cập nhật khuyến mãi: ${errorData.message || 'Có lỗi xảy ra'}`);
                }
            } catch (error) {
                console.error('Error:', error);
                message.error('Đã xảy ra lỗi khi cập nhật khuyến mãi. Vui lòng thử lại.');
            }
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    // Delete
    const handleDeletePromotion = async (id: number, mutate: any) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/promotion/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('Khuyến mãi đã được xóa thành công!');
                mutate();
            } else {
                const errorData = await response.json();
                console.error('Failed to delete promotion:', errorData);
                message.error(`Không thể xóa khuyến mãi: ${errorData.message || 'Có lỗi xảy ra'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Đã xảy ra lỗi khi xóa khuyến mãi. Vui lòng thử lại.');
        }
    };

    // Add
    const handleAddPromotion = () => {
        form.validateFields().then(async (values) => {
            const { promotionName, discountType, discountValue, dateRange, description } = values;
            const startDate = dayjs(dateRange[0]).format('YYYY-MM-DD');
            const endDate = dayjs(dateRange[1]).format('YYYY-MM-DD');

            const data = {
                promotionName,
                discountType,
                discountValue,
                startDate,
                endDate,
                description,
                createdBy: 1, // Đặt mặc định là 1
                createdAt: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'), // Ngày tạo hiện tại
                updatedAt: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ'), // Ngày cập nhật hiện tại
            };

            try {
                const response = await fetch('http://localhost:8080/api/v1/admin/promotion/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Promotion created successfully:', result);

                    message.success('Khuyến mãi đã được thêm thành công!');
                    form.resetFields();
                    setIsModalVisible(false);
                    mutate();
                } else {
                    const errorData = await response.json();
                    console.error('Failed to add promotion:', errorData);

                    message.error(`Không thể thêm khuyến mãi: ${errorData.message || 'Có lỗi xảy ra'}`);
                }
            } catch (error) {
                console.error('Error:', error);
                message.error('Đã xảy ra lỗi khi thêm khuyến mãi. Vui lòng thử lại.');
            }
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    // clear form thêm
    const handleOpenModal = () => {

        form.setFieldsValue({
            promotionName: "",
            discountType: undefined,
            discountValue: "",
            dateRange: [dayjs(), null],  // Ngày bd hôm nay
            description: "",
        });
        setIsModalVisible(true);
    };


    return (
        <>
            <Flex align={"flex-start"} justify={"flex-start"} gap={"small"}>
                <Title level={3} style={{ margin: '0px 0px 20px 12px', minWidth: 256, flexGrow: 1 }}>Khuyến mãi</Title>
                <div className="w-full">
                    <Flex justify={'space-between'} align={'center'}>
                        <div className="flex-grow max-w-96">
                            <Search placeholder="Tìm kiếm chương trình" allowClear style={{ width: '100%' }} />
                        </div>
                        <div>
                            <Space>
                                <ColorButton
                                    bgColor="#00b96b"
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={handleOpenModal}  // Show modal on click
                                >
                                    Thêm khuyến mãi
                                </ColorButton>
                                <Button
                                    type="primary"
                                    icon={isFilterVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                                >
                                    {isFilterVisible ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                                </Button>
                            </Space>
                        </div>
                    </Flex>
                </div>
            </Flex>
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                {isFilterVisible && (
                    <Space direction="vertical" style={{ minWidth: 256 }}>
                        <Menu className="w-full bg-white" style={{ borderRadius: 8, boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)' }} mode="inline" items={menuItems} />
                    </Space>
                )}
                <Content className="min-w-0 bg-white" style={{ boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)', flex: 1, minWidth: isFilterVisible ? 700 : '100%', borderRadius: '8px 8px 0px 0px' }}>
                    <TablePagination
                        loading={isLoading}
                        columns={columns}
                        data={result?.items ? result.items : []}
                        current={result?.pageNo}
                        pageSize={result?.pageSize}
                        total={result?.totalElements}
                    />
                </Content>
            </Flex>

            {/* Form thêm */}
            <Modal
                title="Thêm khuyến mãi mới"
                visible={isModalVisible}
                onOk={handleAddPromotion}
                onCancel={() => setIsModalVisible(false)}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="promotionName" label="Tên chương trình" rules={[{ required: true, message: 'Vui lòng nhập tên chương trình' }]}>
                        <Input placeholder="Nhập tên chương trình" />
                    </Form.Item>
                    <Form.Item name="discountType" label="Loại giảm giá" rules={[{ required: true, message: 'Vui lòng chọn loại giảm giá' }]}>
                        <Select placeholder="Chọn loại giảm giá">
                            <Option value="PERCENTAGE">Phần trăm</Option>
                            <Option value="CASH">Tiền mặt</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="discountValue" label="Giá trị giảm" rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm' }]}>
                        <Input placeholder="Nhập giá trị giảm" />
                    </Form.Item>
                    <Form.Item name="dateRange" label="Ngày bắt đầu và kết thúc" rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu và kết thúc' }]}>
                        <RangePicker format="DD-MM-YYYY" />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea rows={3} placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Form update */}
            <Modal
                title="Cập nhật khuyến mãi"
                visible={isUpdateModalVisible}
                onOk={handleUpdatePromotion}
                onCancel={() => setIsUpdateModalVisible(false)}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="promotionName" label="Tên chương trình" rules={[{ required: true, message: 'Vui lòng nhập tên chương trình' }]}>
                        <Input placeholder="Nhập tên chương trình" />
                    </Form.Item>
                    <Form.Item name="discountType" label="Loại giảm giá" rules={[{ required: true, message: 'Vui lòng chọn loại giảm giá' }]}>
                        <Select placeholder="Chọn loại giảm giá">
                            <Option value="PERCENTAGE">Phần trăm</Option>
                            <Option value="CASH">Tiền mặt</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="discountValue" label="Giá trị giảm" rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm' }]}>
                        <Input placeholder="Nhập giá trị giảm" />
                    </Form.Item>
                    <Form.Item name="dateRange" label="Ngày bắt đầu và kết thúc" rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu và kết thúc' }]}>
                        <RangePicker format="DD-MM-YYYY" />
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input.TextArea rows={3} placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default PromotionComponent;