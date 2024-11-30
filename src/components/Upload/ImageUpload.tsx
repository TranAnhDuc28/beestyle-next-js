// "use client";

// import { Upload, Button, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { storage } from "@/configs/Firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useState } from "react";
// import Image from "next/image";
// import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

// const ImageUpload = () => {
//   const [file, setFile] = useState(null);
//   const [upLoading, setUploading] = useState(false);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);


//   const handleFileChange = async (event: any) => {
//     setFile(event?.target.files[0])
//     console.log(event?.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setUploading(true);
//     const storageRef = ref(storage, `images/${file.name}`)

//     try {
//         await uploadBytes(storageRef, file)
//     } catch (error) {
        
//     }
//   }

//   return (
//     <>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={() => {}} disabled={upLoading}>
//         {upLoading ? "Uploading..." : "Upload Image"}
//       </button>
//       {imageUrl && (
//         <div>
//           <p>Upload image: </p>
//           <Image src={imageUrl} alt={"IMG"} width={300} height={300} unoptimized/>
//         </div>
//       )}
//     </>
//   );
// };

// export default ImageUpload;
