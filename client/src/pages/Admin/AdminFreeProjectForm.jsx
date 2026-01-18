import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const AdminFreeProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: "",
    videoUrl: "",
    techStack: "",
  });

  // ✅ FETCH SINGLE PROJECT (CORRECT WAY)
  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await api.get(
          `/admin/free-projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "codex_token"
              )}`,
            },
          }
        );

        const p = res.data;

        setForm({
          title: p.title || "",
          description: p.description || "",
          githubLink: p.githubLink || "",
          videoUrl: p.videoUrl || "",
          techStack: p.techStack?.join(", ") || "",
        });
      } catch (err) {
        console.error("Failed to load free project", err);
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      description: form.description,
      githubLink: form.githubLink,
      videoUrl: form.videoUrl,
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (id) {
        await api.put(
          `/admin/free-projects/${id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "codex_token"
              )}`,
            },
          }
        );
      } else {
        await api.post(
          "/admin/free-projects",
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "codex_token"
              )}`,
            },
          }
        );
      }

      navigate("/admin/free-projects");
    } catch (err) {
      alert("Failed to save free project");
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        {id ? "Edit Free Project" : "Add Free Project"}
      </Typography>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <TextField
        label="GitHub Link"
        fullWidth
        margin="normal"
        value={form.githubLink}
        onChange={(e) =>
          setForm({ ...form, githubLink: e.target.value })
        }
      />

      <TextField
        label="Video URL"
        fullWidth
        margin="normal"
        value={form.videoUrl}
        onChange={(e) =>
          setForm({ ...form, videoUrl: e.target.value })
        }
      />

      <TextField
        label="Tech Stack (comma separated)"
        fullWidth
        margin="normal"
        value={form.techStack}
        onChange={(e) =>
          setForm({ ...form, techStack: e.target.value })
        }
      />

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Save Project
      </Button>
    </Container>
  );
};

export default AdminFreeProjectForm;
