"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import BackNavbar from "./BackNavbar";
import {
    TextField,
    Button,
    Box,
    Typography,
    Link,
    Container,
    Checkbox,
    FormControlLabel,
} from "@mui/material";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await res.json();
            
            if (data.success) {
                // Store the userId in localStorage
                localStorage.setItem("userId", data.data.userId);
                
                // Navigate to the profile page
                router.push("/profile");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error in login:", error);
        }
    };
    

    return (
        <Container component="main" maxWidth="xs">
              <BackNavbar />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#111827", // Fondo oscuro del cuadro de login
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography component="h1" variant="h5" color="white">
                    Iniciar Sesión
                </Typography>

                <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputLabelProps={{ style: { color: "#fff" } }} // Color blanco para el texto de label
                        sx={{
                            "& .MuiInputBase-root": { backgroundColor: "#1f2937", color: "#fff" }, // Fondo oscuro
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" }, // Borde oscuro
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#60a5fa" }, // Borde al pasar el mouse
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3b82f6" }, // Borde en focus
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputLabelProps={{ style: { color: "#fff" } }}
                        sx={{
                            "& .MuiInputBase-root": { backgroundColor: "#1f2937", color: "#fff" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#60a5fa" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3b82f6" },
                        }}
                    />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label={<Typography style={{ color: "#fff" }}>Remember me</Typography>}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: "#3b82f6",
                            "&:hover": { backgroundColor: "#2563eb" },
                            color: "white",
                            padding: "0.8rem",
                            borderRadius: "8px",
                        }}
                    >
                        Sign in
                    </Button>

                    <Box display="flex" justifyContent="space-between">
                        <Link href="#" variant="body2" color="primary">
                            Forgot your password?
                        </Link>
                        <Link href="/register" variant="body2" color="primary">
                            {"Don't have an account? Sign up"}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
