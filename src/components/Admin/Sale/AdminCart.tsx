import React, {memo, useContext, useEffect, useMemo} from "react";
import {Table, TableProps, Tag, theme, Typography} from "antd";
import {Content} from "antd/es/layout/layout";
import {DeleteOutlined} from "@ant-design/icons";
import {HandleCart} from "@/components/Admin/Sale/SaleComponent";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";
import {IOrderItem} from "@/types/IOrderItem";
import useSWR from "swr";
import {getOrderItemsByOrderId, URL_API_ORDER_ITEM} from "@/services/OrderItemService";

const {Text} = Typography;

interface IProps {
}

const AdminCart:React.FC<IProps> = (props) => {
    const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();
    const handleCart = useContext(HandleCart);

    const {data, error, isLoading, mutate} =
        useSWR(handleCart?.orderActiveTabKey ? URL_API_ORDER_ITEM.get(handleCart.orderActiveTabKey) : null,
            getOrderItemsByOrderId,
            {
                revalidateIfStale: false,
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            }
        );

    useEffect(() => {
        if (!isLoading && data?.data) {
            handleCart?.setDataCart(data.data);
        }
    }, [data, isLoading]);

    const columns: TableProps<IOrderItem>['columns'] = useMemo(() =>  [
        {
            title: '#', key: '#', align: "center", width: 40,
            render: (value, record, index) => <Text strong>{index + 1}</Text>,
        },
        {
            title: 'Sản phẩm', dataIndex: 'product', key: 'product', width: 250,
            render: (value, record, index) => {
                return (
                    <div className="ml-1">
                        <Text type="secondary">{record.sku}</Text> | <Text>{record.productName}</Text><br/>
                        <Text type="secondary" style={{display: "flex", alignItems: "center"}}>
                            <span style={{marginInlineEnd: 4}}>
                                {`Màu: ${record.colorName}`}
                            </span>
                            {record.colorCode ? <Tag className="custom-tag" color={record.colorCode}/> : ""} |
                            {` Kích cỡ: ${record.sizeName}`}
                        </Text>
                    </div>
                );
            }
        },
        {title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', align: "right", width: 70},
        {
            title: 'Đơn giá', dataIndex: 'price', key: 'price', align: "right", width: 100,
            render: (_, record) => {
                return `${record.salePrice}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',');
            }
        },
        {
            title: 'Tổng giá', key: 'totalPrice', align: "right", width: 100,
            render: (_, record) => {
                return (
                    <Text strong>
                        {`${(record.quantity ?? 0) * (record.salePrice ?? 0)}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                    </Text>
                );
            }
        },
        {
            title: 'Action', key:
                'action', align:
                "center", width:
                70,
            render:
                (_, record) => (
                    <DeleteOutlined
                        style={{cursor: "pointer", padding: "5px", borderRadius: "5px"}}
                        onClick={() => handleCart?.handleDeleteProductInCart(record.id)}
                    />
                ),
        },
    ], [handleCart?.dataCart]);

    return (
        <Content
            style={{
                borderRadius: borderRadiusLG,
                boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                padding: 10,
                overflow: "auto",
                height: 715
            }}
        >
            <Table<IOrderItem>
                rowKey="id"
                loading={isLoading}
                size="small"
                pagination={false}
                columns={columns}
                dataSource={handleCart?.dataCart}
                scroll={{y: 'calc(100vh - 290px)', scrollToFirstRowOnChange: true}}
            />
        </Content>
    );
}
export default memo(AdminCart);