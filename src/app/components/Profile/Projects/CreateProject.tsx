"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

interface CreateProjectProps {
  onClose: () => void;
  addProject: (newProject: { _id: string; name: string; description: string }) => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ onClose, addProject }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      setError("Por favor, llena todos los campos.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, createdBy: userId }),
      });

      const data = await response.json();

      if (data.success) {
        addProject(data.data);
        onClose();
      } else {
        setError("No se pudo crear el proyecto. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, color:'black' }}>
        Crear Nuevo Proyecto
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre del Proyecto"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Descripción"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          fullWidth
          sx={{ backgroundColor: "#3b82f6", "&:hover": { backgroundColor: "#2563eb" } }}
        >
          {loading ? "Creando..." : "Crear Proyecto"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateProject;
