import Image from "next/image";
import Link from "next/link";

const OrderDetail = () => {
    return (
        <div className="order-details">
            <div className="single-widget">
                <h2>CART TOTALS</h2>
                <div className="content">
                    <ul>
                        <li>Sub Total<span>$330.00</span></li>
                        <li>(+) Shipping<span>$10.00</span></li>
                        <li className="last">Total<span>$340.00</span></li>
                    </ul>
                </div>
            </div>
            <div className="single-widget">
                <h2>Payments</h2>
                <div className="content">
                    <div className="checkbox">
                        <label className="checkbox-inline" htmlFor="1"><input name="updates" id="1"
                                                                              type="checkbox"/> Check Payments</label>
                        <label className="checkbox-inline" htmlFor="2"><input name="news" id="2" type="checkbox"/> Cash
                            On Delivery</label>
                        <label className="checkbox-inline" htmlFor="3"><input name="news" id="3"
                                                                              type="checkbox"/> PayPal</label>
                    </div>
                </div>
            </div>
            <div className="single-widget payement">
                <div className="content">
                    <Image width={50} height={50} alt="IMG" src="/favicon.png"/>
                </div>
            </div>
            <div className="single-widget get-button">
                <div className="content">
                    <div className="button">
                        <Link href="#" className="btn">proceed to checkout</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
