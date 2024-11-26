import React from "react";
import Image from "next/image";
import Link from "next/link";
import {FaTrash} from 'react-icons/fa';
import {Table, Button} from "antd";
import {removeItemFromCart} from "@/services/user/ShoppingCartService";
import useAppNotifications from "@/hooks/useAppNotifications";
import QuantityControl from "@/components/Header/cart/QuantityControl";

const CartTable = ({cartItems, updateCartItems}: any) => {
    const {showModal} = useAppNotifications();

    const handleQuantityChange = (index: number, operation: 'increment' | 'decrement') => {
        const newCartItems = [...cartItems];
        const item = newCartItems[index];

        if (operation === 'increment') {
            item.quantity = Math.min(item.quantity + 1, 1000);
        } else if (operation === 'decrement') {
            item.quantity = Math.max(item.quantity - 1, 1);
        }

        item.total_price = item.quantity * item.discounted_price;
        newCartItems[index] = item;

        updateCartItems(newCartItems);
    };


    const data = cartItems.map((item, index) => ({
        key: index,
        productImage: (
            <Image width={100} height={100} src="https://via.placeholder.com/100x100" alt="Product Image"/>
        ),
        productName: (
            <>
                <Link href="#" className="link-no-decoration">{item.product_name}</Link>
                <p className="product-description">{item.description}</p>
            </>
        ),
        unitPrice: (
            <>
                <del className="mr-3 text-danger">{item.original_price.toString()} đ</del>
                <span>{item.discounted_price.toString()} đ</span>
            </>
        ),
        quantity: (
            <div className="input-group d-flex justify-content-center">
                <QuantityControl
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(index, 'decrement')}
                    onIncrement={() => handleQuantityChange(index, 'increment')}
                    onDecrement={() => handleQuantityChange(index, 'decrement')}
                />
            </div>
        ),
        total: item.total_price.toString() + " đ",
        remove: (
            <Button onClick={() => removeItemFromCart(item.shopping_cart_id, showModal)} icon={<FaTrash/>} type="text"/>
        )
    }));

    const columns = [
        {
            title: 'ẢNH',
            dataIndex: 'productImage',
            key: 'productImage',
            width: 120,
        },
        {
            title: 'TÊN SẢN PHẨM',
            dataIndex: 'productName',
            key: 'productName',
            width: 300,
        },
        {
            title: 'ĐƠN GIÁ',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            align: 'center',
            width: 150,
        },
        {
            title: 'SỐ LƯỢNG',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: 150,
        },
        {
            title: 'TỔNG',
            dataIndex: 'total',
            key: 'total',
            align: 'center',
            width: 150,
        },
        {
            title: '',
            dataIndex: 'remove',
            key: 'remove',
            align: 'center',
            width: 80,
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
