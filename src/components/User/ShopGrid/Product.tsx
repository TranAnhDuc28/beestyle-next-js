import Category from "./Category";
import RecentPosts from "./RecentPosts";
import Manufacturers from "./Manufacturers";
import ProductList from "./ProductsList";
import FilterProduct from "@/components/User/ShopGrid/FilterProduct";
import Newsletter from "@/components/Footer/Newsletter";
import ShopByPrice from "@/components/User/ShopGrid/ShopByPrice";
import { Col, Pagination, Row } from "antd";

const Product = () => {
  const products = [
    {
      id: 1,
      title: "Women Hot Collection",
      price: "$29.00",
      image:
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-phao-nu-yody-pvn6012-den-qjn3072-tra-11.jpg",
    },
    {
      id: 2,
      title: "Elegant Dress",
      price: "$45.00",
      image:
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/set6054-den-8.jpg",
    },
    {
      id: 3,
      title: "Casual T-Shirt",
      price: "$19.00",
      image:
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/phn6040-vac-qjn5056-den-4.jpg",
    },
    {
      id: 4,
      title: "Stylish Pants",
      price: "$35.00",
      image:
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-polo-nu-yody-apn7120-vag-6.jpg",
    },
    {
      id: 5,
      title: "Cool Jacket",
      price: "$59.00",
      image: "/img550x750.png",
    },
    {
      id: 6,
      title: "Fashionable Blouse",
      price: "$42.00",
      image: "/img550x750.png",
    },
    {
      id: 7,
      title: "Summer Dress",
      price: "$39.00",
      image: "/img550x750.png",
    },
    {
      id: 8,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 9,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 10,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 11,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 12,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 13,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 14,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 15,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 16,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 17,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 18,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 19,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
    {
      id: 20,
      title: "Classic Shirt",
      price: "$25.00",
      image: "/img550x750.png",
    },
  ];

  return (
    <section className="shop section " style={{ backgroundColor: "#fff" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-12">
            <div className="shop-sidebar">
              <Category />
              <ShopByPrice />
              {/* <RecentPosts /> */}
              <Manufacturers />
            </div>
          </div>
          <div className="col-lg-9 col-md-8 col-12">
            <div className="row">
              <div className="col-12">
                <FilterProduct />
              </div>
            </div>
            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <Col key={product.id} span={6}>
                  <ProductList product={product} />
                </Col>
              ))}
            </Row>
            <div className="mt-5 items-center flex justify-center">
              <Pagination defaultCurrent={1} total={50}  className="rounded-pagination"/>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <Newsletter />
        </div>
      </div>
    </section>
  );
};

export default Product;
