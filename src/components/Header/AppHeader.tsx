import React from 'react';
import {Button} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Header} from "antd/es/layout/layout";

const headerStyle: React.CSSProperties = {
    position: 'sticky',
    border: '1px solid #E6EBF1', 
    borderLeft: 'none', 
    zIndex: 1, 
    background: 'white',
    padding: 0
}


interface HeaderBarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const AppHeader: React.FC<HeaderBarProps> = ({collapsed, onToggle}) => {
    return (
        <Header style={headerStyle} >
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
