const ProductList = ({product}) => {
    return (
        <div className="single-product">
            <div className="product-img">
                <a href="#">
                    <img className="default-img" src={product.defaultImg} alt="#"/>
                    <img className="hover-img" src={product.hoverImg} alt="#"/>
                </a>
                <div className="button-head">
                    <div className="product-action">
                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#">
                            <i className="ti-eye"></i><span>Quick Shop</span>
                        </a>
                        <a title="Wishlist" href="#">
                            <i className="ti-heart"></i><span>Add to Wishlist</span>
                        </a>
                        <a title="Compare" href="#">
                            <i className="ti-bar-chart-alt"></i><span>Add to Compare</span>
                        </a>
                    </div>
                    <div className="product-action-2">
                        <a title="Add to cart" href="#">Add to cart</a>
                    </div>
                </div>
            </div>
            <div className="product-content">
                <h3><a href="#">{product.title}</a></h3>
                <div className="product-price">
                    <span>{product.price}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
