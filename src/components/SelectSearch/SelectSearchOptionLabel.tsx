import {Select} from "antd";
import React, {memo} from "react";

interface OptionItem  {
    value: any,
    label: string
};

interface IProps {
    data?: OptionItem[];
    error?: [];
    isLoading?: boolean;
    onChange?: (value: any) => void,
}

const SelectSearchOptionLabel = (props: IProps) => {
    const {data = [], error, isLoading, onChange} = props;

    return (
        <Select
            placeholder={isLoading ? "Đang tải..." : "---Lựa chọn---"}
            loading={isLoading}
            showSearch
            allowClear={true}
            placement="bottomLeft"
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={data}
            onChange={onChange}
        />
    );
}
export default memo(SelectSearchOptionLabel);