import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AdminProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirm) return;

    try {
      await api.delete(`/admin/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("codex_token")}`,
        },
      });

      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete project");
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={4}
        spacing={2}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Manage Projects
          </Typography>
          <Typography color="text.secondary">
            View, edit, or remove projects from CodeX.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/admin/projects/add")}
        >
          + Add New Project
        </Button>
      </Stack>

      {/* CONTENT */}
      {loading && <Typography>Loading projects...</Typography>}

      {!loading && projects.length === 0 && (
        <Typography>No projects found.</Typography>
      )}

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project._id}>
            <Paper sx={{ p: 2, height: "100%" }}>
              {/* IMAGE */}
              <Box
                sx={{
                  width: "100%",
                  height: 180,
                  mb: 2,
                  borderRadius: 1,
                  bgcolor: "#020617",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {project.screenshotUrl ? (
                  <Box
                    component="img"
                    src={project.screenshotUrl}
                    alt={project.title}
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    No Image
                  </Typography>
                )}
              </Box>

              {/* TITLE */}
              <Typography fontWeight={700} mb={0.5}>
                {project.title}
              </Typography>

              {/* CATEGORY + PRICE */}
              <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                <Chip size="small" label={project.category} />
                <Chip
                  size="small"
                  color={Number(project.price) === 0 ? "success" : "primary"}
                  label={
                    Number(project.price) === 0
                      ? "Free"
                      : `₹${project.price}`
                  }
                />
              </Stack>

              {/* TECH STACK */}
              {project.techStack?.length > 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mb={1}
                >
                  Tech: {project.techStack.join(", ")}
                </Typography>
              )}

              {/* LINKS */}
              {project.livePreviewUrl && (
                <Typography
                  variant="caption"
                  sx={{ wordBreak: "break-all" }}
                >
                  Preview: {project.livePreviewUrl}
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              {/* ACTIONS */}
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    navigate(`/admin/projects/edit/${project._id}`)
                  }
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminProjects;
