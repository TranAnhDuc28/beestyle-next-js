import React, {memo, useContext, useMemo, useRef, useState} from "react";
import {Card, Col, Flex, InputNumber, Row, Table, TableProps, Tag, Typography} from "antd";
import {IOrderItem} from "@/types/IOrderItem";
import {FORMAT_NUMBER_WITH_COMMAS, PARSER_NUMBER_WITH_COMMAS_TO_NUMBER} from "@/constants/AppConstants";
import {DeleteOutlined} from "@ant-design/icons";
import {HandleSale} from "@/components/Admin/Sale/SaleComponent";
import useOrderItem from "@/components/Admin/Order/hooks/useOrderItem";
import useProductVariant from "@/components/Admin/Product/Variant/hooks/useProductVariant";
import {STOCK_ACTION} from "@/constants/StockAction";
import useSWR, {mutate} from "swr";
import {URL_API_PRODUCT_VARIANT} from "@/services/ProductVariantService";
import useAppNotifications from "@/hooks/useAppNotifications";
import {useParams} from "next/navigation";

const {Text} = Typography;

interface IProps {

}

const OrderedProductDetails: React.FC<IProps> = (props) => {
    const {showMessage} = useAppNotifications();
    const {id} = useParams();
    const handleSale = useContext(HandleSale);
    const inputRefs = useRef<Map<number, HTMLInputElement>>(new Map());
    const {handleGetOrderItemsByOrderId, handleUpdateQuantityOrderItem, handleDeleteOrderItem} = useOrderItem();
    const {handleUpdateQuantityInStockProductVariant} = useProductVariant();
    const [initialQuantities, setInitialQuantities] = useState<Map<number, number>>(new Map());

    const {orderItems, error, isLoading, mutateOrderItems} =
        handleGetOrderItemsByOrderId(id && Number(id) ? `${id}` : undefined);

    const onChangeQuantity = (orderItemId: number, productVariantId: number, value: number | null) => {
        const newValue = Number(value);
        if (newValue && !isNaN(newValue) && newValue > 0) {
            handleSale?.setDataCart(prevItems =>
                prevItems.map(item =>
                    item.id === orderItemId ? {...item, quantity: newValue} : item
                )
            );
        }
    };

    const onBlurQuantity = async (e: React.FocusEvent<HTMLInputElement>, orderItemId: number, productVariantId: number, productId: number) => {
        let newValue = Number(e.target.value);

        if (isNaN(newValue)) {
            if (newValue <= 0) {
                newValue = 1;
            } else if (newValue > 100) {
                newValue = 100;
            }
        }
        // console.log("new quantity value: ", newValue)

        const oldValue = initialQuantities.get(orderItemId) || 1;
        // console.log('old quantity value', oldValue)

        if (newValue !== oldValue) {
            // Tính toán số lượng thay đổi
            let quantityChange = newValue - oldValue;
            // console.log('quantity change', quantityChange)

            // Cập nhật số lượng sản phẩm trong kho
            let action: string;
            if (quantityChange > 0) {
                // console.log("quantity stock minus", quantityChange)
                action = STOCK_ACTION.MINUS_STOCK; // Giảm số lượng kho khi tăng số lượng trong giỏ
            } else {
                quantityChange = -quantityChange;
                // console.log("quantity stock plus", quantityChange)
                action = STOCK_ACTION.PLUS_STOCK; // Tăng số lượng kho khi giảm số lượng trong giỏ
            }

            try {
                await handleUpdateQuantityInStockProductVariant({
                    id: productVariantId,
                    quantity: quantityChange
                }, action);

                try {
                    // cập nhật số lượng mới cho sản phẩm trong giỏ
                    await handleUpdateQuantityOrderItem({id: orderItemId, productVariantId, quantity: newValue})

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

                    await mutateOrderItems();
                } catch (e) {
                    showMessage("error", "Cập nhật số lượng thất bại.");

                    // Khôi phục lại giỏ hàng với số lượng cũ
                    handleSale?.setDataCart(prevItems =>
                        prevItems.map(item =>
                            item.id === orderItemId ? {...item, quantity: oldValue} : item
                        )
                    );

                    // Rollback số lượng kho bằng cách làm ngược lại hành động trước đó
                    const rollbackAction = action === STOCK_ACTION.MINUS_STOCK ? STOCK_ACTION.PLUS_STOCK : STOCK_ACTION.MINUS_STOCK;
                    await handleUpdateQuantityInStockProductVariant({
                        id: productVariantId,
                        quantity: quantityChange
                    }, rollbackAction);
                }
            } catch (e) {
                showMessage("error", "Cập nhật số lượng thất bại.");

                // Khôi phục lại giỏ hàng với số lượng cũ
                handleSale?.setDataCart(prevItems =>
                    prevItems.map(item =>
                        item.id === orderItemId ? {...item, quantity: oldValue} : item
                    )
                );
            }
        }
    };

    const handlePressEnter = (orderItemId: number) => {
        // nhấn enter sẽ blur ra ngoài input kích hoạt sự kiện blur và update số lượng
        const input = inputRefs.current.get(orderItemId);
        input?.blur();
    };

    const handleDeleteOrderItemCart = async (id: number, productId: number) => {
        handleSale?.setDataCart((prevCart) => prevCart.filter((item) => item.id !== id));

        await handleDeleteOrderItem(id);

        await mutate(key =>
                typeof key === 'string' && key.startsWith(`${URL_API_PRODUCT_VARIANT.filter(productId.toString())}`),
            undefined,
            {revalidate: true}
        );

        await mutateOrderItems();
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
                        value={record.quantity}
                        formatter={(value) => `${value}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                        parser={(value) => value?.replace(PARSER_NUMBER_WITH_COMMAS_TO_NUMBER, '') as unknown as number}
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
    ], []);

    return (
        <Row gutter={[24, 0]} wrap>
            <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                <Table<IOrderItem>
                    rowKey="id"
                    size="small"
                    bordered={true}
                    loading={isLoading}
                    columns={columns}
                    dataSource={orderItems}
                    pagination={false}
                    scroll={{y: 'calc(100vh - 350px)', scrollToFirstRowOnChange: true}}
                />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
                <Card title="Thông tin thanh toán" style={{width: "100%", marginTop: 5}}>
                    <Flex justify="end">
                        <Flex align="center" style={{width: "100%"}} wrap gap={10}>
                            <Flex justify="space-between" align="center"
                                  style={{width: "100%", paddingBottom: 4}} wrap>
                                <Text style={{fontSize: 16}}>
                                    <span style={{marginInlineEnd: 30}}>Tổng số lượng</span>
                                </Text>

                                <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                    {`${10}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                </Text>
                            </Flex>

                            <Flex justify="space-between" align="center"
                                  style={{width: "100%", paddingBottom: 4}} wrap>
                                <Text style={{fontSize: 16}}>
                                    <span style={{marginInlineEnd: 30}}>Tổng tiền hàng</span>
                                </Text>

                                <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                    {`${500000}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                </Text>
                            </Flex>

                            <Flex justify="space-between" align="center"
                                  style={{width: "100%", paddingBottom: 4}} wrap>
                                <Text style={{fontSize: 16}}>
                                    <span style={{marginInlineEnd: 30}}>Giảm giá</span>
                                </Text>

                                <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                    {`${50000}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                </Text>
                            </Flex>

                            <Flex justify="space-between" align="center"
                                  style={{width: "100%", paddingBottom: 4}} wrap>
                                <Text style={{fontSize: 16}}>
                                    <span style={{marginInlineEnd: 30}}>Phí vận chuyển</span>
                                </Text>

                                <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                    {`${30000}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                </Text>
                            </Flex>

                            <Flex justify="space-between" align="center"
                                  style={{width: "100%", paddingBottom: 4}} wrap>
                                <Text style={{fontSize: 16}}>
                                    <span style={{marginInlineEnd: 30}}>Tổng thanh toán</span>
                                </Text>

                                <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                    {`${480000}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                </Text>
                            </Flex>

                            <Flex justify="space-between" align="center"
                                  style={{width: "100%", paddingBottom: 4}} wrap>
                                <Text style={{fontSize: 16}}>
                                    <span style={{marginInlineEnd: 30}}>Khách cần trả</span>
                                </Text>

                                <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                    {`${480000}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Card>
            </Col>
        </Row>
    );
}
export default memo(OrderedProductDetails);