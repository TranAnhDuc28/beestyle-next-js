import {Select} from "antd";
import React, {memo} from "react";

interface IProps {
    value?: any;
    data?: any[];
    error?: [];
    isLoading?: boolean;
    onChange?: (value: any) => void;
}

const SelectSearchOptionLabel = (props: IProps) => {
    const {value, data = [], error, isLoading, onChange} = props;

    return (
        <Select
            showSearch
            value={value}
            allowClear={true}
            placement="bottomLeft"
            loading={isLoading}
            placeholder={isLoading ? "Đang tải..." : "---Lựa chọn---"}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={data}
            onChange={onChange}
        />
    );
}
export default memo(SelectSearchOptionLabel);