"use client"
import React, {memo, useState} from "react";
import {AutoComplete, AutoCompleteProps} from "antd";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

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
                style={{ width: 400, margin: "0px 20px 0px 10px" }}
                onSearch={(text) => setOptions(getPanelValue(text))}
                placeholder="Customized clear icon"
                allowClear
            />
        </>
    )
};
export default memo(TabBarExtraContentLeft);