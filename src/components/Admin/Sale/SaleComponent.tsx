"use client"
import React, {createContext, CSSProperties, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Layout, Tabs, TabsProps, theme} from "antd";
import ContentTabPanelSale from "@/components/Admin/Sale/ContentTabPanelSale";
import TabBarExtraContentLeft from "@/components/Admin/Sale/TabBarExtraContent/TabBarExtraContentLeft";
import TabBarExtraContentRight from "@/components/Admin/Sale/TabBarExtraContent/TabBarExtraContentRight";
import {IProductVariant} from "@/types/IProductVariant";
import useSWR from "swr";
import {getOrders, URL_API_ORDER} from "@/services/OrderService";
import {IOrder, IOrderCreate} from "@/types/IOrder";
import useAppNotifications from "@/hooks/useAppNotifications";
import {IOrderItem} from "@/types/IOrderItem";
import useOrder from "@/components/Admin/Order/hooks/useOrder";
import {ORDER_STATUS} from "@/constants/OrderStatus";

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

interface HandleCartContextType {
    orderActiveTabKey: any;
    dataCart: IOrderItem[];
    setDataCart: React.Dispatch<React.SetStateAction<IOrderItem[]>>;
    handleDeleteProductInCart: (id: number) => void;
    handleAddProductInCart: (productVariantSelected: IProductVariant[]) => void;
}

export const HandleCart = createContext<HandleCartContextType | null>(null);

const SaleComponent: React.FC = () => {
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();
    const {showNotification} = useAppNotifications();
    const {data, error, isLoading, mutate} =
        useSWR(`${URL_API_ORDER.get}/sale/order-pending`,
            getOrders,
            {
                revalidateIfStale: false,
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            }
        );

    const {handleCreateOrder, handleUpdateOrder} = useOrder();
    const [dataCart, setDataCart] = useState<IOrderItem[]>([])
    const [orderActiveTabKey, setOrderActiveTabKey] = useState<string | undefined>(undefined);
    const [items, setItems] = useState<TabsProps['items']>([]);
    const newTabIndex = useRef(0);

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
            const newItems = result?.map((item: IOrder) => ({
                label: item.orderTrackingNumber,
                children: <ContentTabPanelSale/>,
                key: item.id.toString(),
            }));
            setItems(newItems);
            if (newItems.length > 0) {
                setOrderActiveTabKey(newItems[0].key);
            }
        }
    }, [data, isLoading]);

    const handleDeleteProductInCart = useCallback((id: number) => {
        setDataCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }, []);

    const handleAddProductInCart = useCallback((productVariantSelected: IProductVariant[]) => {
        setDataCart((prevValue) => {
            const updatedCart = [...prevValue];
            productVariantSelected.forEach((selectedProduct) => {
                const existingProductVariantId = updatedCart.findIndex(
                    (oderItem) => oderItem.productVariantId === selectedProduct.id
                );

                const stockQuantity = selectedProduct.quantityInStock || 0;

                if (existingProductVariantId >= 0) {
                    const currentQuantity = updatedCart[existingProductVariantId].quantity || 0;
                    const newQuantity = currentQuantity + 1;

                    // Đảm bảo số lượng không vượt quá số lượng trong kho
                    updatedCart[existingProductVariantId].quantity = Math.min(newQuantity, stockQuantity);
                } else {
                    updatedCart.push({
                        id: 1,
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
                        discountPrice: undefined,
                        note: undefined,
                    });
                }
            });
            return updatedCart;
        });
    }, [dataCart]);

    const onChange = (newActiveKey: string) => {
        console.log(newActiveKey);
        setOrderActiveTabKey(newActiveKey);
    };

    const add = () => {
        const defaultOrderPending: IOrderCreate = {
            orderTrackingNumber: `HD${Date.now()}`,
            shippingFee: 0,
            totalAmount: 0,
            orderChannel: "OFFLINE",
            orderStatus: "PENDING",
        }
        handleCreateOrder(defaultOrderPending);
        // const newActiveKey = `${newTabIndex.current++}`;
        // const newPanes = [...items ?? []];
        // newPanes.push({label: , children: <ContentTabPanelSale/>, key: newActiveKey});
        // setItems(newPanes);
        // setOrderActiveTabKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = orderActiveTabKey;
        let lastIndex = -1;
        items?.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items?.filter((item) => item.key !== targetKey);
        if (newPanes?.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
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
            <HandleCart.Provider value={{orderActiveTabKey, dataCart, setDataCart, handleDeleteProductInCart, handleAddProductInCart}}>
                <Content style={{background: colorBgContainer}}>
                    <Tabs
                        className="h-full"
                        type="editable-card"
                        onChange={onChange}
                        activeKey={orderActiveTabKey}
                        onEdit={onEdit}
                        tabBarExtraContent={OperationsSlot}
                        tabBarStyle={tabBarStyle}
                        items={items}
                    />
                </Content>
            </HandleCart.Provider>

        </Layout>
    );
};
export default SaleComponent;