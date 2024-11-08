// src/app/landing/components/Hero.tsx
"use client";

import { Box, Typography, Button } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "100vh",
        paddingTop: "64px",
        backgroundImage: "url('/path-to-your-image.jpg')", // Coloca una imagen relevante aquí
        backgroundSize: "cover",
        color: "white",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Bienvenido a ManufacturPro
      </Typography>
      <Typography variant="h5" paragraph>
        Optimiza tus procesos y lleva tu negocio al siguiente nivel con nuestra plataforma.
      </Typography>
      <Button variant="contained" color="secondary" size="large">
        Conoce más
      </Button>
    </Box>
  );
}
