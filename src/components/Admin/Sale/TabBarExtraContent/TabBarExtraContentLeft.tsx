"use client"
import React, {memo, useState} from "react";
import {AutoComplete, AutoCompleteProps} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
});

const TabBarExtraContentLeft: React.FC = () => {
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

    const getPanelValue = (searchText: string) =>
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

    return (
        <>
            <AutoComplete
                options={options}
                style={{ width: 400, margin: "0px 20px 0px 20px" }}
                onSearch={(text) => setOptions(getPanelValue(text))}
                placeholder="Tm kiếm sản phẩm"
                allowClear
                suffixIcon={<SearchOutlined/>}
            />
        </>
    )
};
export default memo(TabBarExtraContentLeft);