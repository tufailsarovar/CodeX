import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AllProjects from "./pages/Projects/AllProjects";
import ExploreProjects from "./pages/Projects/ExploreProjects";
import ProjectDetails from "./pages/Projects/ProjectDetails";

const App = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/explore" element={<ExploreProjects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
