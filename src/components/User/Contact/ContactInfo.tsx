import {PhoneOutlined, MailOutlined, EnvironmentOutlined} from '@ant-design/icons';
import Link from "next/link";
import Image from "next/image";

const ContactInfo = () => {
    return (
        <div className="col-lg-4 col-12">
            <div className="single-head">
                {/*<div className="d-flex justify-content-center">*/}
                {/*    <Image*/}
                {/*        src="/wait_in_line.png"*/}
                {/*        alt="IMG" width={300} height={200}*/}
                {/*        style={{borderRadius: 10}}*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="single-info mt-5">
                    <div className="d-flex align-items-center">
                        <i className="fa fa-phone"><PhoneOutlined/></i>
                        <h4 className="title ml-3">Gọi cho chúng tôi:</h4>
                    </div>
                    <ul style={{marginLeft: 30}}>
                        <li> 0123 456 789</li>
                        <li> 0987 654 321</li>
                    </ul>
                </div>
                <div className="single-info">
                    <div className="d-flex align-items-center">
                        <i className="fa fa-envelope-open"><MailOutlined/></i>
                        <h4 className="title ml-3">Email:</h4>
                    </div>
                    <ul style={{marginLeft: 30}}>
                        <li><Link className="link-no-decoration"
                                  href="mailto:info@beestyle.com">info@beestyle.com</Link>
                        </li>
                        <li><Link className="link-no-decoration"
                                  href="mailto:support@beestyle.com">support@beestyle.com</Link>
                        </li>
                    </ul>
                </div>
                <div className="single-info">
                    <div className="d-flex align-items-center">
                        <i className="fa fa-location-arrow"><EnvironmentOutlined/></i>
                        <h4 className="title ml-3">Địa chỉ:</h4>
                    </div>
                    <ul style={{marginLeft: 30}}>
                        <Link
                            className="link-no-decoration"
                            href="https://www.google.com/maps?q=ST001, Phường Phương Canh, Quận Nam Từ Liêm, TP Hà Nội"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ST001, Phường Phương Canh, Quận Nam Từ Liêm, TP Hà Nội
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;