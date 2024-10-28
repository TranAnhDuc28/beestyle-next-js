import React from 'react';
import {Tabs, TabsProps} from 'antd';

interface TabOrderProps {
    items: TabsProps['items'];
    onChange: (key: string) => void;
}

const TabOrder: React.FC<TabOrderProps> = ({items, onChange}) =>
    <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
    />;

export default TabOrder;