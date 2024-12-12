import React, { useEffect, useState, useRef } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { useProductColors } from '@/services/user/SingleProductService';
import './css/property.css';
import { Button } from 'antd';

const ColorPickers = (props: any) => {
    const { data: colors } = useProductColors(props.productId);
    const [selectedColorName, setSelectedColorName] = useState<string | null>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            if (!props.selectedColor) {
                const defaultColor = colors && colors.length > 0 ? colors[0].colorCode : null;
                const colorDefault = colors?.find((color) => color.colorCode === defaultColor);

                if (defaultColor) {
                    props.onColorSelect(defaultColor);
                    setSelectedColorName(colorDefault?.colorName || null);
                }
            }
            isFirstRender.current = false;
        }
    }, [colors, props.productId, props.onColorSelect]);

    const handleColorClick = (color: string, colorName: string) => {
        setSelectedColorName(colorName);
        props.onColorSelect(color);
    };

    return (
        <div className="mb-4">
            <div className="flex items-center mb-1">
                <span className="font-semibold">Màu sắc :</span>
                {props.selectedColor ? (
                    <span className="ml-2 font-normal" style={{ color: '#da880d' }}>
                        {selectedColorName}
                    </span>
                ) : (
                    <span className="ml-2 font-normal" style={{ color: 'red' }}>
                        Chọn màu sắc
                    </span>
                )}
            </div>
            <div className="flex flex-wrap mt-2">
                {colors?.map((color, index) => (
                    <Button
                        key={index.toString()}
                        className={`mr-2 mb-2 rounded-full w-11 h-11 flex items-center justify-center ${props.selectedColor === color.colorCode ? 'border-2 border-red-500' : ''
                            }`}
                        style={{ backgroundColor: color.colorCode }}
                        onClick={() => handleColorClick(color.colorCode, color.colorName)}
                    >
                        {props.selectedColor === color.colorCode && <CheckOutlined style={{ color: 'white' }} />}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ColorPickers;
