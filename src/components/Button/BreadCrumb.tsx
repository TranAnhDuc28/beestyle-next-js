'use client';

import React from 'react';
import {Breadcrumb} from 'antd';
import Link from 'next/link';
import {HomeOutlined} from '@ant-design/icons';

interface BreadcrumbItem {
    title: string;
    href?: string;
}

interface BreadcrumbSectionProps {
    items: BreadcrumbItem[];
}

const BreadcrumbSection: React.FC<BreadcrumbSectionProps> = ({items}) => {
    return (
        <div className="breadcrumb-section" style={{background: '#f9f9f9', padding: '10px 0'}}>
            <div className="container">
                <Breadcrumb separator=">" style={{fontSize: '16px', fontWeight: '500'}}>
                    {items.map((item, index) => (
                        <Breadcrumb.Item key={index}>
                            {item.href ? (
                                <Link href={item.href} className="link-no-decoration" passHref>
                  <span style={{color: index === items.length - 1 ? '#333' : '#1890ff'}}>
                    {index === 0 && <HomeOutlined style={{fontSize: '20px', marginRight: '5px'}}/>}
                      {item.title}
                  </span>
                                </Link>
                            ) : (
                                <span style={{color: '#333'}}>{item.title}</span>
                            )}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
        </div>
    );
};

export default BreadcrumbSection;
