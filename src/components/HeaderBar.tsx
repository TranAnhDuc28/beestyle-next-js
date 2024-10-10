import React from 'react';
import {Button} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Header} from "antd/es/layout/layout";

const headerStyle: React.CSSProperties = {
    padding: 0,
    background: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
}

interface HeaderBarProps {
    collapsed: boolean;
    onToggle: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({collapsed, onToggle}) => {
    return (
        <Header style={headerStyle}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={onToggle}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    borderRadius: '0px'
                }}
            />
        </Header>
    );
};

export default HeaderBar;
