// import Link from "next/link";
// import {AiOutlineShoppingCart} from "react-icons/ai";
// import {ImCross} from "react-icons/im";
// import Image from "next/image";
// import React, {useEffect, useState} from "react";
// import {CART_KEY, removeItemFromCart} from "@/services/user/ShoppingCartService";
// import {IoBagHandleOutline} from "react-icons/io5";
// import useAppNotifications from "@/hooks/useAppNotifications";
//
// function CartModal() {
//     const { showModal } = useAppNotifications();
//
//     const [cartItems, setCartItems] = useState(() => {
//         return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
//     });
//
//     useEffect(() => {
//         const handleCartUpdate = () => {
//             setCartItems(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
//         };
//         window.addEventListener('cartUpdated', handleCartUpdate);
//
//         return () => {
//             window.removeEventListener('cartUpdated', handleCartUpdate);
//         };
//
//     }, []);
//
//     const totalAmount = cartItems.reduce((total, item) => total + item.total_price, 0);
//
//     return (
//         <div className="col-lg-2 col-md-3 col-12">
//             <div className="right-bar">
//                 <div className="sinlge-bar shopping">
//                     <Link href={"/cart"} className="single-icon">
//                         <AiOutlineShoppingCart size={30}/>
//                         <span className="total-count">{cartItems.length}</span>
//                     </Link>
//                     <div className="shopping-item">
//                         <div className="dropdown-cart-header">
//                             <span>{cartItems.length} sản phẩm</span>
//                             <Link
//                                 href={"/cart"}
//                                 style={{textDecoration: 'none'}}
//                                 className={cartItems.length ? "" : "hidden"}
//                             >
//                                 Xem giỏ hàng
//                             </Link>
//                         </div>
//                         {cartItems.length ? (
//                             <>
//                                 <ul className="shopping-list"
//                                     style={{maxHeight: "255px", overflowY: "auto", paddingRight: 10}}>
//                                     {cartItems.map((item) => (
//                                         <li key={item.shopping_cart_id} style={{marginBottom: "10px"}}>
//                                             <Link
//                                                 href="#"
//                                                 className="remove d-flex justify-content-center align-items-center"
//                                                 title="Xoá khỏi giỏ hàng"
//                                                 onClick={(e) => {
//                                                     e.preventDefault();
//                                                     removeItemFromCart(item.shopping_cart_id, showModal);
//                                                 }}
//                                             >
//                                                 <ImCross/>
//                                             </Link>
//                                             <Link className="cart-img" href="#">
//                                                 <Image
//                                                     src={item.image}
//                                                     alt={item.product_name}
//                                                     width={70}
//                                                     height={70}
//                                                 />
//                                             </Link>
//                                             <h4>
//                                                 <Link
//                                                     href={`/product/${item.product_variant_id}/variant`}
//                                                     className="link-no-decoration"
//                                                 >
//                                                     {item.product_name}
//                                                 </Link>
//                                             </h4>
//                                             <p className="quantity">
//                                                 {item.color}x -
//                                                 <span className="amount"> {item.size}</span>
//                                                 <br/>
//                                                 {item.quantity}x -
//                                                 <span className="amount"> {item.total_price.toLocaleString()} VND</span>
//                                             </p>
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <div className="bottom">
//                                     <div className="total">
//                                         <span>Tổng</span>
//                                         <span className="total-amount">{totalAmount.toLocaleString()} VND</span>
//                                     </div>
//                                     <Link href={"/checkout"} className="btn animate">Thanh toán</Link>
//                                 </div>
//                             </>
//                         ) : (
//                             <div className="p-2 d-flex justify-content-center align-items-center flex-column">
//                                 <IoBagHandleOutline size={30}/>
//                                 <span className="text-center mt-2">Không có mục nào trong giỏ hàng này.</span>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default CartModal;