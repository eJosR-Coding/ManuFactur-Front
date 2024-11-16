import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
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
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Flecha de regreso solo para "Regresar al inicio" */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Button
                        color="inherit"
                        onClick={() => router.push('/')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover efecto
                            },
                        }}
                    >
                        <ArrowBackIcon />
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                            Regresar al inicio
                        </Typography>
                    </Button>
                </Box>

                {/* Otros enlaces de la Navbar */}
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Button color="inherit" href="/projects" sx={{ color: '#ffffff' }}>
                        Proyectos
                    </Button>
                    <Button color="inherit" href="/profile" sx={{ color: '#ffffff' }}>
                        Perfil
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
