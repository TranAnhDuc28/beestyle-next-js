import {Select} from "antd";
import React, {memo} from "react";

interface IProps {
    data?: any[];
    error?: [];
    isLoading?: boolean;
    onChange?: (value: any) => void,
}

const SelectSearchOptionLabel = (props: IProps) => {
    const {data = [], error, isLoading, onChange} = props;

    return (
        <Select
            showSearch
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