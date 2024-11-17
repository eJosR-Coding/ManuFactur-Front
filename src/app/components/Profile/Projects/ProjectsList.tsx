"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    Card,
    CardContent,
    Modal,
} from "@mui/material";
import CreateProject from "./CreateProject";
import { useRouter } from "next/navigation"; // Para redirección

interface Project {
    _id: string;
    name: string;
    description: string;
}

interface ProjectsListProps {
    projects: Project[]; // Lista de proyectos
    addProject: (newProject: Project) => void; // Función para agregar proyecto
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, addProject }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter(); // Para redirigir al detalle del proyecto

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
            <Typography variant="h4" sx={{ mb: 3, color: 'black' }}>
                Mis Proyectos
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar proyecto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                />
                <Button variant="contained" onClick={() => setOpenModal(true)}>
                    Crear Proyecto
                </Button>
            </Box>
            <Grid container spacing={3}>
                {filteredProjects.map((project) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={project._id}
                        onClick={() => router.push(`/projects/${project._id}`)} // Redirige al detalle
                        sx={{ cursor: "pointer" }}
                    >
                        <Card sx={{ padding: "1rem", "&:hover": { boxShadow: "0 0 12px rgba(0,0,0,0.2)" } }}>
                            <CardContent>
                                <Typography variant="h6">{project.name}</Typography>
                                <Typography variant="body2">{project.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <CreateProject onClose={() => setOpenModal(false)} addProject={addProject} />
                </Box>
            </Modal>
        </Box>
    );
};

export default ProjectsList;
