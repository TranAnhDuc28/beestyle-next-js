import React from 'react';
import {Menu, MenuProps} from 'antd';
import {
    UserOutlined, PieChartOutlined, ShoppingCartOutlined, ProductOutlined, GiftOutlined,
} from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";
import Link from "next/link";

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


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {key: '1', label: <Link href={"/"}>Tổng quan</Link>, icon: <PieChartOutlined/>,},
    {key: '2', label: <Link href={"/"}>Bán hàng tại quầy</Link>, icon: <ShoppingCartOutlined/>,},
    {key: '3', label: <Link href={"/"}>Quản lý đơn hàng</Link>, icon: <ShoppingCartOutlined/>,},
    {key: '4', label: 'Quản lý sản phẩm', icon: <ProductOutlined/>,
        children: [
            {key: '4.1', label: <Link href={"/admin/product"}>Sản phẩm</Link>},
            {key: '4.2', label: <Link href={"/admin/product"}>Danh mục</Link>},
            {key: '4.3', label: <Link href={"/admin/product"}>Thương hiệu</Link>},
            {key: '4.4', label: <Link href={"/admin/product"}>Chất liệu</Link>},
            {key: '4.5', label: <Link href={"/admin/product"}>Màu sắc</Link>},
            {key: '4.6', label: <Link href={"/admin/product"}>Kích cỡ</Link>},
        ],
    },
    {key: '5', label: 'Giảm giá', icon: <GiftOutlined/>,
        children: [
            {key: '5.1', label: 'Quản lý voucher'},
            {key: '5.2', label: 'Quản lý khuyến mại'},
        ],
    },
    {key: '6', label: 'Tài khoản', icon: <UserOutlined/>,
        children: [
            {key: '6.1', label: 'Khách hàng'},
            {key: '6.2', label: 'Nhân viên'},
        ],
    },
    {key: '7', label: <Link href={"/test"}>Test</Link>, icon: <UserOutlined/>}
];


const AppSideMenu: React.FC<{ collapsed: boolean }> = ({collapsed}) => {
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={siderStyle}
            theme={'light'}
            width={'230px'}
        >
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>
    );
};

export default AppSideMenu;
