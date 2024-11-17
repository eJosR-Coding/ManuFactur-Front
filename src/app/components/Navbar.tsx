"use client";
import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'; // Verifica que estés usando `next/navigation`

const Navbar: React.FC = () => {
    const router = useRouter();

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#1f2937',
                padding: '0.5rem 1rem',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        <ArrowBackIcon />
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                            Regresar al inicio
                        </Typography>
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Button color="inherit" onClick={() => router.push('/projects')} sx={{ color: '#ffffff' }}>
                        Proyectos
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => router.push('/profile/edit')} // Redirige al componente de edición de perfil
                        sx={{ color: '#ffffff' }}
                    >
                        Perfil
                    </Button>

                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
