import React, {memo, useEffect, useState} from "react";
import {Button, StepProps, Steps} from "antd";
import {CheckOutlined, DropboxOutlined, LoadingOutlined} from "@ant-design/icons";
import {LiaBoxSolid} from "react-icons/lia";
import {FaShippingFast} from "react-icons/fa";
import {IOrder} from "@/types/IOrder";
import {ORDER_TYPE} from "@/constants/OrderType";
import {ORDER_STATUS} from "@/constants/OrderStatus";

interface IProps {
    orderDetail: IOrder
}

/**
 * @param orderStatus truyền trạng thái đơn hàng
 * @return vị trí step timeline icon cho component
 */
const getOrderStatusStep = (orderStatus: string): number => {
    switch (orderStatus) {
        case ORDER_STATUS.CONFIRMED.key:
            return 1; // Đã xác nhận
        case ORDER_STATUS.AWAITING_SHIPMENT.key:
            return 2; // Chờ giao hàng
        case ORDER_STATUS.OUT_FOR_DELIVERY.key:
            return 3; // Đang giao hàng
        case ORDER_STATUS.DELIVERED.key:
            return 4; // Hoàn thành giao hàng
        default:
            return 0; // Đặt hàng
    }
};

const TimeLineOrderTrackingComponent: React.FC<IProps> = (props) => {
    const {orderDetail} = props;
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const step: number = getOrderStatusStep(orderDetail?.orderStatus);
        console.log(step)
        setCurrent(step);
    }, [orderDetail?.orderStatus]);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const itemTrackingOrderDeliverySaleSteps: StepProps[] = [
        {
            title: "Đặt hàng",
            status: current >= 0 ? "finish" : "wait",
            icon: <DropboxOutlined style={{fontSize: 35}}/>,
        },
        {
            title: current >= 1 ? "Đã xác nhận" : "Chờ xác nhận",
            status: current >= 1 ? (current === 1 ? "process" : "finish") : "wait",
            icon: current < 1 ? <LoadingOutlined style={{fontSize: 35}}/> : <CheckOutlined style={{fontSize: 35}}/>
        },
        {
            title: "Chờ giao hàng",
            status: current >= 2 ? (current === 2 ? "process" : "finish") : "wait",
            icon: <LiaBoxSolid style={{fontSize: 35}}/>
        },
        {
            title: "Đang giao hàng",
            status: current >= 3 ? (current === 3 ? "process" : "finish") : "wait",
            icon: <FaShippingFast style={{fontSize: 35}}/>
        },
        {
            title: "Đã giao hàng",
            status: current >= 4 ? "finish" : "wait",
            icon: <CheckOutlined style={{fontSize: 35}}/>
        }
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
                items={
                    orderDetail?.orderType === ORDER_TYPE.IN_STORE_PURCHASE.key
                        ? itemTrackingCounterBillSteps
                        : itemTrackingOrderDeliverySaleSteps
                }
            />
            {
                orderDetail?.orderType === ORDER_TYPE.DELIVERY.key &&
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
            }


        </div>
    );
}
export default memo(TimeLineOrderTrackingComponent);