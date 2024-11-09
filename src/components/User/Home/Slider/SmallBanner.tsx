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
                                <p>Bộ sưu tập nổi bật</p>
                                <h3>Bộ sưu tập <br/> Du lịch mùa hè</h3>
                                <Link href="#" className={"link-no-decoration"}>Khám phá ngay</Link>
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
                                <p>Bộ sưu tập thời trang nữ</p>
                                <h3>Sản phẩm bán chạy <br/> 2024</h3>
                                <Link href="#" className={"link-no-decoration"}>Mua ngay</Link>
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
                                <h3>Giảm giá sốc <br/> Lên đến <span>40%</span> cho áo thun</h3>
                                <Link href="#" className={"link-no-decoration"}>Khám phá ngay</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}