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

      {loading && <Typography>Loading projects...</Typography>}
      {!loading && projects.length === 0 && (
        <Typography>No projects found.</Typography>
      )}

      <Stack spacing={2}>
        {projects.map((project) => (
          <Paper
            key={project._id}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* IMAGE */}
            <Box
              sx={{
                width: 140,
                height: 80,
                borderRadius: 1,
                bgcolor: "#020617",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {project.screenshotUrl ? (
                <Box
                  component="img"
                  src={project.screenshotUrl}
                  alt={project.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Typography variant="caption" color="text.secondary">
                  No Image
                </Typography>
              )}
            </Box>

            {/* DETAILS */}
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={700}>
                {project.title}
              </Typography>

              <Stack direction="row" spacing={1} mt={0.5} flexWrap="wrap">
                <Chip size="small" label={project.category} />
                {Number(project.price) === 0 ? (
  <Chip size="small" color="success" label="Free" />
) : (
  <Stack direction="row" spacing={1} alignItems="center">
    {project.originalPrice && (
      <Typography
        variant="body2"
        sx={{
          textDecoration: "line-through",
          opacity: 0.7,
          fontWeight: 500,
        }}
      >
        ₹{project.originalPrice}
      </Typography>
    )}

    <Chip
      size="small"
      color="primary"
      label={`₹${project.price}`}
    />
  </Stack>
)}

              </Stack>

              {project.techStack?.length > 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={0.5}
                >
                  Tech: {project.techStack.join(", ")}
                </Typography>
              )}

              {project.livePreviewUrl && (
                <Typography
                  variant="caption"
                  sx={{ wordBreak: "break-all" }}
                >
                  Preview: {project.livePreviewUrl}
                </Typography>
              )}
            </Box>

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
        ))}
      </Stack>
    </Box>
  );
};

export default AdminProjects;
