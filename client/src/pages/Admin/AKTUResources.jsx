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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SchoolIcon from "@mui/icons-material/School";

import api from "../../api/axios";

const resourceTypes = [
  {
    value: "syllabus",
    label: "Syllabus",
  },
  {
    value: "notes",
    label: "Notes",
  },
  {
    value: "important-questions",
    label: "Important Questions",
  },
  {
    value: "pyq",
    label: "PYQ",
  },
  {
    value: "quantum",
    label: "Quantum",
  },
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
  {
    value: "normal",
    label: "Normal",
  },
  {
    value: "important",
    label: "Important",
  },
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
  imageUrl: "",
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

  /* =========================
     GET ALL RESOURCES
  ========================= */

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/admin/aktu");

      setResources(
        Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (err) {
      console.error(
        "AKTU resources load failed:",
        err
      );

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

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =========================
     CLEAR FORM
  ========================= */

  const clearForm = () => {
    setForm({
      ...initialForm,
    });

    setEditingId(null);
    setMessage("");
    setError("");
  };

  /* =========================
     CREATE / UPDATE
  ========================= */

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

        semester: Number(
          form.semester
        ),

        year:
          form.year !== "" &&
          form.year !== null
            ? Number(form.year)
            : null,

        questionFrequency:
          Number(
            form.questionFrequency || 0
          ),

        imageUrl:
          form.imageUrl?.trim() || "",

        fileUrl:
          form.fileUrl?.trim() || "",
      };

      /* UPDATE */

      if (editingId) {
        await api.put(
          `/admin/aktu/${editingId}`,
          payload
        );

        setMessage(
          "AKTU resource updated successfully."
        );
      }

      /* CREATE */

      else {
        await api.post(
          "/admin/aktu",
          payload
        );

        setMessage(
          "AKTU resource added successfully."
        );
      }

      setForm({
        ...initialForm,
      });

      setEditingId(null);

      await fetchResources();
    } catch (err) {
      console.error(
        "AKTU resource save failed:",
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

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (resource) => {
    setEditingId(
      resource._id
    );

    setForm({
      branch:
        resource.branch ||
        "CSE",

      semester:
        resource.semester ||
        1,

      subjectCode:
        resource.subjectCode ||
        "",

      subjectName:
        resource.subjectName ||
        "",

      resourceType:
        resource.resourceType ||
        "notes",

      unit:
        resource.unit ||
        "",

      title:
        resource.title ||
        "",

      description:
        resource.description ||
        "",

      content:
        resource.content ||
        "",

      imageUrl:
        resource.imageUrl ||
        "",

      fileUrl:
        resource.fileUrl ||
        "",

      year:
        resource.year ?? "",

      questionFrequency:
        resource.questionFrequency ??
        0,

      priority:
        resource.priority ||
        "normal",

      isPublished:
        resource.isPublished !==
        false,
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this AKTU resource?"
      );

    if (!confirmed) {
      return;
    }

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
        "AKTU resource deletion failed:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete AKTU resource."
      );
    }
  };

  /* =========================
     RESOURCE TYPE LABEL
  ========================= */

  const getResourceTypeLabel = (
    type
  ) => {
    const item =
      resourceTypes.find(
        (resource) =>
          resource.value === type
      );

    return (
      item?.label ||
      type ||
      "Resource"
    );
  };

  /* =========================
     RESOURCE TYPE COLOR
  ========================= */

  const getResourceTypeIcon = (
    type
  ) => {
    if (type === "syllabus") {
      return <SchoolIcon />;
    }

    if (type === "pyq") {
      return <PictureAsPdfIcon />;
    }

    return <ImageIcon />;
  };

  /* =========================
     IMAGE ERROR HANDLER
  ========================= */

  const handleImageError = (event) => {
    event.currentTarget.style.display =
      "none";

    const fallback =
      event.currentTarget
        .nextElementSibling;

    if (fallback) {
      fallback.style.display =
        "flex";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: {
          xs: 2,
          md: 4,
        },
        background:
          "linear-gradient(180deg, #080d1d 0%, #050816 100%)",
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

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
            fontWeight={900}
            sx={{
              color: "#f8fafc",
              mb: 0.5,
            }}
          >
            AKTU Resources
          </Typography>

          <Typography
            color="text.secondary"
          >
            Manage syllabus, notes,
            PYQs, Quantum and other
            AKTU study resources.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={() =>
            navigate(
              "/admin/dashboard"
            )
          }
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Back to Dashboard
        </Button>
      </Box>

      {/* =========================
          ALERTS
      ========================= */}

      {message && (
        <Alert
          severity="success"
          sx={{
            mb: 3,
            borderRadius: 2,
          }}
        >
          {message}
        </Alert>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2,
            md: 4,
          },
          mb: 5,
          borderRadius: 4,
          background:
            "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
          border:
            "1px solid rgba(148,163,184,0.16)",
          boxShadow:
            "0 25px 70px rgba(0,0,0,0.28)",
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
              fontWeight={800}
            >
              {editingId
                ? "Edit AKTU Resource"
                : "Add AKTU Resource"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Add resource details,
              image and study file.
            </Typography>
          </Box>

          {editingId && (
            <Chip
              label="EDITING"
              color="primary"
              sx={{
                fontWeight: 800,
              }}
            />
          )}
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid
            container
            spacing={2.5}
          >
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
                {branches.map(
                  (branch) => (
                    <MenuItem
                      key={branch}
                      value={branch}
                    >
                      {branch}
                    </MenuItem>
                  )
                )}
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
                      Semester{" "}
                      {semester}
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
                value={
                  form.resourceType
                }
                onChange={handleChange}
              >
                {resourceTypes.map(
                  (resource) => (
                    <MenuItem
                      key={
                        resource.value
                      }
                      value={
                        resource.value
                      }
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
                value={
                  form.subjectCode
                }
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
                value={
                  form.subjectName
                }
                onChange={handleChange}
                placeholder="Example: DBMS"
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
                value={
                  form.description
                }
                onChange={handleChange}
                placeholder="Short description of this resource"
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

            {/* IMAGE URL */}

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="Resource Image URL"
                name="imageUrl"
                value={
                  form.imageUrl
                }
                onChange={handleChange}
                placeholder="https://example.com/aktu-image.jpg"
                helperText="Image shown on AKTU resource cards"
              />
            </Grid>

            {/* FILE URL */}

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                label="PDF / File URL"
                name="fileUrl"
                value={
                  form.fileUrl
                }
                onChange={handleChange}
                placeholder="https://example.com/file.pdf"
                helperText="PDF or downloadable resource"
              />
            </Grid>

            {/* IMAGE PREVIEW */}

            {form.imageUrl && (
              <Grid
                item
                xs={12}
              >
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    border:
                      "1px solid rgba(148,163,184,0.2)",
                    maxWidth: 420,
                    background:
                      "#020617",
                  }}
                >
                  <Box
                    component="img"
                    src={
                      form.imageUrl
                    }
                    alt="Resource preview"
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                    sx={{
                      width: "100%",
                      height: 220,
                      objectFit:
                        "cover",
                      display: "block",
                    }}
                  />

                  <Box sx={{ p: 1.5 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Image Preview
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )}

            {/* YEAR */}

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
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
              md={3}
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
              sm={6}
              md={3}
            >
              <TextField
                select
                fullWidth
                label="Priority"
                name="priority"
                value={
                  form.priority
                }
                onChange={handleChange}
              >
                {priorities.map(
                  (priority) => (
                    <MenuItem
                      key={
                        priority.value
                      }
                      value={
                        priority.value
                      }
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
              sm={6}
              md={3}
              sx={{
                display: "flex",
                alignItems:
                  "center",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      form.isPublished
                    }
                    onChange={
                      handleChange
                    }
                    name="isPublished"
                  />
                }
                label="Published"
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
                  startIcon={
                    editingId ? (
                      <EditIcon />
                    ) : (
                      <AddIcon />
                    )
                  }
                  disabled={saving}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    fontWeight: 800,
                    textTransform:
                      "none",
                  }}
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
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    fontWeight: 700,
                    textTransform:
                      "none",
                  }}
                >
                  {editingId
                    ? "Cancel Edit"
                    : "Clear Form"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* =========================
          EXISTING RESOURCES
      ========================= */}

      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2,
            md: 4,
          },
          borderRadius: 4,
          background:
            "linear-gradient(145deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
          border:
            "1px solid rgba(148,163,184,0.16)",
          boxShadow:
            "0 25px 70px rgba(0,0,0,0.28)",
        }}
      >
        {/* SECTION HEADER */}

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          flexDirection={{
            xs: "column",
            sm: "row",
          }}
          gap={2}
          mb={3}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={900}
            >
              Existing AKTU Resources
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              {resources.length}{" "}
              resource
              {resources.length !==
              1
                ? "s"
                : ""}{" "}
              available
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={
              <RefreshIcon />
            }
            onClick={
              fetchResources
            }
            disabled={loading}
            sx={{
              borderRadius: 2,
              textTransform:
                "none",
              fontWeight: 700,
            }}
          >
            Refresh
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* LOADING */}

        {loading ? (
          <Box
            sx={{
              py: 8,
              textAlign:
                "center",
            }}
          >
            <Typography
              color="text.secondary"
            >
              Loading AKTU
              resources...
            </Typography>
          </Box>
        ) : resources.length ===
          0 ? (
          /* EMPTY */

          <Box
            sx={{
              py: 8,
              textAlign:
                "center",
              borderRadius: 4,
              border:
                "1px dashed rgba(148,163,184,0.25)",
            }}
          >
            <SchoolIcon
              sx={{
                fontSize: 55,
                color:
                  "text.secondary",
                mb: 1,
              }}
            />

            <Typography
              variant="h6"
              fontWeight={800}
            >
              No AKTU Resources
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Add your first AKTU
              study resource above.
            </Typography>
          </Box>
        ) : (
          /* RESOURCE CARDS */

          <Grid
            container
            spacing={3}
          >
            {resources.map(
              (resource) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={
                    resource._id
                  }
                >
                  <Paper
                    elevation={0}
                    sx={{
                      height: "100%",
                      overflow:
                        "hidden",
                      borderRadius: 4,
                      background:
                        "linear-gradient(180deg, rgba(15,23,42,1), rgba(3,7,18,1))",
                      border:
                        "1px solid rgba(148,163,184,0.16)",
                      transition:
                        "all 0.25s ease",
                      "&:hover": {
                        transform:
                          "translateY(-6px)",
                        borderColor:
                          "rgba(99,102,241,0.45)",
                        boxShadow:
                          "0 22px 50px rgba(0,0,0,0.35)",
                      },
                    }}
                  >
                    {/* IMAGE */}

                    <Box
                      sx={{
                        height: 190,
                        position:
                          "relative",
                        overflow:
                          "hidden",
                        background:
                          "linear-gradient(135deg, #111827, #020617)",
                      }}
                    >
                      {resource.imageUrl ? (
                        <>
                          <Box
                            component="img"
                            src={
                              resource.imageUrl
                            }
                            alt={
                              resource.title
                            }
                            onError={
                              handleImageError
                            }
                            sx={{
                              width:
                                "100%",
                              height:
                                "100%",
                              objectFit:
                                "cover",
                              display:
                                "block",
                            }}
                          />

                          {/* IMAGE OVERLAY */}

                          <Box
                            sx={{
                              position:
                                "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.75))",
                            }}
                          />
                        </>
                      ) : null}

                      {/* FALLBACK */}

                      <Box
                        sx={{
                          position:
                            "absolute",
                          inset: 0,
                          display:
                            resource.imageUrl
                              ? "none"
                              : "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          flexDirection:
                            "column",
                          color:
                            "rgba(148,163,184,0.7)",
                        }}
                      >
                        <ImageIcon
                          sx={{
                            fontSize: 55,
                            mb: 1,
                          }}
                        />

                        <Typography
                          variant="body2"
                        >
                          No image
                        </Typography>
                      </Box>

                      {/* TYPE */}

                      <Chip
                        icon={getResourceTypeIcon(
                          resource.resourceType
                        )}
                        label={getResourceTypeLabel(
                          resource.resourceType
                        )}
                        size="small"
                        sx={{
                          position:
                            "absolute",
                          top: 14,
                          left: 14,
                          background:
                            "rgba(15,23,42,0.88)",
                          backdropFilter:
                            "blur(10px)",
                          color:
                            "#fff",
                          fontWeight: 700,
                        }}
                      />

                      {/* PUBLISHED */}

                      <Chip
                        label={
                          resource.isPublished
                            ? "Published"
                            : "Hidden"
                        }
                        size="small"
                        color={
                          resource.isPublished
                            ? "success"
                            : "default"
                        }
                        sx={{
                          position:
                            "absolute",
                          top: 14,
                          right: 14,
                          fontWeight: 700,
                        }}
                      />
                    </Box>

                    {/* CONTENT */}

                    <Box
                      sx={{
                        p: 2.5,
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        sx={{
                          mb: 1,
                          color:
                            "#f8fafc",
                          display:
                            "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient:
                            "vertical",
                          overflow:
                            "hidden",
                        }}
                      >
                        {resource.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            "primary.light",
                          fontWeight: 700,
                          mb: 0.7,
                        }}
                      >
                        {resource.branch}{" "}
                        • Semester{" "}
                        {
                          resource.semester
                        }
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1,
                          display:
                            "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient:
                            "vertical",
                          overflow:
                            "hidden",
                        }}
                      >
                        {
                          resource.subjectName
                        }

                        {resource.subjectCode
                          ? ` (${resource.subjectCode})`
                          : ""}
                      </Typography>

                      {resource.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.6,
                            mb: 2,
                            display:
                              "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient:
                              "vertical",
                            overflow:
                              "hidden",
                          }}
                        >
                          {
                            resource.description
                          }
                        </Typography>
                      )}

                      {/* META */}

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                        sx={{
                          mb: 2,
                        }}
                      >
                        <Chip
                          size="small"
                          label={
                            resource.priority ||
                            "normal"
                          }
                          variant="outlined"
                        />

                        {resource.unit && (
                          <Chip
                            size="small"
                            label={
                              resource.unit
                            }
                            variant="outlined"
                          />
                        )}

                        {resource.fileUrl && (
                          <Chip
                            size="small"
                            label="PDF/File"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </Stack>

                      {/* ACTIONS */}

                      <Stack
                        direction="row"
                        spacing={1}
                      >
                        {resource.fileUrl && (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={
                              <VisibilityIcon />
                            }
                            href={
                              resource.fileUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              flex: 1,
                              borderRadius: 2,
                              textTransform:
                                "none",
                              fontWeight: 700,
                            }}
                          >
                            View
                          </Button>
                        )}

                        <Button
                          size="small"
                          variant="contained"
                          startIcon={
                            <EditIcon />
                          }
                          onClick={() =>
                            handleEdit(
                              resource
                            )
                          }
                          sx={{
                            flex: 1,
                            borderRadius: 2,
                            textTransform:
                              "none",
                            fontWeight: 800,
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={
                            <DeleteIcon />
                          }
                          onClick={() =>
                            handleDelete(
                              resource._id
                            )
                          }
                          sx={{
                            minWidth:
                              48,
                            borderRadius: 2,
                            textTransform:
                              "none",
                            fontWeight: 700,
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </Box>
                  </Paper>
                </Grid>
              )
            )}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default AKTUResources;