const ShopByPrice = () => {
    return (
        <div className="single-widget range">
            <h3 className="title">Shop by Price</h3>
            <div className="price-filter">
                <div className="price-filter-inner">
                    <div id="slider-range"></div>
                    <div className="price_slider_amount">
                        <div className="label-input">
                            <span>Range:</span><input type="text" id="amount" name="price"
                                                      placeholder="Add Your Price"/>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="check-box-list">
                <li>
                    <label className="checkbox-inline" htmlFor="1"><input name="news" id="1" type="checkbox"/>$20 -
                        $50<span className="count">(3)</span></label>
                </li>
                <li>
                    <label className="checkbox-inline" htmlFor="2"><input name="news" id="2" type="checkbox"/>$50 -
                        $100<span className="count">(5)</span></label>
                </li>
                <li>
                    <label className="checkbox-inline" htmlFor="3"><input name="news" id="3" type="checkbox"/>$100 -
                        $250<span
                            className="count">(8)</span></label>
                </li>
            </ul>
        </div>
    );
};

export default ShopByPrice;
