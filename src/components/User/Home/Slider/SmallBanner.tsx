import Image from "next/image";
import Link from "next/link";

export default function SmallBanner() {
    return (
        <section className="small-banner section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-banner">
                            <Image
                                src="https://yody.vn/images/menu-desktop/menu_woman.png"
                                alt="IMG"
                                width={600}
                                height={370}
                            />
                            <div className="content">
                                <p>Man&#39;s Collectons</p>
                                <h3>Summer travel <br/> collection</h3>
                                <Link href="#" className={"link-no-decoration"}>Discover Now</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-banner">
                            <Image
                                src="https://yody.vn/images/menu-desktop/menu_woman.png"
                                alt="IMG"
                                width={600}
                                height={370}
                            />
                            <div className="content">
                                <p>Bag Collectons</p>
                                <h3>Awesome Bag <br/> 2020</h3>
                                <Link href="#" className={"link-no-decoration"}>Shop Now</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="single-banner tab-height">
                            <Image
                                src="https://yody.vn/images/menu-desktop/menu_woman.png"
                                alt="IMG"
                                width={600}
                                height={370}
                            />
                            <div className="content">
                                <p>Flash Sale</p>
                                <h3>Mid Season <br/> Up to <span>40%</span> Off</h3>
                                <Link href="#" className={"link-no-decoration"}>Discover Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}