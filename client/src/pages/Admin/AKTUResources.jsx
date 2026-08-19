import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Switch,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import api from "../../api/axios";

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
  imagePublicId: "",
  fileUrl: "",
  filePublicId: "",
  year: "",
  questionFrequency: 0,
  priority: "normal",
  isPublished: true,
};

const AKTUResources = () => {
  const [form, setForm] =
    useState(initialForm);

  const [resources, setResources] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [uploadingPdf, setUploadingPdf] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const imageInputRef =
    useRef(null);

  const pdfInputRef =
    useRef(null);

  /* =========================
     LOAD RESOURCES
  ========================= */

  const loadResources = async () => {
    try {
      setLoading(true);
      setError("");

      const res =
        await api.get("/admin/aktu");

      setResources(
        Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load AKTU resources."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     IMAGE UPLOAD
  ========================= */

  const handleImageUpload = async (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      ![
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ].includes(file.type)
    ) {
      setError(
        "Please select JPG, PNG or WEBP image."
      );

      event.target.value = "";
      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Image must be smaller than 10MB."
      );

      event.target.value = "";
      return;
    }

    try {
      setUploadingImage(true);
      setError("");
      setSuccess("");

      const data =
        new FormData();

      data.append(
        "image",
        file
      );

      const res =
        await api.post(
          "/upload/aktu/image",
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
            timeout: 120000,
          }
        );

      setForm((prev) => ({
        ...prev,

        imageUrl:
          res.data.url || "",

        imagePublicId:
          res.data.public_id || "",
      }));

      setSuccess(
        "Image uploaded successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Image upload failed."
      );
    } finally {
      setUploadingImage(false);

      if (imageInputRef.current) {
        imageInputRef.current.value =
          "";
      }
    }
  };

  /* =========================
     PDF UPLOAD
  ========================= */

  const handlePdfUpload = async (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      file.type !==
      "application/pdf"
    ) {
      setError(
        "Please select a PDF file."
      );

      event.target.value = "";
      return;
    }

    if (
      file.size >
      15 * 1024 * 1024
    ) {
      setError(
        "PDF must be smaller than 15MB."
      );

      event.target.value = "";
      return;
    }

    try {
      setUploadingPdf(true);
      setError("");
      setSuccess("");

      const data =
        new FormData();

      data.append(
        "pdf",
        file
      );

      const res =
        await api.post(
          "/upload/aktu/pdf",
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
            timeout: 120000,
          }
        );

      setForm((prev) => ({
        ...prev,

        fileUrl:
          res.data.url || "",

        filePublicId:
          res.data.public_id || "",
      }));

      setSuccess(
        "PDF uploaded successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "PDF upload failed."
      );
    } finally {
      setUploadingPdf(false);

      if (pdfInputRef.current) {
        pdfInputRef.current.value =
          "";
      }
    }
  };

  /* =========================
     CLEAR FILES
  ========================= */

  const removeImage = () => {
    setForm((prev) => ({
      ...prev,
      imageUrl: "",
      imagePublicId: "",
    }));
  };

  const removePdf = () => {
    setForm((prev) => ({
      ...prev,
      fileUrl: "",
      filePublicId: "",
    }));
  };

  /* =========================
     CREATE / UPDATE
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.subjectName.trim()) {
      setError(
        "Subject name is required."
      );
      return;
    }

    if (!form.title.trim()) {
      setError(
        "Resource title is required."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...form,

        semester:
          Number(form.semester),

        year:
          form.year === ""
            ? null
            : Number(form.year),

        questionFrequency:
          Number(
            form.questionFrequency || 0
          ),
      };

      if (editingId) {
        await api.put(
          `/admin/aktu/${editingId}`,
          payload
        );

        setSuccess(
          "AKTU resource updated successfully."
        );
      } else {
        await api.post(
          "/admin/aktu",
          payload
        );

        setSuccess(
          "AKTU resource created successfully."
        );
      }

      setForm(initialForm);
      setEditingId(null);

      await loadResources();
    } catch (err) {
      console.error(err);

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

  const handleEdit = (
    resource
  ) => {
    setEditingId(
      resource._id
    );

    setForm({
      branch:
        resource.branch || "CSE",

      semester:
        resource.semester || 1,

      subjectCode:
        resource.subjectCode || "",

      subjectName:
        resource.subjectName || "",

      resourceType:
        resource.resourceType ||
        "notes",

      unit:
        resource.unit || "",

      title:
        resource.title || "",

      description:
        resource.description || "",

      content:
        resource.content || "",

      imageUrl:
        resource.imageUrl || "",

      imagePublicId:
        resource.imagePublicId || "",

      fileUrl:
        resource.fileUrl || "",

      filePublicId:
        resource.filePublicId || "",

      year:
        resource.year ?? "",

      questionFrequency:
        resource.questionFrequency ??
        0,

      priority:
        resource.priority ||
        "normal",

      isPublished:
        resource.isPublished !== false,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this AKTU resource?"
      );

    if (!confirmed) return;

    try {
      setError("");

      await api.delete(
        `/admin/aktu/${id}`
      );

      setSuccess(
        "AKTU resource deleted successfully."
      );

      if (editingId === id) {
        setEditingId(null);
        setForm(initialForm);
      }

      await loadResources();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to delete resource."
      );
    }
  };

  /* =========================
     RESET
  ========================= */

  const clearForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  /* =========================
     RESOURCE TYPE LABEL
  ========================= */

  const getTypeLabel = (
    type
  ) => {
    return (
      resourceTypes.find(
        (item) =>
          item.value === type
      )?.label ||
      type
    );
  };

  return (
    <Box
      sx={{
        py: 5,
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="xl"
      >
        {/* =========================
            HEADER
        ========================= */}

        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: {
              xs: "flex-start",
              md: "center",
            },
            flexDirection: {
              xs: "column",
              md: "row",
            },
            gap: 2,
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              <SchoolIcon
                sx={{
                  fontSize: 38,
                  color:
                    "primary.main",
                }}
              />

              <Typography
                variant="h4"
                fontWeight={900}
              >
                AKTU Resource Manager
              </Typography>
            </Stack>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
              }}
            >
              Manage syllabus, notes,
              PYQs, Quantum and all
              AKTU study resources.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={
              <RefreshIcon />
            }
            onClick={
              loadResources
            }
          >
            Refresh
          </Button>
        </Box>

        {/* =========================
            ALERTS
        ========================= */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 3,
            }}
            onClose={() =>
              setError("")
            }
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 3,
            }}
            onClose={() =>
              setSuccess("")
            }
          >
            {success}
          </Alert>
        )}

        {/* =========================
            FORM
        ========================= */}

        <Card
          sx={{
            mb: 6,
            borderRadius: 5,
            border:
              "1px solid rgba(148,163,184,0.15)",
            background:
              "linear-gradient(145deg, rgba(15,23,42,.96), rgba(2,6,23,.98))",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: {
                xs: 2.5,
                md: 4,
              },
              py: 3,
              borderBottom:
                "1px solid rgba(148,163,184,.12)",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={900}
              >
                {editingId
                  ? "Edit AKTU Resource"
                  : "Add AKTU Resource"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                Upload images and PDFs
                directly from your
                computer.
              </Typography>
            </Box>

            {editingId && (
              <Chip
                label="EDITING"
                color="primary"
              />
            )}
          </Box>

          <CardContent
            sx={{
              p: {
                xs: 2.5,
                md: 4,
              },
            }}
          >
            <Box
              component="form"
              onSubmit={
                handleSubmit
              }
            >
              <Grid
                container
                spacing={2.5}
              >
                {/* BRANCH */}

                <Grid
                  item
                  xs={12}
                  md={4}
                >
                  <FormControl
                    fullWidth
                  >
                    <InputLabel>
                      Branch
                    </InputLabel>

                    <Select
                      name="branch"
                      value={
                        form.branch
                      }
                      label="Branch"
                      onChange={
                        handleChange
                      }
                    >
                      {branches.map(
                        (item) => (
                          <MenuItem
                            key={item}
                            value={item}
                          >
                            {item}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                {/* SEMESTER */}

                <Grid
                  item
                  xs={12}
                  md={4}
                >
                  <FormControl
                    fullWidth
                  >
                    <InputLabel>
                      Semester
                    </InputLabel>

                    <Select
                      name="semester"
                      value={
                        form.semester
                      }
                      label="Semester"
                      onChange={
                        handleChange
                      }
                    >
                      {semesters.map(
                        (item) => (
                          <MenuItem
                            key={item}
                            value={item}
                          >
                            Semester{" "}
                            {item}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                {/* TYPE */}

                <Grid
                  item
                  xs={12}
                  md={4}
                >
                  <FormControl
                    fullWidth
                  >
                    <InputLabel>
                      Resource Type
                    </InputLabel>

                    <Select
                      name="resourceType"
                      value={
                        form.resourceType
                      }
                      label="Resource Type"
                      onChange={
                        handleChange
                      }
                    >
                      {resourceTypes.map(
                        (item) => (
                          <MenuItem
                            key={
                              item.value
                            }
                            value={
                              item.value
                            }
                          >
                            {item.label}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                {/* SUBJECT CODE */}

                <Grid
                  item
                  xs={12}
                  md={4}
                >
                  <TextField
                    fullWidth
                    name="subjectCode"
                    label="Subject Code"
                    value={
                      form.subjectCode
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. KCS101"
                  />
                </Grid>

                {/* SUBJECT NAME */}

                <Grid
                  item
                  xs={12}
                  md={8}
                >
                  <TextField
                    fullWidth
                    required
                    name="subjectName"
                    label="Subject Name"
                    value={
                      form.subjectName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. Programming for Problem Solving"
                  />
                </Grid>

                {/* TITLE */}

                <Grid
                  item
                  xs={12}
                  md={8}
                >
                  <TextField
                    fullWidth
                    required
                    name="title"
                    label="Resource Title"
                    value={
                      form.title
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. Unit 1 Complete Notes"
                  />
                </Grid>

                {/* UNIT */}

                <Grid
                  item
                  xs={12}
                  md={4}
                >
                  <TextField
                    fullWidth
                    name="unit"
                    label="Unit"
                    value={
                      form.unit
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Unit 1"
                  />
                </Grid>

                {/* DESCRIPTION */}

                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    name="description"
                    label="Description"
                    value={
                      form.description
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Describe this resource..."
                  />
                </Grid>

                {/* =========================
                    IMAGE UPLOAD
                ========================= */}

                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      border:
                        "1px solid rgba(148,163,184,.16)",
                      background:
                        "rgba(15,23,42,.55)",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        mb: 2,
                      }}
                    >
                      <ImageIcon
                        color="primary"
                      />

                      <Typography
                        fontWeight={800}
                      >
                        Resource Image
                      </Typography>
                    </Stack>

                    <input
                      ref={
                        imageInputRef
                      }
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      hidden
                      onChange={
                        handleImageUpload
                      }
                    />

                    {form.imageUrl ? (
                      <Box>
                        <Box
                          component="img"
                          src={
                            form.imageUrl
                          }
                          alt="AKTU resource"
                          sx={{
                            width:
                              "100%",
                            height: 220,
                            objectFit:
                              "cover",
                            borderRadius: 3,
                            display:
                              "block",
                            mb: 2,
                          }}
                        />

                        <Stack
                          direction="row"
                          spacing={1}
                        >
                          <Button
                            variant="outlined"
                            startIcon={
                              <UploadFileIcon />
                            }
                            onClick={() =>
                              imageInputRef.current?.click()
                            }
                            disabled={
                              uploadingImage
                            }
                          >
                            Replace
                          </Button>

                          <Button
                            color="error"
                            variant="outlined"
                            startIcon={
                              <CloseIcon />
                            }
                            onClick={
                              removeImage
                            }
                          >
                            Remove
                          </Button>
                        </Stack>
                      </Box>
                    ) : (
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={
                          uploadingImage ? (
                            <CircularProgress
                              size={18}
                            />
                          ) : (
                            <UploadFileIcon />
                          )
                        }
                        onClick={() =>
                          imageInputRef.current?.click()
                        }
                        disabled={
                          uploadingImage
                        }
                        sx={{
                          minHeight: 130,
                          borderRadius: 3,
                          borderStyle:
                            "dashed",
                          textTransform:
                            "none",
                        }}
                      >
                        {uploadingImage
                          ? "Uploading image..."
                          : "Choose Image"}
                      </Button>
                    )}

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display:
                          "block",
                        mt: 1.5,
                      }}
                    >
                      JPG, PNG or WEBP •
                      Max 10MB
                    </Typography>
                  </Box>
                </Grid>

                {/* =========================
                    PDF UPLOAD
                ========================= */}

                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      border:
                        "1px solid rgba(148,163,184,.16)",
                      background:
                        "rgba(15,23,42,.55)",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        mb: 2,
                      }}
                    >
                      <PictureAsPdfIcon
                        color="error"
                      />

                      <Typography
                        fontWeight={800}
                      >
                        PDF / Study File
                      </Typography>
                    </Stack>

                    <input
                      ref={
                        pdfInputRef
                      }
                      type="file"
                      accept="application/pdf"
                      hidden
                      onChange={
                        handlePdfUpload
                      }
                    />

                    {form.fileUrl ? (
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          border:
                            "1px solid rgba(239,68,68,.2)",
                          background:
                            "rgba(239,68,68,.06)",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <PictureAsPdfIcon
                            color="error"
                            sx={{
                              fontSize: 40,
                            }}
                          />

                          <Box
                            sx={{
                              minWidth: 0,
                              flex: 1,
                            }}
                          >
                            <Typography
                              fontWeight={700}
                              noWrap
                            >
                              PDF uploaded
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Cloudinary
                              file
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            mt: 2,
                          }}
                        >
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={
                              <VisibilityIcon />
                            }
                            component="a"
                            href={
                              form.fileUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View PDF
                          </Button>

                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={
                              <UploadFileIcon />
                            }
                            onClick={() =>
                              pdfInputRef.current?.click()
                            }
                          >
                            Replace
                          </Button>

                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            startIcon={
                              <CloseIcon />
                            }
                            onClick={
                              removePdf
                            }
                          >
                            Remove
                          </Button>
                        </Stack>
                      </Box>
                    ) : (
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={
                          uploadingPdf ? (
                            <CircularProgress
                              size={18}
                            />
                          ) : (
                            <UploadFileIcon />
                          )
                        }
                        onClick={() =>
                          pdfInputRef.current?.click()
                        }
                        disabled={
                          uploadingPdf
                        }
                        sx={{
                          minHeight: 130,
                          borderRadius: 3,
                          borderStyle:
                            "dashed",
                          textTransform:
                            "none",
                        }}
                      >
                        {uploadingPdf
                          ? "Uploading PDF..."
                          : "Choose PDF"}
                      </Button>
                    )}

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display:
                          "block",
                        mt: 1.5,
                      }}
                    >
                      PDF • Max 15MB
                    </Typography>
                  </Box>
                </Grid>

                {/* YEAR */}

                <Grid
                  item
                  xs={12}
                  sm={4}
                >
                  <TextField
                    fullWidth
                    type="number"
                    name="year"
                    label="Year"
                    value={
                      form.year
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="2026"
                  />
                </Grid>

                {/* FREQUENCY */}

                <Grid
                  item
                  xs={12}
                  sm={4}
                >
                  <TextField
                    fullWidth
                    type="number"
                    name="questionFrequency"
                    label="PYQ Frequency"
                    value={
                      form.questionFrequency
                    }
                    onChange={
                      handleChange
                    }
                    inputProps={{
                      min: 0,
                    }}
                  />
                </Grid>

                {/* PRIORITY */}

                <Grid
                  item
                  xs={12}
                  sm={4}
                >
                  <FormControl
                    fullWidth
                  >
                    <InputLabel>
                      Priority
                    </InputLabel>

                    <Select
                      name="priority"
                      value={
                        form.priority
                      }
                      label="Priority"
                      onChange={
                        handleChange
                      }
                    >
                      <MenuItem value="normal">
                        Normal
                      </MenuItem>

                      <MenuItem value="important">
                        Important
                      </MenuItem>

                      <MenuItem value="very-important">
                        Very Important
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* PUBLISHED */}

                <Grid
                  item
                  xs={12}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 1,
                    }}
                  >
                    <Switch
                      checked={
                        form.isPublished
                      }
                      onChange={(e) =>
                        setForm(
                          (prev) => ({
                            ...prev,
                            isPublished:
                              e.target
                                .checked,
                          })
                        )
                      }
                    />

                    <Typography fontWeight={700}>
                      Published
                    </Typography>
                  </Box>
                </Grid>

                {/* BUTTONS */}

                <Grid
                  item
                  xs={12}
                >
                  <Divider
                    sx={{
                      my: 1,
                    }}
                  />

                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={2}
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={
                        saving ? (
                          <CircularProgress
                            size={20}
                            color="inherit"
                          />
                        ) : editingId ? (
                          <EditIcon />
                        ) : (
                          <AddIcon />
                        )
                      }
                      disabled={
                        saving ||
                        uploadingImage ||
                        uploadingPdf
                      }
                      sx={{
                        px: 4,
                        borderRadius: 3,
                        textTransform:
                          "none",
                        fontWeight: 800,
                      }}
                    >
                      {saving
                        ? "Saving..."
                        : editingId
                        ? "Update Resource"
                        : "Add Resource"}
                    </Button>

                    <Button
                      type="button"
                      variant="outlined"
                      size="large"
                      onClick={
                        clearForm
                      }
                      sx={{
                        px: 4,
                        borderRadius: 3,
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
          </CardContent>
        </Card>

        {/* =========================
            EXISTING RESOURCES
        ========================= */}

        <Box
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <MenuBookIcon
                color="primary"
              />

              <Typography
                variant="h4"
                fontWeight={900}
              >
                Existing Resources
              </Typography>
            </Stack>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              {resources.length} resource
              {resources.length !== 1
                ? "s"
                : ""}{" "}
              available
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box
            sx={{
              py: 8,
              textAlign: "center",
            }}
          >
            <CircularProgress />

            <Typography
              color="text.secondary"
              sx={{
                mt: 2,
              }}
            >
              Loading AKTU resources...
            </Typography>
          </Box>
        ) : resources.length === 0 ? (
          <Card
            sx={{
              p: 6,
              borderRadius: 4,
              textAlign: "center",
            }}
          >
            <SchoolIcon
              sx={{
                fontSize: 60,
                opacity: 0.4,
              }}
            />

            <Typography
              variant="h6"
              fontWeight={800}
              sx={{
                mt: 2,
              }}
            >
              No AKTU resources yet
            </Typography>

            <Typography
              color="text.secondary"
            >
              Add your first resource
              using the form above.
            </Typography>
          </Card>
        ) : (
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
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      overflow: "hidden",
                      border:
                        "1px solid rgba(148,163,184,.15)",
                      background:
                        "linear-gradient(145deg, rgba(15,23,42,.95), rgba(2,6,23,.98))",
                      transition:
                        "transform .25s ease, box-shadow .25s ease",
                      "&:hover": {
                        transform:
                          "translateY(-5px)",
                        boxShadow:
                          "0 20px 50px rgba(0,0,0,.3)",
                      },
                    }}
                  >
                    {/* IMAGE */}

                    {resource.imageUrl ? (
                      <Box
                        component="img"
                        src={
                          resource.imageUrl
                        }
                        alt={
                          resource.title
                        }
                        sx={{
                          width:
                            "100%",
                          height: 210,
                          objectFit:
                            "cover",
                          display:
                            "block",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 210,
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          background:
                            "linear-gradient(135deg, rgba(99,102,241,.16), rgba(15,23,42,.8))",
                        }}
                      >
                        <ImageIcon
                          sx={{
                            fontSize: 65,
                            opacity: 0.25,
                          }}
                        />
                      </Box>
                    )}

                    <CardContent
                      sx={{
                        p: 3,
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight={900}
                            sx={{
                              lineHeight: 1.25,
                            }}
                          >
                            {
                              resource.title
                            }
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mt: 1,
                            }}
                          >
                            {
                              resource.branch
                            }{" "}
                            • Semester{" "}
                            {
                              resource.semester
                            }
                          </Typography>
                        </Box>

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
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        sx={{
                          mt: 2,
                          gap: 1,
                        }}
                      >
                        <Chip
                          size="small"
                          label={getTypeLabel(
                            resource.resourceType
                          )}
                        />

                        {resource.priority !==
                          "normal" && (
                          <Chip
                            size="small"
                            color="warning"
                            label={
                              resource.priority
                            }
                          />
                        )}

                        {resource.unit && (
                          <Chip
                            size="small"
                            variant="outlined"
                            label={
                              resource.unit
                            }
                          />
                        )}
                      </Stack>

                      {resource.subjectName && (
                        <Typography
                          sx={{
                            mt: 2,
                            fontWeight: 700,
                          }}
                        >
                          {
                            resource.subjectName
                          }

                          {resource.subjectCode
                            ? ` (${resource.subjectCode})`
                            : ""}
                        </Typography>
                      )}

                      {resource.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 1,
                            lineHeight: 1.6,
                            display:
                              "-webkit-box",
                            WebkitLineClamp: 3,
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

                      <Divider
                        sx={{
                          my: 2.5,
                        }}
                      />

                      <Stack
                        direction="row"
                        spacing={1}
                      >
                        {resource.fileUrl && (
                          <Tooltip title="View PDF">
                            <IconButton
                              component="a"
                              href={
                                resource.fileUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              color="error"
                              sx={{
                                border:
                                  "1px solid rgba(239,68,68,.3)",
                                borderRadius: 2,
                              }}
                            >
                              <PictureAsPdfIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        {resource.imageUrl && (
                          <Tooltip title="View image">
                            <IconButton
                              component="a"
                              href={
                                resource.imageUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              color="primary"
                              sx={{
                                border:
                                  "1px solid rgba(99,102,241,.3)",
                                borderRadius: 2,
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        <Box
                          sx={{
                            flex: 1,
                          }}
                        />

                        <Button
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
                            borderRadius: 2,
                            textTransform:
                              "none",
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          color="error"
                          variant="outlined"
                          onClick={() =>
                            handleDelete(
                              resource._id
                            )
                          }
                          sx={{
                            minWidth: 45,
                            borderRadius: 2,
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default AKTUResources;