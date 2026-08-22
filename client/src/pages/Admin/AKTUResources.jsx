import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PublicIcon from "@mui/icons-material/Public";
import HiddenIcon from "@mui/icons-material/VisibilityOff";

import api from "../../api/axios";

/* =========================================================
   OPTIONS
========================================================= */

const BRANCHES = [
  "CSE",
  "IT",
  "AI/ML",
  "AI & DS",
  "ECE",
  "ME",
  "CE",
];

const ACADEMIC_YEARS = [
  {
    value: 1,
    label: "1st Year",
  },
  {
    value: 2,
    label: "2nd Year",
  },
  {
    value: 3,
    label: "3rd Year",
  },
  {
    value: 4,
    label: "4th Year",
  },
];

const RESOURCE_TYPES = [
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

/* =========================================================
   CONSTANT STYLES
========================================================= */

const COLORS = {
  page: "#070b18",
  panel: "#0c1222",
  panel2: "#10172a",
  input: "#080e1d",
  border: "rgba(148,163,184,.14)",
  borderStrong: "rgba(99,102,241,.28)",
  primary: "#6366f1",
  primaryLight: "#818cf8",
  blue: "#3b82f6",
  text: "#f8fafc",
  textSoft: "#94a3b8",
  textMuted: "#64748b",
  success: "#22c55e",
  warning: "#f97316",
  danger: "#ef4444",
};

/* =========================================================
   HELPERS
========================================================= */

const getYearLabel = (year) => {
  const found = ACADEMIC_YEARS.find(
    (item) =>
      Number(item.value) === Number(year)
  );

  return (
    found?.label ||
    `${year} Year`
  );
};

const getResourceTypeLabel = (type) => {
  const found = RESOURCE_TYPES.find(
    (item) =>
      item.value === type
  );

  return (
    found?.label ||
    "Resource"
  );
};

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const getGoogleDriveFileId = (url) => {
  if (!url) return "";

  const patterns = [
    /\/file\/d\/([^/]+)/,
    /[?&]id=([^&]+)/,
    /\/open\?id=([^&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return "";
};

const getImagePreviewUrl = (url) => {
  if (!url) return "";

  const fileId =
    getGoogleDriveFileId(url);

  if (!fileId) {
    return url;
  }

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
};

/* =========================================================
   EMPTY FORM
========================================================= */

const EMPTY_FORM = {
  branch: "CSE",
  academicYear: 1,
  resourceType: "syllabus",
  unit: "",
  description: "",
  imageUrl: "",
  fileUrl: "",
  price: "",
  isPublished: true,
};

/* =========================================================
   INPUT STYLE
========================================================= */

const inputSx = {
  "& .MuiInputLabel-root": {
    color: COLORS.textSoft,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: COLORS.primaryLight,
  },

  "& .MuiOutlinedInput-root": {
    color: COLORS.text,
    background:
      "rgba(4,8,20,.72)",

    "& fieldset": {
      borderColor:
        COLORS.border,
    },

    "&:hover fieldset": {
      borderColor:
        "rgba(129,140,248,.45)",
    },

    "&.Mui-focused fieldset": {
      borderColor:
        COLORS.primary,
      borderWidth: 1,
    },
  },

  "& .MuiFormHelperText-root": {
    color: COLORS.textMuted,
  },

  "& input::placeholder": {
    color: COLORS.textMuted,
    opacity: 1,
  },

  "& textarea::placeholder": {
    color: COLORS.textMuted,
    opacity: 1,
  },
};

const selectSx = {
  color: COLORS.text,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor:
      COLORS.border,
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor:
      "rgba(129,140,248,.45)",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor:
      COLORS.primary,
  },

  "& .MuiSvgIcon-root": {
    color: COLORS.textSoft,
  },
};

const selectMenuProps = {
  PaperProps: {
    sx: {
      mt: 1,
      background:
        "#0d1427",
      color: COLORS.text,
      border:
        `1px solid ${COLORS.borderStrong}`,
      boxShadow:
        "0 20px 50px rgba(0,0,0,.45)",

      "& .MuiMenuItem-root": {
        minHeight: 44,

        "&:hover": {
          background:
            "rgba(99,102,241,.13)",
        },

        "&.Mui-selected": {
          background:
            "rgba(99,102,241,.22)",
        },

        "&.Mui-selected:hover": {
          background:
            "rgba(99,102,241,.3)",
        },
      },
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const AKTUResources = () => {
  const [form, setForm] =
    useState(EMPTY_FORM);

  const [resources, setResources] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [filterBranch, setFilterBranch] =
    useState("all");

  const [filterYear, setFilterYear] =
    useState("all");

  const [filterType, setFilterType] =
    useState("all");

  const [filterAccess, setFilterAccess] =
    useState("all");

  const [snackbar, setSnackbar] =
    useState({
      open: false,
      message: "",
      severity: "info",
    });

  const isSyllabus =
    form.resourceType ===
    "syllabus";

  /* =======================================================
     MESSAGE
  ======================================================= */

  const showMessage = (
    message,
    severity = "info"
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  /* =======================================================
     LOAD
  ======================================================= */

  const loadResources = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          "/admin/aktu"
        );

      setResources(
        Array.isArray(
          response.data
        )
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Load AKTU resources error:",
        error
      );

      showMessage(
        error.response?.data?.message ||
          "Failed to load AKTU resources.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  /* =======================================================
     FORM
  ======================================================= */

  const handleChange = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const clearForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    if (!form.branch) {
      return "Please select a branch.";
    }

    if (!form.academicYear) {
      return "Please select an academic year.";
    }

    if (!form.resourceType) {
      return "Please select a resource type.";
    }

    if (!form.fileUrl.trim()) {
      return "Google Drive PDF link is required.";
    }

    if (
      !isValidUrl(
        form.fileUrl.trim()
      )
    ) {
      return "Please enter a valid PDF link.";
    }

    if (!isSyllabus) {
      if (!form.unit.trim()) {
        return "Unit number is required.";
      }

      if (!form.description.trim()) {
        return "Unit name / description is required.";
      }

      if (!form.imageUrl.trim()) {
        return "Front page image link is required.";
      }

      if (
        !isValidUrl(
          form.imageUrl.trim()
        )
      ) {
        return "Please enter a valid image link.";
      }

      const price =
        Number(form.price);

      if (
        !Number.isFinite(price) ||
        price <= 0
      ) {
        return "Please enter a valid price greater than ₹0.";
      }
    }

    return null;
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      showMessage(
        validationError,
        "error"
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        branch:
          form.branch.trim(),

        academicYear:
          Number(
            form.academicYear
          ),

        resourceType:
          form.resourceType,

        unit: isSyllabus
          ? ""
          : form.unit.trim(),

        description:
          form.description.trim(),

        imageUrl: isSyllabus
          ? ""
          : form.imageUrl.trim(),

        fileUrl:
          form.fileUrl.trim(),

        price: isSyllabus
          ? 0
          : Number(form.price),

        isPublished:
          Boolean(
            form.isPublished
          ),
      };

      if (editingId) {
        await api.put(
          `/admin/aktu/${editingId}`,
          payload
        );

        showMessage(
          "Resource updated successfully.",
          "success"
        );
      } else {
        await api.post(
          "/admin/aktu",
          payload
        );

        showMessage(
          "Resource added successfully.",
          "success"
        );
      }

      clearForm();
      await loadResources();
    } catch (error) {
      console.error(
        "Save resource error:",
        error
      );

      showMessage(
        error.response?.data?.message ||
          "Failed to save resource.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     EDIT
  ======================================================= */

  const handleEdit = (resource) => {
    setEditingId(
      resource._id
    );

    setForm({
      branch:
        resource.branch ||
        "CSE",

      academicYear:
        Number(
          resource.academicYear
        ) || 1,

      resourceType:
        resource.resourceType ||
        "syllabus",

      unit:
        resource.unit || "",

      description:
        resource.description ||
        "",

      imageUrl:
        resource.imageUrl ||
        "",

      fileUrl:
        resource.fileUrl ||
        "",

      price:
        Number(resource.price) > 0
          ? String(resource.price)
          : "",

      isPublished:
        resource.isPublished !==
        false,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this resource?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(
        `/admin/aktu/${id}`
      );

      showMessage(
        "Resource deleted successfully.",
        "success"
      );

      if (editingId === id) {
        clearForm();
      }

      await loadResources();
    } catch (error) {
      console.error(
        "Delete resource error:",
        error
      );

      showMessage(
        error.response?.data?.message ||
          "Failed to delete resource.",
        "error"
      );
    }
  };

  /* =======================================================
     FILTERED RESOURCES
  ======================================================= */

  const filteredResources =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return resources.filter(
        (resource) => {
          const paid =
            Number(
              resource.price
            ) > 0;

          if (
            filterBranch !==
              "all" &&
            resource.branch !==
              filterBranch
          ) {
            return false;
          }

          if (
            filterYear !== "all" &&
            Number(
              resource.academicYear
            ) !==
              Number(filterYear)
          ) {
            return false;
          }

          if (
            filterType !== "all" &&
            resource.resourceType !==
              filterType
          ) {
            return false;
          }

          if (
            filterAccess ===
              "free" &&
            paid
          ) {
            return false;
          }

          if (
            filterAccess ===
              "paid" &&
            !paid
          ) {
            return false;
          }

          if (!query) {
            return true;
          }

          const text = [
            resource.branch,
            getYearLabel(
              resource.academicYear
            ),
            getResourceTypeLabel(
              resource.resourceType
            ),
            resource.unit,
            resource.description,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return text.includes(
            query
          );
        }
      );
    }, [
      resources,
      search,
      filterBranch,
      filterYear,
      filterType,
      filterAccess,
    ]);

  /* =======================================================
     STATS
  ======================================================= */

  const stats = useMemo(() => {
    const total =
      resources.length;

    const free =
      resources.filter(
        (item) =>
          Number(item.price) <= 0
      ).length;

    const paid =
      resources.filter(
        (item) =>
          Number(item.price) > 0
      ).length;

    const published =
      resources.filter(
        (item) =>
          item.isPublished !== false
      ).length;

    const hidden =
      resources.filter(
        (item) =>
          item.isPublished === false
      ).length;

    return {
      total,
      free,
      paid,
      published,
      hidden,
    };
  }, [resources]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pb: {
          xs: 5,
          md: 8,
        },

        color:
          COLORS.text,

        background: `
          radial-gradient(
            circle at 10% 0%,
            rgba(79,70,229,.15),
            transparent 30%
          ),
          radial-gradient(
            circle at 95% 10%,
            rgba(37,99,235,.11),
            transparent 28%
          ),
          radial-gradient(
            circle at 50% 80%,
            rgba(99,102,241,.06),
            transparent 32%
          ),
          ${COLORS.page}
        `,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          pt: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* =================================================
            HERO
        ================================================= */}

        <Card
          sx={{
            mb: {
              xs: 2,
              md: 3,
            },

            overflow: "hidden",

            borderRadius: {
              xs: 3,
              md: 4,
            },

            color: "#fff",

            background: `
              radial-gradient(
                circle at 90% 20%,
                rgba(96,165,250,.35),
                transparent 35%
              ),
              linear-gradient(
                135deg,
                #312e81 0%,
                #4338ca 42%,
                #2563eb 100%
              )
            `,

            border:
              "1px solid rgba(129,140,248,.25)",

            boxShadow:
              "0 25px 70px rgba(37,99,235,.22)",
          }}
        >
          <Box
            sx={{
              p: {
                xs: 2.5,
                sm: 3.5,
                md: 5,
              },
            }}
          >
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={3}
              alignItems={{
                xs: "flex-start",
                sm: "center",
              }}
              justifyContent="space-between"
            >
              <Box>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 1.5 }}
                >
                  <SchoolIcon
                    sx={{
                      fontSize: {
                        xs: 24,
                        md: 30,
                      },
                    }}
                  />

                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: 950,
                      letterSpacing:
                        "1.8px",
                      color:
                        "#c7d2fe",
                    }}
                  >
                    ADMIN • AKTU
                  </Typography>
                </Stack>

                <Typography
                  fontWeight={950}
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      sm: "2.6rem",
                      md: "3.2rem",
                    },
                    lineHeight: 1.05,
                    letterSpacing:
                      "-1.5px",
                  }}
                >
                  Study Resources
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,
                    maxWidth: 760,
                    color:
                      "#dbeafe",
                    lineHeight: 1.7,
                    fontSize: {
                      xs: ".86rem",
                      sm: ".98rem",
                    },
                  }}
                >
                  Manage syllabus,
                  notes, PYQs,
                  important questions,
                  Quantum and
                  question-answer PDFs
                  from one place.
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => {
                  clearForm();

                  window.scrollTo({
                    top: 0,
                    behavior:
                      "smooth",
                  });
                }}
                startIcon={
                  <AddIcon />
                }
                sx={{
                  minHeight: 50,
                  px: 2.8,
                  borderRadius: 2.5,
                  textTransform:
                    "none",
                  fontWeight: 950,
                  whiteSpace:
                    "nowrap",

                  color:
                    "#1e1b4b",

                  background:
                    "#ffffff",

                  boxShadow:
                    "0 10px 25px rgba(0,0,0,.18)",

                  "&:hover": {
                    background:
                      "#eef2ff",
                  },
                }}
              >
                Add Resource
              </Button>
            </Stack>
          </Box>
        </Card>

        {/* =================================================
            STATS
        ================================================= */}

        <Grid
          container
          spacing={{
            xs: 1.5,
            md: 2,
          }}
          sx={{
            mb: {
              xs: 2.5,
              md: 4,
            },
          }}
        >
          <Grid
            item
            xs={6}
            md={3}
          >
            <StatCard
              icon={
                <LibraryBooksIcon />
              }
              title="Total"
              value={stats.total}
              subtitle="All resources"
              background="rgba(99,102,241,.13)"
              iconColor="#818cf8"
            />
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
          >
            <StatCard
              icon={
                <LockOpenIcon />
              }
              title="Free"
              value={stats.free}
              subtitle="Free resources"
              background="rgba(34,197,94,.1)"
              iconColor="#4ade80"
            />
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
          >
            <StatCard
              icon={
                <LockIcon />
              }
              title="Paid"
              value={stats.paid}
              subtitle="Premium resources"
              background="rgba(249,115,22,.1)"
              iconColor="#fb923c"
            />
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
          >
            <StatCard
              icon={
                <VisibilityIcon />
              }
              title="Published"
              value={stats.published}
              subtitle="Visible to students"
              background="rgba(59,130,246,.1)"
              iconColor="#60a5fa"
            />
          </Grid>
        </Grid>

        {/* =================================================
            FORM CARD
        ================================================= */}

        <Card
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },

            borderRadius: {
              xs: 3,
              md: 4,
            },

            background:
              "linear-gradient(145deg,#0d1428,#080d1b)",

            color:
              COLORS.text,

            border:
              "1px solid rgba(99,102,241,.16)",

            boxShadow:
              "0 20px 60px rgba(0,0,0,.28)",
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },

              "&:last-child": {
                pb: {
                  xs: 2,
                  sm: 3,
                  md: 4,
                },
              },
            }}
          >
            {/* FORM HEADER */}

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  flexShrink: 0,

                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",

                  borderRadius: 2.5,

                  background:
                    "linear-gradient(135deg,rgba(99,102,241,.22),rgba(59,130,246,.12))",

                  border:
                    "1px solid rgba(129,140,248,.2)",

                  color:
                    COLORS.primaryLight,
                }}
              >
                {editingId ? (
                  <EditIcon />
                ) : (
                  <CloudUploadIcon />
                )}
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  fontWeight={950}
                  sx={{
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.5rem",
                    },
                  }}
                >
                  {editingId
                    ? "Edit Resource"
                    : "Add New Resource"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: .3,
                    color:
                      COLORS.textSoft,
                  }}
                >
                  {isSyllabus
                    ? "Syllabus is always free."
                    : "This resource will be sold as a paid PDF."}
                </Typography>
              </Box>
            </Stack>

            {/* BASIC INFORMATION */}

            <SectionTitle>
              Basic Information
            </SectionTitle>

            <Grid
              container
              spacing={2}
            >
              {/* BRANCH */}

              <Grid
                item
                xs={12}
                md={4}
              >
                <FormControl fullWidth>
                  <InputLabel>
                    Branch
                  </InputLabel>

                  <Select
                    value={
                      form.branch
                    }
                    label="Branch"
                    onChange={(event) =>
                      handleChange(
                        "branch",
                        event.target
                          .value
                      )
                    }
                    sx={selectSx}
                    MenuProps={
                      selectMenuProps
                    }
                  >
                    {BRANCHES.map(
                      (branch) => (
                        <MenuItem
                          key={
                            branch
                          }
                          value={
                            branch
                          }
                        >
                          {branch}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>

              {/* YEAR */}

              <Grid
                item
                xs={12}
                md={4}
              >
                <FormControl fullWidth>
                  <InputLabel>
                    Academic Year
                  </InputLabel>

                  <Select
                    value={
                      form.academicYear
                    }
                    label="Academic Year"
                    onChange={(event) =>
                      handleChange(
                        "academicYear",
                        Number(
                          event.target
                            .value
                        )
                      )
                    }
                    sx={selectSx}
                    MenuProps={
                      selectMenuProps
                    }
                  >
                    {ACADEMIC_YEARS.map(
                      (year) => (
                        <MenuItem
                          key={
                            year.value
                          }
                          value={
                            year.value
                          }
                        >
                          {year.label}
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
                <FormControl fullWidth>
                  <InputLabel>
                    Resource Type
                  </InputLabel>

                  <Select
                    value={
                      form.resourceType
                    }
                    label="Resource Type"
                    onChange={(event) =>
                      handleChange(
                        "resourceType",
                        event.target
                          .value
                      )
                    }
                    sx={selectSx}
                    MenuProps={
                      selectMenuProps
                    }
                  >
                    {RESOURCE_TYPES.map(
                      (type) => (
                        <MenuItem
                          key={
                            type.value
                          }
                          value={
                            type.value
                          }
                        >
                          {type.label}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* ACCESS STATUS */}

            <Box
              sx={{
                mt: 3,

                p: {
                  xs: 1.7,
                  sm: 2.2,
                },

                borderRadius: 3,

                background:
                  isSyllabus
                    ? "linear-gradient(135deg,rgba(34,197,94,.1),rgba(7,14,26,.8))"
                    : "linear-gradient(135deg,rgba(249,115,22,.1),rgba(7,14,26,.8))",

                border: `1px solid ${
                  isSyllabus
                    ? "rgba(34,197,94,.22)"
                    : "rgba(249,115,22,.22)"
                }`,
              }}
            >
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    flexShrink: 0,
                    borderRadius: 2,
                    background:
                      isSyllabus
                        ? "rgba(34,197,94,.12)"
                        : "rgba(249,115,22,.12)",
                    color:
                      isSyllabus
                        ? "#4ade80"
                        : "#fb923c",
                  }}
                >
                  {isSyllabus ? (
                    <LockOpenIcon />
                  ) : (
                    <LockIcon />
                  )}
                </Box>

                <Box>
                  <Typography
                    fontWeight={950}
                    sx={{
                      color:
                        isSyllabus
                          ? "#86efac"
                          : "#fdba74",
                    }}
                  >
                    {isSyllabus
                      ? "FREE SYLLABUS"
                      : "PAID RESOURCE"}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        COLORS.textSoft,
                      mt: .2,
                    }}
                  >
                    {isSyllabus
                      ? "No payment is required. Price is automatically ₹0."
                      : "Students must complete payment before receiving this PDF."}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* PAID FIELDS */}

            {!isSyllabus && (
              <Grid
                container
                spacing={2}
                sx={{ mt: 1 }}
              >
                <Grid
                  item
                  xs={12}
                  sm={4}
                >
                  <TextField
                    fullWidth
                    label="Unit Number"
                    placeholder="Example: Unit 1"
                    value={form.unit}
                    onChange={(event) =>
                      handleChange(
                        "unit",
                        event.target
                          .value
                      )
                    }
                    sx={inputSx}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={8}
                >
                  <TextField
                    fullWidth
                    label="Unit Name / Description"
                    placeholder="Example: Introduction to Data Structures"
                    value={
                      form.description
                    }
                    onChange={(event) =>
                      handleChange(
                        "description",
                        event.target
                          .value
                      )
                    }
                    sx={inputSx}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={4}
                >
                  <TextField
                    fullWidth
                    type="number"
                    label="Price"
                    placeholder="Enter price"
                    value={
                      form.price
                    }
                    onChange={(event) =>
                      handleChange(
                        "price",
                        event.target
                          .value
                      )
                    }
                    inputProps={{
                      min: 1,
                    }}
                    sx={inputSx}
                    InputProps={{
                      startAdornment:
                        (
                          <InputAdornment position="start">
                            <CurrencyRupeeIcon
                              sx={{
                                color:
                                  COLORS.textSoft,
                              }}
                            />
                          </InputAdornment>
                        ),
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {/* SYLLABUS DESCRIPTION */}

            {isSyllabus && (
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Description (Optional)"
                placeholder="Small description about this syllabus..."
                value={
                  form.description
                }
                onChange={(event) =>
                  handleChange(
                    "description",
                    event.target.value
                  )
                }
                sx={{
                  ...inputSx,
                  mt: 3,
                }}
              />
            )}

            <Divider
              sx={{
                my: 4,
                borderColor:
                  COLORS.border,
              }}
            />

            {/* PDF */}

            <SectionTitle
              icon={
                <PictureAsPdfIcon />
              }
            >
              PDF File
            </SectionTitle>

            <TextField
              fullWidth
              label="Google Drive PDF Link"
              placeholder="https://drive.google.com/file/d/..."
              value={form.fileUrl}
              onChange={(event) =>
                handleChange(
                  "fileUrl",
                  event.target.value
                )
              }
              helperText="Set the Google Drive file access to Anyone with the link."
              sx={inputSx}
            />

            {form.fileUrl && (
              <Button
                component="a"
                href={
                  form.fileUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                startIcon={
                  <VisibilityIcon />
                }
                sx={{
                  mt: 1,
                  color:
                    COLORS.primaryLight,
                  textTransform:
                    "none",
                  fontWeight: 850,
                }}
              >
                Open PDF
              </Button>
            )}

            {/* IMAGE */}

            {!isSyllabus && (
              <Box sx={{ mt: 3 }}>
                <SectionTitle
                  icon={
                    <ImageIcon />
                  }
                >
                  Front Page Image
                </SectionTitle>

                <TextField
                  fullWidth
                  label="Google Drive Image Link"
                  placeholder="https://drive.google.com/file/d/..."
                  value={
                    form.imageUrl
                  }
                  onChange={(event) =>
                    handleChange(
                      "imageUrl",
                      event.target
                        .value
                    )
                  }
                  helperText="This image is displayed on the student resource card."
                  sx={inputSx}
                />

                {form.imageUrl && (
                  <Box
                    sx={{
                      mt: 2,
                      width: "100%",
                      maxWidth: 500,
                      height: {
                        xs: 190,
                        sm: 260,
                      },
                      overflow:
                        "hidden",
                      borderRadius: 3,
                      background:
                        "#080e1d",
                      border:
                        `1px solid ${COLORS.border}`,
                    }}
                  >
                    <Box
                      component="img"
                      src={getImagePreviewUrl(
                        form.imageUrl
                      )}
                      alt="Front page preview"
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
                      onError={(
                        event
                      ) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}

            {/* PUBLISH */}

            <Box
              sx={{
                mt: 3,
                p: 2,

                borderRadius: 3,

                background:
                  "rgba(4,8,20,.5)",

                border:
                  `1px solid ${COLORS.border}`,
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={
                      form.isPublished
                    }
                    onChange={(
                      event
                    ) =>
                      handleChange(
                        "isPublished",
                        event.target
                          .checked
                      )
                    }
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked":
                        {
                          color:
                            COLORS.primaryLight,
                        },

                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor:
                            COLORS.primary,
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography
                      fontWeight={900}
                    >
                      Published
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          COLORS.textMuted,
                      }}
                    >
                      Show this resource
                      to students.
                    </Typography>
                  </Box>
                }
              />
            </Box>

            {/* ACTION BUTTONS */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={1.5}
              sx={{
                mt: 3,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={saving}
                startIcon={
                  saving ? (
                    <CircularProgress
                      size={18}
                      color="inherit"
                    />
                  ) : editingId ? (
                    <EditIcon />
                  ) : (
                    <AddIcon />
                  )
                }
                sx={{
                  minHeight: 52,
                  px: 3.5,
                  borderRadius: 2.5,
                  textTransform:
                    "none",
                  fontWeight: 950,

                  background:
                    "linear-gradient(135deg,#6366f1,#3b82f6)",

                  boxShadow:
                    "0 10px 25px rgba(79,70,229,.2)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#4f46e5,#2563eb)",
                  },
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
                startIcon={
                  editingId ? (
                    <CloseIcon />
                  ) : (
                    <RefreshIcon />
                  )
                }
                sx={{
                  minHeight: 52,
                  px: 3.5,
                  borderRadius: 2.5,
                  textTransform:
                    "none",
                  fontWeight: 900,

                  color:
                    COLORS.textSoft,

                  borderColor:
                    COLORS.border,

                  "&:hover": {
                    borderColor:
                      "rgba(129,140,248,.5)",
                    background:
                      "rgba(99,102,241,.07)",
                  },
                }}
              >
                {editingId
                  ? "Cancel Edit"
                  : "Clear Form"}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* =================================================
            ALL RESOURCES
        ================================================= */}

        <Card
          sx={{
            borderRadius: {
              xs: 3,
              md: 4,
            },

            background:
              "linear-gradient(145deg,#0c1222,#080d1b)",

            color:
              COLORS.text,

            border:
              "1px solid rgba(99,102,241,.14)",

            boxShadow:
              "0 20px 60px rgba(0,0,0,.28)",
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },
            }}
          >
            {/* LIST HEADER */}

            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              spacing={2}
              alignItems={{
                xs: "stretch",
                md: "center",
              }}
              justifyContent="space-between"
              sx={{
                mb: 3,
              }}
            >
              <Box>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <LibraryBooksIcon
                    sx={{
                      color:
                        COLORS.primaryLight,
                    }}
                  />

                  <Typography
                    variant="h5"
                    fontWeight={950}
                    sx={{
                      fontSize: {
                        xs: "1.3rem",
                        sm: "1.5rem",
                      },
                    }}
                  >
                    All Resources
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    mt: .5,
                    color:
                      COLORS.textMuted,
                  }}
                >
                  {filteredResources.length}{" "}
                  of {resources.length}{" "}
                  resources shown
                </Typography>
              </Box>

              <Button
                variant="outlined"
                onClick={
                  loadResources
                }
                disabled={loading}
                startIcon={
                  <RefreshIcon />
                }
                sx={{
                  borderRadius: 2.5,
                  textTransform:
                    "none",
                  fontWeight: 800,

                  color:
                    COLORS.textSoft,

                  borderColor:
                    COLORS.border,

                  "&:hover": {
                    borderColor:
                      "rgba(129,140,248,.5)",
                    background:
                      "rgba(99,102,241,.07)",
                  },
                }}
              >
                Refresh
              </Button>
            </Stack>

            {/* SEARCH */}

            <TextField
              fullWidth
              label="Search resources"
              placeholder="Search branch, unit, description..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              sx={{
                ...inputSx,
                mb: 2,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color:
                          COLORS.textMuted,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* FILTERS */}

            <Grid
              container
              spacing={1.5}
              sx={{
                mb: 3,
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <FilterSelect
                  label="Branch"
                  value={
                    filterBranch
                  }
                  onChange={
                    setFilterBranch
                  }
                  options={[
                    {
                      value:
                        "all",
                      label:
                        "All Branches",
                    },
                    ...BRANCHES.map(
                      (
                        branch
                      ) => ({
                        value:
                          branch,
                        label:
                          branch,
                      })
                    ),
                  ]}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <FilterSelect
                  label="Year"
                  value={
                    filterYear
                  }
                  onChange={
                    setFilterYear
                  }
                  options={[
                    {
                      value:
                        "all",
                      label:
                        "All Years",
                    },
                    ...ACADEMIC_YEARS.map(
                      (
                        year
                      ) => ({
                        value:
                          String(
                            year.value
                          ),
                        label:
                          year.label,
                      })
                    ),
                  ]}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <FilterSelect
                  label="Type"
                  value={
                    filterType
                  }
                  onChange={
                    setFilterType
                  }
                  options={[
                    {
                      value:
                        "all",
                      label:
                        "All Types",
                    },
                    ...RESOURCE_TYPES.map(
                      (
                        type
                      ) => ({
                        value:
                          type.value,
                        label:
                          type.label,
                      })
                    ),
                  ]}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={3}
              >
                <FilterSelect
                  label="Access"
                  value={
                    filterAccess
                  }
                  onChange={
                    setFilterAccess
                  }
                  options={[
                    {
                      value:
                        "all",
                      label:
                        "Free + Paid",
                    },
                    {
                      value:
                        "free",
                      label:
                        "Free Only",
                    },
                    {
                      value:
                        "paid",
                      label:
                        "Paid Only",
                    },
                  ]}
                />
              </Grid>
            </Grid>

            {/* RESOURCE LIST */}

            {loading ? (
              <LoadingState />
            ) : filteredResources.length ===
              0 ? (
              <EmptyState />
            ) : (
              <Grid
                container
                spacing={2.5}
              >
                {filteredResources.map(
                  (resource) => {
                    const isPaid =
                      Number(
                        resource.price
                      ) > 0;

                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={4}
                        key={
                          resource._id
                        }
                      >
                        <ResourceCard
                          resource={
                            resource
                          }
                          isPaid={
                            isPaid
                          }
                          onEdit={
                            handleEdit
                          }
                          onDelete={
                            handleDelete
                          }
                        />
                      </Grid>
                    );
                  }
                )}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* =================================================
          SNACKBAR
      ================================================= */}

      <Snackbar
        open={
          snackbar.open
        }
        autoHideDuration={4500}
        onClose={() =>
          setSnackbar(
            (previous) => ({
              ...previous,
              open: false,
            })
          )
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity={
            snackbar.severity
          }
          variant="filled"
          onClose={() =>
            setSnackbar(
              (previous) => ({
                ...previous,
                open: false,
              })
            )
          }
          sx={{
            borderRadius: 2.5,
            width: "100%",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

/* =========================================================
   SECTION TITLE
========================================================= */

const SectionTitle = ({
  children,
  icon,
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        mb: 1.7,
      }}
    >
      {icon && (
        <Box
          sx={{
            color:
              COLORS.primaryLight,
            display: "flex",
          }}
        >
          {icon}
        </Box>
      )}

      <Typography
        fontWeight={950}
        sx={{
          fontSize: {
            xs: ".95rem",
            sm: "1rem",
          },
        }}
      >
        {children}
      </Typography>
    </Stack>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  background,
  iconColor,
}) => {
  return (
    <Card
      sx={{
        height: "100%",

        borderRadius: {
          xs: 2.5,
          sm: 3.5,
        },

        background:
          "linear-gradient(145deg,#10172a,#090e1d)",

        color:
          COLORS.text,

        border:
          "1px solid rgba(99,102,241,.13)",

        boxShadow:
          "0 12px 35px rgba(0,0,0,.28)",

        transition:
          "all .25s ease",

        "&:hover": {
          transform:
            "translateY(-4px)",

          borderColor:
            "rgba(99,102,241,.35)",

          boxShadow:
            "0 20px 45px rgba(0,0,0,.4)",
        },
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 1.5,
            sm: 2.2,
          },

          "&:last-child": {
            pb: {
              xs: 1.5,
              sm: 2.2,
            },
          },
        }}
      >
        <Stack
          direction="row"
          spacing={{
            xs: 1,
            sm: 1.5,
          }}
          alignItems="center"
        >
          <Box
            sx={{
              width: {
                xs: 40,
                sm: 48,
              },

              height: {
                xs: 40,
                sm: 48,
              },

              flexShrink: 0,

              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",

              borderRadius: 2.5,

              background,

              color:
                iconColor,
            }}
          >
            {icon}
          </Box>

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              variant="body2"
              noWrap
              sx={{
                color:
                  COLORS.textMuted,

                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
              }}
            >
              {title}
            </Typography>

            <Typography
              fontWeight={950}
              sx={{
                color:
                  COLORS.text,

                fontSize: {
                  xs: "1.3rem",
                  sm: "1.7rem",
                },

                lineHeight: 1.1,
              }}
            >
              {value}
            </Typography>

            <Typography
              variant="caption"
              noWrap
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },

                color:
                  COLORS.textMuted,
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

/* =========================================================
   FILTER SELECT
========================================================= */

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <FormControl
      fullWidth
      size="small"
    >
      <InputLabel>
        {label}
      </InputLabel>

      <Select
        value={value}
        label={label}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        sx={selectSx}
        MenuProps={
          selectMenuProps
        }
      >
        {options.map(
          (option) => (
            <MenuItem
              key={
                option.value
              }
              value={
                option.value
              }
            >
              {option.label}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

/* =========================================================
   RESOURCE CARD
========================================================= */

const ResourceCard = ({
  resource,
  isPaid,
  onEdit,
  onDelete,
}) => {
  return (
    <Card
      sx={{
        height: "100%",

        display: "flex",
        flexDirection:
          "column",

        overflow: "hidden",

        borderRadius: 3.5,

        background:
          "linear-gradient(145deg,#10172b,#090e1d)",

        color:
          COLORS.text,

        border:
          "1px solid rgba(99,102,241,.13)",

        boxShadow:
          "0 12px 35px rgba(0,0,0,.3)",

        transition:
          "all .25s ease",

        "&:hover": {
          transform:
            "translateY(-5px)",

          borderColor:
            "rgba(99,102,241,.38)",

          boxShadow:
            "0 22px 55px rgba(0,0,0,.45)",
        },
      }}
    >
      {/* IMAGE */}

      <Box
        sx={{
          height: {
            xs: 180,
            sm: 200,
          },

          position:
            "relative",

          overflow:
            "hidden",

          background:
            "#080e1d",
        }}
      >
        {resource.imageUrl ? (
          <Box
            component="img"
            src={getImagePreviewUrl(
              resource.imageUrl
            )}
            alt={
              resource.description ||
              "AKTU resource"
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
            onError={(
              event
            ) => {
              event.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              height:
                "100%",
              color:
                COLORS.textMuted,
            }}
          >
            <MenuBookIcon
              sx={{
                fontSize: 55,
              }}
            />

            <Typography
              variant="caption"
              sx={{
                mt: 1,
              }}
            >
              No cover image
            </Typography>
          </Stack>
        )}

        {/* PRICE */}

        <Chip
          icon={
            isPaid ? (
              <LockIcon />
            ) : (
              <LockOpenIcon />
            )
          }
          label={
            isPaid
              ? `₹${Number(
                  resource.price
                ).toFixed(0)}`
              : "FREE"
          }
          sx={{
            position:
              "absolute",

            top: 12,
            right: 12,

            fontWeight: 950,

            color:
              isPaid
                ? "#fed7aa"
                : "#bbf7d0",

            background:
              isPaid
                ? "rgba(124,45,18,.92)"
                : "rgba(20,83,45,.92)",

            border:
              `1px solid ${
                isPaid
                  ? "rgba(249,115,22,.35)"
                  : "rgba(34,197,94,.35)"
              }`,

            backdropFilter:
              "blur(8px)",
          }}
        />

        {/* HIDDEN */}

        {!resource.isPublished && (
          <Chip
            icon={
              <HiddenIcon />
            }
            label="HIDDEN"
            size="small"
            sx={{
              position:
                "absolute",

              bottom: 12,
              left: 12,

              color:
                "#e2e8f0",

              background:
                "rgba(15,23,42,.88)",

              border:
                "1px solid rgba(148,163,184,.2)",

              fontWeight: 900,
            }}
          />
        )}
      </Box>

      {/* CONTENT */}

      <CardContent
        sx={{
          flex: 1,

          p: 2,

          "&:last-child": {
            pb: 2,
          },
        }}
      >
        <Stack
          direction="row"
          spacing={0.7}
          flexWrap="wrap"
          useFlexGap
          sx={{
            mb: 1.3,
          }}
        >
          <Chip
            size="small"
            label={
              resource.branch
            }
            sx={{
              color:
                "#c7d2fe",
              background:
                "rgba(99,102,241,.12)",
              border:
                "1px solid rgba(99,102,241,.2)",
              fontWeight: 800,
            }}
          />

          <Chip
            size="small"
            icon={
              <SchoolIcon
                sx={{
                  color:
                    "#93c5fd !important",
                }}
              />
            }
            label={getYearLabel(
              resource.academicYear
            )}
            sx={{
              color:
                "#bfdbfe",
              background:
                "rgba(59,130,246,.1)",
              border:
                "1px solid rgba(59,130,246,.18)",
            }}
          />
        </Stack>

        <Typography
          fontWeight={950}
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "1.08rem",
            },
          }}
        >
          {getResourceTypeLabel(
            resource.resourceType
          )}
        </Typography>

        {resource.unit && (
          <Typography
            sx={{
              mt: .7,
              color:
                COLORS.primaryLight,
              fontWeight: 850,
            }}
          >
            {resource.unit}
          </Typography>
        )}

        {resource.description && (
          <Typography
            variant="body2"
            sx={{
              mt: .7,

              color:
                COLORS.textSoft,

              lineHeight: 1.55,

              display:
                "-webkit-box",

              WebkitBoxOrient:
                "vertical",

              WebkitLineClamp: 2,

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
            my: 1.8,
            borderColor:
              COLORS.border,
          }}
        />

        <Stack
          direction="row"
          spacing={.8}
          alignItems="center"
        >
          <Chip
            size="small"
            icon={
              resource.isPublished ? (
                <PublicIcon />
              ) : (
                <HiddenIcon />
              )
            }
            label={
              resource.isPublished
                ? "Published"
                : "Hidden"
            }
            sx={{
              color:
                resource.isPublished
                  ? "#86efac"
                  : "#94a3b8",

              background:
                resource.isPublished
                  ? "rgba(34,197,94,.08)"
                  : "rgba(100,116,139,.1)",

              border:
                `1px solid ${
                  resource.isPublished
                    ? "rgba(34,197,94,.18)"
                    : "rgba(100,116,139,.18)"
                }`,
            }}
          />

          {isPaid && (
            <Chip
              size="small"
              icon={
                <CurrencyRupeeIcon />
              }
              label="Paid"
              sx={{
                color:
                  "#fdba74",

                background:
                  "rgba(249,115,22,.08)",

                border:
                  "1px solid rgba(249,115,22,.18)",
              }}
            />
          )}
        </Stack>
      </CardContent>

      {/* ACTIONS */}

      <Box
        sx={{
          px: 2,
          pb: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
        >
          <Button
            fullWidth
            component="a"
            href={
              resource.fileUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={
              <PictureAsPdfIcon />
            }
            sx={{
              borderRadius: 2,
              textTransform:
                "none",
              fontWeight: 850,

              color:
                "#c7d2fe",

              borderColor:
                "rgba(99,102,241,.25)",

              "&:hover": {
                borderColor:
                  COLORS.primary,
                background:
                  "rgba(99,102,241,.08)",
              },
            }}
          >
            PDF
          </Button>

          <Button
            fullWidth
            variant="contained"
            size="small"
            startIcon={
              <EditIcon />
            }
            onClick={() =>
              onEdit(
                resource
              )
            }
            sx={{
              borderRadius: 2,
              textTransform:
                "none",
              fontWeight: 850,

              background:
                "linear-gradient(135deg,#6366f1,#4f46e5)",

              "&:hover": {
                background:
                  "linear-gradient(135deg,#4f46e5,#4338ca)",
              },
            }}
          >
            Edit
          </Button>

          <IconButton
            onClick={() =>
              onDelete(
                resource._id
              )
            }
            sx={{
              flexShrink: 0,

              color:
                "#f87171",

              border:
                "1px solid rgba(239,68,68,.25)",

              borderRadius: 2,

              "&:hover": {
                background:
                  "rgba(239,68,68,.1)",
                borderColor:
                  "rgba(239,68,68,.5)",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>

        {resource.imageUrl && (
          <Button
            fullWidth
            component="a"
            href={
              resource.imageUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            startIcon={
              <ImageIcon />
            }
            sx={{
              mt: 1,

              borderRadius: 2,

              textTransform:
                "none",

              fontWeight: 750,

              color:
                COLORS.textMuted,

              "&:hover": {
                color:
                  COLORS.primaryLight,
                background:
                  "rgba(99,102,241,.06)",
              },
            }}
          >
            View Cover Image
          </Button>
        )}
      </Box>
    </Card>
  );
};

/* =========================================================
   LOADING
========================================================= */

const LoadingState = () => {
  return (
    <Box
      sx={{
        py: 8,

        display: "flex",
        alignItems:
          "center",
        justifyContent:
          "center",

        borderRadius: 3,

        background:
          "rgba(4,8,20,.45)",

        border:
          `1px solid ${COLORS.border}`,
      }}
    >
      <Stack
        spacing={1.5}
        alignItems="center"
      >
        <CircularProgress
          sx={{
            color:
              COLORS.primaryLight,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            color:
              COLORS.textMuted,
          }}
        >
          Loading resources...
        </Typography>
      </Stack>
    </Box>
  );
};

/* =========================================================
   EMPTY
========================================================= */

const EmptyState = () => {
  return (
    <Box
      sx={{
        py: 8,

        textAlign: "center",

        borderRadius: 3,

        background:
          "rgba(4,8,20,.45)",

        border:
          "1px dashed rgba(99,102,241,.25)",
      }}
    >
      <MenuBookIcon
        sx={{
          fontSize: 58,
          color:
            COLORS.textMuted,
        }}
      />

      <Typography
        variant="h6"
        fontWeight={900}
        sx={{
          mt: 1,
        }}
      >
        No resources found
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mt: .5,
          color:
            COLORS.textMuted,
        }}
      >
        Try changing your
        search or filters.
      </Typography>
    </Box>
  );
};

export default AKTUResources;