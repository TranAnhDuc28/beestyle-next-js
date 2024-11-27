import {Row, Col} from "antd";
import Image from "next/image";
import {LiaShippingFastSolid} from "react-icons/lia";
import {LuAlarmClock} from "react-icons/lu";
import {CgArrowsExchange} from "react-icons/cg";
import {MdOutlineLocalOffer} from "react-icons/md";
import {IoShieldCheckmarkOutline} from "react-icons/io5";

const InfoSection = () => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24} className="mt-3">
                    <Image
                        src={"/payment-variant.png"}
                        width={635}
                        height={300}
                        alt="IMG"
                        unoptimized
                    />
                </Col>

                <Col span={24}>
                    <ul className="list-none space-y-2 text-gray-600 p-0 ms-1" style={{fontSize: '13px'}}>
                        <li>
                            <LiaShippingFastSolid size={21} className="mr-2 d-inline"/>
                            <b>Miễn phí vận chuyển: </b>
                            <span>Đơn hàng từ 498k</span>
                        </li>
                        <li>
                            <LuAlarmClock size={21} className="mr-2 d-inline"/>
                            <b>Giao hàng: </b>
                            Từ 3 - 5 ngày trên cả nước
                        </li>
                        <li>
                            <CgArrowsExchange size={21} className="mr-2 d-inline"/>
                            <b>Miễn phí đổi trả: </b>
                            Tại 267+ cửa hàng trong 15 ngày
                        </li>
                        <li>
                            <MdOutlineLocalOffer size={21} className="mr-2 d-inline"/>
                            Sử dụng mã giảm giá 0 bước thanh toán
                        </li>
                        <li>
                            <IoShieldCheckmarkOutline size={21} className="mr-2 d-inline"/>
                            Thông tin bảo mật và mã hóa
                        </li>
                    </ul>
                </Col>

                <Col span={24}>
                    <div className="text-sm text-gray-600 mt-4">
                        <b>*</b> Một thiết kế áo sơ mi basic, thanh lịch. Sản phẩm được dệt từ các sợi
                        Nano - polyester siêu mịn, mềm mại, hạn chế nhăn nhau tốt. Đơn giản nhưng không nhàm chán, chiếc
                        áo này sẽ giúp chị em sáng tạo thật nhiều cách mix & match.
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default InfoSection;
