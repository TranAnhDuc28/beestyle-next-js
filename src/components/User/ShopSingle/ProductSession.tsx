'use client';

import ProductGallery from './ProductGallery';
import ProductDescription from './ProductDescription';
import ProductInfoTabs from './ProductInfoTabs';
import { useParams } from "next/navigation";
import { useProduct, useProductImages } from "@/services/user/SingleProductService";
import BreadcrumbSection from '@/components/Breadcrumb/BreadCrumb';

const ProductSection = () => {

    const params = useParams();
    const productId = params?.id;

    const { data: product, error: errProduct } = useProduct(productId);
    const { data: images, error: errImages } = useProductImages(productId);

    const breadcrumbItems = [
        { title: 'Trang chủ', path: '/' },
        { title: product?.categoryName, path: '/product' },
        { title: product?.productName },
    ];

    return (
        <>
            <BreadcrumbSection items={breadcrumbItems} />
            <section className="shop single section" style={{ backgroundColor: '#ffffff' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <ProductGallery images={images} />
                                </div>
                                <div className="col-lg-6 col-12">
                                    <ProductDescription images={images} />
                                </div>
                            </div>
                            <ProductInfoTabs productDescription={product?.description} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductSection;
