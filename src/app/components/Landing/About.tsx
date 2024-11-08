// src/app/landing/components/About.tsx
"use client";

import { Box, Typography, Grid } from "@mui/material";
import Image from "next/image";

export default function About() {
  return (
    <Box
      sx={{
        padding: 4,
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        color: "#171717", // Asegura que el color sea oscuro para una buena visibilidad
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: "#171717" }}>
        ¿Qué es ManufacturPro?
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="body1" paragraph sx={{ color: "#333" }}>
            ManufacturPro es una plataforma digital diseñada específicamente
            para el sector manufacturero, ofreciendo herramientas avanzadas para
            optimizar la producción, controlar el inventario y analizar ventas.
            Nuestra misión es ayudar a las empresas manufactureras a mejorar su
            eficiencia, reducir costos y aumentar su competitividad en el
            mercado.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image
            src="/manufacturing.jpg"
            alt="Manufactura y tecnología industrial"
            width={500}
            height={350}
            style={{ borderRadius: "8px" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
