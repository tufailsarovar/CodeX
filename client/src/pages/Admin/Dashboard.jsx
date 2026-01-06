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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      }
    };
    fetchProjects();
  }, []);

  const totalProjects = projects.length;
  const freeProjects = projects.filter((p) => Number(p.price) === 0).length;
  const paidProjects = projects.filter((p) => Number(p.price) > 0).length;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* WELCOME */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800}>
          Welcome back, Admin 👋
        </Typography>
        <Typography color="text.secondary">
          Here’s an overview of what’s happening in CodeX today.
        </Typography>
      </Box>

      {/* STATS */}
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Total Projects
            </Typography>
            <Typography variant="h3" fontWeight={800}>
              {totalProjects}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              All projects available on CodeX
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Free Projects
            </Typography>
            <Typography variant="h3" fontWeight={800}>
              {freeProjects}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Zero-cost learning resources
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Paid Projects
            </Typography>
            <Typography variant="h3" fontWeight={800}>
              {paidProjects}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Revenue-generating projects
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* QUICK ACTIONS */}
      <Paper sx={{ p: 3, mb: 5 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Quick Actions
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Paper
              variant="outlined"
              sx={{ p: 2, height: "100%" }}
            >
              <Typography fontWeight={600}>
                ➕ Add New Project
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Create and publish a new college project for students.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/admin/projects/add")}
              >
                Add Project
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper
              variant="outlined"
              sx={{ p: 2, height: "100%" }}
            >
              <Typography fontWeight={600}>
                🛠 Manage Projects
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Edit, delete, or update existing projects.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate("/admin/projects")}
              >
                Manage
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* ABOUT ADMIN */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={3}>
          About Admin
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Avatar
            sx={{
              width: 110,
              height: 110,
              fontSize: 36,
              fontWeight: 800,
              bgcolor: "primary.main",
            }}
          >
            TS
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              Tufail Sarovar
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={1}>
              Founder & Full-Stack Developer — CodeX
            </Typography>

            <Typography variant="body2" mb={2}>
              I design, build, and manage real-world college projects
              for students using modern web technologies.
              This admin dashboard helps me maintain quality,
              pricing, and content consistency across CodeX.
            </Typography>

            <Divider sx={{ my: 2 }} />

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
