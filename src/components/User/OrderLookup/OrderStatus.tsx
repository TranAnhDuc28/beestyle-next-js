import React from 'react';
import { Steps, Typography } from 'antd';

const { Step } = Steps;
const { Text } = Typography;

interface OrderStatusProps {
    currentStep: number;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ currentStep }) => {
    const steps = [
        {
            title: 'Chờ xác nhận',
            description: '04-12-2024 19:40:12',
        },
        {
            title: 'Chờ giao hàng',
            description: '04-12-2024 19:40:40',
        },
        {
            title: 'Đang giao hàng',
        },
        {
            title: 'Đã giao hàng',
        },
        {
            title: 'Kết thúc',
        }
    ];

    return (
        <div className="mt-6">
            <Steps current={currentStep} className="w-full">
                {steps.map((step, index) => (
                    <Step
                        key={index}
                        title={<Text strong>{step.title}</Text>}
                        description={
                            step.description && (
                                <Text type="secondary">{step.description}</Text>
                            )
                        }
                    />
                ))}
            </Steps>
        </div>
    );
};

export default OrderStatus;
