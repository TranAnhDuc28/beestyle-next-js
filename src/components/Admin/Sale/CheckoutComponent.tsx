import React, {memo} from "react";
import {Button, Drawer, Space} from "antd";

interface IProps {
    title?: string;
    open: boolean;
    onClose: () => void;
}

const CheckoutComponent: React.FC<IProps> = (props) => {
    const {title, open, onClose} = props;

    return (
        <Drawer
            title={title}
            placement="right"
            size="large"
            onClose={onClose}
            open={open}
            extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" onClick={onClose}>
                        OK
                    </Button>
                </Space>
            }
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    );
}
export default memo(CheckoutComponent);