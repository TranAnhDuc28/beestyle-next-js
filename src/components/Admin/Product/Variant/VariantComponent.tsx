"use client"
import React, {useEffect, useState} from "react";
import HeaderVariant from "@/components/Admin/Product/Variant/HeaderVariant";
import {Col, Flex, Layout, TableColumnsType, Tag, Tooltip} from "antd";
import VariantFilter from "@/components/Admin/Product/Variant/VariantFilter";
import {IProduct} from "@/types/IProduct";
import dayjs from "dayjs";
import {EditTwoTone, EyeTwoTone} from "@ant-design/icons";
import useAppNotifications from "@/hooks/useAppNotifications";
import {IProductVariant} from "@/types/IProductVariant";
import {STATUS_PRODUCT} from "@/constants/StatusProduct";
import CreateVariant from "@/components/Admin/Product/Variant/CreateVariant";
import useSWR from "swr";
import {getProductVariantsByProductId} from "@/services/ProductVariantService";
import TablePagination from "@/components/Table/TablePagination";
import {useSearchParams} from "next/navigation";

const {Content} = Layout;

interface IProps {
    productId: string;
}

const VariantComponent: React.FC<IProps> = (props) => {
    const {productId} = props;
    const {showNotification} = useAppNotifications();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const apiUrl: string = `/admin/product/${productId}/variant`;
    console.log(`${apiUrl}${params.size !== 0 ? `?${params.toString()}` : ''}`)

    const {data, error, isLoading, mutate} =
        useSWR(`${apiUrl}?${params.toString()}`,
            getProductVariantsByProductId,
            {revalidateOnFocus: false, revalidateOnReconnect: false}
        );

    const columns: TableColumnsType<IProduct> = [
        {title: 'SKU', dataIndex: 'sku', key: 'sku',},
        {
            title: 'Tên', key: 'productVariantName',
            render(record: IProductVariant) {
                const colorName = record?.colorName ? record.colorName : "_";
                const sizeName = record?.sizeName ? record.sizeName : "_";
                return (
                    <span key={record?.id}>
                        {`${record?.productName} [${colorName} - ${sizeName}]`}
                    </span>
                );
            }
        },
        {title: 'Giá vốn', dataIndex: 'originalPrice', key: 'originalPrice', width: 100},
        {title: 'Giá bán', dataIndex: 'salePrice', key: 'salePrice', width: 100},
        {title: 'Tồn kho', dataIndex: 'quantityInStock', key: 'quantityInStock', width: 100},
        {
            title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt',
            render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: 'Ngày sửa', dataIndex: 'updatedAt', key: 'updatedAt',
            render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status', align: 'center', width: 140,
            render(value: keyof typeof STATUS_PRODUCT, record) {
                let color: string = value === 'ACTIVE' ? 'green' : 'default';
                return (
                    <Tag color={color} key={record.id}>{STATUS_PRODUCT[value]}</Tag>
                );
            },
        },
        {
            title: 'Hành động', align: 'center', width: 100,
            render: (record) => {
                return (
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
                            />
                        </Tooltip>
                    </Col>
                )
            }
        },
    ];

    useEffect(() => {
        if (error) {
            showNotification("error", {
                message: error?.message,
                description: error?.response?.data?.message || `Error fetching product variants with productId ${productId}`,
            });
        }
    }, [error]);

    let result: any;
    if (!isLoading && data) {
        result = data?.data;
    }

    return (
        <>
            <HeaderVariant setIsCreateModalOpen={setIsCreateModalOpen}/>
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                <VariantFilter error={error} mutate={mutate}/>
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

            <CreateVariant

            />
        </>
    );
}
export default VariantComponent;