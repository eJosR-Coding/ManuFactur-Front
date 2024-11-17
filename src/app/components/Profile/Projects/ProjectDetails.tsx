"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

interface Project {
  _id: string;
  name: string;
  description: string;
}

interface ProjectDetailsProps {
  projectId: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId }) => {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
        const data = await response.json();
        if (data.success) {
          setProject(data.data);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "2rem auto" }} />;
  if (!project) return <Typography>No se encontró el proyecto.</Typography>;

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#ffffff", borderRadius: "8px" }}>
<Typography variant="h3" sx={{ mb: 2, color: 'black' }}>
        {project.name}
      </Typography>
      <Typography variant="h5" sx={{ mb: 3,  color: 'black' }}>
        {project.description}
      </Typography>
      <Button variant="outlined" onClick={() => router.push("/projects")}>
        Volver a Proyectos
      </Button>
    </Box>
  );
};

export default ProjectDetails;
