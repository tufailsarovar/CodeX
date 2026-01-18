import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AdminFreeProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    try {
      const res = await api.get("/free-projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // ✅ DELETE WITH AUTH + CONFIRMATION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this free project?\nThis action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/free-projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("codex_token")}`,
        },
      });
      loadProjects();
    } catch (err) {
      alert("Failed to delete free project");
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Manage Free Projects
          </Typography>
          <Typography color="text.secondary">
            View, edit, or remove free open-source projects.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/admin/free-projects/add")}
        >
          + ADD FREE PROJECT
        </Button>
      </Box>

      {/* PROJECT LIST */}
      <Stack spacing={3}>
        {projects.map((p) => (
          <Paper
            key={p._id}
            sx={{
              p: 3,
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
              background:
                "linear-gradient(180deg, rgba(2,6,23,.95), rgba(15,23,42,.95))",
              border: "1px solid rgba(148,163,184,0.25)",
            }}
          >
            {/* LEFT: VIDEO PREVIEW */}
            <Box
              sx={{
                width: 160,
                height: 90,
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#020617",
                flexShrink: 0,
              }}
            >
              {p.videoUrl ? (
                <video
                  src={p.videoUrl}
                  muted
                  loop
                  autoPlay
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                    fontSize: 12,
                  }}
                >
                  No Video
                </Box>
              )}
            </Box>

            {/* DETAILS */}
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={800} mb={0.5}>
                {p.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mb={1}
              >
                {p.description?.slice(0, 140)}...
              </Typography>

              {/* TECH STACK */}
              <Stack
                direction="row"
                spacing={1}
                mb={1}
                flexWrap="wrap"
              >
                {p.techStack?.map((tech, i) => (
                  <Chip key={i} label={tech} size="small" />
                ))}
              </Stack>

              {/* GITHUB LINK */}
              <Typography variant="caption" color="primary">
                GitHub: {p.githubLink}
              </Typography>
            </Box>

            {/* ACTIONS */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() =>
                  navigate(`/admin/free-projects/edit/${p._id}`)
                }
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(p._id)}
              >
                Delete
              </Button>
            </Stack>
          </Paper>
        ))}

        {projects.length === 0 && (
          <Typography color="text.secondary">
            No free projects found.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default AdminFreeProjects;
