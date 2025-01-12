import React from 'react';
import {Button} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Header} from "antd/es/layout/layout";

const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    display: 'flex',
    border: '1px solid #E6EBF1', 
    borderLeft: 'none',
    background: 'white',
    padding: 0
}

interface IProps {
    collapsed: boolean;
    onToggle: () => void;
}

const AdminHeader: React.FC<IProps> = ({collapsed, onToggle}) => {
    return (
        <Header style={headerStyle} >
            <Button
                type="text" onClick={onToggle}
                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                style={{fontSize: '16px', width: 64, height: 64,}}
            />
        </Header>
    );
};

export default AdminHeader;
