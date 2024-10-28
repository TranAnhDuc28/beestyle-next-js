"use client"
import {Flex, Layout, TableColumnsType, Tag, Tooltip, Typography, Image, Row, Col,} from "antd";
import {SearchProps} from "antd/lib/input";
import TablePagination from "@/components/Table/TablePagination";
import HeaderProduct from "@/components/Admin/Product/HeaderProduct";
import useAppNotifications from "@/hooks/useAppNotifications";
import {useEffect, useState} from "react";
import ProductFilter from "@/components/Admin/Product/ProductFilter";
import {EditTwoTone, EyeTwoTone} from "@ant-design/icons";
import {useSearchParams} from "next/navigation";
import CreateProduct from "@/components/Admin/Product/CreateProduct";
import {IProduct} from "@/types/IProduct";
import {STATUS} from "@/constants/Status";
import useSWR from "swr";
import {getProducts, URL_API_PRODUCT} from "@/services/ProductService";
import {GENDER_PRODUCT} from "@/constants/GenderProduct";

const {Content} = Layout;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const ProductComponent = () => {
    const {showNotification} = useAppNotifications();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const {data, error, isLoading, mutate} =
        useSWR(`${URL_API_PRODUCT.get}${params.size !== 0 ? `?${params.toString()}` : ''}`,
            getProducts,
            {revalidateOnFocus: false, revalidateOnReconnect: false}
        );

    const columns: TableColumnsType<IProduct> = [
        {
            title: '', dataIndex: 'imageUrl', key: 'imageUrl', align: 'center', width: 70,
            render: (value, record) => {
                return (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            width={35}
                            height={35}
                            src={value ? value : "/no-img.png"}
                            fallback="/no-img.png"
                        />
                    </div>
                );
            }
        },
        {title: 'Tên sản phẩm', dataIndex: 'productName', key: 'productName'},
        {
            title: 'Giới tính', dataIndex: 'genderProduct', key: 'genderProduct', width: 100,
            render(value: keyof typeof GENDER_PRODUCT, record, index) {
                return (
                    <span key={record.id}>{GENDER_PRODUCT[value]}</span>
                );
            },
        },
        {title: 'Danh mục', dataIndex: 'categoryName', key: 'categoryName'},
        {title: 'Thương hiệu', dataIndex: 'brandName', key: 'brandName'},
        {title: 'Chất liệu', dataIndex: 'materialName', key: 'materialName'},
        {title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt'},
        {title: 'Ngày sửa', dataIndex: 'updatedAt', key: 'updatedAt'},
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status', align: 'center', width: 140,
            render(value: keyof typeof STATUS, record, index) {
                let color: string = value === 'ACTIVE' ? 'green' : 'default';
                return (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Tag color={color} key={record.id}>{STATUS[value]}</Tag>
                    </div>
                );
            },
        },
        {
            title: 'Hành động', align: 'center', render: (record) => {
                return (
                    <Row gutter={[8, 8]} justify="center" align="middle">
                        <Col>
                            <Tooltip placement="top" title="Xem chi tiết">
                                <EyeTwoTone
                                    style={{
                                        cursor: "pointer",
                                        padding: "5px",
                                        border: "1px solid #1677FF",
                                        borderRadius: "5px",
                                    }}
                                />
                            </Tooltip>
                        </Col>
                        <Col>
                            <Tooltip placement="top" title="Chỉnh sửa">
                                <EditTwoTone
                                    twoToneColor={"#f57800"}
                                    style={{
                                        cursor: "pointer",
                                        padding: "5px",
                                        border: "1px solid #f57800",
                                        borderRadius: "5px"
                                    }}
                                    onClick={() => {
                                        setIsUpdateModalOpen(true);
                                        setDataUpdate(record);
                                    }}
                                />
                            </Tooltip>
                        </Col>
                    </Row>
                )
            }
        },
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

    return (
        <>
            <HeaderProduct setIsCreateModalOpen={setIsCreateModalOpen}/>
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                <ProductFilter error={error}/>
                <Content
                    className="min-w-0 bg-white"
                    style={{
                        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                        flex: 1,
                        minWidth: 700,
                    }}
                >
                    <TablePagination
                        loading={isLoading}
                        columns={columns}
                        data={result?.items ? result.items : []}
                        current={result?.pageNo}
                        pageSize={result?.pageSize}
                        total={result?.totalElements}
                    >
                    </TablePagination>
                </Content>
            </Flex>

            <CreateProduct
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
                mutate={undefined}
            />
        </>

    );
}

export default ProductComponent;