import React from "react";
import Image from "next/image";
import Link from "next/link";
import {FaTrash, FaMinus, FaPlus} from 'react-icons/fa';

const CartTable = () => {
    return (
        <table className="table shopping-summery">
            <thead>
            <tr className="main-hading">
                <th>PRODUCT</th>
                <th>NAME</th>
                <th className="text-center">UNIT PRICE</th>
                <th className="text-center">QUANTITY</th>
                <th className="text-center">TOTAL</th>
                <th className="text-center"><FaTrash className="remove-icon"/></th>
            </tr>
            </thead>
            <tbody>
            {[1, 2, 3].map((item) => (
                <tr key={item}>
                    <td className="image" data-title="No">
                        <Image width={100} height={100} src="https://via.placeholder.com/100x100" alt="Product Image"/>
                    </td>
                    <td className="product-des" data-title="Description">
                        <p className="product-name">
                            <Link href="#" className="link-no-decoration">Women Dress</Link>
                        </p>
                        <p className="product-des">Maboriosam in a tonto nesciung eget distingy magndapibus.</p>
                    </td>
                    <td className="price" data-title="Price"><span>$110.00 </span></td>
                    <td className="qty" data-title="Qty">
                        <div className="input-group">
                            <div className="button minus">
                                <button type="button" className="btn btn-primary btn-number" disabled>
                                    <FaMinus/>
                                </button>
                            </div>
                            <input
                                type="text"
                                name={`quant[${item}]`}
                                className="input-number"
                                data-min="1"
                                data-max="100"
                                readOnly
                                value={item}
                            />
                            <div className="button plus">
                                <button type="button" className="btn btn-primary btn-number">
                                    <FaPlus/>
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className="total-amount" data-title="Total"><span>$220.88</span></td>
                    <td className="action" data-title="Remove">
                        <Link href="#" className="link-no-decoration">
                            <FaTrash className="remove-icon"/>
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default CartTable;