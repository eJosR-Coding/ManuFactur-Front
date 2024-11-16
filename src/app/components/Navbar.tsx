import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1f2937', padding: '0.5rem 1rem' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <Button color="inherit" href="/">Regresar al inicio</Button>
                    <Button color="inherit" href="/projects">Proyectos</Button>
                    <Button color="inherit" href="/profile">Perfil</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
{/**Por si acaso eliminar este componente y darle ctl z al profile porque ahora esto redirige al profile */}