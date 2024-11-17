'use client';

import {CldUploadWidget} from 'next-cloudinary';

export default function UploadImageTest() {
    return (
        <CldUploadWidget uploadPreset="ttfzcziy">
            {({open}) => {
                return (
                    <button className="btn btn-dark" onClick={() => open()}>
                        Upload an Image
                    </button>
                );
            }}
        </CldUploadWidget>
    )
}