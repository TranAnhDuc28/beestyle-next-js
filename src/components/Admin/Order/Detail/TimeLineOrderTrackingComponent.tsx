import React, {memo, useEffect, useState} from "react";
import {Button, Divider, Form, Input, Modal, StepProps, Steps} from "antd";
import {CheckOutlined, CloseCircleOutlined, DropboxOutlined, LoadingOutlined} from "@ant-design/icons";
import {LiaBoxSolid} from "react-icons/lia";
import {FaShippingFast} from "react-icons/fa";
import {IOrderDetail} from "@/types/IOrder";
import {ORDER_TYPE} from "@/constants/OrderType";
import {ORDER_STATUS} from "@/constants/OrderStatus";
import useAppNotifications from "@/hooks/useAppNotifications";
import useOrder from "@/components/Admin/Order/hooks/useOrder";

interface IProps {
    orderDetail: IOrderDetail
}

/**
 * Đơn hàng bán giao hàng
 * @param orderStatus truyền trạng thái đơn hàng
 * @return vị trí step timeline icon của component cho hóa đơn giao
 */
const getOrderDeliverySaleStep = (orderStatus: string | undefined): number => {
    switch (orderStatus) {
        case ORDER_STATUS.CONFIRMED.key:
            return 1; // Đã xác nhận
        case ORDER_STATUS.AWAITING_SHIPMENT.key:
            return 2; // Chờ giao hàng
        case ORDER_STATUS.OUT_FOR_DELIVERY.key:
            return 3; // Đang giao hàng
        case ORDER_STATUS.DELIVERED.key:
            return 4; // Hoàn thành giao hàng
        case ORDER_STATUS.CANCELLED.key:
            return -1; // Đã hủy
        case ORDER_STATUS.RETURNED.key:
            return -2; // Đã trả hàng
        default:
            return 0; // Đặt hàng
    }
};

/**
 * Đơn hàng bán trực tiếp
 * @param orderStatus truyền trạng thái đơn hàng
 * @return vị trí step timeline icon của component cho hóa đơn tại quầy
 */
const getCounterBillStep = (orderStatus: string | undefined): number => {
    switch (orderStatus) {
        case ORDER_STATUS.PAID.key:
            return 1; // Đã thanh toán
        case ORDER_STATUS.PENDING.key:
            return 0; // Chờ thanh toán
        default:
            return 0; // Chờ thanh toán
    }
};

const getStepStatus = (stepKey: number, current: number) => {
    if (current === -1) return "error"; // Trạng thái hủy
    if (stepKey === current) return "process"; // Đang thực hiện
    if (stepKey < current) return "finish"; // Đã hoàn thành
    return "wait"; // Chưa đến
};

