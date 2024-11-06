// components/ProductSection.tsx
import ProductGallery from './ProductGallery';
import ProductDescription from './ProductDescription';
import ProductInfoTabs from './ProductInfoTabs';

const ProductSection = () => {
    return (
        <section className="shop single section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <ProductGallery/>
                            </div>
                            <div className="col-lg-6 col-12">
                                <ProductDescription/>
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
