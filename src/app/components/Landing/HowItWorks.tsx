"use client";

import { Box, Typography, Grid, Paper } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import InventoryIcon from "@mui/icons-material/Inventory";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

const steps = [
  { icon: <AnalyticsIcon fontSize="large" />, title: "Análisis de Ventas", description: "Obtén datos en tiempo real sobre las ventas y analiza el rendimiento para decisiones estratégicas." },
  { icon: <InventoryIcon fontSize="large" />, title: "Control de Inventario", description: "Gestiona inventarios con precisión y minimiza pérdidas de stock." },
  { icon: <SyncAltIcon fontSize="large" />, title: "Optimización de Procesos", description: "Mejora la eficiencia operativa en cada etapa de producción." },
];

export default function HowItWorks() {
  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        ¿Cómo Funciona?
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
              {step.icon}
              <Typography variant="h6" gutterBottom>{step.title}</Typography>
              <Typography variant="body2" color="textSecondary">{step.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
