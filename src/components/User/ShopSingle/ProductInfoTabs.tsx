import ProductDescriptionTab from './ProductDescriptionTab';
import ProductReviewsTab from './ProductReview';

const ProductInfoTabs = () => {
    return (
        <div className="product-info">
            <div className="nav-main">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#description" role="tab">Description</a></li>
                    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#reviews" role="tab">Reviews</a></li>
                </ul>
            </div>
            <div className="tab-content" id="myTabContent">
                <ProductDescriptionTab />
                <ProductReviewsTab />
            </div>
        </div>
    );
};

export default ProductInfoTabs;
