"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import ChatInterface from "../Chat/ChatInterface";
import PostForm from "../PostForm";
import PostList from "../PostList";
import Navbar from "../../Navbar";
import { IMessage } from "@/app/types/chatTypes";
import { IPost } from "@/app/types/post";
interface ProjectDetailsProps {
    projectId: string;
}

export default function ProjectDetails({ projectId }: ProjectDetailsProps) {
    const [project, setProject] = useState<{ name: string; description: string } | null>(null);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showChat, setShowChat] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string>("");

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/projects/${projectId}`);
                if (!res.ok) throw new Error("Error fetching project data.");
                const data = await res.json();
                setProject(data.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load project.");
            } finally {
                setLoading(false);
            }
        };

        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) setCurrentUserId(storedUserId);

        fetchProjectData();
    }, [projectId]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!project) return <p>Proyecto no encontrado.</p>;

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    padding: "2rem",
                    backgroundColor: "#121212",
                    minHeight: "100vh",
                    color: "#fff",
                }}
            >
                {/* Información del Proyecto */}
                <Typography variant="h4" sx={{ mb: 2 }}>
                    {project.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    {project.description}
                </Typography>

                {/* Botón para mostrar el chat */}
                <Button
                    variant="contained"
                    onClick={() => setShowChat((prev) => !prev)}
                    sx={{ mb: 3 }}
                >
                    {showChat ? "Ocultar Chat" : "Mostrar Chat"}
                </Button>

                {/* Chat del proyecto */}
                {showChat && currentUserId && (
                    <ChatInterface currentUserId={currentUserId} />
                )}


                {/* Formulario y lista de publicaciones */}
                <PostForm
                    addPost={(newPost: IPost) =>
                        setPosts((prevPosts) => [newPost, ...prevPosts])
                    }
                    userId={currentUserId}
                />
                <PostList posts={posts} setPosts={setPosts} userId={currentUserId} />
            </Box>
        </>
    );
}
