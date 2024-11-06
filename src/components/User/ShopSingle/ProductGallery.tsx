'use client';

import React, {useRef, useState} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ProductGallery = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        afterChange: (index) => setSelectedIndex(index)
    };

    const images = [
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-TSN7301-DEN%20(10).JPG",
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-TSN7301-DEN%20(11).JPG",
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-TSN7301-DEN%20(12).JPG",
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-TSN7301-DEN%20(13).JPG",
    ];

    const sliderRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleThumbnailClick = (index) => {
        setSelectedIndex(index);
        sliderRef.current.slickGoTo(index);
    };

    return (
        <div className="product-gallery d-flex">
            <div
                className="thumbnails"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        width={80}
                        height={120}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                            cursor: 'pointer',
                            margin: '5px 0',
                            border: selectedIndex === index ? '2px solid #F7941D' : 'none',
                        }}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </div>
            <div style={{flex: 1, width: '50%', marginLeft: 20}}>

                <Slider ref={sliderRef} {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <Image
                                src={image}
                                alt={`Product Image ${index + 1}`}
                                width={650}
                                height={0}
                                style={{border: 0}}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ProductGallery;
