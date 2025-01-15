"use client"
import React, {memo, useState} from "react";
import {Button, Divider, Form, Input, Modal, StepProps, Steps, Typography} from "antd";
import {CheckOutlined, DropboxOutlined, LoadingOutlined} from "@ant-design/icons";
import {ORDER_STATUS} from "@/constants/OrderStatus";
import {LiaBoxSolid} from "react-icons/lia";
import {FaShippingFast} from "react-icons/fa";
import {ORDER_TYPE} from "@/constants/OrderType";
import useOrder from "@/components/Admin/Order/hooks/useOrder";
import {useParams} from "next/navigation";
import OrderDetailInfoTableUser from "@/components/User/OrderTracking/OrderDetailInfoTableUser";
import OrderedProductDetailsUser from "@/components/User/OrderTracking/OrderedProductDetailsUser";

const {Text} = Typography;

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
}

const getStepStatus = (stepKey: number, current: number) => {
    if (current === -1) return "error"; // Trạng thái hủy
    if (stepKey === current) return "process"; // Đang thực hiện
    if (stepKey < current) return "finish"; // Đã hoàn thành
    return "wait"; // Chưa đến
};


const OrderTrackingDetailUser: React.FC = () => {
    const [form] = Form.useForm();
    const {orderTrackingNumber} = useParams();
    const {handleGetOrderDetailByOrderTrackingNumber} = useOrder();
    const [current, setCurrent] = useState(0);
    const [isOpenReasonModal, setIsOpenReasonModal] = useState(false);

    const {orderDetail, error, isLoading, mutate} =
        handleGetOrderDetailByOrderTrackingNumber(orderTrackingNumber.toString());

    const handleCancel = () => {
        setIsOpenReasonModal(false);
        form.resetFields();
    }

    const handleSubmitReasonCancelled= async () => {
        // await handleConfirmStepOrderStatus(orderDetail?.id, {
        //     orderStatus: ORDER_STATUS.CANCELLED.key,
        //     note: form.getFieldValue('note')
        // });

        setIsOpenReasonModal(false);

        // refresh order detail
        await mutate();
    }


    // time line cho giao hàng
    const itemTrackingOrderDeliverySaleSteps: StepProps[] = [
        {
            title: "Đặt hàng",
            status: getStepStatus(0, current),
            icon: <DropboxOutlined style={{fontSize: 35}}/>,
        },
        {
            title: current >= 1 ? ORDER_STATUS.CONFIRMED.description : ORDER_STATUS.AWAITING_CONFIRMATION.description,
            status: current >= 1 ? (current === 1 ? "process" : "finish") : "wait",
            icon: current < 1 ? <LoadingOutlined style={{fontSize: 35}}/> : <CheckOutlined style={{fontSize: 35}}/>
        },
        {
            title: ORDER_STATUS.AWAITING_SHIPMENT.description,
            status: getStepStatus(2, current),
            icon: <LiaBoxSolid style={{fontSize: 35}}/>
        },
        {
            title: ORDER_STATUS.OUT_FOR_DELIVERY.description,
            status: getStepStatus(3, current),
            icon: <FaShippingFast style={{fontSize: 35}}/>
        },
        {
            title: ORDER_STATUS.DELIVERED.description,
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
                    {/* Hủy đơn hàng trong trước khi hoàn thành thanh toán */}
                    {
                        orderDetail?.orderStatus && orderDetail.orderStatus === ORDER_STATUS.AWAITING_CONFIRMATION.key ||
                        orderDetail.orderStatus === ORDER_STATUS.CONFIRMED.key ||
                        orderDetail.orderStatus === ORDER_STATUS.AWAITING_SHIPMENT.key
                            ? (
                                <Button style={{margin: '0 8px'}} onClick={() => setIsOpenReasonModal(true)}>
                                    Hủy
                                </Button>
                            )
                            :
                            <></>
                    }
                </div>
            }

            <OrderDetailInfoTableUser orderDetail={orderDetail}/>

            <OrderedProductDetailsUser  orderDetail={orderDetail}/>

            <Modal cancelText="Hủy" okText="Xác nhận lý do"
                   title={'Lý do hủy đơn hàng'}
                   open={isOpenReasonModal}
                   onOk={() => form.submit()}
                   onCancel={handleCancel}
                   width={700}
                   styles={{
                       body: {
                           padding: "10px 0px",
                           height: 195
                       }
                   }}
            >
                <Form
                    form={form}
                    name="reason"
                    onFinish={handleSubmitReasonCancelled}
                >
                    <Form.Item
                        layout="vertical"
                        label="Ghi chú"
                        name="note"
                        rules={[
                            {required: true, message: 'Vui lòng nhập lý do hủy đơn hàng.'}
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Nhập lý do..."
                            rows={6}
                            autoSize={{minRows: 6, maxRows: 6}}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default memo(OrderTrackingDetailUser);