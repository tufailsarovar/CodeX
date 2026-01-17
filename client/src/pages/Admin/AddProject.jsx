import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack, Paper } from "@mui/material";
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
    originalPrice: "",
    price: "",
    itemPrices: {
      sourceCode: "",
      ppt: "",
      documentation: "",
    },
    files: {
      sourceCode: "",
      ppt: "",
      documentation: "",
      fullBundle: "",
    },
    screenshotUrl: "",
    livePreviewUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("itemPrices.")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        itemPrices: { ...form.itemPrices, [key]: Number(value) },
      });
    } else if (name.startsWith("files.")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        files: { ...form.files, [key]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCreate = async () => {
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/admin/projects");
    } catch (err) {
      alert("Failed to create project");
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Add New Project
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <Stack spacing={2}>
          <TextField label="Title" name="title" onChange={handleChange} />
          <TextField label="Category" name="category" onChange={handleChange} />
          <TextField label="Description" name="description" multiline rows={4} onChange={handleChange} />
          <TextField label="Tech Stack (comma separated)" name="techStack" onChange={handleChange} />

          <TextField label="Original Price" name="originalPrice" type="number" onChange={handleChange} />
          <TextField label="Final Price" name="price" type="number" onChange={handleChange} />

          <TextField label="Code Price" name="itemPrices.sourceCode" type="number" onChange={handleChange} />
          <TextField label="PPT Price" name="itemPrices.ppt" type="number" onChange={handleChange} />
          <TextField label="Docs Price" name="itemPrices.documentation" type="number" onChange={handleChange} />

          <TextField label="Source Code ZIP URL" name="files.sourceCode" onChange={handleChange} />
          <TextField label="PPT ZIP URL" name="files.ppt" onChange={handleChange} />
          <TextField label="Docs ZIP URL" name="files.documentation" onChange={handleChange} />
          <TextField label="Full Bundle ZIP URL" name="files.fullBundle" onChange={handleChange} />

          <TextField label="Screenshot URL" name="screenshotUrl" onChange={handleChange} />
          <TextField label="Live Preview URL" name="livePreviewUrl" onChange={handleChange} />

          <Button variant="contained" onClick={handleCreate}>
            Create Project
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddProject;
