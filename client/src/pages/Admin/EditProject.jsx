import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const EditProject = () => {
  const { id } = useParams();
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

  const [original, setOriginal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);

        setForm({
          title: res.data.title || "",
          category: res.data.category || "",
          description: res.data.description || "",
          techStack: res.data.techStack?.join(", ") || "",
          price: res.data.price || "",
          screenshotUrl: res.data.screenshotUrl || "",
          livePreviewUrl: res.data.livePreviewUrl || "",
          zipFileUrl: res.data.zipFileUrl || "",
        });

        setOriginal(res.data);
      } catch (err) {
        console.error("Failed to load project", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(
        `/admin/projects/${id}`,
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
      alert("Failed to update project");
      console.error(err);
    }
  };

  if (loading) {
    return <Typography sx={{ p: 4 }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* HEADER */}
      <Typography variant="h4" fontWeight={800} mb={1}>
        Edit Project
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Update project details and review current data side by side.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.2fr 1fr" },
          gap: 4,
        }}
      >
        {/* LEFT — EDIT FORM */}
        <Paper sx={{ p: 3 }}>
          <Typography fontWeight={700} mb={2}>
            Editable Fields
          </Typography>

          <Stack spacing={2}>
            <TextField label="Project Title" name="title" value={form.title} onChange={handleChange} />
            <TextField label="Category" name="category" value={form.category} onChange={handleChange} />
            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              value={form.description}
              onChange={handleChange}
            />
            <TextField
              label="Tech Stack (comma separated)"
              name="techStack"
              value={form.techStack}
              onChange={handleChange}
            />
            <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} />
            <Divider />
            <TextField label="Screenshot URL" name="screenshotUrl" value={form.screenshotUrl} onChange={handleChange} />
            <TextField label="Live Preview URL" name="livePreviewUrl" value={form.livePreviewUrl} onChange={handleChange} />
            <TextField label="ZIP File URL" name="zipFileUrl" value={form.zipFileUrl} onChange={handleChange} />

            <Button variant="contained" size="large" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Stack>
        </Paper>

        {/* RIGHT — CURRENT PROJECT PREVIEW */}
        <Paper sx={{ p: 3 }}>
          <Typography fontWeight={700} mb={2}>
            Current Project Preview
          </Typography>

          {/* IMAGE */}
          <Box
            sx={{
              width: "100%",
              height: 240,
              mb: 2,
              borderRadius: 1,
              bgcolor: "#020617",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {original?.screenshotUrl ? (
              <Box
                component="img"
                src={original.screenshotUrl}
                alt={original.title}
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

          <Typography variant="h6" fontWeight={700}>
            {original.title}
          </Typography>

          <Stack direction="row" spacing={1} my={1} flexWrap="wrap">
            <Chip label={original.category} />
            <Chip
              color={Number(original.price) === 0 ? "success" : "primary"}
              label={Number(original.price) === 0 ? "Free" : `₹${original.price}`}
            />
          </Stack>

          <Typography variant="body2" color="text.secondary" mb={1}>
            {original.description}
          </Typography>

          {original.techStack?.length > 0 && (
            <Typography variant="body2" mb={1}>
              <strong>Tech:</strong> {original.techStack.join(", ")}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {original.livePreviewUrl && (
            <Typography variant="caption" sx={{ wordBreak: "break-all" }}>
              Preview: {original.livePreviewUrl}
            </Typography>
          )}

          <Typography variant="caption" sx={{ wordBreak: "break-all", display: "block", mt: 1 }}>
            ZIP: {original.zipFileUrl || "—"}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditProject;
