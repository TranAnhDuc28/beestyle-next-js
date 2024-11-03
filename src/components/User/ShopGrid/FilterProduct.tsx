const FilterProduct = () => {
    return (
        <div className="shop-top">
            <div className="shop-shorter">
                <div className="single-shorter">
                    <label>Show :</label>
                    <select defaultValue="09">
                        <option value="09">09</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                    </select>
                </div>
                <div className="single-shorter">
                    <label>Sort By :</label>
                    <select defaultValue="Name">
                        <option value="Name">Name</option>
                        <option value="Price">Price</option>
                        <option value="Size">Size</option>
                    </select>
                </div>
            </div>
            <ul className="view-mode">
                <li className="active"><a href="#"><i className="fa fa-th-large"></i></a></li>
                <li><a href="#"><i className="fa fa-th-list"></i></a></li>
            </ul>
        </div>

    )
}

export default FilterProduct;