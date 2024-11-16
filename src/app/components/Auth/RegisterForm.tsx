"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
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
import BackNavbar from "./BackNavbar";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("userId", data.data.userId);
        router.push("/profile");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error en el registro:", error);
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
          backgroundColor: "#111827", // Fondo oscuro del cuadro de registro
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography component="h1" variant="h5" color="white">
          Registrarse
        </Typography>

        <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiInputBase-root": { backgroundColor: "#1f2937", color: "#fff" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#60a5fa" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3b82f6" },
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiInputBase-root": { backgroundColor: "#1f2937", color: "#fff" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#60a5fa" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3b82f6" },
            }}
          />

          <FormControlLabel
            control={<Checkbox value="terms" color="primary" />}
            label={<Typography style={{ color: "#fff" }}>I accept the terms and conditions</Typography>}
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
            Sign Up
          </Button>

          <Box display="flex" justifyContent="space-between">
            <Link href="/login" variant="body2" color="primary">
              {"Already have an account? Sign in"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
