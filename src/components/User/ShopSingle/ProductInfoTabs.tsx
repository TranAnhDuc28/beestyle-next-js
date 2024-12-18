import ProductDescriptionTab from './ProductDescriptionTab';
import Link from "next/link";

const ProductInfoTabs = () => {
    return (
        <div className="product-info">
            <div className="nav-main">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item"><Link className="nav-link active" data-toggle="tab" href="#" role="tab">Mô tả</Link></li>
                </ul>
            </div>
            <div className="tab-content" id="myTabContent">
                <ProductDescriptionTab />
            </div>
        </div>
    );
};

export default ProductInfoTabs;
