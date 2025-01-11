import React, {Suspense} from "react";
import AdminLoader from "@/components/Loader/AdminLoader";
import {Metadata} from "next";
import SaleComponent from "@/components/Admin/Sale/SaleComponent";
import {Flex, Result} from "antd";

export const metadata: Metadata = {
    title: "Unauthorized",
    description: "Unauthorized",
};

const Unauthorized = () => {
    return (
        <Flex justify="center" align="center" className="h-screen">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
            />
        </Flex>
    );
}

export default Unauthorized;