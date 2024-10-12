import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ImageUpload from "react-images-upload";

interface ImageUploadProps {
  value: File[];
  onChange: (value: File[]) => void;
}

const ImageUploader: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [images, setImages] = useState<File[]>([]);

  const onDrop = (newImages: File[]) => {
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <Box w={"full"}>
      <ImageUpload
        fileContainerStyle={{ border: "1.5px dashed #cccccc", padding: "20px" }}
        withPreview
        buttonText="Choose images"
        onChange={onChange}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880} // 5MB
      />
      {/* <div>
        {images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt="preview" width={100} />
        ))}
      </div> */}
    </Box>
  );
};

export default ImageUploader;
