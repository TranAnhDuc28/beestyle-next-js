'use client';

import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {FaTrash, FaMinus, FaPlus} from 'react-icons/fa';
import {Table, Button, Input} from "antd";

const CartTable = () => {

    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    const handleIncrement = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, 1000));
    };

    const data = [1, 2, 3].map(item => ({
        key: item,
        productImage: (
            <Image width={100} height={100} src="https://via.placeholder.com/100x100" alt="Product Image"/>
        ),
        productName: (
            <>
                <Link href="#" className="link-no-decoration">Sản phẩm</Link>
                <p className="product-description">Sản phẩm được thiết kế tiện lợi và phù hợp cho mọi gia đình..</p>
            </>
        ),
        unitPrice: "110.000 VND",
        quantity: (
            <div className="input-group">
                <Button
                    icon={<FaMinus style={{color: '#fff'}}/>}
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    style={{background: '#F7941D'}}
                />
                <Input
                    style={{width: "60px", textAlign: "center"}}
                    readOnly
                    value={quantity}
                />
                <Button
                    icon={<FaPlus style={{color: '#fff'}}/>}
                    onClick={handleIncrement}
                    disabled={quantity >= 1000}
                    style={{background: '#F7941D'}}
                />
            </div>
        ),
        total: "220.000 VND",
        remove: (
            <Button icon={<FaTrash/>} type="text"/>
        )
    }));

    const columns = [
        {
            title: 'ẢNH',
            dataIndex: 'productImage',
            key: 'productImage',
        },
        {
            title: 'TÊN SẢN PHẨM',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'ĐƠN GIÁ',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            align: 'center',
        },
        {
            title: 'SỐ LƯỢNG',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'TỔNG',
            dataIndex: 'total',
            key: 'total',
            align: 'center',
        },
        {
            title: '',
            dataIndex: 'remove',
            key: 'remove',
            align: 'center',
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="shopping-summery custom-table-header"
        />
    );
}

export default CartTable;
