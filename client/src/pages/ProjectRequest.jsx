import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CodeIcon from "@mui/icons-material/Code";
import SendIcon from "@mui/icons-material/Send";
import DescriptionIcon from "@mui/icons-material/Description";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";

import api from "../api/axios";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const ProjectRequest = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    projectName: "",
    requestType: "",
    techStack: "",
    otherTech: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "techStack" && value !== "Other"
        ? { otherTech: "" }
        : {}),
    }));

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const data = {
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      projectName: form.projectName.trim(),
      requestType: form.requestType,
      techStack: form.techStack,
      otherTech: form.otherTech.trim(),
      requirements: form.requirements.trim(),
    };

    if (
      !data.name ||
      !data.email ||
      !data.mobile ||
      !data.requestType ||
      !data.techStack ||
      !data.requirements
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (data.techStack === "Other" && !data.otherTech) {
      setError("Please enter your required technology.");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await api.post(
        "/project-requests",
        data
      );

      setSuccess(
        response.data?.message ||
          "Your project request has been sent successfully."
      );

      setForm({
        name: "",
        email: "",
        mobile: "",
        projectName: "",
        requestType: "",
        techStack: "",
        otherTech: "",
        requirements: "",
      });
    } catch (err) {
      console.error("Project request error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to send your request right now. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      minHeight: { xs: 48, sm: 52 },
      borderRadius: { xs: 2, sm: 2.5 },
      color: "#fff",
      bgcolor: "rgba(2,6,23,.62)",

      "& fieldset": {
        borderColor: "rgba(148,163,184,.16)",
      },

      "&:hover fieldset": {
        borderColor: "rgba(129,140,248,.45)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#6366f1",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#64748b",
      fontSize: { xs: ".78rem", sm: ".875rem" },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#a5b4fc",
    },

    "& .MuiInputBase-input": {
      fontSize: { xs: ".78rem", sm: ".875rem" },
    },

    "& .MuiInputBase-input::placeholder": {
      color: "#475569",
      opacity: 1,
    },

    "& .MuiSelect-select": {
      fontSize: { xs: ".78rem", sm: ".875rem" },
    },
  };

  const iconSx = {
    color: "#64748b",
    fontSize: { xs: 17, sm: 19 },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 2.5, sm: 5, md: 7 },
        bgcolor: "#020617",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 5% 0%, rgba(99,102,241,.18), transparent 30%), radial-gradient(circle at 95% 15%, rgba(249,115,22,.08), transparent 28%), linear-gradient(180deg,#020617 0%,#070b20 55%,#020617 100%)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 1.2, sm: 2.5, md: 3 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          sx={{
            maxWidth: 760,
            mx: "auto",
            textAlign: "center",
            mb: { xs: 2.5, sm: 4, md: 5 },
          }}
        >
          <Chip
            icon={
              <AssignmentIcon
                sx={{
                  fontSize: "15px !important",
                }}
              />
            }
            label="PROJECT REQUEST"
            sx={{
              mb: { xs: 1.2, sm: 1.8 },
              height: { xs: 28, sm: 32 },
              bgcolor: "rgba(99,102,241,.1)",
              color: "#a5b4fc",
              border: "1px solid rgba(129,140,248,.18)",
              fontWeight: 900,
              letterSpacing: { xs: ".6px", sm: 1 },
              fontSize: { xs: ".62rem", sm: ".7rem" },
            }}
          />

          <Typography
            component="h1"
            fontWeight={950}
            sx={{
              fontSize: {
                xs: "1.65rem",
                sm: "2.5rem",
                md: "3.5rem",
              },
              lineHeight: 1.08,
              letterSpacing: { xs: "-.8px", md: "-1.5px" },
              background:
                "linear-gradient(90deg,#fff,#c7d2fe,#818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Need a specific project?
          </Typography>

          <Typography
            sx={{
              mt: { xs: 1, sm: 1.5 },
              maxWidth: 650,
              mx: "auto",
              color: "#94a3b8",
              fontSize: {
                xs: ".7rem",
                sm: ".85rem",
                md: ".95rem",
              },
              lineHeight: 1.65,
              px: { xs: 1, sm: 0 },
            }}
          >
            Tell us what you need and our team will help
            you find or prepare the right project,
            source code, PPT, documentation, or bundle.
          </Typography>
        </MotionBox>

        <Grid
          container
          spacing={{ xs: 1.5, sm: 2.5, md: 3 }}
        >
          <Grid item xs={12} md={8}>
            <MotionPaper
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              elevation={0}
              sx={{
                p: {
                  xs: 1.5,
                  sm: 2.5,
                  md: 3.5,
                },
                borderRadius: { xs: 2.5, sm: 4 },
                bgcolor: "rgba(15,23,42,.84)",
                border:
                  "1px solid rgba(148,163,184,.14)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background:
                    "linear-gradient(90deg,#6366f1,#8b5cf6,#f97316)",
                }}
              />

              <Stack
                direction="row"
                spacing={{ xs: 1, sm: 1.3 }}
                alignItems="center"
                sx={{ mb: { xs: 1.8, sm: 2.3 } }}
              >
                <Box
                  sx={{
                    width: { xs: 36, sm: 44 },
                    height: { xs: 36, sm: 44 },
                    flexShrink: 0,
                    borderRadius: { xs: 2, sm: 2.5 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(99,102,241,.1)",
                    color: "#818cf8",
                  }}
                >
                  <CodeIcon
                    sx={{ fontSize: { xs: 19, sm: 24 } }}
                  />
                </Box>

                <Box>
                  <Typography
                    fontWeight={950}
                    sx={{
                      fontSize: {
                        xs: ".9rem",
                        sm: "1.15rem",
                      },
                    }}
                  >
                    Request a Project
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                      fontSize: {
                        xs: ".58rem",
                        sm: ".68rem",
                      },
                    }}
                  >
                    Tell us exactly what you need
                  </Typography>
                </Box>
              </Stack>

              <Divider
                sx={{
                  mb: { xs: 1.8, sm: 2.5 },
                  borderColor:
                    "rgba(148,163,184,.09)",
                }}
              />

              <Box
                component="form"
                onSubmit={handleSubmit}
              >
                <Stack spacing={{ xs: 1.2, sm: 1.6 }}>
                  <Grid container spacing={{ xs: 1.2, sm: 1.5 }}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Your Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        autoComplete="name"
                        sx={fieldSx}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={iconSx} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        type="email"
                        label="Email Address"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        sx={fieldSx}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={iconSx} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    required
                    type="tel"
                    label="Mobile Number"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    autoComplete="tel"
                    inputProps={{
                      maxLength: 15,
                    }}
                    sx={fieldSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={iconSx} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Project Name"
                    name="projectName"
                    value={form.projectName}
                    onChange={handleChange}
                    placeholder="Enter project name if you have one"
                    sx={fieldSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CodeIcon sx={iconSx} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    select
                    fullWidth
                    required
                    label="What do you need?"
                    name="requestType"
                    value={form.requestType}
                    onChange={handleChange}
                    sx={fieldSx}
                  >
                    <MenuItem value="Source Code">
                      Source Code
                    </MenuItem>
                    <MenuItem value="Documentation">
                      Documentation
                    </MenuItem>
                    <MenuItem value="PPT">
                      PPT / Presentation
                    </MenuItem>
                    <MenuItem value="Complete Project">
                      Complete Project
                    </MenuItem>
                    <MenuItem value="Source Code + Documentation">
                      Source Code + Documentation
                    </MenuItem>
                    <MenuItem value="Source Code + PPT">
                      Source Code + PPT
                    </MenuItem>
                    <MenuItem value="Complete Bundle">
                      Complete Bundle
                    </MenuItem>
                    <MenuItem value="Custom Requirement">
                      Custom Requirement
                    </MenuItem>
                  </TextField>

                  <TextField
                    select
                    fullWidth
                    required
                    label="Technology / Tech Stack"
                    name="techStack"
                    value={form.techStack}
                    onChange={handleChange}
                    sx={fieldSx}
                  >
                    <MenuItem value="MERN Stack">
                      MERN Stack
                    </MenuItem>
                    <MenuItem value="React.js">
                      React.js
                    </MenuItem>
                    <MenuItem value="Node.js">
                      Node.js
                    </MenuItem>
                    <MenuItem value="Java">
                      Java
                    </MenuItem>
                    <MenuItem value="Python">
                      Python
                    </MenuItem>
                    <MenuItem value="PHP">
                      PHP
                    </MenuItem>
                    <MenuItem value="Android">
                      Android
                    </MenuItem>
                    <MenuItem value="Flutter">
                      Flutter
                    </MenuItem>
                    <MenuItem value="Other">
                      Other
                    </MenuItem>
                  </TextField>

                  {form.techStack === "Other" && (
                    <TextField
                      fullWidth
                      required
                      label="Enter Your Technology"
                      name="otherTech"
                      value={form.otherTech}
                      onChange={handleChange}
                      placeholder="e.g. C#, .NET, Laravel"
                      sx={fieldSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CodeIcon sx={iconSx} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}

                  <TextField
                    fullWidth
                    required
                    multiline
                    minRows={4}
                    maxRows={8}
                    label="Describe Your Requirement"
                    name="requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    placeholder={`Example:
I need a final year web development project.
I need source code and documentation.
I also need a PPT for presentation.`}
                    sx={{
                      ...fieldSx,
                      "& .MuiInputBase-root": {
                        alignItems: "flex-start",
                        pt: { xs: 1.2, sm: 1.5 },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ mt: 0.25 }}
                        >
                          <DescriptionIcon sx={iconSx} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  {success && (
                    <Alert
                      severity="success"
                      icon={<CheckCircleOutlineIcon />}
                      sx={{
                        borderRadius: 2,
                        fontSize: { xs: ".7rem", sm: ".8rem" },
                        py: 0.3,
                        bgcolor: "rgba(34,197,94,.08)",
                        color: "#86efac",
                        border:
                          "1px solid rgba(34,197,94,.18)",
                      }}
                    >
                      {success}
                    </Alert>
                  )}

                  {error && (
                    <Alert
                      severity="error"
                      sx={{
                        borderRadius: 2,
                        fontSize: { xs: ".7rem", sm: ".8rem" },
                        py: 0.3,
                        bgcolor: "rgba(239,68,68,.08)",
                        color: "#fca5a5",
                        border:
                          "1px solid rgba(239,68,68,.18)",
                      }}
                    >
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    endIcon={
                      !loading && (
                        <SendIcon
                          sx={{
                            fontSize: {
                              xs: 17,
                              sm: 20,
                            },
                          }}
                        />
                      )
                    }
                    sx={{
                      minHeight: { xs: 46, sm: 52 },
                      borderRadius: { xs: 2, sm: 2.5 },
                      textTransform: "none",
                      fontWeight: 900,
                      fontSize: {
                        xs: ".78rem",
                        sm: ".9rem",
                      },
                      background:
                        "linear-gradient(135deg,#6366f1,#4f46e5)",
                      boxShadow:
                        "0 10px 25px rgba(79,70,229,.22)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg,#818cf8,#6366f1)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    {loading
                      ? "Sending Request..."
                      : "Send Project Request"}
                  </Button>
                </Stack>
              </Box>
            </MotionPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <MotionPaper
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              elevation={0}
              sx={{
                height: "100%",
                p: {
                  xs: 1.7,
                  sm: 2.5,
                  md: 3,
                },
                borderRadius: { xs: 2.5, sm: 4 },
                bgcolor: "rgba(15,23,42,.72)",
                border:
                  "1px solid rgba(148,163,184,.13)",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: { xs: 1.8, sm: 2.3 } }}
              >
                <SupportAgentIcon
                  sx={{
                    color: "#818cf8",
                    fontSize: { xs: 24, sm: 30 },
                  }}
                />

                <Typography
                  fontWeight={950}
                  sx={{
                    fontSize: {
                      xs: ".95rem",
                      sm: "1.1rem",
                    },
                  }}
                >
                  How it works
                </Typography>
              </Stack>

              <Stack spacing={{ xs: 1, sm: 1.3 }}>
                {[
                  ["01", "Tell us what you need"],
                  ["02", "Our team reviews your request"],
                  ["03", "We contact you with options"],
                  ["04", "Choose the resources you need"],
                ].map(([number, title]) => (
                  <Box
                    key={number}
                    sx={{
                      p: { xs: 1.2, sm: 1.5 },
                      borderRadius: 2,
                      bgcolor: "rgba(2,6,23,.45)",
                      border:
                        "1px solid rgba(148,163,184,.09)",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Typography
                        sx={{
                          color: "#818cf8",
                          fontWeight: 950,
                          fontSize: ".68rem",
                        }}
                      >
                        {number}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#cbd5e1",
                          fontSize: {
                            xs: ".65rem",
                            sm: ".72rem",
                          },
                          lineHeight: 1.5,
                        }}
                      >
                        {title}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>

              <Box
                sx={{
                  mt: { xs: 1.5, sm: 2 },
                  p: { xs: 1.4, sm: 1.7 },
                  borderRadius: 2,
                  bgcolor: "rgba(99,102,241,.055)",
                  border:
                    "1px solid rgba(129,140,248,.12)",
                }}
              >
                <Typography
                  sx={{
                    color: "#a5b4fc",
                    fontSize: ".62rem",
                    fontWeight: 900,
                    mb: 0.8,
                  }}
                >
                  YOU CAN REQUEST
                </Typography>

                <Stack spacing={0.7}>
                  {[
                    "Source code",
                    "Project documentation",
                    "PPT / presentation",
                    "Complete project bundle",
                    "Custom project requirements",
                  ].map((item) => (
                    <Stack
                      key={item}
                      direction="row"
                      spacing={0.6}
                      alignItems="center"
                    >
                      <CheckCircleOutlineIcon
                        sx={{
                          color: "#818cf8",
                          fontSize: 13,
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#64748b",
                          fontSize: ".62rem",
                        }}
                      >
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </MotionPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectRequest;