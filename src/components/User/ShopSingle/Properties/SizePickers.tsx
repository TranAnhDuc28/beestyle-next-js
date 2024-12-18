import React, { useEffect } from 'react';
import { useProductSizes } from '@/services/user/SingleProductService';
import Link from 'next/link';
import './css/property.css';

interface SizePickerProps {
    productId: string | number | null;
    colorCode: string | null;
    selectedSize: string | null;
    onSizeSelect: (size: string | null) => void;
}

const SizePicker: React.FC<SizePickerProps> = ({
    productId,
    colorCode,
    selectedSize,
    onSizeSelect,
}) => {
    const { data: sizes } = useProductSizes(productId, colorCode);

    useEffect(() => {
        if (colorCode && sizes && sizes.length > 0 && !selectedSize) {
            onSizeSelect(sizes[0].id);
        } else if (!colorCode || (sizes && sizes.length === 0)) {
            onSizeSelect(null)
        }
    }, [colorCode, sizes, selectedSize, onSizeSelect]);

    const handleSizeClick = (size: string) => {
        onSizeSelect(size);
    };

    return (
        <>
            <p className="text-black font-semibold">Kích thước:</p>
            <ul
                style={{
                    display: 'flex',
                    listStyle: 'none',
                    padding: '0',
                    margin: '0',
                }}
            >
                {sizes?.map((size: any) => (
                    <li key={size.id} style={{ marginRight: '10px' }}>
                        <Link
                            href="#"
                            className={
                                selectedSize === size.id
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
    );
};

export default SizePicker;
