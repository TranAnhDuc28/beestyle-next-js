import React from 'react';
import {Button} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Header} from "antd/es/layout/layout";

interface HeaderBarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const AppHeader: React.FC<HeaderBarProps> = ({collapsed, onToggle}) => {
    return (
        <Header
            style={{border: '1px solid #E6EBF1', borderLeft: 'none', zIndex: 1}}
            className="sticky top-0 w-full p-0 flex items-center bg-white"
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={onToggle}
                style={{fontSize: '16px', width: 64, height: 64,}}
            />
        </Header>
    );
};

export default AppHeader;
