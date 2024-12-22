import React, { useEffect, useState } from 'react';
import { useProductSizes } from '@/services/user/SingleProductService';
import Link from 'next/link';
import './css/property.css';
import SizeGuide from './SizeGuide';
import { LuPencilRuler } from 'react-icons/lu';

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
    const [visible, setVisible] = useState(false);
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
            <div className='flex justify-between items-center'>
                <p className="text-black font-semibold">Kích thước:</p>
                <div className='text-blue-500 cursor-pointer mb-3' onClick={() => setVisible(true)}>
                    <span className='flex items-center'>
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
                {sizes?.map((size: any) => (
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
