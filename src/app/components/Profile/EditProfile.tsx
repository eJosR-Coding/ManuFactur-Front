"use client";

import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Navbar from "../Navbar";
import { IUser } from "../../types/user";

export default function EditProfile() {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [bio, setBio] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const storedUserId = localStorage.getItem("userId");
            if (!storedUserId) {
                setError("User not logged in.");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`http://localhost:5000/api/users/profile?userId=${storedUserId}`);
                if (!res.ok) throw new Error("Failed to fetch user profile.");

                const data = await res.json();
                if (data.success) {
                    setUserData(data.data);
                    setBio(data.data.profile?.bio || "");
                    setUsername(data.data.username);
                    setProfilePicture(data.data.profile?.profilePicture || "");
                } else {
                    setError(data.message || "Error fetching user data.");
                }
            } catch (err) {
                console.error(err);
                setError("Error fetching profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async () => {
        setSuccessMessage(null);
        setError(null);
        const storedUserId = localStorage.getItem("userId");

        try {
            const res = await fetch(`http://localhost:5000/api/users/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: storedUserId,
                    username,
                    profile: { bio, profilePicture },
                }),
            });

            if (!res.ok) throw new Error("Failed to update profile.");
            const data = await res.json();

            if (data.success) {
                setSuccessMessage("Profile updated successfully!");
            } else {
                setError(data.message || "Error updating profile.");
            }
        } catch (err) {
            console.error(err);
            setError("Error updating profile.");
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!userData) return <p>No se encontró información del usuario.</p>;

    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    padding: "2rem",
                    backgroundColor: "#121212",
                    color: "#fff",
                }}
            >
                <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                    Editar Perfil
                </Typography>
                <TextField
                    label="Email"
                    value={userData.email}
                    disabled
                    fullWidth
                    sx={{ marginBottom: "1rem", backgroundColor: "#fff" }}
                />
                <TextField
                    label="Nombre de Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: "1rem", backgroundColor: "#fff" }}
                />
                <TextField
                    label="Biografía"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                    sx={{ marginBottom: "1rem", backgroundColor: "#fff" }}
                />
                <TextField
                    label="URL de la Foto de Perfil"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: "1rem", backgroundColor: "#fff" }}
                />
                {profilePicture && (
                    <Box
                        component="img"
                        src={profilePicture}
                        alt="Profile Picture"
                        sx={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginBottom: "1rem",
                        }}
                    />
                )}
                <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                    Guardar Cambios
                </Button>
                {successMessage && <Typography color="green">{successMessage}</Typography>}
                {error && <Typography color="red">{error}</Typography>}
            </Box>
        </>
    );
}
