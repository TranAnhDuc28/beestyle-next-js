'use client';

import ProductGallery from './ProductGallery';
import ProductDescription from './ProductDescription';
import ProductInfoTabs from './ProductInfoTabs';
import {useParams} from "next/navigation";
import {useProductImages} from "@/services/user/SingleProductService";

const ProductSection = () => {

    const params = useParams();
    const productId = params?.id;

    const {data: images, error} = useProductImages(productId);

    return (
        <section className="shop single section" style={{backgroundColor: '#ffffff'}}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <ProductGallery images={images}/>
                            </div>
                            <div className="col-lg-6 col-12">
                                <ProductDescription images={images}/>
                            </div>
                        </div>
                        <ProductInfoTabs/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
