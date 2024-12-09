import Link from "next/link";
import React, {useEffect} from "react";
import {useProductSizes} from "@/services/user/SingleProductService";
import "./css/property.css";

const SizePickers = (props: any) => {
    const {data: sizes} = useProductSizes(props.productId, props.colorCode)

    useEffect(() => {
        if (props.colorCode && sizes && sizes.length > 0) {
            props.onSizeSelect(sizes[0].id);
        }
    }, [props.colorCode, sizes]);

    const handleSizeClick = (size: number) => {
        props.onSizeSelect(size);
    };

    return (
        <>
            <p className="text-black">Kích thước:</p>
            <ul
                style={{
                    display: "flex",
                    listStyle: "none",
                    padding: "0",
                    margin: "0",
                }}
            >
                {sizes?.map((size) => (
                    <li key={size.id} style={{marginRight: "10px"}}>
                        <Link
                            href="#"
                            className={
                                props.selectedSize === size.id
                                    ? 'selected-size size-variant'
                                    : 'size-variant'
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                handleSizeClick(size.id);
                            }}
                        >
                            {size.sizeName}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default SizePickers;
