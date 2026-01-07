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
      {/* HEADER */}
      <Box mb={5}>
        <Typography variant="h4" fontWeight={800}>
          Welcome back, Admin 👋
        </Typography>
        <Typography color="text.secondary">
          Here’s a quick snapshot of CodeX today.
        </Typography>
      </Box>

      {/* STATS */}
      <Grid container spacing={3} mb={6}>
        {[
          {
            label: "Total Projects",
            value: totalProjects,
            desc: "All projects available",
          },
          {
            label: "Free Projects",
            value: freeProjects,
            desc: "Zero-cost learning resources",
          },
          {
            label: "Paid Projects",
            value: paidProjects,
            desc: "Revenue-generating projects",
          },
        ].map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h3" fontWeight={800} mt={1}>
                {item.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* QUICK ACTIONS */}
      <Box mb={6}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Quick Actions
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
              }}
            >
              <Typography fontWeight={700} mb={1}>
                ➕ Add New Project
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
              >
                Publish a new college project for students.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/admin/projects/add")}
              >
                Add Project
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
              }}
            >
              <Typography fontWeight={700} mb={1}>
                🛠 Manage Projects
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
              >
                Edit, update, or remove existing projects.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => navigate("/admin/projects")}
              >
                Manage Projects
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* ADMIN PROFILE */}
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
              Founder & Full-Stack Developer — CodeX
            </Typography>

            <Typography variant="body2" mb={3}>
              I design, build, and maintain real-world college projects
              for students using modern web technologies.
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
