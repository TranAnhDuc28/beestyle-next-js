import React, { useState } from 'react';
import { Input, Checkbox, Button, message } from 'antd';
import { EditOutlined, CloseOutlined, PhoneOutlined, HomeOutlined, UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import useAppNotifications from '@/hooks/useAppNotifications';

const AddressCard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [editingAddressIndex, setEditingAddressIndex] = useState(-1);
    const { showModal } = useAppNotifications();
    const [addressList, setAddressList] = useState([
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            phoneNumber: '0987654321',
            address: '123 Main St, Anytown, USA',
            default: true,
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'janesmith@example.com',
            phoneNumber: '0987654322',
            address: '456 Oak Ave, Anytown, USA',
            default: false,
        },
        {
            firstName: 'Peter',
            lastName: 'Jones',
            email: 'peterjones@example.com',
            phoneNumber: '0987654323',
            address: '789 Pine Ln, Anytown, USA',
            default: false,
        },
    ]);

    // Giá trị khởi tạo form thêm mới
    const initialAddressData = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        default: false,
    };

    const [newAddressData, setNewAddressData] = useState(initialAddressData);

    const handleInputChange = (key: string, value: string | boolean, isNew: boolean, addressIndex: number) => {
        if (isNew) {
            setNewAddressData({ ...newAddressData, [key]: value });
        } else {
            const updatedAddressList = [...addressList];
            updatedAddressList[addressIndex] = {
                ...updatedAddressList[addressIndex],
                [key]: value,
            };
            setAddressList(updatedAddressList);
        }
    };

    const toggleEditing = (index: number) => {
        if (index === editingAddressIndex) {
            setIsEditing(!isEditing);
        }
        setEditingAddressIndex(index);
    };

    const handleCancel = () => {
        setShowNewAddressForm(false);
        setNewAddressData(initialAddressData);
    };

    const handleSave = (index: number) => {
        setIsEditing(false);
        setEditingAddressIndex(-1);
        console.log("Cập nhật địa chỉ:", addressList[index]);
    };

    const handleNewAddressSave = () => {
        setShowNewAddressForm(false);
        console.log("Thông tin địa chỉ:", newAddressData);
        setNewAddressData(initialAddressData);
    };

    const handleNewAddressClick = () => {
        setShowNewAddressForm(true);
    };

    // Xoá địa chỉ theo id hoặc index
    const handleAddressRemove = (index: number) => {
        showModal('confirm', {
            title: 'Xoá địa chỉ',
            content: 'Bạn có chắc chắn muốn xóa địa chỉ này?',
            icon: (<QuestionCircleOutlined style={{ color: 'red' }} />),
            centered: true,
            okText: 'Xoá',
            cancelText: 'Không',
            onOk() {
                console.log(index);
                message.success('Đã xóa địa chỉ');
            }
        })
    }

    return (
        <>
            <div className='flex mt-4'>
                {/* Form sửa địa chỉ */}
                <div className="w-[50%] me-4">
                    {addressList.map((address, index) => (
                        <div key={index} className="mb-4">
                            <div
                                className="flex justify-between font-bold"
                                style={{ backgroundColor: '#D9EDF7', padding: '9px 10px' }}
                            >
                                {address.address}
                                {address.default ? ' (Địa chỉ mặc định)' : ''}
                                <div className="space-x-4">
                                    <EditOutlined
                                        onClick={() => toggleEditing(index)}
                                        className="cursor-pointer text-blue-500"
                                    />
                                    <CloseOutlined
                                        onClick={() => handleAddressRemove(index)}
                                        className="cursor-pointer text-red-500"
                                    />
                                </div>
                            </div>

                            {isEditing && editingAddressIndex === index && (
                                <div className="space-y-4 p-4" style={{ backgroundColor: '#FBFBFB' }}>
                                    <Input
                                        placeholder="Họ"
                                        value={addressList[index].lastName}
                                        onChange={(e) =>
                                            handleInputChange('lastName', e.target.value, false, index)
                                        }
                                        prefix={<UserOutlined className="me-2" />}
                                        className="px-3 py-2 rounded-none"
                                    />
                                    <Input
                                        placeholder="Tên"
                                        value={addressList[index].firstName}
                                        onChange={(e) =>
                                            handleInputChange('firstName', e.target.value, false, index)
                                        }
                                        prefix={<UserOutlined className="me-2" />}
                                        className="px-3 py-2 rounded-none"
                                    />
                                    <Input
                                        placeholder="Địa chỉ"
                                        value={addressList[index].address}
                                        onChange={(e) =>
                                            handleInputChange('address', e.target.value, false, index)
                                        }
                                        prefix={<HomeOutlined className="me-2" />}
                                        className="px-3 py-2 rounded-none"
                                    />

                                    {/* TODO: Select địa chỉ */}

                                    <Input
                                        placeholder="Số điện thoại"
                                        value={addressList[index].phoneNumber}
                                        onChange={(e) =>
                                            handleInputChange('phoneNumber', e.target.value, false, index)
                                        }
                                        prefix={<PhoneOutlined className="me-2" />}
                                        className="px-3 py-2 rounded-none"
                                    />
                                    <Checkbox
                                        checked={addressList[index].default}
                                        onChange={(e) =>
                                            handleInputChange('default', e.target.checked, false, index)
                                        }
                                    >
                                        Đặt làm địa chỉ mặc định
                                    </Checkbox>
                                    <div className="flex justify-between">
                                        <Button
                                            type="primary"
                                            onClick={() => handleSave(index)}
                                            className="bg-black border-0 rounded-0 px-3 py-2 text-white fw-semibold uppercase"
                                        >
                                            Cập nhật
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={() => setIsEditing(false)}
                                            className="bg-gray-3 hover:!bg-slate-100 border-0 rounded-0 px-3 py-2 text-black fw-semibold uppercase"
                                        >
                                            hoặc Hủy
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {(!isEditing || editingAddressIndex !== index) && (
                                <div className="p-4" style={{ backgroundColor: '#FBFBFB' }}>
                                    <p>
                                        Địa chỉ: {address.address}
                                    </p>
                                    <p>Số điện thoại: {address.phoneNumber}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Form thêm mới địa chỉ */}
                <div className="w-[50%]">
                    <Button
                        className="w-full border-0 rounded-none text-white fw-semibold uppercase"
                        style={{ backgroundColor: '#323232', padding: '20px 0' }}
                        onClick={handleNewAddressClick}
                    >
                        Nhập địa chỉ mới
                    </Button>
                    {showNewAddressForm && (
                        <div className="space-y-4 p-4" style={{ backgroundColor: '#FBFBFB' }}>
                            <Input
                                placeholder="Họ"
                                value={newAddressData.lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value, true, -1)}
                                prefix={<UserOutlined className="me-2" />}
                                className="px-3 py-2 rounded-none"
                            />
                            <Input
                                placeholder="Tên"
                                value={newAddressData.firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value, true, -1)}
                                prefix={<UserOutlined className="me-2" />}
                                className="px-3 py-2 rounded-none"
                            />
                            <Input
                                placeholder="Địa chỉ"
                                value={newAddressData.address}
                                onChange={(e) => handleInputChange('address', e.target.value, true, -1)}
                                prefix={<HomeOutlined className="me-2" />}
                                className="px-3 py-2 rounded-none"
                            />

                            {/* TODO: Select địa chỉ */}

                            <Input
                                placeholder="Số điện thoại"
                                value={newAddressData.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value, true, -1)}
                                prefix={<PhoneOutlined className="me-2" />}
                                className="px-3 py-2 rounded-none"
                            />
                            <Checkbox
                                checked={newAddressData.default}
                                onChange={(e) => handleInputChange('default', e.target.checked, true, -1)}
                            >
                                Đặt làm địa chỉ mặc định
                            </Checkbox>
                            <div className="flex justify-between">
                                <Button
                                    type="primary"
                                    onClick={handleNewAddressSave}
                                    className="bg-black border-0 rounded-0 px-3 py-2 text-white fw-semibold uppercase"
                                >
                                    Thêm mới
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={handleCancel}
                                    className="bg-gray-3 hover:!bg-slate-100 border-0 rounded-0 px-3 py-2 text-black fw-semibold uppercase"
                                >
                                    hoặc Hủy
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddressCard;
