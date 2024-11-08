// src/components/ImageUpload.tsx

import { useState } from "react";
import { Box, Button } from "@mui/material";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      setUploading(true);
      try {
        const response = await fetch("http://localhost:5000/api/uploadImage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        });

        const data = await response.json();
        if (response.ok) {
          onUpload(data.url);
        } else {
          console.error("Error uploading image:", data.message);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="image-upload"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload">
        <Button
          variant="contained"
          component="span"
          color="primary"
          disabled={uploading}
        >
          {uploading ? "Subiendo..." : "Cargar Imagen"}
        </Button>
      </label>
    </Box>
  );
}
