import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const resourceTypes = [
  { value: "syllabus", label: "Syllabus" },
  { value: "notes", label: "Notes" },
  {
    value: "important-questions",
    label: "Important Questions",
  },
  { value: "pyq", label: "PYQ" },
  { value: "quantum", label: "Quantum" },
  {
    value: "question-answers",
    label: "Question & Answers",
  },
];

const branches = [
  "CSE",
  "IT",
  "AI/ML",
  "AI & DS",
  "ECE",
  "ME",
  "CE",
];

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

const priorities = [
  { value: "normal", label: "Normal" },
  { value: "important", label: "Important" },
  {
    value: "very-important",
    label: "Very Important",
  },
];

const initialForm = {
  branch: "CSE",
  semester: 1,
  subjectCode: "",
  subjectName: "",
  resourceType: "notes",
  unit: "",
  title: "",
  description: "",
  content: "",
  fileUrl: "",
  year: "",
  questionFrequency: 0,
  priority: "normal",
  isPublished: true,
};

const AKTUResources = () => {
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/admin/aktu");

      setResources(res.data || []);
    } catch (err) {
      console.error("AKTU resources load failed", err);

      setError(
        err.response?.data?.message ||
          "Failed to load AKTU resources."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const clearForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !form.branch ||
      !form.semester ||
      !form.subjectName ||
      !form.resourceType ||
      !form.title
    ) {
      setError(
        "Branch, semester, subject name, resource type and title are required."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        semester: Number(form.semester),
        year:
          form.year !== "" &&
          form.year !== null
            ? Number(form.year)
            : null,
        questionFrequency: Number(
          form.questionFrequency || 0
        ),
      };

      if (editingId) {
        await api.put(
          `/admin/aktu/${editingId}`,
          payload
        );

        setMessage(
          "AKTU resource updated successfully."
        );
      } else {
        await api.post(
          "/admin/aktu",
          payload
        );

        setMessage(
          "AKTU resource added successfully."
        );
      }

      setForm(initialForm);
      setEditingId(null);

      await fetchResources();
    } catch (err) {
      console.error(
        "AKTU resource save failed",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to save AKTU resource."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (resource) => {
    setEditingId(resource._id);

    setForm({
      branch: resource.branch || "CSE",
      semester: resource.semester || 1,
      subjectCode:
        resource.subjectCode || "",
      subjectName:
        resource.subjectName || "",
      resourceType:
        resource.resourceType || "notes",
      unit: resource.unit || "",
      title: resource.title || "",
      description:
        resource.description || "",
      content: resource.content || "",
      fileUrl: resource.fileUrl || "",
      year:
        resource.year ?? "",
      questionFrequency:
        resource.questionFrequency ?? 0,
      priority:
        resource.priority || "normal",
      isPublished:
        resource.isPublished !== false,
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this AKTU resource?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await api.delete(
        `/admin/aktu/${id}`
      );

      if (editingId === id) {
        clearForm();
      }

      setMessage(
        "AKTU resource deleted successfully."
      );

      await fetchResources();
    } catch (err) {
      console.error(
        "AKTU resource deletion failed",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete AKTU resource."
      );
    }
  };

  const getResourceTypeLabel = (type) => {
    const item = resourceTypes.find(
      (resource) =>
        resource.value === type
    );

    return item?.label || type;
  };

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      {/* HEADER */}
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        flexDirection={{
          xs: "column",
          md: "row",
        }}
        gap={2}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
          >
            AKTU Resources
          </Typography>

          <Typography color="text.secondary">
            Manage syllabus, notes, PYQs,
            Quantum and other AKTU study
            resources.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={() =>
            navigate("/admin/dashboard")
          }
        >
          Back to Dashboard
        </Button>
      </Box>

      {/* ALERTS */}
      {message && (
        <Alert
          severity="success"
          sx={{ mb: 3 }}
        >
          {message}
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* ADD / EDIT RESOURCE */}
      <Paper
        sx={{
          p: {
            xs: 2,
            md: 4,
          },
          borderRadius: 3,
          mb: 5,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          gap={2}
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            {editingId
              ? "Edit AKTU Resource"
              : "Add AKTU Resource"}
          </Typography>

          {editingId && (
            <Chip
              label="Editing"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2.5}>
            {/* BRANCH */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
            >
              <TextField
                select
                fullWidth
                label="Branch"
                name="branch"
                value={form.branch}
                onChange={handleChange}
              >
                {branches.map((branch) => (
                  <MenuItem
                    key={branch}
                    value={branch}
                  >
                    {branch}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* SEMESTER */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
            >
              <TextField
                select
                fullWidth
                label="Semester"
                name="semester"
                value={form.semester}
                onChange={handleChange}
              >
                {semesters.map(
                  (semester) => (
                    <MenuItem
                      key={semester}
                      value={semester}
                    >
                      {semester} Semester
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            {/* RESOURCE TYPE */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
            >
              <TextField
                select
                fullWidth
                label="Resource Type"
                name="resourceType"
                value={form.resourceType}
                onChange={handleChange}
              >
                {resourceTypes.map(
                  (resource) => (
                    <MenuItem
                      key={resource.value}
                      value={resource.value}
                    >
                      {resource.label}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            {/* SUBJECT CODE */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
            >
              <TextField
                fullWidth
                label="Subject Code"
                name="subjectCode"
                value={form.subjectCode}
                onChange={handleChange}
                placeholder="Example: KCS501"
              />
            </Grid>

            {/* SUBJECT NAME */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
            >
              <TextField
                fullWidth
                label="Subject Name"
                name="subjectName"
                value={form.subjectName}
                onChange={handleChange}
                placeholder="Example: Database Management System"
                required
              />
            </Grid>

            {/* UNIT */}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
            >
              <TextField
                fullWidth
                label="Unit"
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="Example: Unit 1"
              />
            </Grid>

            {/* TITLE */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Resource Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Example: DBMS Unit 1 Notes"
                required
              />
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </Grid>

            {/* CONTENT */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={5}
                label="Content"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Write notes, questions, answers or other text content here."
              />
            </Grid>

            {/* FILE URL */}
            <Grid
              item
              xs={12}
              md={8}
            >
              <TextField
                fullWidth
                label="File URL"
                name="fileUrl"
                value={form.fileUrl}
                onChange={handleChange}
                placeholder="PDF or document URL"
              />
            </Grid>

            {/* YEAR */}
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
            >
              <TextField
                fullWidth
                type="number"
                label="Year"
                name="year"
                value={form.year}
                onChange={handleChange}
                placeholder="2026"
              />
            </Grid>

            {/* FREQUENCY */}
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
            >
              <TextField
                fullWidth
                type="number"
                label="PYQ Frequency"
                name="questionFrequency"
                value={
                  form.questionFrequency
                }
                onChange={handleChange}
                inputProps={{
                  min: 0,
                }}
              />
            </Grid>

            {/* PRIORITY */}
            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                select
                fullWidth
                label="Priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                {priorities.map(
                  (priority) => (
                    <MenuItem
                      key={priority.value}
                      value={priority.value}
                    >
                      {priority.label}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            {/* PUBLISH */}
            <Grid
              item
              xs={12}
              md={6}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      form.isPublished
                    }
                    onChange={handleChange}
                    name="isPublished"
                  />
                }
                label="Publish resource"
              />
            </Grid>

            {/* ACTIONS */}
            <Grid item xs={12}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Save Changes"
                    : "Add Resource"}
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  onClick={clearForm}
                  disabled={saving}
                >
                  {editingId
                    ? "Cancel Edit"
                    : "Clear"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* EXISTING RESOURCES */}
      <Paper
        sx={{
          p: {
            xs: 2,
            md: 4,
          },
          borderRadius: 3,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          gap={2}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              Existing AKTU Resources
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Total resources:{" "}
              {resources.length}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            onClick={fetchResources}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <Typography color="text.secondary">
            Loading AKTU resources...
          </Typography>
        ) : resources.length === 0 ? (
          <Typography color="text.secondary">
            No AKTU resources added yet.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {resources.map((resource) => (
              <Grid
                item
                xs={12}
                md={6}
                key={resource._id}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <Typography
                    fontWeight={700}
                    mb={1}
                  >
                    {resource.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={1}
                  >
                    {resource.branch} •
                    Semester{" "}
                    {resource.semester}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={1}
                  >
                    {resource.subjectName}
                    {resource.subjectCode
                      ? ` (${resource.subjectCode})`
                      : ""}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mb={2}
                  >
                    {getResourceTypeLabel(
                      resource.resourceType
                    )}
                    {resource.unit
                      ? ` • ${resource.unit}`
                      : ""}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    mb={2}
                  >
                    <Chip
                      size="small"
                      label={
                        resource.priority ||
                        "normal"
                      }
                    />

                    <Chip
                      size="small"
                      label={
                        resource.isPublished
                          ? "Published"
                          : "Hidden"
                      }
                      color={
                        resource.isPublished
                          ? "success"
                          : "default"
                      }
                    />

                    {resource.fileUrl && (
                      <Chip
                        size="small"
                        label="File Available"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Stack>

                  {resource.fileUrl && (
                    <Button
                      size="small"
                      variant="text"
                      href={
                        resource.fileUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        mr: 1,
                        mb: 1,
                      }}
                    >
                      View File
                    </Button>
                  )}

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        handleEdit(
                          resource
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() =>
                        handleDelete(
                          resource._id
                        )
                      }
                    >
                      Delete
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default AKTUResources;