import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ImageUpload from "react-images-upload";
import { Media } from "../Stores/Api/Types/type";
import axios from "axios";

interface ImageUploadProps {
  value: Media[];
  onChange: (value: Media[]) => void;
}

const ImageUploader: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [uploadStatus, setUploadStatus] = useState("");

  const uploadedImages: any[] = [];

  const handleFileChange = async (newImages: File[]) => {
    setUploadStatus("");
    if (newImages.length > 0) {
      for (let i = 0; i < newImages.length; i++) {
        const formData = new FormData();
        formData.append("file", newImages[i]); // Thay "file" bằng tên trường mà Cloudinary yêu cầu
        formData.append("upload_preset", "uidtest"); // Bạn cần tạo preset upload trong Cloudinary

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dibbhnisq/image/upload`,
            formData
          );

          if (response.status === 200) {
            const newMedia: Media = {
              url: response.data.secure_url, // URL hình ảnh
              alt: "Uploaded image",
            };

            uploadedImages.push(newMedia);
            setUploadStatus("Upload successful!");
          } else {
            setUploadStatus("Upload failed.");
          }
        } catch (error) {
          setUploadStatus("An error occurred while uploading.");
          console.error("Error:", error);
        }
      }
      onChange(uploadedImages); // Cập nhật media
    }
  };

  return (
    <Box w={"full"}>
      <ImageUpload
        fileContainerStyle={{ border: "1.5px dashed #cccccc", padding: "20px" }}
        withPreview
        buttonText="Choose images"
        onChange={handleFileChange}
        imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
        maxFileSize={5242880}
      />
      {/* {uploadStatus && <p>{uploadStatus}</p>}{" "} */}
      {/* Hiển thị trạng thái tải lên */}
    </Box>
  );
};

export default ImageUploader;
