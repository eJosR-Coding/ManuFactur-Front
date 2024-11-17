"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verificar autenticación
        const userId = localStorage.getItem("userId");
        setIsAuthenticated(!!userId);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        setIsAuthenticated(false);
        router.push("/login");
    };

    return (
        <AppBar position="fixed" color="primary" sx={{
            backgroundColor: '#1f2937',
            padding: '0.5rem 1rem',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ManufacturPro
                </Typography>
                <Box>
                    <Button color="inherit" onClick={() => router.push("/")}>Inicio</Button>
                    <Button color="inherit" onClick={() => router.push("/features")}>Funcionalidades</Button>
                    <Button color="inherit" onClick={() => router.push("/contact")}>Contacto</Button>
                    {isAuthenticated ? (
                        <>
                            <Button color="inherit" onClick={() => router.push("/perfil-bienvenida")}>
                                Perfil
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => router.push("/register")}>Regístrate</Button>
                            <Button color="inherit" onClick={() => router.push("/login")}>Inicia sesión</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
