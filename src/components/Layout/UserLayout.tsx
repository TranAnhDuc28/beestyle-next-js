"use client"
import { Layout } from 'antd';
import UserHeader from '../Header/UserHeader';
import Slider from '@/components/User/Home/Slider/UserSlider';
import ProductArea from '@/components/User/Home/Products/ProductArea';
import MediumBanner from '@/components/User/Home/Slider/MidiumBanner';
import ShopHome from '@/components/User/Home/Products/ShopHome';
import CowndownArea from '@/components/User/Home/Slider/CownDown';
import ShopBlog from '@/components/User/Home/Products/ShopBlog';
import ShopServices from '../Footer/ShopServices';
import Newsletter from '../Footer/Newsletter';
import UserFooter from '../Footer/UserFooter';
import React from "react";
import MostPopularProduct from "@/components/User/Home/Products/MostPopularProduct";

const { Content } = Layout;

const UserLayout: React.FC = () => {

    return (
        <Layout>
            <UserHeader />
            <Slider />
            <Content>
                <ProductArea />
                <MediumBanner />
                <MostPopularProduct />
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
