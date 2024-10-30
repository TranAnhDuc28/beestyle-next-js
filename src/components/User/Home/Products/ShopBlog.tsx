import React from "react";

function ShopBlog() {
    return (
        <section className="shop-blog section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title">
                            <h2>From Our Blog</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="shop-single-blog">
                            <img src="/img370x300.png" alt="#" />
                            <div className="content">
                                <p className="date">22 July , 2020. Monday</p>
                                <a href="#" className="title">Sed adipiscing ornare.</a>
                                <a href="#" className="more-btn">Continue Reading</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="shop-single-blog">
                            <img src="/img370x300.png" alt="#" />
                            <div className="content">
                                <p className="date">22 July, 2020. Monday</p>
                                <a href="#" className="title">Man’s Fashion Winter Sale</a>
                                <a href="#" className="more-btn">Continue Reading</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="shop-single-blog">
                            <img src="/img370x300.png" alt="#" />
                            <div className="content">
                                <p className="date">22 July, 2020. Monday</p>
                                <a href="#" className="title">Women Fashion Festive</a>
                                <a href="#" className="more-btn">Continue Reading</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShopBlog;