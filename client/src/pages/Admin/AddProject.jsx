import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AddProject = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("codex_token");

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    techStack: "",
    price: "",
    screenshotUrl: "",
    livePreviewUrl: "",
    zipFileUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      await api.post(
        "/admin/projects",
        {
          ...form,
          techStack: form.techStack
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/admin/projects");
    } catch (err) {
      alert("Failed to create project");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Add New Project
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 700 }}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Category (frontend / mern / other)"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={form.description}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Tech Stack (comma separated)"
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Screenshot URL"
            name="screenshotUrl"
            value={form.screenshotUrl}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Live Preview URL"
            name="livePreviewUrl"
            value={form.livePreviewUrl}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="ZIP File URL"
            name="zipFileUrl"
            value={form.zipFileUrl}
            onChange={handleChange}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddProject;
