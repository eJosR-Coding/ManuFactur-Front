import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const BackNavbar: React.FC = () => {
    const router = useRouter();

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#1f2937', // Fondo oscuro
                padding: '0.5rem 1rem',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Sombra más suave
            }}
        >
            <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Botón de volver */}
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => router.push('/')}
                    sx={{
                        color: '#ffffff', // Color blanco para el ícono
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Efecto hover
                        },
                    }}
                >
                    <ArrowBackIcon fontSize="large" />
                </IconButton>

                {/* Título del Navbar */}
                <Typography
                    variant="h6"
                    sx={{
                        color: '#ffffff', // Texto blanco
                        fontWeight: 'bold',
                        flexGrow: 1, // Para que el título ocupe el espacio restante
                        textAlign: 'left', // Alineación a la izquierda
                        letterSpacing: '0.5px',
                    }}
                >
                    Volver Atrás
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default BackNavbar;
