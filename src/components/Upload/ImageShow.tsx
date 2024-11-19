import { useEffect, useState } from 'react';

export default function CloudinaryPage() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        // Gọi API route để lấy URL ảnh
        const fetchImage = async () => {
            try {
                const response = await fetch('/api/cloudinary?assetId=0022ef035453ac306144bc8ebabfa79a');
                const data = await response.json();
                setImageUrl(data.url);
            } catch (error) {
                console.error('Lỗi khi tải ảnh:', error);
            }
        };

        fetchImage();
    }, []);
    console.log(imageUrl)

    if (!imageUrl) {
        return <p>Đang tải ảnh...</p>;
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Hình ảnh từ Cloudinary</h1>
            <img
                src={imageUrl}
                alt="Cloudinary Image"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
        </div>
    );
}
