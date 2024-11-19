'use client';

import React from "react";
import UploadImageTest from "@/components/Upload/UploadImageTest";
import CloudinaryPage from "@/components/Upload/ImageShow";

export default function UploadImg() {
    return (
        <div className="d-flex justify-content-center p-5">
            <CloudinaryPage/>
            <UploadImageTest/>
        </div>
    );
}
