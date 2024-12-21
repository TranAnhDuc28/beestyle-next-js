import React, {memo, useState} from "react";
import {Button, StepProps, Steps} from "antd";
import {CheckOutlined, DropboxOutlined, LoadingOutlined} from "@ant-design/icons";
import {LiaBoxSolid} from "react-icons/lia";
import {FaShippingFast} from "react-icons/fa";
import {IOrder} from "@/types/IOrder";

interface IProps {
    orderDetail: IOrder
}

const TimeLineOrderTrackingComponent: React.FC<IProps> = (props) => {
    const {orderDetail} = props;
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const itemTrackingOrderDeliverySaleSteps: StepProps[] = [
        {
            title: "Đặt hàng",
            status: "finish",
            icon: <DropboxOutlined style={{fontSize: 35}}/>,
        },
        {
            title: "Chờ xác nhận",
            status: 'process',
            icon: <LoadingOutlined style={{fontSize: 35}}/>,
        },
        {
            title: "Chờ giao hàng",
            status: 'wait',
            icon: <LiaBoxSolid style={{fontSize: 35}}/>,
        },
        {
            title: "Đang giao hàng",
            status: 'wait',
            icon: <FaShippingFast style={{fontSize: 35}}/>,
        },
        {
            title: 'Hoàn thành',
            status: 'wait',
            icon: <CheckOutlined style={{fontSize: 35}}/>,
        },
    ];

    const itemTrackingCounterBillSteps: StepProps[] = [
        {
            title: "Chờ thanh toán",
            status: 'process',
            icon: <LoadingOutlined style={{fontSize: 35}}/>,
        },
        {
            title: 'Hoàn thành',
            status: 'wait',
            icon: <CheckOutlined style={{fontSize: 35}}/>,
        },
    ];

    return (

        <div>
            <Steps
                current={current}
                items={itemTrackingOrderDeliverySaleSteps}
            />

            <div style={{marginTop: 24}}>
                {current < itemTrackingOrderDeliverySaleSteps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === itemTrackingOrderDeliverySaleSteps.length - 1 && (
                    <Button type="primary">
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
}
export default memo(TimeLineOrderTrackingComponent);