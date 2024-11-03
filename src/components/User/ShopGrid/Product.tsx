import Category from './Category';
import ShopByPrice from './ShopByPrice';
import RecentPosts from './RecentPosts';
import Manufacturers from './Manufacturers';
import ProductList from './ProductsList';
import FilterProduct from "@/components/User/ShopGrid/FilterProduct";

const Product = () => {
    const products = [
        {
            defaultImg: "https://via.placeholder.com/550x750",
            hoverImg: "https://via.placeholder.com/550x750",
            title: "Women Hot Collection",
            price: "$29.00"
        },
    ];

    return (
        <section className="product-area shop-sidebar shop section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                        <div className="shop-sidebar">
                            <Category/>
                            <ShopByPrice/>
                            <RecentPosts/>
                            <Manufacturers/>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8 col-12">
                        <div className="row">
                            <div className="col-12">
                                <FilterProduct/>
                            </div>
                        </div>
                        <div className="row">
                            {products.map((product, index) => (
                                <div className="col-lg-4 col-md-6 col-12" key={index}>
                                    <ProductList product={product}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Product;
