import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Contact from "./pages/Contact";
import AdminProjects from "./pages/Admin/Projects";
import AdminDashboard from "./pages/Admin/Dashboard";
import EditProject from "./pages/Admin/EditProject";
import AddProject from "./pages/Admin/AddProject";
import AllFreeProjects from "./pages/AllFreeProjects";
import AdminFreeProjects from "./pages/Admin/AdminFreeProjects";
import AdminFreeProjectForm from "./pages/Admin/AdminFreeProjectForm";

const App = () => {
  const user = JSON.parse(localStorage.getItem("codex_user"));

  // ✅ WARM SERVER (FIX)
  useEffect(() => {
    fetch("https://codex-server-a73x.onrender.com/health").catch(() => {});
  }, []);

  const AdminRoute = ({ children }) => {
    if (!user || !user.isAdmin) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/explore" element={<ExploreProjects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/free-projects" element={<AllFreeProjects />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <AdminRoute>
                <AdminProjects />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/projects/add"
            element={
              <AdminRoute>
                <AddProject />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/projects/edit/:id"
            element={
              <AdminRoute>
                <EditProject />
              </AdminRoute>
            }
          />
          <Route path="/admin/free-projects" element={<AdminFreeProjects />} />
          <Route path="/admin/free-projects/add" element={<AdminFreeProjectForm />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
