import React from 'react';
import {Select, Tag} from 'antd';
import type {SelectProps} from 'antd';

type TagRender = SelectProps['tagRender'];

const options = [
    {value: 'gold', label: 'gold'},
    {value: 'lime', label: 'lime'},
    {value: 'green', label: 'green'},
    {value: 'cyan', label: 'cyan'},
    {value: '#000000', label: 'Đen'},
    {value: 'default', label: 'Trắng'},
    {value: '#ffffff', label: 'Trắng'},
    {value: '#108ee9', label: '#108ee9'},
    {value: '#87d068', label: '#87d068'},
];

const tagRender: TagRender = (props) => {
    const {label, value, closable, onClose} = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            className="custom-tag-select"
        >
            {label}
        </Tag>
    );
};

interface IProps {
    data?: any[];
    error?: [];
    isLoading?: boolean;
    onChange?: (value: any) => void;
}

const ColorOptionSelect = (props: IProps) => {
    const {data = [], error, isLoading, onChange} = props;
    return (
        <Select
            showSearch
            mode="multiple"
            placement="bottomLeft"
            size="large"
            allowClear={true}
            loading={isLoading}
            placeholder={isLoading ? "Đang tải..." : "---Lựa chọn---"}
            tagRender={tagRender}
            defaultValue={['gold']}
            style={{width: '100%'}}
            options={options}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onChange={onChange}
        />
    );
}
export default ColorOptionSelect;