import React, {useEffect, useState} from "react";
import {AiOutlineShoppingCart} from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import {AutoComplete, AutoCompleteProps, Form, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {
    findProduct,
    URL_API_PRODUCT_SEARCH,
} from "@/services/user/home/ProductAreaService";
import useSWR from "swr";
import {FaInbox} from "react-icons/fa";
import {ImCross} from "react-icons/im";
import CartModal from "@/components/User/Home/Modal/CartModal";

let debounceTimer: NodeJS.Timeout;

export default function MiddleBar() {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState<AutoCompleteProps["options"]>([]);
    const [allProducts, setAllProducts] = useState<any[]>([]);

    const {data: products} = useSWR(URL_API_PRODUCT_SEARCH, findProduct, {
        refreshInterval: 300000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        revalidateOnMount: true,
    });

    useEffect(() => {
        const cachedProducts = localStorage.getItem("products");

        if (cachedProducts) {
            setAllProducts(JSON.parse(cachedProducts));
        } else {
            setAllProducts(products);
            localStorage.setItem("products", JSON.stringify(products));
        }
    }, [products]);

    const handleSearch = (value: string) => {
        setValue(value);

        if (!value) {
            setOptions([]);
            return;
        }

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
            const matchedProducts = allProducts
                ?.filter((product) =>
                    product.productName.toLowerCase().startsWith(value.trim().toLowerCase())
                )
                .slice(0, 10);

            const filteredOptions =
                matchedProducts.length > 0
                    ? matchedProducts.map((product, index) => ({
                        value: index.toString(),
                        label: (
                            <div
                                style={{display: "flex", alignItems: "center"}}
                                className="search-result"
                            >
                                <Image
                                    src={product.imageUrl}
                                    alt={product.productName}
                                    width={70}
                                    height={70}
                                    style={{borderRadius: 5}}
                                    unoptimized
                                />
                                <div className="ml-5">
                                    <div>{product.productName}</div>
                                    <div style={{color: "#F7941D", fontWeight: "bold"}}>
                                        <span className="search-prices">{product.salePrice}</span>
                                        <del className="text-danger ml-3">
                                            {product.originalPrice}
                                        </del>
                                    </div>
                                </div>
                            </div>
                        ),
                    }))
                    : [
                        {
                            value: "no-results",
                            label: (
                                <div
                                    style={{textAlign: "center", color: "#888"}}
                                    className="d-flex flex-column align-items-center py-3"
                                >
                                    <FaInbox size={35} className="mb-2"/>
                                    Không tìm thấy sản phẩm phù hợp
                                </div>
                            ),
                        },
                    ];

            setOptions(filteredOptions);
        }, 500);
    };

    const onSelect = (data: string) => {
        console.log("onSelect", data);
    };

    const onChange = (data: string) => {
        handleSearch(data);
    };

    return (
        <div className="middle-inner" style={{paddingBottom: 25}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-12">
                        <div className="logo">
                            <Link href={"/home"}>
                                <Image src="/logo.png" alt="Logo" width={135} height={50}/>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7 col-12">
                        <div className="search-bar-top d-flex justify-content-center">
                            <Form layout="inline">
                                <Form.Item style={{marginRight: 0}}>
                                    <AutoComplete
                                        value={value}
                                        options={options}
                                        onSelect={onSelect}
                                        onChange={onChange}
                                        className="search-bar"
                                    >
                                        <Input
                                            placeholder="Tìm kiếm sản phẩm tại đây..."
                                            suffix={<SearchOutlined className={"search-icon"}/>}
                                            variant={"borderless"}
                                        />
                                    </AutoComplete>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <CartModal/>
                </div>
            </div>
        </div>
    );
}
