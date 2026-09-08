import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const PROJECT_CATEGORIES = [
  {
    value: "frontend",
    label: "Frontend",
  },
  {
    value: "mern",
    label: "MERN Full Stack",
  },
  {
    value: "backend",
    label: "Backend",
  },
  {
    value: "javascript",
    label: "JavaScript",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "java",
    label: "Java",
  },
  {
    value: "c-cpp",
    label: "C / C++",
  },
  {
    value: "data-science",
    label: "Data Science",
  },
  {
    value: "data-analysis",
    label: "Data Analysis",
  },
  {
    value: "ai-ml",
    label: "AI / ML",
  },
  {
    value: "deep-learning",
    label: "Deep Learning",
  },
  {
    value: "mobile-app",
    label: "Mobile Apps",
  },
  {
    value: "cybersecurity",
    label: "Cybersecurity",
  },
  {
    value: "cloud-devops",
    label: "Cloud / DevOps",
  },
  {
    value: "automation",
    label: "Automation",
  },
  {
    value: "php",
    label: "PHP",
  },
  {
    value: "other",
    label: "Other",
  },
];

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
        itemPrices: {
          ...form.itemPrices,
          [key]: Number(value),
        },
      });
    } else if (name.startsWith("files.")) {
      const key = name.split(".")[1];

      setForm({
        ...form,
        files: {
          ...form.files,
          [key]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleCreate = async () => {
    if (!form.title.trim()) {
      alert("Please enter project title");
      return;
    }

    if (!form.category) {
      alert("Please select a project category");
      return;
    }

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
    }
  };

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Add New Project
      </Typography>

      <Paper
        sx={{
          p: {
            xs: 2,
            sm: 3,
          },
          maxWidth: 800,
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Project Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            helperText="Choose the category that best matches this project"
          >
            {PROJECT_CATEGORIES.map(
              (category) => (
                <MenuItem
                  key={category.value}
                  value={category.value}
                >
                  {category.label}
                </MenuItem>
              )
            )}
          </TextField>

          <TextField
            label="Description"
            name="description"
            value={form.description}
            multiline
            rows={4}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Tech Stack (comma separated)"
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            fullWidth
            placeholder="React, Node.js, MongoDB"
          />

          <TextField
            label="Original Price"
            name="originalPrice"
            value={form.originalPrice}
            type="number"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Final Price"
            name="price"
            value={form.price}
            type="number"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Code Price"
            name="itemPrices.sourceCode"
            value={form.itemPrices.sourceCode}
            type="number"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="PPT Price"
            name="itemPrices.ppt"
            value={form.itemPrices.ppt}
            type="number"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Docs Price"
            name="itemPrices.documentation"
            value={form.itemPrices.documentation}
            type="number"
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Source Code ZIP URL"
            name="files.sourceCode"
            value={form.files.sourceCode}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="PPT ZIP URL"
            name="files.ppt"
            value={form.files.ppt}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Docs ZIP URL"
            name="files.documentation"
            value={form.files.documentation}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Full Bundle ZIP URL"
            name="files.fullBundle"
            value={form.files.fullBundle}
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

          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              minHeight: 46,
              borderRadius: 2,
              fontWeight: 800,
              textTransform: "none",
            }}
          >
            Create Project
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddProject;