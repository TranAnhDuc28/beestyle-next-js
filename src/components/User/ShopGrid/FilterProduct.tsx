"use client";

import React from "react";
import { Select, Space } from "antd";
import Link from "next/link";
import { TiThLargeOutline } from "react-icons/ti";
import { CiBoxList } from "react-icons/ci";

const { Option } = Select;

const FilterProduct = () => {
  return (
    <div className="flex justify-between">
      <div className="single-shorter">
        <label>Sản phẩm</label>
      </div>
      <div className="single-shorter ">
        <label>Sắp xếp theo:</label>
        <Select defaultValue="Name" style={{ width: 175, marginLeft: 5 }}>
          <Option value="Name">Tên sản phẩm</Option>
          <Option value="Price">Giá từ thấp đến cao</Option>
          <Option value="Size">Giá từ cao đến thấp</Option>
        </Select>
      </div>
    </div>
  );
};

export default FilterProduct;
