"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Navbar from "../Navbar";

interface IUser {
    _id: string;
    username: string;
    email: string;
}

export default function PerfilBienvenida() {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

            if (!userId) {
                setError("No se encontró el usuario en el almacenamiento local.");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`http://localhost:5000/api/users/profile?userId=${userId}`);

                if (!res.ok) {
                    throw new Error("Error al cargar los datos del usuario.");
                }

                const data = await res.json();

                if (data.success) {
                    setUserData(data.data); // Supone que los datos del usuario están en `data.data`
                } else {
                    setError(data.message || "Error desconocido.");
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Error de conexión con el servidor.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#121212",
                    color: "#fff",
                }}
            >
                <Typography variant="h6">Cargando...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#121212",
                    color: "#fff",
                }}
            >
                <Typography variant="h6">Error: {error}</Typography>
            </Box>
        );
    }

    if (!userData) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#121212",
                    color: "#fff",
                }}
            >
                <Typography variant="h6">No se encontraron datos del usuario.</Typography>
            </Box>
        );
    }

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "calc(100vh - 64px)",
                    textAlign: "center",
                    backgroundColor: "#121212",
                    color: "#fff",
                    padding: 4,
                }}
            >
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Hola {userData.username}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Bienvenido a la plataforma <strong>ManufacturPro</strong>.
                    Estamos agradecidos por escogernos como tu solución.
                </Typography>
                <Typography variant="body1" sx={{ mb: 5 }}>
                    ¡Explora nuestras funcionalidades y aprovecha al máximo nuestra plataforma!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => console.log("Explora más funcionalidades")}
                >
                    Descubre más
                </Button>
            </Box>
        </>
    );
}
