"use client";
import Category from "./Category";
import Manufacturers from "./Manufacturers";
import ProductList from "./ProductsList";
import FilterProduct from "@/components/User/ShopGrid/FilterProduct";
import ShopByPrice from "@/components/User/ShopGrid/ShopByPrice";
import { Col, Pagination, Row } from "antd";
import useSWR from "swr";
import { getProducts, URL_API_PRODUCT } from "@/services/ProductService";
import { useSearchParams } from "next/navigation";

const Product = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const { data, error, isLoading, mutate } = useSWR(
    `${URL_API_PRODUCT.filter}${
      params.size !== 0 ? `?${params.toString()}` : ""
    }`,
    getProducts,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const products = data?.data?.items || [];
  console.log(products);

  return (
    <section
      className="product-area shop-sidebar shop section pb-1"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-12">
            <div className="shop-sidebar">
              <Category />
              <ShopByPrice />
              <Manufacturers />
            </div>
          </div>
          <div className="col-lg-9 col-md-8 col-12">
            <div className="row">
              <div className="col-12">
                <FilterProduct />
              </div>
            </div>
            <div className="row">
              {products.length > 0 ? (
                products.map((product: any) => (
                  <div className="col-lg-3 col-md-6 col-12" key={product.id}>
                    <ProductList product={product} />
                  </div>
                ))
              ) : (
                <div className="mt-5 col-12 text-center">
                  <p>Không có sản phẩm nào.</p>
                </div>
              )}
            </div>
            {products.length > 0 && (
              <div className="mt-5 mb-5 flex justify-center">
                <Pagination defaultCurrent={1} total={products.length} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
