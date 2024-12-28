import React, { useEffect, useState } from 'react';
import { ProductSize, useProductSizes } from '@/services/user/SingleProductService';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import './css/property.css';
import SizeGuide from './SizeGuide';
import { LuPencilRuler } from 'react-icons/lu';

interface SizePickerProps {
    productId: string;
    colorCode: string;
    selectedSize: string | undefined;
    onSizeSelect: (size: string | null) => void;
}

const SizePicker: React.FC<SizePickerProps> = ({
    productId,
    colorCode,
    selectedSize,
    onSizeSelect,
}) => {
    const pathName = usePathname();
    const [visible, setVisible] = useState(false);
    const { data: sizes } = useProductSizes(productId, colorCode);

    useEffect(() => {
        if (sizes && sizes.length > 0 && colorCode && !selectedSize) {
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
            <div className='flex justify-between items-center'>
                <p className="text-black font-semibold">Kích thước:</p>
                <div
                    className={
                        pathName.includes('variant') && 'text-blue-500 cursor-pointer' || 'd-none'
                    }
                    onClick={() => setVisible(true)}
                >
                    <span className='flex items-center hover:!text-purple-500'>
                        <LuPencilRuler className='me-2' />
                        Bảng kích thước
                    </span>
                </div>
            </div>
            <ul
                style={{
                    display: 'flex',
                    listStyle: 'none',
                    padding: '0',
                    margin: '0',
                }}
            >
                {sizes?.map((size: ProductSize) => (
                    <li key={size.id} style={{ marginRight: '10px' }}>
                        <Link
                            href="#"
                            className={
                                selectedSize === size.id
                                    ? 'bg-black text-white size-variant'
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
            <SizeGuide visible={visible} onClose={() => setVisible(false)} />
        </>
    );
};

export default SizePicker;
