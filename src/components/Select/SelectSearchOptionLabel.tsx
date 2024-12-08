import {Select} from "antd";
import React, {CSSProperties, memo} from "react";

interface IProps {
    placeholder?: string;
    value?: any;
    data?: any[];
    error?: [];
    isLoading?: boolean;
    onChange?: (value: any) => void;
    style?: CSSProperties
    onClear?: () => void;
}

const SelectSearchOptionLabel = (props: IProps) => {
    const {
        placeholder,
        style,
        value,
        data = [],
        error,
        isLoading,
        onChange,
        onClear
    } = props;

    return (
        <Select
            style={style}
            showSearch
            value={value}
            allowClear={true}
            placement="bottomLeft"
            loading={isLoading}
            placeholder={isLoading ? "Đang tải..." : placeholder}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={data}
            onChange={onChange}
            onClear={onClear}
        />
    );
}
export default memo(SelectSearchOptionLabel);