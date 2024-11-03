import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function MediumBanner() {
    return (
        <section className="midium-banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="single-banner">
                            <Image src="/img600x370.png" alt="#" width={600} height={370}/>
                            <div className="content">
                                <p>Man&#39;s Collectons</p>
                                <h3>Man&#39;s items <br/>Up to<span> 50%</span></h3>
                                <Link href="#">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="single-banner">
                            <Image src="/img600x370.png" alt="#" width={600} height={370}/>
                            <div className="content">
                                <p>shoes women</p>
                                <h3>mid season <br/> up to <span>70%</span></h3>
                                <Link href="#" className="btn">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}