'use client';

import React from "react";
import {Select} from "antd";
import Link from "next/link";
import {TiThLargeOutline} from "react-icons/ti";
import {CiBoxList} from "react-icons/ci";

const { Option } = Select;

const FilterProduct = () => {
    return (
        <div className="shop-top">
            <div className="shop-shorter">
                <div className="single-shorter me-4">
                    <label>Hiển thị:</label>
                    <Select defaultValue="09" style={{ width: 100, marginLeft: 5 }}>
                        <Option value="09">09</Option>
                        <Option value="15">15</Option>
                        <Option value="25">25</Option>
                        <Option value="30">30</Option>
                        <Option value="">Tất cả</Option>
                    </Select>
                </div>
                <div className="single-shorter">
                    <label>Sắp xếp theo:</label>
                    <Select defaultValue="Name" style={{ width: 175, marginLeft: 5 }}>
                        <Option value="Name">Tên sản phẩm</Option>
                        <Option value="Price">Giá từ thấp đến cao</Option>
                        <Option value="Size">Giá từ cao đến thấp</Option>
                    </Select>
                </div>
            </div>
        </div>

    )
}

export default FilterProduct;