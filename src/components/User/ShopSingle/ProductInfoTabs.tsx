import { Typography } from 'antd';
import Title from 'antd/lib/typography/Title';

interface IProductInfo {
    productDescription:  | undefined;
}

const ProductInfoTabs: React.FC<IProductInfo> = ({ productDescription }) => {
    return (
        <div className="product-info">
            <div className="nav-main">
                <Typography>
                    <Title level={4}>Giới thiệu sản phẩm</Title>
                </Typography>
            </div>
            <div className="tab-content" id="myTabContent">
                {/* Test */}
                <p>
                    Áo sơ mi nam nữ của chúng tôi mang đến phong cách trẻ trung, hiện đại và phù hợp cho mọi hoàn cảnh.
                    Được làm từ chất liệu vải cao cấp, sản phẩm không chỉ mang lại cảm giác thoáng mát, dễ chịu mà còn đảm bảo độ bền cao.
                    Với thiết kế tối giản, tinh tế, áo dễ dàng phối cùng nhiều loại trang phục khác, tạo nên phong cách riêng cho bạn.
                </p>
                <p>{productDescription}</p>
            </div>
        </div>
    );
};

export default ProductInfoTabs;
