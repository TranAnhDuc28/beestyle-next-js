"use client"

import React, { useState } from 'react';
import { Layout } from 'antd';
import UserHeader from '../Header/UserHeader';
import Slider from '../Slider/UserSlider';
import ProductArea from '../User/Products/ProductArea';
import MediumBanner from '../Slider/MidiumBanner';
import PopularArea from '../User/Products/PopularArea';
import ShopHome from '../User/Products/ShopHome';
import CowndownArea from '../Slider/Cowndown';
import ShopBlog from '../User/Products/ShopBlog';
import ShopServices from '../Footer/ShopServices';
import Newsletter from '../Footer/Newsletter';
import UserFooter from '../Footer/UserFooter';

const { Content } = Layout;

const UserLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => setCollapsed(!collapsed);

    return (
        <Layout>
            <UserHeader />
            <Slider />
            <Content>
                <ProductArea />
                <MediumBanner />
                <PopularArea />
                <ShopHome />
                <CowndownArea />
                <ShopBlog />
            </Content>
            <ShopServices />
            <Newsletter />
            <UserFooter />
        </Layout>
    );
};

export default UserLayout;