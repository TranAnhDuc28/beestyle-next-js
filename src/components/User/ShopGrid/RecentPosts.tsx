const RecentPosts = () => {
    return (
        <div className="single-widget recent-post">
            <h3 className="title">Recent post</h3>
            <div className="single-post first">
                <div className="image">
                    <img src="https://via.placeholder.com/75x75" alt="#"/>
                </div>
                <div className="content">
                    <h5><a href="#">Girls Dress</a></h5>
                    <p className="price">$99.50</p>
                    <ul className="reviews">
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li><i className="ti-star"></i></li>
                        <li><i className="ti-star"></i></li>
                    </ul>
                </div>
            </div>
            <div className="single-post first">
                <div className="image">
                    <img src="https://via.placeholder.com/75x75" alt="#"/>
                </div>
                <div className="content">
                    <h5><a href="#">Women Clothings</a></h5>
                    <p className="price">$99.50</p>
                    <ul className="reviews">
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li><i className="ti-star"></i></li>
                    </ul>
                </div>
            </div>
            <div className="single-post first">
                <div className="image">
                    <img src="https://via.placeholder.com/75x75" alt="#"/>
                </div>
                <div className="content">
                    <h5><a href="#">Man Tshirt</a></h5>
                    <p className="price">$99.50</p>
                    <ul className="reviews">
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                        <li className="yellow"><i className="ti-star"></i></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RecentPosts;
