import {Drawer} from "antd";
import React, {memo} from "react";

interface IProps {
    title?: string;
    open: boolean;
    onClose: () => void;
}

const FilterProduct: React.FC<IProps> = (props) => {
    const {open, onClose} = props;

    return (
        <>
            <Drawer title="Lọc sn phẩm" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
}
export default memo(FilterProduct);