import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Divider,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
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

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("codex_token");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  /* ========================
     FETCH PROJECT
  ======================== */

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);

        setForm({
          title: res.data.title || "",
          category: res.data.category || "",
          description: res.data.description || "",
          techStack:
            Array.isArray(res.data.techStack)
              ? res.data.techStack.join(", ")
              : "",

          originalPrice:
            res.data.originalPrice ?? "",

          price:
            res.data.price ?? "",

          itemPrices: {
            sourceCode:
              res.data.itemPrices?.sourceCode ?? "",

            ppt:
              res.data.itemPrices?.ppt ?? "",

            documentation:
              res.data.itemPrices?.documentation ?? "",
          },

          files: {
            sourceCode:
              res.data.files?.sourceCode ?? "",

            ppt:
              res.data.files?.ppt ?? "",

            documentation:
              res.data.files?.documentation ?? "",

            fullBundle:
              res.data.files?.fullBundle ?? "",
          },

          screenshotUrl:
            res.data.screenshotUrl || "",

          livePreviewUrl:
            res.data.livePreviewUrl || "",
        });
      } catch (err) {
        alert("Failed to load project");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  /* ========================
     HANDLE CHANGE
  ======================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("itemPrices.")) {
      const key = name.split(".")[1];

      setForm((prev) => ({
        ...prev,
        itemPrices: {
          ...prev.itemPrices,
          [key]:
            value === ""
              ? ""
              : Number(value),
        },
      }));

      return;
    }

    if (name.startsWith("files.")) {
      const key = name.split(".")[1];

      setForm((prev) => ({
        ...prev,
        files: {
          ...prev.files,
          [key]: value,
        },
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ========================
     UPDATE PROJECT
  ======================== */

  const handleUpdate = async () => {
    if (!form.title.trim()) {
      alert("Please enter project title");
      return;
    }

    if (!form.category) {
      alert("Please select a project category");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...form,

        techStack: form.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),

        originalPrice:
          form.originalPrice === ""
            ? 0
            : Number(form.originalPrice),

        price:
          form.price === ""
            ? 0
            : Number(form.price),

        itemPrices: {
          sourceCode:
            form.itemPrices.sourceCode === ""
              ? 0
              : Number(
                  form.itemPrices.sourceCode
                ),

          ppt:
            form.itemPrices.ppt === ""
              ? 0
              : Number(form.itemPrices.ppt),

          documentation:
            form.itemPrices.documentation === ""
              ? 0
              : Number(
                  form.itemPrices.documentation
                ),
        },
      };

      const res = await api.put(
        `/admin/projects/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "UPDATE SUCCESS:",
        res.data
      );

      alert("Project updated successfully");

      navigate("/admin/projects");
    } catch (error) {
      console.error(
        "UPDATE ERROR:",
        error
      );

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Update failed";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  /* ========================
     LOADING
  ======================== */

  if (loading) {
    return (
      <Typography sx={{ p: 4 }}>
        Loading...
      </Typography>
    );
  }

  /* ========================
     UI
  ======================== */

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
        fontWeight={800}
        mb={3}
      >
        Edit Project
      </Typography>

      <Paper
        sx={{
          p: {
            xs: 2,
            sm: 3,
          },
          maxWidth: 900,
        }}
      >
        <Stack spacing={2}>
          {/* TITLE */}

          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />

          {/* CATEGORY */}

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

          {/* DESCRIPTION */}

          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={form.description}
            onChange={handleChange}
            fullWidth
          />

          {/* TECH STACK */}

          <TextField
            label="Tech Stack (comma separated)"
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            fullWidth
            placeholder="React, Node.js, MongoDB"
          />

          <Divider />

          {/* PRICES */}

          <Typography
            fontWeight={700}
          >
            Project Pricing
          </Typography>

          <TextField
            label="Original Price"
            name="originalPrice"
            type="number"
            value={form.originalPrice}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Final Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
          />

          <Divider />

          {/* INDIVIDUAL PRICES */}

          <Typography
            fontWeight={700}
          >
            Individual Item Prices
          </Typography>

          <TextField
            label="Source Code Price"
            name="itemPrices.sourceCode"
            type="number"
            value={
              form.itemPrices.sourceCode ?? ""
            }
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="PPT Price"
            name="itemPrices.ppt"
            type="number"
            value={
              form.itemPrices.ppt ?? ""
            }
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Documentation Price"
            name="itemPrices.documentation"
            type="number"
            value={
              form.itemPrices.documentation ??
              ""
            }
            onChange={handleChange}
            fullWidth
          />

          <Divider />

          {/* DOWNLOAD FILES */}

          <Typography
            fontWeight={700}
          >
            Download Files
          </Typography>

          <TextField
            label="Source Code ZIP URL"
            name="files.sourceCode"
            value={
              form.files.sourceCode
            }
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
            label="Documentation ZIP URL"
            name="files.documentation"
            value={
              form.files.documentation
            }
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Full Bundle ZIP URL"
            name="files.fullBundle"
            value={
              form.files.fullBundle
            }
            onChange={handleChange}
            fullWidth
          />

          <Divider />

          {/* MEDIA */}

          <Typography
            fontWeight={700}
          >
            Project Preview
          </Typography>

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
            value={
              form.livePreviewUrl
            }
            onChange={handleChange}
            fullWidth
          />

          {/* SAVE */}

          <Button
            variant="contained"
            size="large"
            onClick={handleUpdate}
            disabled={saving}
            sx={{
              minHeight: 48,
              borderRadius: 2,
              fontWeight: 800,
              textTransform: "none",
            }}
          >
            {saving
              ? "Saving Changes..."
              : "Save Changes"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditProject;