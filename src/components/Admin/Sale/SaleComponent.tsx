"use client"
import React, {createContext, CSSProperties, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Layout, Tabs, TabsProps, theme} from "antd";
import ContentTabPanelSale from "@/components/Admin/Sale/ContentTabPanelSale";
import TabBarExtraContentLeft from "@/components/Admin/Sale/TabBarExtraContent/TabBarExtraContentLeft";
import TabBarExtraContentRight from "@/components/Admin/Sale/TabBarExtraContent/TabBarExtraContentRight";
import {IProductVariant, IProductVariantInCart} from "@/types/IProductVariant";
import useSWR from "swr";
import {getOrders, URL_API_ORDER} from "@/services/OrderService";
import {IOrder} from "@/types/IOrder";
import useAppNotifications from "@/hooks/useAppNotifications";

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
    dataCart: IProductVariantInCart[];
    setDataCart: React.Dispatch<React.SetStateAction<IProductVariantInCart[]>>;
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

    const [dataCart, setDataCart] = useState<IProductVariantInCart[]>([])
    const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
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
                setActiveKey(newItems[0].key);
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
                    (product) => product.id === selectedProduct.id
                );

                const stockQuantity = selectedProduct.quantityInStock || 0;

                if (existingProductVariantId >= 0) {
                    const currentQuantity = updatedCart[existingProductVariantId].quantity || 0;
                    const newQuantity = currentQuantity + 1;

                    // Đảm bảo số lượng không vượt quá số lượng trong kho
                    updatedCart[existingProductVariantId].quantity = Math.min(newQuantity, stockQuantity);
                } else {
                    updatedCart.push({...selectedProduct, quantity: 1});
                }
            });
            return updatedCart;
        });
    }, [dataCart]);

    const onChange = (newActiveKey: string) => {
        console.log(newActiveKey);
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items ?? []];
        newPanes.push({label: 'New Tab', children: <ContentTabPanelSale/>, key: newActiveKey});
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
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
        setActiveKey(newActiveKey);
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
            <HandleCart.Provider value={{dataCart, setDataCart, handleDeleteProductInCart, handleAddProductInCart}}>
                <Content style={{background: colorBgContainer}}>
                    <Tabs
                        className="h-full"
                        type="editable-card"
                        onChange={onChange}
                        activeKey={activeKey}
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