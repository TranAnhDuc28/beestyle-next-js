import {PhoneOutlined, MailOutlined, EnvironmentOutlined} from '@ant-design/icons';
import Link from "next/link";

const ContactInfo = () => {
    return (
        <div className="col-lg-4 col-12">
            <div className="single-head">
                <div className="single-info">
                    <i className="fa fa-phone"><PhoneOutlined/></i>
                    <h4 className="title">Call us Now:</h4>
                    <ul>
                        <li>+123 456-789-1120</li>
                        <li>+522 672-452-1120</li>
                    </ul>
                </div>
                <div className="single-info">
                    <i className="fa fa-envelope-open"><EnvironmentOutlined/></i>
                    <h4 className="title">Email:</h4>
                    <ul>
                        <li><Link className="link-no-decoration"
                                  href="mailto:info@yourwebsite.com">info@yourwebsite.com</Link></li>
                        <li><Link className="link-no-decoration"
                                  href="mailto:info@yourwebsite.com">support@yourwebsite.com</Link></li>
                    </ul>
                </div>
                <div className="single-info">
                    <i className="fa fa-location-arrow"><MailOutlined/></i>
                    <h4 className="title">Our Address:</h4>
                    <ul>
                        <li>KA-62/1, Travel Agency, 45 Grand Central Terminal, New York.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;