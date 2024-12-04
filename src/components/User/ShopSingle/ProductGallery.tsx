import React, {useRef, useState} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ProductGallery = (props: any) => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const sliderRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setSelectedIndex(index);
        sliderRef.current.slickGoTo(index);
    };

    const isSingleImage = props.images?.length === 1;

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
                {!isSingleImage && props.images?.map((image, index) => (
                    <Image
                        key={index}
                        src={image.imageUrl}
                        width={50}
                        height={65}
                        unoptimized
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
            <div style={{flex: 1, width: '490px', marginLeft: 15}}>
                {isSingleImage ? (
                    <Image
                        src={props.images[0].imageUrl}
                        alt="Product Image"
                        width={490}
                        height={650}
                        style={{border: 0}}
                        unoptimized
                    />
                ) : (
                    <Slider ref={sliderRef} {...settings}>
                        {props.images?.map((image, index) => (
                            <div key={index}>
                                <Image
                                    src={image.imageUrl}
                                    alt={`Product Image ${index + 1}`}
                                    width={490}
                                    height={650}
                                    style={{border: 0}}
                                    unoptimized
                                />
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    );
};

export default ProductGallery;
