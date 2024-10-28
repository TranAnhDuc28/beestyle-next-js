import React, {useMemo} from 'react';
import {Select, Tag} from 'antd';
import type {SelectProps} from 'antd';
import {CloseOutlined} from "@ant-design/icons";

type TagRender = SelectProps['tagRender'];

const getTagRender = (dataMap: Map<number, string | undefined>): TagRender => {
    return (props) => {
        const {label, value, closable, onClose} = props;
        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };

        const color = dataMap.get(value);

        return (
            <Tag
                closeIcon={<CloseOutlined style={{color: "black"}}/>}
                color={color ?? "default"}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                className="custom-tag-select"
            >
                {label}
            </Tag>
        );
    }
};


interface OptionTag {
    value: any;
    label?: string;
    colorCode?: string;
}


const options: OptionTag[] = [
    {value: 1, colorCode: 'gold', label: 'gold'},
    {value: 2, colorCode: 'lime', label: 'lime'},
    {value: 3, colorCode: 'green', label: 'green'},
    {value: 4, colorCode: 'cyan', label: 'cyan'},
    {value: 5, colorCode: '#000000', label: 'Đen'},
    {value: 6, colorCode: 'default', label: 'Xám'},
    {value: 7, colorCode: '#ffffff', label: 'Trắng'},
    {value: 8, colorCode: '#108ee9', label: '#108ee9'},
    {value: 9, colorCode: '#87d068', label: '#87d068'},
];

interface IProps {
    selectedValues: any[];
    data?: any[];
    error?: [];
    isLoading?: boolean;
    onChange?: (selectedOptions: { value: number; label: string }[]) => void;
    onClear?: () => void;
}

const ColorOptionSelect = (props: IProps) => {
    const {selectedValues, data = [], error, isLoading, onChange, onClear} = props;

    const dataMap = new Map(options.map(item => [item.value, item.colorCode]));
    const memoizedTagRender = useMemo(() => getTagRender(dataMap), [dataMap]);

    const handleChange = (selectedValues: number[]) => {
        const selectedOptions = selectedValues.map(value => {
            const option = options.find(option => option.value === value);
            return { value, label: option?.label?.toString() || '' };
        });
        onChange && onChange(selectedOptions);
    }

    return (
        <Select
            value={selectedValues}
            showSearch
            allowClear
            style={{width: '100%'}}
            mode="multiple"
            placement="bottomLeft"
            size="large"
            loading={isLoading}
            placeholder={isLoading ? "Đang tải..." : "---Lựa chọn---"}
            tagRender={memoizedTagRender}
            options={options}
            optionRender={(option) => (
                <Tag className="custom-tag" color={option.data.colorCode}>{option.data.label}</Tag>
            )}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onChange={handleChange}
            onClear={onClear}
        />
    );
}
export default ColorOptionSelect;