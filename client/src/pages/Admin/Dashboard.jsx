import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [freeProjects, setFreeProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      }
    };

    const fetchFreeProjects = async () => {
      try {
        const res = await api.get("/free-projects");
        setFreeProjects(res.data);
      } catch (err) {
        console.error("Free projects load failed", err);
      }
    };

    fetchProjects();
    fetchFreeProjects();
  }, []);

  const totalProjects = projects.length;
  const paidProjects = projects.filter(
    (p) => Number(p.price) > 0
  ).length;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* HEADER */}
      <Box mb={5}>
        <Typography variant="h4" fontWeight={800}>
          Welcome back, Admin 👋
        </Typography>
        <Typography color="text.secondary">
          Here’s a quick snapshot of CodeX today.
        </Typography>
      </Box>

      {/* MAIN STATS (UNCHANGED) */}
      <Grid container spacing={3} mb={6}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Total Projects
            </Typography>
            <Typography variant="h3" fontWeight={800} mt={1}>
              {totalProjects}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              All projects available
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Free Projects
            </Typography>
            <Typography variant="h3" fontWeight={800} mt={1}>
              {freeProjects.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Zero-cost learning resources
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Paid Projects
            </Typography>
            <Typography variant="h3" fontWeight={800} mt={1}>
              {paidProjects}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Revenue-generating projects
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 🔥 FREE PROJECTS DASHBOARD (NEW) */}
      <Box mb={6}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Free Projects Overview
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Total Free Projects
              </Typography>
              <Typography variant="h3" fontWeight={800} mt={1}>
                {freeProjects.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                All free resources
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="body2" color="text.secondary">
                GitHub Linked
              </Typography>
              <Typography variant="h3" fontWeight={800} mt={1}>
                {
                  freeProjects.filter(
                    (p) => p.githubLink && p.githubLink.trim() !== ""
                  ).length
                }
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Open-source repositories
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="body2" color="text.secondary">
                With Video Preview
              </Typography>
              <Typography variant="h3" fontWeight={800} mt={1}>
                {
                  freeProjects.filter(
                    (p) => p.videoUrl && p.videoUrl.trim() !== ""
                  ).length
                }
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Demo-enabled projects
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* QUICK ACTIONS (UNCHANGED) */}
      <Box mb={6}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Quick Actions
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography fontWeight={700} mb={1}>
                ➕ Add New Project
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
              >
                Publish a new paid project.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/admin/projects/add")}
              >
                Add Project
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography fontWeight={700} mb={1}>
                🛠 Manage Projects
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
              >
                Edit or remove paid projects.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate("/admin/projects")}
              >
                Manage Projects
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography fontWeight={700} mb={1}>
                🎁 Manage Free Projects
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
              >
                Control free open-source projects.
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() =>
                    navigate("/admin/free-projects/add")
                  }
                >
                  Add Free
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    navigate("/admin/free-projects")
                  }
                >
                  Manage
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* ABOUT ADMIN (UNCHANGED) */}
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={3}>
          About Admin
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            TS
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              Tufail Sarovar
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mb={2}
            >
              Full-Stack Developer — CodeX
            </Typography>

            <Typography variant="body2" mb={3}>
              I design, build, and maintain real-world college
              projects for students using modern web technologies.
              This admin dashboard helps manage pricing, quality,
              and content across CodeX.
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label="MERN Stack" />
              <Chip label="Admin Systems" />
              <Chip label="Secure Payments" />
              <Chip label="Project Architecture" />
              <Chip label="React + Node.js" />
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
