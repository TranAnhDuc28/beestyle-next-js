import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { TagOutlined, CloseOutlined } from '@ant-design/icons';

interface IDiscountModalType {
    isVisible: boolean;
    onClose: boolean;
}

const DiscountCodeModal: React.FC<IDiscountModalType> = ({ isVisible, onClose }) => {
    const [discountCode, setDiscountCode] = useState('');

    const handleApply = () => {
        console.log('Áp dụng mã giảm giá:', discountCode);
    };

    return (
        <Modal
            title={
                <p className="text-center text-black text-lg font-semibold mb-3">Mã giảm giá</p>
            }
            open={isVisible}
            onCancel={onClose}
            closeIcon={<CloseOutlined />}
            footer={null}
            centered
            width={600}
        >
            <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg">
                <Input
                    placeholder="Mã giảm giá"
                    prefix={<TagOutlined className="text-gray-400 me-2" />}
                    className="rounded-lg h-10"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    allowClear
                />
                <Button
                    type="primary"
                    className="!bg-yellow-400 !text-black font-semibold h-10 px-6 rounded-lg hover:!bg-yellow-500"
                    onClick={handleApply}
                >
                    Áp dụng
                </Button>
            </div>

            <div className="flex flex-col items-center justify-center mt-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <TagOutlined className="text-gray-300 text-4xl" />
                </div>
                <p className="text-gray-500 font-medium">
                    Bạn chưa có mã giảm giá nào
                </p>
            </div>
        </Modal>
    );
};

export default DiscountCodeModal;
