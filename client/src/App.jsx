import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Box } from "@mui/material";

import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

/* =========================================================
   PUBLIC
========================================================= */

import Home from "./pages/Home";
import About from "./pages/About";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import AllProjects from "./pages/Projects/AllProjects";
import ExploreProjects from "./pages/Projects/ExploreProjects";
import ProjectDetails from "./pages/Projects/ProjectDetails";

import Contact from "./pages/Contact";
import AllFreeProjects from "./pages/AllFreeProjects";

/* =========================================================
   AKTU PUBLIC
========================================================= */

import AKTUStudy from "./pages/AKTU/AKTUStudy";

/* =========================================================
   ADMIN
========================================================= */

import AdminProjects from "./pages/Admin/Projects";
import AdminDashboard from "./pages/Admin/Dashboard";
import EditProject from "./pages/Admin/EditProject";
import AddProject from "./pages/Admin/AddProject";

import AdminFreeProjects from "./pages/Admin/AdminFreeProjects";
import AdminFreeProjectForm from "./pages/Admin/AdminFreeProjectForm";

import AKTUResources from "./pages/Admin/AKTUResources";

/* =========================================================
   APP
========================================================= */

const App = () => {
  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem(
        "codex_user"
      )
    );
  } catch {
    user = null;
  }

  /* =======================================================
     KEEP BACKEND AWAKE / HEALTH CHECK
  ======================================================= */

  useEffect(() => {
    fetch(
      "https://codex-server-eight.vercel.app/health"
    ).catch(() => {});
  }, []);

  /* =======================================================
     ADMIN ROUTE
  ======================================================= */

  const AdminRoute = ({
    children,
  }) => {
    if (
      !user ||
      user.isAdmin !== true
    ) {
      return (
        <Navigate
          to="/"
          replace
        />
      );
    }

    return children;
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <Box
        sx={{
          flex: 1,
        }}
      >
        <Routes>
          {/* =================================================
              PUBLIC
          ================================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/projects"
            element={
              <AllProjects />
            }
          />

          <Route
            path="/explore"
            element={
              <ExploreProjects />
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProjectDetails />
            }
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/free-projects"
            element={
              <AllFreeProjects />
            }
          />

          {/* =================================================
              AKTU — SINGLE STUDENT PAGE
          ================================================= */}

          <Route
            path="/aktu"
            element={
              <AKTUStudy />
            }
          />

          {/* =================================================
              ADMIN DASHBOARD
          ================================================= */}

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* =================================================
              ADMIN PROJECTS
          ================================================= */}

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

          {/* =================================================
              ADMIN FREE PROJECTS
          ================================================= */}

          <Route
            path="/admin/free-projects"
            element={
              <AdminRoute>
                <AdminFreeProjects />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/free-projects/add"
            element={
              <AdminRoute>
                <AdminFreeProjectForm />
              </AdminRoute>
            }
          />

          {/* =================================================
              ADMIN AKTU
          ================================================= */}

          <Route
            path="/admin/aktu"
            element={
              <AdminRoute>
                <AKTUResources />
              </AdminRoute>
            }
          />

          {/* =================================================
              FALLBACK
          ================================================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </Box>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </Box>
  );
};

export default App;