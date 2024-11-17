"use client";

import React, { useState, useEffect } from "react";
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
import Navbar from "../../Navbar";

interface Project {
  _id: string;
  name: string;
  description: string;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleCreateProject = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      const data = await response.json();
      if (data.success) {
        setProjects((prev) => [...prev, data.data]);
        setModalOpen(false);
        setNewProject({ name: "", description: "" });
      } else {
        console.error("Failed to create project:", data.message);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Buscar proyectos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1, mr: 2 }}
          />
          <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
            Crear Proyecto
          </Button>
        </Box>
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <Card
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {project.name}
                  </Typography>
                  <Typography variant="body2">{project.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "8px",
            width: "400px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Crear Nuevo Proyecto
          </Typography>
          <TextField
            fullWidth
            label="Nombre del Proyecto"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Descripción"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleCreateProject}>
            Guardar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectsPage;
