import Navbar from "./components/Landing/Navbar";
import Hero from "./components/Landing/Hero";
import About from "./components/Landing/About";
import HowItWorks from "./components/Landing/HowItWorks";
import { Box } from "@mui/material";

export default function LandingPage() {
  return (
    <Box sx={{ marginTop: "64px" }}>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
    </Box>
  );
}
