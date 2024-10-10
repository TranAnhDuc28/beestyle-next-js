import React from 'react';
import {Menu, MenuProps} from 'antd';
import {
    UserOutlined, VideoCameraOutlined, UploadOutlined, BarChartOutlined, CloudOutlined,
    AppstoreOutlined, TeamOutlined, ShopOutlined,
} from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
};

const items: MenuProps['items'] = [
    UserOutlined, VideoCameraOutlined, UploadOutlined, BarChartOutlined,
    CloudOutlined, AppstoreOutlined, TeamOutlined, ShopOutlined,
    UserOutlined, VideoCameraOutlined, UploadOutlined, BarChartOutlined,
    CloudOutlined, AppstoreOutlined, TeamOutlined, ShopOutlined,
    UserOutlined, VideoCameraOutlined, UploadOutlined, BarChartOutlined,
    CloudOutlined, AppstoreOutlined, TeamOutlined, ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

// type MenuItem = Required<MenuProps>['items'][number];
//
// const items: MenuItem[] = [
//     {key: 'sub1', label: 'Navigation One', icon: <UserOutlined />,
//         children: [
//             { key: '1', label: 'Option 1' },
//             { key: '2', label: 'Option 2' },
//             { key: '3', label: 'Option 3' },
//             { key: '4', label: 'Option 4' },
//         ],
//     },
//     {
//         key: 'sub2', label: 'Navigation Two', icon: <AppstoreOutlined />,
//         children: [
//             { key: '5', label: 'Option 5' },
//             { key: '6', label: 'Option 6' },
//         ],
//     },
//     {
//         key: 'sub4', label: 'Navigation Three', icon: <VideoCameraOutlined />,
//         children: [
//             { key: '9', label: 'Option 9' },
//             { key: '10', label: 'Option 10' },
//             { key: '11', label: 'Option 11' },
//             { key: '12', label: 'Option 12' },
//         ],
//     },
// ];


const SiderMenu: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} style={siderStyle} theme={"light"}>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>
    );
};

export default SiderMenu;
