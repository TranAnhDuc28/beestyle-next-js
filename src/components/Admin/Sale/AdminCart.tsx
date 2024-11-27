import React, {memo, useContext, useEffect, useMemo, useRef, useState} from "react";
import {InputNumber, Table, TableProps, Tag, theme, Typography} from "antd";
import {Content} from "antd/es/layout/layout";
import {DeleteOutlined} from "@ant-design/icons";
import {HandleCart} from "@/components/Admin/Sale/SaleComponent";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";
import {ICreateOrUpdateOrderItem, IOrderItem} from "@/types/IOrderItem";
import useSWR, {mutate} from "swr";
import {getOrderItemsByOrderId, URL_API_ORDER_ITEM} from "@/services/OrderItemService";
import {useDebounce} from "use-debounce";
import useOrderItem from "@/components/Admin/Order/hooks/useOrderItem";
import useAppNotifications from "@/hooks/useAppNotifications";
import {StockAction, URL_API_PRODUCT_VARIANT} from "@/services/ProductVariantService";
import useProductVariant from "@/components/Admin/Product/Variant/hooks/useProductVariant";

const {Text} = Typography;

const AdminCart: React.FC = () => {
    const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();
    const {showMessage} = useAppNotifications();
    const inputRefs = useRef<Map<number, HTMLInputElement>>(new Map());
    const handleCart = useContext(HandleCart);
    const [initialQuantities, setInitialQuantities] = useState<Map<number, number>>(new Map());
    const {handleUpdateQuantityOrderItem, handleDeleteOrderItem} = useOrderItem();
    const {handleUpdateQuantityInStockProductVariant} = useProductVariant();
    const [orderItemUpdateQuantity, setOrderItemUpdateQuantity] = useState<ICreateOrUpdateOrderItem | null>(null);
    const [debouncedOrderItemUpdateQuantity] = useDebounce(orderItemUpdateQuantity, 500);

    const {data, error, isLoading, mutate: mutateDataCart} =
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
                    await mutateDataCart(handleCart?.orderActiveTabKey ? URL_API_ORDER_ITEM.get(handleCart.orderActiveTabKey) : null,
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
                let quantityChange = newValue - (oldValue || 0);

                // Cập nhật số lượng sản phẩm trong kho
                let action: StockAction;
                if (quantityChange > 0) {
                    action = 'minus'; // Giảm số lượng kho khi tăng số lượng trong giỏ
                } else {
                    quantityChange = -quantityChange;
                    console.log(quantityChange)
                    action = 'plus'; // Tăng số lượng kho khi giảm số lượng trong giỏ
                }

                console.log({id: orderItemId, productVariantId, quantity: newValue});
                console.log(productId);

                handleUpdateQuantityInStockProductVariant({id: productVariantId, quantity: quantityChange}, action)
                    .then(async () => {
                        // cập nhật số lượng mới cho sản phẩm trong giỏ
                        setOrderItemUpdateQuantity({id: orderItemId, productVariantId, quantity: newValue});

                        // Cập nhật số lượng ban đầu mới
                        setInitialQuantities(prev => new Map(prev.set(orderItemId, newValue)));

                        // cập tổng số lượng sản phẩm
                        // await mutate(key =>
                        //         typeof key === 'string' && key.startsWith(`${URL_API_PRODUCT.filter}`),
                        //     undefined,
                        //     {revalidate: true}
                        // );

                        // Cập nhật lại số lượng biến thể sản phẩm trong hiển thị cho danh sách biến thể sản phẩm
                        await mutate(key =>
                                typeof key === 'string' && key.startsWith(`${URL_API_PRODUCT_VARIANT.filter(productId.toString())}`),
                            undefined,
                            {revalidate: true}
                        );
                    })
            }
        }
    };

    const handlePressEnter = (orderItemId: number) => {
        // nhấn enter sẽ blur ra ngoài input kích hoạt sự kiện blur và update số lượng
        const input = inputRefs.current.get(orderItemId);
        input?.blur();
    };

    const handleDeleteOrderItemCart = async (id: number, productId: number) => {
        handleCart?.setDataCart((prevCart) => prevCart.filter((item) => item.id !== id));

        await handleDeleteOrderItem(id);

        await mutate(key =>
                typeof key === 'string' && key.startsWith(`${URL_API_PRODUCT_VARIANT.filter(productId.toString())}`),
            undefined,
            {revalidate: true}
        );
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
                        className="custom-input"
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
            title: 'Hành động', key: 'action', align: "center", width: 70,
            render:
                (_, record) => (
                    <DeleteOutlined
                        style={{cursor: "pointer", padding: "5px", borderRadius: "5px"}}
                        onClick={() => handleDeleteOrderItemCart(record.id, record.productId)}
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