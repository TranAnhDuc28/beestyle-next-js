import React from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];

const sizes: string[] = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '$XL', '5XL', '6XL', 'Freesize'];
const length = sizes.length;

for (let i = 0; i < length; i++) {
    options.push({
        label: sizes[i],
        value: i + 1,
    });
}

interface IProps {
    selectedValues: any[];
    data?: any[];
    error?: [];
    isLoading?: boolean;
    onChange?: (selectedOptions: { value: number; label: string }[]) => void;
    onClear?: () => void;
}

const SizeOptionSelect: React.FC<IProps> = (props) => {
    const {selectedValues, data = [], error, isLoading, onChange, onClear} = props;

    const handleChange = (selectedValues: number[]) => {
        const selectedOptions = selectedValues.map(value => {
            const option = options.find(option => option.value === value);
            return { value, label: option?.label?.toString() || '' };
        });
        onChange && onChange(selectedOptions);
    }

    return (
        <Space style={{ width: '100%' }} direction="vertical">
            <Select
                value={selectedValues}
                style={{width: '100%'}}
                showSearch
                mode="multiple"
                placement="bottomLeft"
                size="large"
                allowClear
                loading={isLoading}
                placeholder={isLoading ? "Đang tải..." : "---Lựa chọn---"}
                onChange={handleChange}
                onClear={onClear}
                options={options}
                filterOption={(input, option) =>
                    (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                }
            />
        </Space>
    );
}

export default SizeOptionSelect;