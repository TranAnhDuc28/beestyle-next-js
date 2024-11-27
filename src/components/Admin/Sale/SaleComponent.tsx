"use client"
import React, {createContext, CSSProperties, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Layout, Spin, Tabs, TabsProps, theme} from "antd";
import ContentTabPanelSale from "@/components/Admin/Sale/ContentTabPanelSale";
import TabBarExtraContentLeft from "@/components/Admin/Sale/TabBarExtraContent/TabBarExtraContentLeft";
import TabBarExtraContentRight from "@/components/Admin/Sale/TabBarExtraContent/TabBarExtraContentRight";
import {IProductVariant} from "@/types/IProductVariant";
import useSWR, {KeyedMutator} from "swr";
import {getOrders, URL_API_ORDER} from "@/services/OrderService";
import {IOrder, IOrderCreate} from "@/types/IOrder";
import useAppNotifications from "@/hooks/useAppNotifications";
import {ICreateOrUpdateOrderItem, IOrderItem} from "@/types/IOrderItem";
import useOrder from "@/components/Admin/Order/hooks/useOrder";
import useOrderItem from "@/components/Admin/Order/hooks/useOrderItem";
import SubLoader from "@/components/Loader/SubLoader";

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

const defaultOrderPending: IOrderCreate = {
    shippingFee: 0,
    totalAmount: 0,
    orderChannel: "OFFLINE",
    orderStatus: "PENDING",
};

interface HandleCartContextType {
    orderActiveTabKey: string;
    dataCart: IOrderItem[];
    setDataCart: React.Dispatch<React.SetStateAction<IOrderItem[]>>;
    handleAddOrderItemCart: (productVariantSelected: IProductVariant[]) => void;
    mutateOrderPending: KeyedMutator<any>;
}

export const HandleCart = createContext<HandleCartContextType | null>(null);

const SaleComponent: React.FC = () => {
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();
    const {showNotification, showMessage} = useAppNotifications();
    const {data, error, isLoading, mutate: mutateOrderPending} =
        useSWR(`${URL_API_ORDER.get}/sale/order-pending`,
            getOrders,
            {
                revalidateIfStale: false,
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            }
        );

    const {loading, handleCreateOrder, handleUpdateOrder} = useOrder();
    const {handleCreateOrderItems} = useOrderItem();
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
                }
            });

            if (newTabsItems?.length !== itemTabs?.length) {
                setItemTabs(newTabsItems);
                if (newTabsItems.length > 0 && orderActiveTabKey !== newTabsItems[0].key) {
                    setOrderActiveTabKey(newTabsItems[0].key);
                }
                return;
            }

            const keysChanged = newTabsItems.some((newItem: { key: string | undefined; }, index: number) => {
                return newItem?.key !== itemTabs?.[index]?.key;
            });

            if (keysChanged) setItemTabs(newTabsItems);

            if (newTabsItems.length > 0 && newTabsItems[0].key !== orderActiveTabKey) {
                setOrderActiveTabKey(newTabsItems[0].key);
            }
        }
    }, [data]);

    const handleAddOrderItemCart = (productVariantSelected: IProductVariant[]) => {
        let newOrderItemsCreateOrUpdate: ICreateOrUpdateOrderItem[] = [];

        const cartMap = new Map<number, IOrderItem>(
            dataCart.map(item => [item.productVariantId, item])
        );

        for (const selectedProduct of productVariantSelected) {
            const stockQuantity = selectedProduct.quantityInStock || 0;

            if (cartMap.has(selectedProduct.id)) {
                const existingOrderItem = cartMap.get(selectedProduct.id)!;
                const newQuantity = Math.min(existingOrderItem.quantity + 1, stockQuantity);

                // Cập nhật số lượng trong Map
                cartMap.set(selectedProduct.id, {
                    ...existingOrderItem,
                    quantity: newQuantity
                })

                newOrderItemsCreateOrUpdate.push({
                    id: existingOrderItem.id,
                    productVariantId: selectedProduct.id,
                    quantity: 1,
                    salePrice: selectedProduct.salePrice,
                });
            } else {
                // Thêm sản phẩm mới vào giỏ hàng
                newOrderItemsCreateOrUpdate.push({
                    productVariantId: selectedProduct.id,
                    quantity: 1,
                    salePrice: selectedProduct.salePrice,
                });
            }
        }

        if (newOrderItemsCreateOrUpdate.length > 0) {
            handleCreateOrderItems(Number(orderActiveTabKey), newOrderItemsCreateOrUpdate)
                .then(response => {
                    if (response) {
                        productVariantSelected.forEach((selectedProduct) => {
                            const orderItemId = response[selectedProduct.id];

                            if (orderItemId && !cartMap.has(orderItemId)) {
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
                })
                .catch((error) => showMessage("error", error.message));
        }
        setDataCart([...Array.from(cartMap.values())]);
    }

    const onChange = (newActiveKey: string) => {
        console.log(newActiveKey);
        setOrderActiveTabKey(newActiveKey);
    };

    const add = async () => {
        await handleCreateOrder(defaultOrderPending)
            .then((result) => {
                const newActiveKey = `${result.id}`;
                const newPanes = [...itemTabs ?? []];
                newPanes.push({label: result.orderTrackingNumber, children: <ContentTabPanelSale/>, key: newActiveKey});
                setItemTabs(newPanes);
                setOrderActiveTabKey(newActiveKey);
            })
            .catch(() => {
                showMessage("error", "Tạo hóa đơn thất bại.");
            });
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
    };

    const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <Layout className="h-screen" style={{background: colorBgContainer}}>
            <HandleCart.Provider
                value={{
                    orderActiveTabKey,
                    dataCart,
                    setDataCart,
                    handleAddOrderItemCart,
                    mutateOrderPending
                }}>
                <Content style={{background: colorBgContainer}}>
                    <Spin size="default" spinning={loading}>
                        <Tabs
                            className="h-full"
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
            </HandleCart.Provider>
        </Layout>
    );
}
export default SaleComponent;