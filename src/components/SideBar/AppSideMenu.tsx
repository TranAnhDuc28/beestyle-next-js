import React from 'react';
import {Menu, MenuProps,} from 'antd';
import {
    UserOutlined, PieChartOutlined, ShoppingCartOutlined, ProductOutlined, GiftOutlined,
} from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import styles from "./AppSideMenu.module.css";

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarColor: 'unset',
    backgroundColor: '#ffffff',
    border: '1px solid #E6EBF1',
};


type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {key: '1', label: <Link href={"/"}>Tổng quan</Link>, icon: <PieChartOutlined/>,},
    {key: '2', label: <Link href={"/"}>Bán hàng tại quầy</Link>, icon: <ShoppingCartOutlined/>,},
    {key: '3', label: <Link href={"/"}>Quản lý đơn hàng</Link>, icon: <ShoppingCartOutlined/>,},
    {
        key: '4', label: 'Quản lý sản phẩm', icon: <ProductOutlined/>,
        children: [
            {key: '4.1', label: <Link href={"/admin/product"}>Sản phẩm</Link>},
            {key: '4.2', label: <Link href={"/admin/category"}>Danh mục</Link>},
            {key: '4.3', label: <Link href={"/admin/brand"}>Thương hiệu</Link>},
            {key: '4.4', label: <Link href={"/admin/material"}>Chất liệu</Link>},
            {key: '4.5', label: <Link href={"/admin/color"}>Màu sắc</Link>},
            {key: '4.6', label: <Link href={"/admin/size"}>Kích cỡ</Link>},
        ],
    },
    {
        key: '5', label: 'Giảm giá', icon: <GiftOutlined/>,
        children: [
            {key: '5.1', label: 'Quản lý voucher'},
            {key: '5.2', label: 'Quản lý khuyến mại'},
        ],
    },
    {
        key: '6', label: 'Tài khoản', icon: <UserOutlined/>,
        children: [
            {key: '6.1', label: 'Khách hàng'},
            {key: '6.2', label: 'Nhân viên'},
        ],
    },
    {key: '7', label: <Link href={"/test"}>Test</Link>, icon: <UserOutlined/>}
];


const AppSideMenu: React.FC<{ collapsed: boolean }> = ({collapsed}) => {
    return (
        <>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={siderStyle}
                width={250}
                aria-label="Main navigation"
            >
                <div className="flex justify-center items-center h-16 w-full">
                    {collapsed ?
                        (<div className="text-xs font-black">BeeStyle</div>) :
                        (<div className="text-3xl font-bold">BeeStyle</div>)
                    }
                </div>

                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{border: 0}}
                />
            </Sider>
        </>

    );
};

export default AppSideMenu;
