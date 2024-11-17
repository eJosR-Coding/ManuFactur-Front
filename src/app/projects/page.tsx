"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProjectsList from "../components/Profile/Projects/ProjectsList";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<
    { _id: string; name: string; description: string }[]
  >([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const userId = localStorage.getItem("userId"); // Asegúrate de que el userId está en el localStorage
    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/user?userId=${userId}`
      );
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const addProject = (newProject: { _id: string; name: string; description: string }) => {
    setProjects((prevProjects) => [newProject, ...prevProjects]);
  };

  return (
    <>
      <Navbar />
      <ProjectsList projects={projects} addProject={addProject} />
    </>
  );
}
