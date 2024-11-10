import React from "react";
import {MdEmail, MdLocalPhone, MdLogin} from 'react-icons/md';
import {AiOutlineUser} from "react-icons/ai";
import Link from "next/link";

export default function TopBar() {
    return (
        <div className="topbar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-12">
                        <div className="top-left">
                            <ul className="list-main">
                                <li>
                                    <div className={"flex"}>
                                        <MdLocalPhone
                                            size={18}
                                            style={{color: '#F7941D', marginRight: 7}}
                                        />
                                        +84 123 456 789
                                    </div>
                                </li>
                                <li>
                                    <div className={"flex"}>
                                        <MdEmail
                                            size={18}
                                            style={{color: '#F7941D', marginRight: 7}}
                                        />
                                        support@beestyle.com
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                        <div className="right-content">
                            <ul className="list-main">
                                {/*<li>*/}
                                {/*    <div className={"flex"}>*/}
                                {/*        <MdOutlineAddLocationAlt*/}
                                {/*            size={18}*/}
                                {/*            style={{color: '#F7941D', marginRight: 7}}*/}
                                {/*        />*/}
                                {/*        <Link href="#" style={{textDecoration: 'none'}}>*/}
                                {/*            Hệ thống cửa hàng*/}
                                {/*        </Link>*/}
                                {/*    </div>*/}
                                {/*</li>*/}
                                {/*<li>*/}
                                {/*    <div className={"flex"}>*/}
                                {/*        <LuAlarmClock*/}
                                {/*            size={18}*/}
                                {/*            style={{color: '#F7941D', marginRight: 7}}*/}

                                {/*        />*/}
                                {/*        <Link href="#" style={{textDecoration: 'none'}}>*/}
                                {/*            Giao dịch hàng ngày*/}
                                {/*        </Link>*/}
                                {/*    </div>*/}
                                {/*</li>*/}
                                <li>
                                    <div className={"flex"}>
                                        <AiOutlineUser
                                            size={18}
                                            style={{color: '#F7941D', marginRight: 7}}
                                        />
                                        <Link href="#" style={{textDecoration: 'none'}}>
                                            Tài khoản của tôi
                                        </Link>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <div className={"flex"}>
                                        <MdLogin
                                            size={18}
                                            style={{color: '#F7941D', marginRight: 7}}
                                        />
                                        <Link href={"/login"} style={{textDecoration: 'none'}}>
                                            Đăng nhập
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};