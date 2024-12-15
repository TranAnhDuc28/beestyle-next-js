import React from "react";
import Link from "next/link";
import Image from "next/image";
import {IoHomeOutline, IoMailUnreadOutline} from "react-icons/io5";
import {FiMapPin} from "react-icons/fi";
import {FaPhone} from "react-icons/fa";
import {Layout} from "antd";

const {Footer} = Layout;

export default function UserFooter() {
    return (
        <div className="footer">
            <div className="footer-top section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-6 col-12">
                            <div className="single-footer about">
                                <div className="logo">
                                    <Link className="link-no-decoration" href="#">
                                        <img src="/logo2.png" alt="#"
                                             style={{width: 110, height: "auto"}}
                                        />
                                    </Link>
                                </div>
                                <p className="text">
                                    Chúng tôi luôn cập nhật những xu hướng mới nhất, chú trọng đến chất liệu cao cấp và
                                    từng chi tiết thiết kế, đảm bảo rằng mỗi sản phẩm đều thể hiện phong cách và chất
                                    lượng đẳng cấp. Đến với Beestyle, khách hàng không chỉ tìm thấy những bộ trang phục
                                    hoàn hảo mà còn khám phá được phong cách độc đáo của riêng mình.
                                </p>

                                <h6 className="text-white">Góp ý khiếu nại</h6>
                                <p className="call">
                                    <span className="mt-3">
                                        <Link className="d-flex" href="tel:123456789">
                                            <FaPhone className="mr-2"/> 0123 456 789
                                        </Link>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-12">
                            <div className="single-footer links">
                                <h4>Liên hệ</h4>
                                <ul className="p-0">
                                    <li><Link className="link-no-decoration" href="#">Giới thiệu</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Tin tức</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Hệ thống khuyến mãi</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Trợ giúp</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-12">
                            <div className="single-footer links">
                                <h4>Dịch vụ khách hàng</h4>
                                <ul className="p-0">
                                    <li><Link className="link-no-decoration" href="#">Hướng dẫn mua hàng</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Đăng ký tài khoản</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Chính sách giao hàng</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Đổi trả hoàn tiền</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Ưu đãi sinh nhật khách hàng</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="single-footer social">
                                <h4>Thông tin</h4>
                                <div className="contact">
                                    <ul className="p-0">
                                        <li className="d-flex mb-3"><IoHomeOutline size={30} className="mr-2"/> CÔNG TY
                                            CỔ PHẦN THỜI TRANG BEESTYLE
                                        </li>
                                        <li className="d-flex mb-3"><FiMapPin size={25} className="mr-2"/> Phương Canh,
                                            Nam Từ Liêm, Hà Nội
                                        </li>
                                        <li className="d-flex"><IoMailUnreadOutline size={25}
                                                                                    className="mr-2"/> info@beestyle.com
                                        </li>
                                    </ul>
                                </div>
                                <ul className="p-0">
                                    <li><Link className="link-no-decoration" href="#"><i
                                        className="ti-facebook"/></Link></li>
                                    <li><Link className="link-no-decoration" href="#"><i className="ti-twitter"/></Link>
                                    </li>
                                    <li><Link className="link-no-decoration" href="#"><i className="ti-flickr"/></Link>
                                    </li>
                                    <li><Link className="link-no-decoration" href="#"><i
                                        className="ti-instagram"/></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <div className="inner">
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <div className="left">
                                    <p>@ Nhóm SD-60 SUCCESS</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="right d-flex">
                                    <img
                                        src="https://yody.vn/images/identity-badge/bct_v1.png"
                                        alt="#"
                                        style={{width: 105, height: "auto"}}
                                        className="mr-5"
                                    />
                                    <img
                                        src="https://yody.vn/images/identity-badge/dmca_v1.png"
                                        style={{width: 80, height: "auto"}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
