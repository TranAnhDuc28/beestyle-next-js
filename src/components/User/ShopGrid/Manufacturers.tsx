"use client"
import { getBrands, URL_API_BRAND } from "@/services/BrandService";
import Link from "next/link";
import useSWR from "swr";

const Manufacturers = () => {
    const {data, error, isLoading, mutate} =
    useSWR(
        `${URL_API_BRAND.get}`,
        getBrands,
        {
            revalidateOnFocus: false,
        }
    );

    const brands = data?.data?.items || [];
   console.log(brands);

    return (
        <div className="single-widget category">
            <h3 className="title">Thương hiệu</h3>
            <ul className="categor-list">
            {brands.map((brand:any) =>(
                    <li><Link className="link-no-decoration" href="#">{brand.brandName}</Link></li>
                ))}
                {/* <li><Link className="link-no-decoration" href="#">Forever</Link></li>
                <li><Link className="link-no-decoration" href="#">giordano</Link></li>
                <li><Link className="link-no-decoration" href="#">abercrombie</Link></li>
                <li><Link className="link-no-decoration" href="#">ecko united</Link></li>
                <li><Link className="link-no-decoration" href="#">zara</Link></li> */}
            </ul>
        </div>
    );
};

export default Manufacturers;
