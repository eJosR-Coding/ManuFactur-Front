import { useState } from "react";
import { Box, Button, TextField, Typography, IconButton, CircularProgress } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';

import { IPost } from "../../types/post"; 

interface PostFormProps {
  addPost: (newPost: IPost) => void; 
  userId: string;
}

export interface Post {
  _id: string;
  title: string;
  body: string;
  imageUrl?: string;
  createdAt: string;
  user: string;
}

export default function PostForm({ addPost, userId }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        try {
          setLoading(true); // Inicia la carga
          const response = await fetch("http://localhost:5000/api/uploadImage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Image }),
          });
          
          const data = await response.json();
          setLoading(false); // Finaliza la carga
          resolve(data.url);
        } catch (error) {
          console.error("Error uploading image:", error);
          setLoading(false); // Finaliza la carga en caso de error
          reject(null);
        }
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setLoading(false);
        reject(null);
      };
    });
  };

  const handlePost = async () => {
    if (!title || !postContent) return;

    let imageUrl: string | null = "";
    if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
    }

    const newPost: Post = {
        _id: Date.now().toString(),
        title,
        body: postContent,
        imageUrl: imageUrl || "",
        createdAt: new Date().toISOString(),
        user: userId,
    };

    try {
        const res = await fetch("http://localhost:5000/api/posts", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newPost.title,
                body: newPost.body,
                imageUrl: newPost.imageUrl,
                userId,
            }),
        });

        const data = await res.json();
        if (data.success) {
            addPost(data.data); 
            setTitle("");
            setPostContent("");
            setImageFile(null);
            setPreviewUrl(null);
        } else {
            console.error("Error al publicar:", data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "960px",
        backgroundColor: "#1f2937",
        padding: "2rem",
        borderRadius: "8px",
        marginBottom: "2rem",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" color="white" sx={{ marginBottom: "1rem" }}>
        ¿Qué estás pensando?
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Escribe el título aquí..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          marginBottom: "1rem",
          "& .MuiInputBase-root": { backgroundColor: "#1f2937", color: "#fff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#60a5fa" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3b82f6" },
        }}
      />
      <TextField
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        placeholder="Escribe tu publicación aquí..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        sx={{
          "& .MuiInputBase-root": { backgroundColor: "#1f2937", color: "#fff" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#60a5fa" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3b82f6" },
        }}
      />

      <Box display="flex" alignItems="center" mt={2}>
        <Button
          variant="contained"
          component="label"
          startIcon={<ImageIcon />}
          sx={{
            backgroundColor: "#3b82f6",
            "&:hover": { backgroundColor: "#2563eb" },
          }}
        >
          Seleccionar archivo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        {previewUrl && (
          <Box display="flex" alignItems="center" ml={2}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "50px", height: "50px", borderRadius: "8px", marginRight: "8px" }}
            />
            <IconButton color="error" onClick={handleRemoveImage}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {loading && <CircularProgress />} {/* Indicador de carga */}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          marginTop: "1rem",
          backgroundColor: "#3b82f6",
          "&:hover": { backgroundColor: "#2563eb" },
        }}
        onClick={handlePost}
        disabled={loading} // Desactiva el botón mientras está cargando
      >
        {loading ? "Publicando..." : "Publicar"}
      </Button>
    </Box>
  );
}
