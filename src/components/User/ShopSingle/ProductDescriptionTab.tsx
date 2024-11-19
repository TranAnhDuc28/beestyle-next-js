'use client';

import React from "react";
import { Typography, Divider, List } from "antd";

const { Title, Paragraph, Text } = Typography;

const ProductDescriptionTab = () => {
    const productDescription = `
        Áo sơ mi nam nữ của chúng tôi mang đến phong cách trẻ trung, hiện đại và phù hợp cho mọi hoàn cảnh. 
        Được làm từ chất liệu vải cao cấp, sản phẩm không chỉ mang lại cảm giác thoáng mát, dễ chịu mà còn đảm bảo độ bền cao. 
        Với thiết kế tối giản, tinh tế, áo dễ dàng phối cùng nhiều loại trang phục khác, tạo nên phong cách riêng cho bạn.
    `;

    const productAdditionalInfo = `
        Các chi tiết may tinh xảo, đường chỉ chắc chắn và kiểu dáng ôm vừa vặn giúp áo trở thành lựa chọn lý tưởng 
        cho cả công việc lẫn dạo phố. Chúng tôi cam kết mang đến sản phẩm chất lượng cao với giá cả hợp lý, 
        đáp ứng nhu cầu thời trang của bạn.
    `;

    const productFeatures = [
        "Chất liệu vải cotton mềm mại, thoáng mát",
        "Thiết kế đơn giản, dễ phối đồ",
        "Nhiều kích cỡ và màu sắc để lựa chọn",
        "Dễ dàng giặt máy, không phai màu",
    ];

    return (
        <div className="tab-pane fade show active" id="description" role="tabpanel">
            <div className="tab-single" style={{ marginTop: '20px' }}>
                <Typography>
                    <Title level={4}>Giới thiệu sản phẩm</Title>
                    <Paragraph>{productDescription}</Paragraph>
                    <Paragraph>{productAdditionalInfo}</Paragraph>
                    <Divider />
                    <Title level={5}>Đặc điểm nổi bật:</Title>
                    <List
                        dataSource={productFeatures}
                        renderItem={(item) => (
                            <List.Item>
                                <Text>- {item}</Text>
                            </List.Item>
                        )}
                    />
                </Typography>
            </div>
        </div>
    );
};

export default ProductDescriptionTab;
