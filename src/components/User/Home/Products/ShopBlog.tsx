import React from "react";
import Image from "next/image";
import Link from "next/link";

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
                            <Image width={370} height={300} src="/img370x300.png" alt="#"/>
                            <div className="content">
                                <p className="date">22 July , 2020. Monday</p>
                                <Link href="#" className="title link-no-decoration">Sed adipiscing ornare.</Link>
                                <Link href="#" className="more-btn">Continue Reading</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="shop-single-blog">
                            <Image width={370} height={300} src="/img370x300.png" alt="#"/>
                            <div className="content">
                                <p className="date">22 July, 2020. Monday</p>
                                <Link href="#" className="title link-no-decoration">Man’s Fashion Winter Sale</Link>
                                <Link href="#" className="more-btn">Continue Reading</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="shop-single-blog">
                            <Image width={370} height={300} src="/img370x300.png" alt="#"/>
                            <div className="content">
                                <p className="date">22 July, 2020. Monday</p>
                                <Link href="#" className="title link-no-decoration">Women Fashion Festive</Link>
                                <Link href="#" className="more-btn">Continue Reading</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShopBlog;