import React, {useEffect, useState} from "react";
import {CheckOutlined} from "@ant-design/icons";
import Link from "next/link";
import {useProductColors} from "@/services/user/SingleProductService";

const ColorPickers = (props: any) => {
    const {data: colors} = useProductColors(props.productId);
    const [selectedColorName, setSelectedColorName] = useState<string | null>(null);

    const getContrastColor = (color: string) => {
        const rgb = color.match(/\w\w/g)?.map((x) => parseInt(x, 16));
        if (!rgb) return "black";

        const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
        return luminance > 128 ? "black" : "white";
    };

    useEffect(() => {
        if (colors && colors.length > 0 && !props.selectedColor) {
            const firstColor = colors[0];
            props.onColorSelect(firstColor.colorCode);
        }
    }, [colors, props.selectedColor]);

    const handleColorClick = (color: string, colorName: string) => {
        setSelectedColorName(colorName)
        props.onColorSelect(color);
    };

    return (
        <>
            <div className="d-flex align-items-center ms-0 mb-1">
                <span className="mb-1">Màu sắc :</span>
                {props.selectedColor ?
                    (<span className="ml-2 mb-1 fw-normal" style={{color: '#da880d'}}>{selectedColorName}</span>) :
                    (<span className="ml-2 mb-1 fw-normal" style={{color: 'red'}}>Chọn màu sắc</span>)
                }
            </div>
            <ul className="color-list" style={{display: "flex", padding: 0, margin: 0}}>
                {colors?.map((color, index) => {
                    const contrastColor = getContrastColor(color.colorCode);
                    return (
                        <li
                            key={index}
                            className={`color-item ${props.selectedColor === color.colorCode ? "selected" : ""}`}
                            onClick={() => handleColorClick(color.colorCode, color.colorName)}
                            style={{
                                marginRight: "15px",
                                cursor: "pointer"
                            }}
                        >
                            <Link
                                href="#"
                                className="color-link"
                                style={{
                                    backgroundColor: color.colorCode,
                                    display: "flex",
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "50%"
                                }}
                                onClick={(e) => e.preventDefault()}
                            >
                                {props.selectedColor === color.colorCode && (
                                    <CheckOutlined style={{color: contrastColor, fontSize: "20px"}}/>
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default ColorPickers;
