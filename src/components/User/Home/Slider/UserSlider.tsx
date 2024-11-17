'use client';

import React, {useState, useEffect, useCallback, useRef} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

export default function Slider() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const images = [
        {
            url: "/banner-01.jpg",
            alt: "Shop Banner 1"
        },
        {
            url: "/banner-02.jpg",
            alt: "Shop Banner 2"
        },
        {
            url: "/banner-03.jpg",
            alt: "Shop Banner 3"
        },
        {
            url: "/banner-04.jpg",
            alt: "Shop Banner 4"
        }
    ];

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e) => {
        if (touchPosition === null) return;

        const currentTouch = e.touches[0].clientX;
        const diff = touchPosition - currentTouch;

        if (diff > 5) nextSlide();
        if (diff < -5) prevSlide();

        setTouchPosition(null);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
    };

    useEffect(() => {
            timeoutRef.current = setTimeout(() => nextSlide(), 6000);
            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };

    }, [currentIndex, nextSlide]);

    return (
        <>
            <div
                className="relative w-full max-w-8xl mx-auto overflow-hidden shadow-md"
                role="region"
                aria-label="Image carousel"
                onKeyDown={handleKeyDown}
                tabIndex="0"
            >
                <div
                    className="flex transition-transform duration-500 ease-out h-[400px] md:h-[600px]"
                    style={{transform: `translateX(-${currentIndex * 100}%)`}}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="w-full flex-shrink-0 relative"
                            aria-hidden={currentIndex !== index}
                        >
                            <img
                                src={`${image.url}`}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 border-0"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    <FaChevronLeft className="w-6 h-6"/>
                </button>

                <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/10 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 border-0"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    <FaChevronRight className="w-6 h-6"/>
                </button>
            </div>
        </>
    )
}