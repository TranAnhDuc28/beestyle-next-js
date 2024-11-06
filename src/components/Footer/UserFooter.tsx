import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function UserFooter() {
    return (
        <footer className="footer">
            <div className="footer-top section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-6 col-12">
                            <div className="single-footer about">
                                <div className="logo">
                                    <Link className="link-no-decoration" href="#"><Image src="/logo2.png" alt="#" width={110} height={32}/></Link>
                                </div>
                                <p className="text">Praesent dapibus, neque id cursus ucibus, tortor neque egestas
                                    augue, magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis,
                                    accumsan porttitor, facilisis luctus, metus.</p>
                                <p className="call">Got Question? Call us 24/7<span><Link href="tel:123456789">+0123 456 789</Link></span>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-12">
                            <div className="single-footer links">
                                <h4>Information</h4>
                                <ul>
                                    <li><Link className="link-no-decoration" href="#">About Us</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Faq</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Terms &amp; Conditions</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Contact Us</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Help</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-12">
                            <div className="single-footer links">
                                <h4>Customer Service</h4>
                                <ul>
                                    <li><Link className="link-no-decoration" href="#">Payment Methods</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Money-back</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Returns</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Shipping</Link></li>
                                    <li><Link className="link-no-decoration" href="#">Privacy Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="single-footer social">
                                <h4>Get In Tuch</h4>
                                <div className="contact">
                                    <ul>
                                        <li>NO. 342 - London Oxford Street.</li>
                                        <li>012 United Kingdom.</li>
                                        <li>info@eshop.com</li>
                                        <li>+032 3456 7890</li>
                                    </ul>
                                </div>
                                <ul>
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
                                    <p>Nhóm SD-60 SUCCESS</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <div className="right">
                                    <Image src="/payments.png" alt="#" width={250} height={20}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
