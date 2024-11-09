import React, {useState} from "react";
import {TfiSearch} from "react-icons/tfi";
import {AiOutlineShoppingCart} from "react-icons/ai";
import Image from 'next/image';
import Link from 'next/link';
import {AutoComplete, AutoCompleteProps, Form, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {ImCross} from "react-icons/im";

interface Product {
    id: number;
    name: string;
    original?: string;
    price: string;
    image: string;
}

export default function MiddleBar() {

    const [value, setValue] = useState('');
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

    const products: Product[] = [
        {
            id: 1,
            name: 'Áo Nữ Dệt 3 Lỗ Kẻ',
            original: '130.000 đ',
            price: '99.000 đ',
            image: 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-khoac-nu-yody-SKN7002-DEN%20SJN7014-XDM%20(5).JPG'
        },
        {
            id: 2,
            name: 'Áo Polo Nữ In Kẻ',
            price: '99.000 đ',
            image: 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thu-dong-dai-tay-nu-yody-atn6006-nav-cvn6224-xag-03.jpg'
        },
        {
            id: 3,
            name: 'Áo Dài Tay Túi Ốp',
            price: '299.000 đ',
            image: 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-len-nu-co-tron-yody-ALN7023-TIT%20(2).jpg'
        },
        {
            id: 4,
            name: 'Áo Polo Nữ Gấu Bo',
            price: '209.300 đ',
            image: 'https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thu-dong-nu-co-cao-yody-ATN7009-DOD%20(2).jpg'
        },
    ];

    const handleSearch = (value: string) => {
        if (!value) {
            setOptions([]);
        } else {
            const filteredOptions = products
                .filter(product => product.name.toLowerCase().includes(value.toLowerCase()))
                .map(product => ({
                    value: product.name,
                    label: (
                        <div style={{display: 'flex', alignItems: 'center'}} className="search-result">
                            <Image src={product.image} alt={product.name}
                                   width={70} height={70}
                                   style={{borderRadius: 5}}
                            />
                            <div className="ml-5">
                                <div>{product.name}</div>
                                <div style={{color: '#F7941D', fontWeight: 'bold'}}>
                                    <span className="search-prices">{product.price}</span>
                                    <del className={"text-danger ml-3"}>
                                        {product.original}
                                    </del>
                                </div>
                            </div>
                        </div>
                    ),
                }));
            setOptions(filteredOptions);
        }
    };

    const onSelect = (data: string) => {
        console.log('onSelect', data);
    };

    const onChange = (data: string) => {
        setValue(data);
    };

    return (
        <div className="middle-inner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-12">
                        <div className="logo">
                            <Link href={"/home"}>
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={135}
                                    height={50}
                                />
                            </Link>
                        </div>
                        <div className="search-top">
                            <div className="top-search">
                                <Link href="#">
                                    <button value="search" type="submit"><TfiSearch/></button>
                                </Link>
                            </div>
                            <div className="search-top">
                                <form className="search-form">
                                    <input type="text" placeholder="Search here..." name="search"/>
                                    <button value="search" type="submit"><i className="ti-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="mobile-nav"></div>
                    </div>
                    <div className="col-lg-8 col-md-7 col-12">
                        <div className="search-bar-top d-flex justify-content-center">
                            <Form layout="inline">
                                <Form.Item style={{marginRight: 0}}>
                                    <AutoComplete
                                        value={value}
                                        options={options}
                                        onSelect={onSelect}
                                        // onSearch={(text) => setOptions(getPanelValue(text))}
                                        onSearch={handleSearch}
                                        onChange={onChange}
                                        className="search-bar"
                                    >
                                        <Input
                                            placeholder="Tìm kiếm sản phẩm tại đây..."
                                            suffix={
                                                <SearchOutlined
                                                    className={"search-icon"}
                                                />
                                            }
                                            variant={"borderless"}
                                        />
                                    </AutoComplete>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-12">
                        <div className="right-bar">
                            <div className="sinlge-bar shopping">
                                <Link href="#" className="single-icon">
                                    <AiOutlineShoppingCart size={30}/>
                                    <span className="total-count">2</span></Link>
                                <div className="shopping-item">
                                    <div className="dropdown-cart-header">
                                        <span>2 sản phẩm</span>
                                        <Link href={"/cart"} style={{textDecoration: 'none'}}>Xem giỏ hàng</Link>
                                    </div>
                                    <ul className="shopping-list">
                                        <li>
                                            <Link
                                                href="#"
                                                className="remove d-flex justify-content-center align-items-center"
                                                title="Xoá khỏi giỏ hàng"
                                            >
                                                <ImCross/>
                                            </Link>
                                            <Link className="cart-img" href="#">
                                                <Image
                                                    src="https://via.placeholder.com/70x70"
                                                    alt="IMG"
                                                    width={70}
                                                    height={70}
                                                />
                                            </Link>
                                            <h4><Link href="#" className="link-no-decoration">Woman Ring</Link></h4>
                                            <p className="quantity">1x - <span className="amount">350.000 VND</span></p>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="remove d-flex justify-content-center align-items-center"
                                                title="Xoá khỏi giỏ hàng"
                                            >
                                                <ImCross/>
                                            </Link>
                                            <Link className="cart-img" href="#">
                                                <Image
                                                    src="https://via.placeholder.com/70x70"
                                                    alt="IMG"
                                                    width={70}
                                                    height={70}
                                                />
                                            </Link>
                                            <h4><Link href="#" className="link-no-decoration">Woman Necklace</Link></h4>
                                            <p className="quantity">1x - <span className="amount">400.000 VND</span></p>
                                        </li>
                                    </ul>
                                    <div className="bottom">
                                        <div className="total">
                                            <span>Tổng</span>
                                            <span className="total-amount">750.000 VND</span>
                                        </div>
                                        <Link href={"/checkout"} className="btn animate">Thanh toán</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}