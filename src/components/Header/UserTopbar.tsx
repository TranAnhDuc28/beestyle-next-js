import React from "react";
import {MdEmail, MdAccessTime, MdPerson, MdLocalPhone, MdLogin} from 'react-icons/md';
import {TfiLocationPin} from 'react-icons/tfi';
import Link from "next/link";

export default function TopBar() {
    return (
        <div className="topbar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-12">
                        <div className="top-left">
                            <ul className="list-main">
                                <li><MdLocalPhone size={15}/> +060 (800) 801-582</li>
                                <li><MdEmail size={15}/> support@shophub.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 col-12">
                        <div className="right-content">
                            <ul className="list-main">
                                <li>
                                    <TfiLocationPin size={15}/>
                                    <Link href="#" style={{textDecoration: 'none'}}>Hệ thống cửa hàng</Link>
                                </li>
                                <li>
                                    <MdAccessTime size={15}/>
                                    <Link href="#" style={{textDecoration: 'none'}}>Giao dịch hàng ngày</Link>
                                </li>
                                <li>
                                    <MdPerson size={15}/>
                                    <Link href="#" style={{textDecoration: 'none'}}>Tài khoản của tôi</Link>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <MdLogin size={15}/>
                                    <Link href={"/login"} style={{textDecoration: 'none'}}>Đăng nhập</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};