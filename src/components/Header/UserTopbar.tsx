import React from "react";

export default function TopBar () {
    return (
        <div className="topbar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-12">
                            <div className="top-left">
                                <ul className="list-main">
                                    <li><i className="ti-headphone-alt"></i> +060 (800) 801-582</li>
                                    <li><i className="ti-email"></i> support@shophub.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-12">
                            <div className="right-content">
                                <ul className="list-main">
                                    <li><i className="ti-location-pin"></i> Hệ thống cửa hàng</li>
                                    <li><i className="ti-alarm-clock"></i> <a href="#">Giao dịch hàng ngày</a></li>
                                    <li><i className="ti-user"></i> <a href="#">Tài khoản của tôi</a></li>
                                    <li><i className="ti-power-off"></i><a href="login.html#">Đăng nhập</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
};