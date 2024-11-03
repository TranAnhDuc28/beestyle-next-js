"use client"
import React, {CSSProperties, useRef, useState} from "react";
import {Layout, Tabs, TabsProps, theme} from "antd";
import ContentTabPanelSale from "@/components/Admin/Sale/ContentTabPanelSale";
import TabBarExtraContentLeft from "@/components/Admin/Sale/TabBarExtraContent/TabBarExtraContentLeft";
import TabBarExtraContentRight from "@/components/Admin/Sale/TabBarExtraContent/TabBarExtraContentRight";

const bills: TabsProps['items'] = [
    {label: 'Tab 1', children: <ContentTabPanelSale/>, key: '1'},
    {label: 'Tab 2', children: <ContentTabPanelSale/>, key: '2',},
];

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

const SaleComponent: React.FC = () => {
    const {token: {colorBgContainer, borderRadiusLG},} = theme.useToken();
    const [activeKey, setActiveKey] = useState(bills[0].key);
    const [items, setItems] = useState(bills);
    const newTabIndex = useRef(0);

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({label: 'New Tab', children: <ContentTabPanelSale/>, key: newActiveKey});
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
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
            <Content style={{background: colorBgContainer}}>
                <Tabs
                    className="h-full"
                    type="editable-card"
                    onChange={onChange}
                    activeKey={activeKey}
                    onEdit={onEdit}
                    items={items}
                    tabBarExtraContent={OperationsSlot}
                    tabBarStyle={tabBarStyle}
                />
            </Content>
        </Layout>
    );
};
export default SaleComponent;