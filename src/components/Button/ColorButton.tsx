import {Button, ButtonProps, ConfigProvider} from "antd";
import React from "react";
import {TinyColor} from "@ctrl/tinycolor";

const ColorButton = (
    {bgColor, children, ...props}: { bgColor: string | undefined } & ButtonProps) => {

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: bgColor,
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