import React, { useState } from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Header } from "antd/es/layout/layout";

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

const AdminHeader: React.FC<IProps> = ({ collapsed, onToggle }) => {
    const handleLogout = () => {
        localStorage.removeItem('authenticationAdmin');
        window.location.href = '/admin-account';
    };

    const menu = (
        <Menu>
            <Menu.Item key="logout" onClick={handleLogout}>
                <LogoutOutlined className='me-2' /> Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={headerStyle} >
            <Button
                type="text" onClick={onToggle}
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                style={{ fontSize: '16px', width: 64, height: 64, }}
            />
            <div className="absolute right-5">
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                >
                    <Avatar
                        size="default"
                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                        style={{
                            backgroundColor: '#f5f5f5',
                            cursor: 'pointer',
                        }}
                    />
                </Dropdown>
            </div>
        </Header>
    );
};

export default AdminHeader;
