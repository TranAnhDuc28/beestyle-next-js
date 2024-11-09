import ProductArea from "@/components/User/Home/Products/ProductArea";
import MediumBanner from "@/components/User/Home/Slider/MidiumBanner";
import MostPopularProduct from "@/components/User/Home/Products/MostPopularProduct";
import ShopHome from "@/components/User/Home/Products/ShopHome";
import CowndownArea from "@/components/User/Home/Slider/CownDown";
import ShopBlog from "@/components/User/Home/Products/ShopBlog";
import React, {Suspense} from "react";
import Slider from "@/components/User/Home/Slider/UserSlider";
import ShopServices from "@/components/Footer/ShopServices";
import Newsletter from "@/components/Footer/Newsletter";
import {Content} from "antd/es/layout/layout";
import {Metadata} from "next";
import UserLoader from "@/components/Loader/UserLoader";

export const metadata: Metadata = {
    title: "Trang chủ",
    description: "home",
};

export default function HomeProduct() {
    return (
        <Suspense fallback={<UserLoader/>}>
            <Slider/>
            <Content>
                <ProductArea/>
                <MediumBanner/>
                <MostPopularProduct/>
                <ShopHome/>
                <CowndownArea/>
                <ShopBlog/>
            </Content>
            <ShopServices/>
            <Newsletter/>
        </Suspense>
    )
}