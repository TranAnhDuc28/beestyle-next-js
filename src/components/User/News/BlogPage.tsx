'use client';

import UserLoader from '@/components/Loader/UserLoader';
import { Typography } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const { Title, Paragraph } = Typography;

const fetcher = (...args: [string]) => fetch(...args).then((res) => res.json());

const BlogPage = () => {
    const blogApi = 'https://my-json-server.typicode.com/anhvdph33906/beestyle-blogs/db';
    const { data: blogData, error } = useSWR(blogApi, fetcher);
    const [blogPosts, setBlogPosts] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (blogData && blogData.data) {
            setBlogPosts(blogData.data);
        }
    }, [blogData]);

    if (error) return <div className='text-center p-5'>Không có dữ liệu</div>;
    if (!blogPosts || blogPosts.length === 0) return <UserLoader />;

    const currentBlog = blogPosts[Number(params.id) - 1];

    return (
        <>
            <div className="container mx-auto p-4 md:p-8">
                {currentBlog && (
                    <div>
                        <Title level={1} className="text-2xl md:text-3xl font-bold uppercase text-center">
                            {currentBlog[0]?.title}
                        </Title>
                        {currentBlog.slice(0, 2).map((data, index) => (
                            <div key={index}>
                                <Typography className="text-center mb-8">
                                    <Paragraph className="text-sm md:text-base text-gray-700">
                                        {data.intro}
                                    </Paragraph>
                                </Typography>

                                <section className="mb-8 flex justify-center">
                                    <Image
                                        src={data.imageUrl}
                                        alt="Be Women, Be Proud"
                                        width={600} height={800}
                                        unoptimized
                                    />
                                </section>

                                <section>
                                    <Paragraph className="text-sm md:text-base text-gray-700">
                                        {data.content}
                                    </Paragraph>
                                </section>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogPage;
