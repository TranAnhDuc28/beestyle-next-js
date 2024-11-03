'use client';

import React, {useEffect, useRef} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ProductGallery = () => {
    const sliderRef = useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    const images = [
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-TSN7301-DEN%20(10).JPG",
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-TSN7301-DEN%20(11).JPG",
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-TSN7301-DEN%20(12).JPG",
        "https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thun-nu-TSN7301-DEN%20(13).JPG",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (sliderRef.current) {
                sliderRef.current.slickNext();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="product-gallery">
            <Slider ref={sliderRef} {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt={`Product Image ${index + 1}`}
                            style={{width: "100%", height: "auto"}}
                        />
                    </div>
                ))}
            </Slider>
            <div className="thumbnails" style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        style={{width: "80px", height: "auto", cursor: 'pointer', margin: '0 5px'}}
                        onClick={() => sliderRef.current.slickGoTo(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
