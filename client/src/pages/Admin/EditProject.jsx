import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("codex_token");

  const [loading, setLoading] = useState(true);

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

  // ========================
  // FETCH PROJECT
  // ========================
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);

        setForm({
          title: res.data.title || "",
          category: res.data.category || "",
          description: res.data.description || "",
          techStack: res.data.techStack?.join(", ") || "",

          originalPrice: res.data.originalPrice ?? "",
          price: res.data.price ?? "",

          itemPrices: {
            sourceCode: res.data.itemPrices?.sourceCode ?? "",
            ppt: res.data.itemPrices?.ppt ?? "",
            documentation: res.data.itemPrices?.documentation ?? "",
          },

          files: {
            sourceCode: res.data.files?.sourceCode ?? "",
            ppt: res.data.files?.ppt ?? "",
            documentation: res.data.files?.documentation ?? "",
            fullBundle: res.data.files?.fullBundle ?? "",
          },

          screenshotUrl: res.data.screenshotUrl || "",
          livePreviewUrl: res.data.livePreviewUrl || "",
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

  // ========================
  // HANDLE CHANGE
  // ========================
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

  // ========================
  // UPDATE PROJECT
  // ========================
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
      <Typography variant="h4" fontWeight={800} mb={3}>
        Edit Project
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 900 }}>
        <Stack spacing={2}>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} />
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

          <Divider />

          <TextField
            label="Original Price"
            name="originalPrice"
            type="number"
            value={form.originalPrice}
            onChange={handleChange}
          />
          <TextField
            label="Final Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />

          <Divider />

          <Typography fontWeight={600}>Individual Item Prices</Typography>
          <TextField
            label="Source Code Price"
            name="itemPrices.sourceCode"
            type="number"
            value={form.itemPrices.sourceCode}
            onChange={handleChange}
          />
          <TextField
            label="PPT Price"
            name="itemPrices.ppt"
            type="number"
            value={form.itemPrices.ppt}
            onChange={handleChange}
          />
          <TextField
            label="Documentation Price"
            name="itemPrices.documentation"
            type="number"
            value={form.itemPrices.documentation}
            onChange={handleChange}
          />

          <Divider />

          <Typography fontWeight={600}>Download Files</Typography>
          <TextField
            label="Source Code ZIP URL"
            name="files.sourceCode"
            value={form.files.sourceCode}
            onChange={handleChange}
          />
          <TextField
            label="PPT ZIP URL"
            name="files.ppt"
            value={form.files.ppt}
            onChange={handleChange}
          />
          <TextField
            label="Documentation ZIP URL"
            name="files.documentation"
            value={form.files.documentation}
            onChange={handleChange}
          />
          <TextField
            label="Full Bundle ZIP URL"
            name="files.fullBundle"
            value={form.files.fullBundle}
            onChange={handleChange}
          />

          <Divider />

          <TextField
            label="Screenshot URL"
            name="screenshotUrl"
            value={form.screenshotUrl}
            onChange={handleChange}
          />
          <TextField
            label="Live Preview URL"
            name="livePreviewUrl"
            value={form.livePreviewUrl}
            onChange={handleChange}
          />

          <Button variant="contained" size="large" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditProject;
