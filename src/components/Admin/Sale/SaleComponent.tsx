"use client"
import React, {createContext, CSSProperties, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Badge, Layout, Spin, Tabs, TabsProps, theme} from "antd";
import ContentTabPanelSale from "@/components/Admin/Sale/ContentTabPanelSale";
import TabBarExtraContentLeft from "@/components/Admin/Sale/TabBarExtraContent/TabBarExtraContentLeft";
import TabBarExtraContentRight from "@/components/Admin/Sale/TabBarExtraContent/TabBarExtraContentRight";
import {IProductVariant} from "@/types/IProductVariant";
import useSWR, {KeyedMutator, mutate} from "swr";
import {getOrders, URL_API_ORDER} from "@/services/OrderService";
import {IOrder, IOrderCreateOrUpdate} from "@/types/IOrder";
import useAppNotifications from "@/hooks/useAppNotifications";
import {ICreateOrUpdateOrderItem, IOrderItem} from "@/types/IOrderItem";
import useOrder from "@/components/Admin/Order/hooks/useOrder";
import useOrderItem from "@/components/Admin/Order/hooks/useOrderItem";
import {URL_API_PRODUCT_VARIANT} from "@/services/ProductVariantService";
import {URL_API_ORDER_ITEM} from "@/services/OrderItemService";


type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
type PositionType = 'left' | 'right';
const {Content} = Layout;

const tabBarStyle: CSSProperties = {
    height: 45,
};

const OperationsSlot: Record<PositionType, React.ReactNode> = {
    left: <TabBarExtraContentLeft/>,
    right: <TabBarExtraContentRight/>,
};

const defaultOrderCreateOrUpdate: IOrderCreateOrUpdate = {
    shippingFee: 0,
    totalAmount: 0,
    paymentMethod: "CASH_ON_DELIVERY",
    pickupMethod: "IN_STORE",
    orderChannel: "OFFLINE",
    orderStatus: "PENDING",
};

const calcuTotalAmountCart = (dataCart: IOrderItem[]): number => {
    return dataCart.reduce((total, item) => total + (item.salePrice ?? 0) * item.quantity, 0);
};

const calcuTotalQuantityCart = (dataCart: IOrderItem[]): number => {
    return dataCart.reduce((total, item) => total + item.quantity, 0);
};

interface HandleCartContextType {
    calcuTotalAmountCart: (dataCart: IOrderItem[]) => number;
    calcuTotalQuantityCart: (dataCart: IOrderItem[]) => number;
    totalQuantityCart: number;
    setTotalQuantityCart: React.Dispatch<React.SetStateAction<number>>;
    orderCreateOrUpdate: IOrderCreateOrUpdate;
    setOrderCreateOrUpdate: React.Dispatch<React.SetStateAction<IOrderCreateOrUpdate>>;
    orderActiveTabKey: string;
    dataCart: IOrderItem[];
    setDataCart: React.Dispatch<React.SetStateAction<IOrderItem[]>>;
    handleAddOrderItemCart: (productVariantSelected: IProductVariant[]) => void;
    mutateOrderPending: KeyedMutator<any>;
}

export const HandleSale = createContext<HandleCartContextType | null>(null);

const SaleComponent: React.FC = () => {
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();
    const {showNotification, showMessage} = useAppNotifications();
    const {data, error, isLoading, mutate: mutateOrderPending} =
        useSWR(`${URL_API_ORDER.getOrderPending}`,
            getOrders,
            {
                revalidateIfStale: false,
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            }
        );

    const {loading, handleCreateOrder, handleUpdateOrder} = useOrder();
    const {handleCreateOrderItems} = useOrderItem();
    const [orderCreateOrUpdate, setOrderCreateOrUpdate] = useState<IOrderCreateOrUpdate>(defaultOrderCreateOrUpdate);
    const [totalQuantityCart, setTotalQuantityCart] = useState<number>(0);
    const [dataCart, setDataCart] = useState<IOrderItem[]>([])
    const [orderActiveTabKey, setOrderActiveTabKey] = useState<string>('');
    const [itemTabs, setItemTabs] = useState<TabsProps['items']>([]);

    useEffect(() => {
        if (error) {
            showNotification("error", {
                message: error?.message,
                description: error?.response?.data?.message || "Error fetching orders pending",
            });
        }
    }, [error]);

    useEffect(() => {
        const result = data?.data;
        if (!isLoading && result) {
            const newTabsItems = result?.map((item: IOrder) => {
                return {
                    label: item.orderTrackingNumber,
                    children: <ContentTabPanelSale/>,
                    key: item.id.toString(),
                    closable: false,
                }
            });

            if (newTabsItems?.length !== itemTabs?.length) {
                setItemTabs(newTabsItems);
                if (newTabsItems.length > 0 && orderActiveTabKey !== newTabsItems[0].key) {
                    setOrderActiveTabKey(newTabsItems[0].key);
                    setTotalQuantityCart(calcuTotalQuantityCart(dataCart));
                    setOrderCreateOrUpdate((prevValue) => {
                        return {
                            ...prevValue,
                            id: Number(newTabsItems[0].key),
                            orderTrackingNumber: newTabsItems[0].label,
                            totalAmount: calcuTotalAmountCart(dataCart)
                        }
                    });
                }
                return;
            }

            const keysChanged = newTabsItems.some((newItem: { key: string | undefined; }, index: number) => {
                return newItem?.key !== itemTabs?.[index]?.key;
            });

            if (keysChanged) setItemTabs(newTabsItems);

            if (newTabsItems.length > 0 && newTabsItems[0].key !== orderActiveTabKey) {
                setOrderActiveTabKey(newTabsItems[0].key);
                setTotalQuantityCart(calcuTotalQuantityCart(dataCart));
                setOrderCreateOrUpdate((prevValue) => {
                    return {
                        ...prevValue,
                        id: Number(newTabsItems[0].key),
                        orderTrackingNumber: newTabsItems[0].label,
                        totalAmount: calcuTotalAmountCart(dataCart)
                    }
                });
            }
        }
    }, [data?.data]);

    const handleAddOrderItemCart = async (productVariantSelected: IProductVariant[]) => {
        let newOrderItemsCreateOrUpdate: ICreateOrUpdateOrderItem[] = [];

        const cartMap = new Map<number, IOrderItem>(
            dataCart.map(item => [item.productVariantId, item])
        );
        // console.log("current cart", cartMap)


        // Lưu trữ bản sao của cartMap để rollback khi cần
        const cartMapBackup = new Map(cartMap);

        for (const selectedProduct of productVariantSelected) {
            const quantityInStock = selectedProduct.quantityInStock || 0;
            // console.log('quantity in stock: ', stockQuantity);

            if (cartMap.has(selectedProduct.id)) {
                // console.log("product variant id" , selectedProduct.id)
                const existingOrderItem = cartMap.get(selectedProduct.id)!;
                // console.log("current cart quantity" + selectedProduct.sku , existingOrderItem.quantity)
                if (quantityInStock > 0) {
                    let newQuantity: number = existingOrderItem.quantity + 1;

                    // console.log(`new cart quantity ${selectedProduct.sku}: ${newQuantity}`);

                    // Cập nhật số lượng trong Map
                    cartMap.set(selectedProduct.id, {
                        ...existingOrderItem,
                        quantity: newQuantity
                    })
                    // console.log("product after update", cartMap.get(selectedProduct.id));

                    newOrderItemsCreateOrUpdate.push({
                        id: existingOrderItem.id,
                        productVariantId: selectedProduct.id,
                        quantity: 1,
                        salePrice: selectedProduct.salePrice,
                    });
                } else {
                    showMessage("warning", `Sản phẩm mã ${selectedProduct.sku} - ${selectedProduct.productName} đã hết hàng`);
                    return;
                }
            } else {
                // Thêm sản phẩm mới vào giỏ hàng nếu tồn kho lớn hơn 0
                if (quantityInStock > 0) {
                    let quantityToAdd: number = 1;  // Thêm mặc định 1 sản phẩm

                    newOrderItemsCreateOrUpdate.push({
                        productVariantId: selectedProduct.id,
                        quantity: quantityToAdd,
                        salePrice: selectedProduct.salePrice,
                    });
                } else {
                    // Nếu tồn kho = 0, cảnh báo người dùng
                    showMessage("warning", `Sản phẩm ${selectedProduct.sku} - ${selectedProduct.productName} đã hết hàng`);
                    return;
                }
            }
        }

        try {
            if (newOrderItemsCreateOrUpdate.length > 0) {
                let response = await handleCreateOrderItems(Number(orderActiveTabKey), newOrderItemsCreateOrUpdate)
                if (response) {
                    productVariantSelected.forEach((selectedProduct) => {
                        const orderItemId = response[selectedProduct.id];
                        // console.log(orderItemId)
                        // console.log(orderItemId && !cartMap.has(selectedProduct.id))
                        if (orderItemId && !cartMap.has(selectedProduct.id)) {
                            cartMap.set(selectedProduct.id, {
                                id: orderItemId,
                                orderId: Number(orderActiveTabKey),
                                productVariantId: selectedProduct.id,
                                sku: selectedProduct.sku,
                                productId: selectedProduct.productId,
                                productName: selectedProduct.productName,
                                colorId: selectedProduct.colorId,
                                colorCode: selectedProduct.colorCode,
                                colorName: selectedProduct.colorName,
                                sizeId: selectedProduct.sizeId,
                                sizeName: selectedProduct.sizeName,
                                quantity: 1,
                                salePrice: selectedProduct.salePrice,
                            });
                        }
                    });
                }
            }

            if (productVariantSelected.length > 0) {
                const productId = productVariantSelected[0].productId;
                await mutate((key: any) => typeof key === 'string' && productId &&
                        key.startsWith(`${URL_API_PRODUCT_VARIANT.filter(productId?.toString())}`),
                    undefined,
                    {revalidate: true}
                );
            }

            // console.log("new cart", Array.from(cartMap.values()))
            setDataCart([...Array.from(cartMap.values())]);

            await mutate((key: any) => typeof key === 'string' && key.startsWith(`${URL_API_ORDER_ITEM.get(orderActiveTabKey)}`),
                undefined,
                {revalidate: true}
            );
        } catch (error: any) {
            // Rollback giỏ hàng về trạng thái trước khi thay đổi
            setDataCart([...Array.from(cartMapBackup.values())]);
            showMessage("error", error.message || "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!");
        }
    }

    const onChange = (newActiveKey: string) => {
        setOrderActiveTabKey(newActiveKey);
        setTotalQuantityCart(calcuTotalQuantityCart(dataCart));
        setOrderCreateOrUpdate((prevValue) => {
            const currentTab = itemTabs?.find((item) => item.key === newActiveKey);

            const orderTrackingNumber = currentTab ? currentTab.label?.toString() : undefined;

            return {
                ...prevValue,
                id: Number(newActiveKey),
                orderTrackingNumber: orderTrackingNumber,
                totalAmount: calcuTotalAmountCart(dataCart)
            }
        });
    };

    const add = async () => {
        await handleCreateOrder(defaultOrderCreateOrUpdate)
            .then((result) => {
                const newActiveKey = `${result.id}`;
                const newPanes = [...itemTabs ?? []];
                newPanes.push({label: result.orderTrackingNumber, children: <ContentTabPanelSale/>, key: newActiveKey});
                setItemTabs(newPanes);
                setOrderActiveTabKey(newActiveKey);
                setOrderCreateOrUpdate((prevValue) => {
                   return {
                       ...prevValue,
                       id: result.id,
                       orderTrackingNumber: result.orderTrackingNumber
                   }
                });
            })
            .catch(() => {
                showMessage("error", "Tạo hóa đơn thất bại.");
            });
        await mutateOrderPending();
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = orderActiveTabKey;
        let lastIndex = -1;
        itemTabs?.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = itemTabs?.filter((item) => item.key !== targetKey);
        if (newPanes?.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItemTabs(newPanes);
        setOrderActiveTabKey(newActiveKey);
        setOrderCreateOrUpdate((prevValue) => ({...prevValue, id: Number(newActiveKey)}));
    };

    const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <Layout style={{background: colorBgContainer}}>
            <HandleSale.Provider
                value={{
                    calcuTotalQuantityCart,
                    calcuTotalAmountCart,
                    totalQuantityCart,
                    setTotalQuantityCart,
                    orderCreateOrUpdate,
                    setOrderCreateOrUpdate,
                    orderActiveTabKey,
                    dataCart,
                    setDataCart,
                    handleAddOrderItemCart,
                    mutateOrderPending
                }}>
                <Content style={{background: colorBgContainer}}>
                    <Spin size="default" spinning={loading}>
                        <Tabs
                            type="editable-card"
                            onChange={onChange}
                            activeKey={orderActiveTabKey}
                            onEdit={onEdit}
                            tabBarExtraContent={OperationsSlot}
                            tabBarStyle={tabBarStyle}
                            items={itemTabs}
                        />
                    </Spin>
                </Content>
            </HandleSale.Provider>
        </Layout>
    );
}
export default SaleComponent;