"use client"

import {Flex, Typography} from "antd";
import React from "react";

const { Title } = Typography;

function Product() {

    return (
        <Flex align={'center'} justify={'center'} style={{ height: '100vh' }}>
            <Title>Product</Title>
        </Flex>
    );
}

export default Product;