const TimeLineOrderTrackingComponent: React.FC<IProps> = (props) => {
    const {orderDetail} = props;
    const {showModal} = useAppNotifications();
    const [form] = Form.useForm();
    const {handleUpdateOrderStatusDelivery} = useOrder();
    const [current, setCurrent] = useState<number>(0);
    const [isOpenReasonModal, setIsOpenReasonModal] = useState(false);
    const [actionType, setActionType] = useState<'cancel' | 'return' | null>(null);

    useEffect(() => {
        // dựa vào loại hóa đơn để hiển thị time line theo dõi trạng thái hóa đơn
        const step: number = orderDetail?.orderType === ORDER_TYPE.IN_STORE_PURCHASE.key
            ? getCounterBillStep(orderDetail?.orderStatus)
            : getOrderDeliverySaleStep(orderDetail?.orderStatus);
        setCurrent(step);
    }, [orderDetail?.orderStatus]);

    const next = () => {
        setCurrent(current + 1);
    };

    const showReasonModal = (type: 'cancel' | 'return') => {
        setActionType(type);
        setIsOpenReasonModal(true);
    };

    const handleSubmitReasonCancelledAndReturned = async () => {
        form.submit();
        if (actionType === 'cancel') {

        } else if (actionType === 'return') {
            console.log(`Trả hàng với lý do: `);
        }
        setIsOpenReasonModal(false);
    };

    const handleCancel = () => {
        setIsOpenReasonModal(false);
        form.resetFields();
    };

    // xử lý qua các trạng thái đơn hàng
    const handleConfirmStepOrderStatus = async (id: number, value: {status: string, note: string | undefined}) => {
        await handleUpdateOrderStatusDelivery(id, value);
    };

    // time line cho giao hàng
    const itemTrackingOrderDeliverySaleSteps: StepProps[] = [
        {
            title: "Đặt hàng",
            status: getStepStatus(0, current),
            icon: <DropboxOutlined style={{fontSize: 35}}/>,
        },
        {
            title: current >= 1 ? "Đã xác nhận" : "Chờ xác nhận",
            status: current >= 1 ? (current === 1 ? "process" : "finish") : "wait",
            icon: current < 1 ? <LoadingOutlined style={{fontSize: 35}}/> : <CheckOutlined style={{fontSize: 35}}/>
        },
        {
            title: "Chờ giao hàng",
            status: getStepStatus(2, current),
            icon: <LiaBoxSolid style={{fontSize: 35}}/>
        },
        {
            title: "Đang giao hàng",
            status: getStepStatus(3, current),
            icon: <FaShippingFast style={{fontSize: 35}}/>
        },
        {
            title: "Đã giao hàng",
            status: getStepStatus(4, current),
            icon: <CheckOutlined style={{fontSize: 35}}/>
        }
    ];

    // time line cho đơn hàng tại quầy
    const itemTrackingCounterBillSteps: StepProps[] = [
        {
            title: current === 0 ? "Chờ thanh toán" : "Đã thanh toán",
            status: getStepStatus(0, current),
            icon: current === 0 ? <LoadingOutlined style={{fontSize: 35}}/> : <CheckOutlined style={{fontSize: 35}}/>
        },
        {
            title: 'Hoàn thành',
            status: getStepStatus(1, current),
            icon: <CheckOutlined style={{fontSize: 35}}/>
        }
    ];

    return (
        <>

            <Steps
                current={current}
                items={
                    orderDetail?.orderType === ORDER_TYPE.IN_STORE_PURCHASE.key
                        ? itemTrackingCounterBillSteps
                        : itemTrackingOrderDeliverySaleSteps
                }
                style={{margin: "20px 0px 30px 0px"}}
            />
            {
                orderDetail?.orderType === ORDER_TYPE.DELIVERY.key &&
                <div>
                    <Divider/>
                    {/* Xác nhận thay đổi trạng thái */}
                    {current < itemTrackingOrderDeliverySaleSteps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Xác nhận
                        </Button>
                    )}

                    {/* Button sau hoàn thành thanh toán */}
                    {current === itemTrackingOrderDeliverySaleSteps.length - 1 && (
                        <Button type="primary" disabled={true}>
                            Hoàn thành
                        </Button>
                    )}

                    {/* Hủy đơn hàng trong trước khi hoàn thành thanh toán */}
                    {current > 0 && current < itemTrackingOrderDeliverySaleSteps.length - 1 && (
                        <Button style={{margin: '0 8px'}} onClick={handleSubmitReasonCancelledAndReturned}>
                            Hủy
                        </Button>
                    )}
                </div>
            }


            <Modal cancelText="Hủy" okText="Xác nhận lý do"
                title={actionType === 'cancel' ? 'Lý do hủy đơn hàng' : 'Lý do trả hàng'}
                open={isOpenReasonModal}
                onOk={handleSubmitReasonCancelledAndReturned}
            >
                <Form
                    form={form}
                    name="reason"
                >
                    <Form.Item
                        label="Ghi chú"
                        name="note"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input.TextArea
                            placeholder="Nhập lý do..."
                            rows={4}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default memo(TimeLineOrderTrackingComponent);