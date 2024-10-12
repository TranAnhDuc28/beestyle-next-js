import {Button, ButtonProps, ConfigProvider} from "antd";
import React from "react";
import {TinyColor} from "@ctrl/tinycolor";

const ColorButton = (
    {bgColor, children, ...props}: { bgColor: string | undefined } & ButtonProps) => {

    const defaultColor: string = '#1890ff';
    const color: string = bgColor || defaultColor;

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: color,
                    colorPrimaryHover: new TinyColor(bgColor).lighten(5).toString(),
                    colorPrimaryActive: new TinyColor(bgColor).darken(5).toString(),
                },
            }}
        >
            <Button {...props}>{children}</Button>
        </ConfigProvider>
    );
}

export default ColorButton;