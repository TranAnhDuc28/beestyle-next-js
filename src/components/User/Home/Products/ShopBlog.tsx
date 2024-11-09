'use client';

import {Typography, Card, Row, Col} from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const {Title, Text} = Typography;

const blogs = [
    {
        id: 1,
        date: '22 Tháng 7, 2020. Thứ Hai',
        title: 'Sed adipiscing ornare.',
        link: '#',
        image: '/img370x300.png',
    },
    {
        id: 2,
        date: '22 Tháng 7, 2020. Thứ Hai',
        title: 'Giảm giá thời trang nam mùa đông',
        link: '#',
        image: '/img370x300.png',
    },
    {
        id: 3,
        date: '22 Tháng 7, 2020. Thứ Hai',
        title: 'Lễ hội thời trang nữ',
        link: '#',
        image: '/img370x300.png',
    },
];

export default function ShopBlogSection() {
    return (
        <section className="shop-blog section">
            <div className="container">
                <div className="section-title">
                    <Title level={2}>Tin thời trang</Title>
                </div>

                <Row gutter={[16, 16]}>
                    {blogs.map((blog) => (
                        <Col key={blog.id} lg={8} md={12} sm={24}>
                            <Card
                                hoverable
                                cover={<Image width={370} height={300} src={blog.image} alt={blog.title}/>}
                                className="shop-single-blog"
                            >
                                <div className="content">
                                    <Text className="date" type="secondary">
                                        {blog.date}
                                    </Text>
                                    <Title level={4} className="title mb-4">
                                        <Link href={blog.link} className="link-no-decoration text-dark">
                                            {blog.title}
                                        </Link>
                                    </Title>
                                    <Link
                                        href={blog.link}
                                        className="more-btn link-no-decoration btn btn-dark text-white"
                                    >
                                        Chi tiết
                                    </Link>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
}
