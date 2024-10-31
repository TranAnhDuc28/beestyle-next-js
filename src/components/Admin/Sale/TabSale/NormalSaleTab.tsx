import {Button, Checkbox} from "antd";
import React, {memo, useState} from "react";
import CheckoutComponent from "@/components/Admin/Sale/CheckoutComponent";

interface IProps {

}

const NormalSaleTab: React.FC<IProps> = (props) => {
    const {} = props;
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button type="primary" onClick={showDrawer}>
                CHECKOUT REGULAR SALE
            </Button>
            <CheckoutComponent
                title="Checkout regular sale"
                open={open}
                onClose={onClose}
            />
        </div>
    )
};
export default memo(NormalSaleTab);