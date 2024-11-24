import React, {LegacyRef, memo, useContext, useEffect, useMemo, useRef, useState} from "react";
import {Flex, Form, InputNumber, InputNumberProps, Table, TableProps, Tag, theme, Typography} from "antd";
import {Content} from "antd/es/layout/layout";
import {DeleteOutlined} from "@ant-design/icons";
import {HandleCart} from "@/components/Admin/Sale/SaleComponent";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";
import {IOrderItem, IUpdateOrderItem} from "@/types/IOrderItem";
import useSWR, {mutate} from "swr";
import {getOrderItemsByOrderId, updateQuantityOrderItem, URL_API_ORDER_ITEM} from "@/services/OrderItemService";
import {useDebounce} from "use-debounce";
import useOrderItem from "@/components/Admin/Order/hooks/useOrderItem";
import useAppNotifications from "@/hooks/useAppNotifications";
import {
    StockAction,
    updateQuantityInStockProductVariants,
    URL_API_PRODUCT_VARIANT
} from "@/services/ProductVariantService";

const {Text} = Typography;

const AdminCart: React.FC = () => {
    const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();
    const {showMessage} = useAppNotifications();
    const inputRefs = useRef<Map<number, HTMLInputElement>>(new Map());
    const handleCart = useContext(HandleCart);
    const [initialQuantities, setInitialQuantities] = useState<Map<number, number>>(new Map());
    const {handleUpdateQuantityOrderItem} = useOrderItem();
    const [orderItemUpdateQuantity, setOrderItemUpdateQuantity] = useState<IUpdateOrderItem | null>(null);
    const [debouncedOrderItemUpdateQuantity] = useDebounce(orderItemUpdateQuantity, 500);

    const {data, error, isLoading, mutate: nutateDataCart} =
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

            // lưu trữ số lượng ban đầu của các sản phẩm trong giỏ để xử lý update sản phẩm trong kho
            const initialQuantityMap: Map<number, number> = new Map();
            data.data.forEach((item: any) => {
                initialQuantityMap.set(item.id, item.quantity);
            });
            setInitialQuantities(initialQuantityMap);
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (debouncedOrderItemUpdateQuantity) {
            // cập nhật lại số lượng sản phẩm trong giỏ trong db
            handleUpdateQuantityOrderItem(debouncedOrderItemUpdateQuantity)
                .catch(async (error) => {
                    showMessage("error", "Thay đổi số lượng thất bại.");

                    // Refresh lại dữ liệu từ server khi cập nhật thất bại
                    await nutateDataCart(handleCart?.orderActiveTabKey ? URL_API_ORDER_ITEM.get(handleCart.orderActiveTabKey) : null,
                        {revalidate: true});
                });
        }
    }, [debouncedOrderItemUpdateQuantity]);

    const onChangeQuantity = (orderItemId: number, productVariantId: number, value: number | null) => {
        if (value && !isNaN(value)) {
            handleCart?.setDataCart(prevItems =>
                prevItems.map(item =>
                    item.id === orderItemId ? {...item, quantity: value} : item
                )
            );
        }
    };

    const onBlurQuantity = (e: React.FocusEvent<HTMLInputElement>, orderItemId: number, productVariantId: number, productId: number) => {
        const newValue = Number(e.target.value);
        if (newValue && !isNaN(Number(newValue)) && newValue > 0) {
            const oldValue = initialQuantities.get(orderItemId);
            if (newValue !== oldValue) {
                // Tính toán số lượng thay đổi
                const quantityChange = newValue - (oldValue || 0);

                console.log({id: orderItemId, productVariantId, quantity: newValue});

                // cập nhật số lượng mới cho sản phẩm trong giỏ
                setOrderItemUpdateQuantity({id: orderItemId, productVariantId, quantity: newValue});

                // Cập nhật số lượng ban đầu mới
                setInitialQuantities(prev => new Map(prev.set(orderItemId, newValue)));

                // Cập nhật số lượng sản phẩm trong kho
                let action: StockAction;
                if (quantityChange > 0) {
                    action = 'decrease'; // Giảm số lượng kho khi tăng số lượng trong giỏ
                } else {
                    action = 'increase'; // Tăng số lượng kho khi giảm số lượng trong giỏ
                }

                updateQuantityInStockProductVariants({id: productVariantId, quantityInStock: quantityChange}, action)
                    .then(async () => {
                        await mutate(`${URL_API_PRODUCT_VARIANT.filter(productId.toString())}`, null, {revalidate: true});
                    })

            }
        }
    };

    const handlePressEnter = (orderItemId: number) => {
        // nhấn enter sẽ blur ra ngoài input kích hoạt sự kiện blur và update số lượng
        const input = inputRefs.current.get(orderItemId);
        input?.blur();
    };

    const columns: TableProps<IOrderItem>['columns'] = useMemo(() => [
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
        {
            title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', align: "center", width: 100,
            render: (_, record) => {
                return (
                    <InputNumber<number>
                        key={record.id}
                        ref={(el) => {
                            if (el) {
                                inputRefs.current.set(record.id, el);
                            } else {
                                inputRefs.current.delete(record.id);
                            }
                        }}
                        min={1}
                        max={1000}
                        value={record.quantity}
                        formatter={(value) => `${value}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                        onChange={(value) => onChangeQuantity(record.id, record.productVariantId, value)}
                        onBlur={(e) => onBlurQuantity(e, record.id, record.productVariantId, record.productId)}
                        onPressEnter={() => handlePressEnter(record.id)}
                        style={{textAlignLast: "center", width: "100%"}}
                    />

                )
            }
        },
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
            title: 'Action', key: 'action', align: "center", width: 70,
            render:
                (_, record) => (
                    <DeleteOutlined
                        style={{cursor: "pointer", padding: "5px", borderRadius: "5px"}}
                        onClick={() => handleCart?.handleDeleteOrderItemCart(record.id)}
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