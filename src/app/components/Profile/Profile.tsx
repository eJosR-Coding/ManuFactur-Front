"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Navbar from "../Navbar";
import PostForm from "./PostForm";
import PostList from "./PostList";
import ChatInterface from "./Chat/ChatInterface";
import { IUser } from '../../types/user';
import { IPost } from '../../types/post';

export default function Profile() {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showChat, setShowChat] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string>('');

    useEffect(() => {
        const storedUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : '';

        if (storedUserId) {
            setCurrentUserId(storedUserId);
            fetchUserData(storedUserId);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserData = async (userId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/profile?userId=${userId}`);

            if (!res.ok) {
                throw new Error("Failed to fetch user data.");
            }

            const data = await res.json();

            if (data.success) {
                setUserData(data.data);
            } else {
                setError(data.message || "Error retrieving user data.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Error connecting to the server.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!userData) return <p>No se encontraron datos del usuario.</p>;

    return (
        <>
            {/* Navbar agregado en la parte superior */}
            <Navbar />
            
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "2rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#1f2937",
                        padding: "2rem",
                        borderRadius: "8px",
                        width: "100%",
                        maxWidth: "600px",
                        marginBottom: "2rem",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold", marginBottom: "1rem" }}>
                        {userData.username}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#9CA3AF" }}>
                        {userData.email}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowChat((prev) => !prev)}
                    sx={{ marginBottom: "1rem" }}
                >
                    {showChat ? "Hide Chat" : "Show Chat"}
                </Button>

                {currentUserId && showChat && (
                    <ChatInterface currentUserId={currentUserId} />
                )}

                <PostForm addPost={(newPost: IPost) => setPosts((prevPosts) => [newPost, ...prevPosts])} userId={userData._id} />

                <PostList posts={posts} setPosts={setPosts} userId={userData._id} />
            </Box>
        </>
    );
}
