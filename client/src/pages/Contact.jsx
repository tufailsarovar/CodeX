import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
  Grid,
  Chip,
  Alert,
  InputAdornment,
  SvgIcon,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";
import SendIcon from "@mui/icons-material/Send";
import CodeIcon from "@mui/icons-material/Code";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import api from "../api/axios";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const XLogoIcon = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </SvgIcon>
);

const Logo = ({ size = "normal" }) => {
  const dimensions =
    size === "small"
      ? { width: 42, height: 42, radius: 2.2 }
      : { width: 54, height: 54, radius: 2.7 };

  return (
    <Box
      sx={{
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: dimensions.radius,
        p: "1px",
        flexShrink: 0,
        background: "linear-gradient(135deg,#6366f1,#8b5cf6,#f97316)",
        boxShadow: "0 10px 28px rgba(99,102,241,.22)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          overflow: "hidden",
          bgcolor: "#020617",
        }}
      >
        <Box
          component="img"
          src="/images/logo.png"
          alt="CodeX"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
};

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (success) setSuccess("");
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !subject || !message) {
      setError("Please complete all fields before sending your message.");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await api.post("/contact", {
        name,
        email,
        subject,
        message,
      });

      if (response.data?.success) {
        setSuccess(
          "Your message has been sent successfully. We'll get back to you soon!",
        );

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(response.data?.message || "Email sending failed.");
      }
    } catch (err) {
      console.error("Contact SMTP error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to send your message right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      minHeight: 52,
      borderRadius: 2.5,
      color: "#fff",
      bgcolor: "rgba(2,6,23,.58)",
      transition: "all .2s ease",
      "& fieldset": {
        borderColor: "rgba(148,163,184,.16)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(129,140,248,.45)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6366f1",
        borderWidth: 1,
      },
      "&.Mui-focused": {
        boxShadow: "0 0 0 3px rgba(99,102,241,.08)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#64748b",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#a5b4fc",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#475569",
      opacity: 1,
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, sm: 5, md: 7 },
        bgcolor: "#020617",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 5% 0%, rgba(99,102,241,.18), transparent 30%), radial-gradient(circle at 96% 15%, rgba(249,115,22,.08), transparent 27%), linear-gradient(180deg,#020617 0%,#070b20 55%,#020617 100%)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 90,
          left: "50%",
          width: 500,
          height: 500,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: "rgba(79,70,229,.055)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 1.5, sm: 3, md: 4 },
        }}
      >
        {/* Hero */}
        <MotionBox
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          sx={{
            maxWidth: 820,
            mx: "auto",
            textAlign: "center",
            mb: { xs: 2.5, sm: 5, md: 6 },
          }}
        >
          <Stack
            direction="row"
            spacing={1.2}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Logo size="small" />

            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  fontWeight: 950,
                  lineHeight: 1,
                  background: "linear-gradient(90deg,#fff,#a5b4fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                CodeX
              </Typography>
              <Typography
                sx={{
                  mt: 0.35,
                  color: "#64748b",
                  fontSize: { xs: ".48rem", sm: ".56rem" },
                  fontWeight: 900,
                  letterSpacing: ".8px",
                }}
              >
                PROJECT MARKETPLACE
              </Typography>
            </Box>
          </Stack>

          <Chip
            icon={<SupportAgentIcon sx={{ fontSize: "15px !important" }} />}
            label="GET IN TOUCH"
            sx={{
              mb: 1.4,
              height: 28,
              bgcolor: "rgba(99,102,241,.09)",
              color: "#a5b4fc",
              border: "1px solid rgba(129,140,248,.18)",
              fontSize: { xs: 8, sm: 10 },
              fontWeight: 900,
              letterSpacing: 1,
            }}
          />

          <Typography
            component="h1"
            fontWeight={950}
            sx={{
              fontSize: {
                xs: "1.9rem",
                sm: "2.8rem",
                md: "3.6rem",
              },
              lineHeight: 1.05,
              letterSpacing: "-1.6px",
              background:
                "linear-gradient(90deg,#ffffff 0%,#c7d2fe 48%,#818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Let's build something
            <Box
              component="span"
              sx={{ display: { xs: "block", sm: "inline" } }}
            >
              {" "}
              great together.
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 1.3,
              maxWidth: 650,
              mx: "auto",
              color: "#94a3b8",
              fontSize: { xs: ".72rem", sm: ".9rem", md: "1rem" },
              lineHeight: 1.7,
            }}
          >
            Have a question about a project, purchase, submission, or the CodeX
            platform? Send us a message and our team will help you.
          </Typography>
        </MotionBox>

        {/* Main content */}
        <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch">
          {/* Contact form - FIRST on phone */}
          <Grid item xs={12} md={8} sx={{ order: { xs: 1, md: 2 } }}>
            <MotionPaper
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              elevation={0}
              sx={{
                height: "100%",
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: { xs: 3, md: 4 },
                bgcolor: "rgba(15,23,42,.82)",
                border: "1px solid rgba(148,163,184,.14)",
                color: "#fff",
                boxShadow: "0 25px 70px rgba(0,0,0,.22)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Form accent */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "linear-gradient(90deg,#6366f1,#8b5cf6,#f97316)",
                }}
              />

              <Stack
                direction="row"
                spacing={1.3}
                alignItems="center"
                sx={{ mb: 2.8 }}
              >
                <Logo size="small" />

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    fontWeight={950}
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                      lineHeight: 1.15,
                    }}
                  >
                    Send us a message
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.35,
                      color: "#64748b",
                      fontSize: { xs: ".62rem", sm: ".7rem" },
                    }}
                  >
                    Your message goes directly to the CodeX team.
                  </Typography>
                </Box>
              </Stack>

              <Divider
                sx={{
                  mb: 2.5,
                  borderColor: "rgba(148,163,184,.09)",
                }}
              />

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={1.7}>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        placeholder="Enter your name"
                        sx={fieldSx}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon
                                sx={{
                                  color: "#64748b",
                                  fontSize: 19,
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        placeholder="you@example.com"
                        sx={fieldSx}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon
                                sx={{
                                  color: "#64748b",
                                  fontSize: 19,
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What would you like to ask?"
                    sx={fieldSx}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SubjectIcon
                            sx={{
                              color: "#64748b",
                              fontSize: 19,
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    minRows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    sx={{
                      ...fieldSx,
                      "& .MuiInputBase-root": {
                        alignItems: "flex-start",
                        pt: 1.5,
                      },
                    }}
                  />

                  {success && (
                    <Alert
                      severity="success"
                      icon={<CheckCircleOutlineIcon />}
                      sx={{
                        borderRadius: 2.5,
                        bgcolor: "rgba(34,197,94,.08)",
                        color: "#86efac",
                        border: "1px solid rgba(34,197,94,.18)",
                        "& .MuiAlert-icon": {
                          color: "#4ade80",
                        },
                      }}
                    >
                      {success}
                    </Alert>
                  )}

                  {error && (
                    <Alert
                      severity="error"
                      sx={{
                        borderRadius: 2.5,
                        bgcolor: "rgba(239,68,68,.08)",
                        color: "#fca5a5",
                        border: "1px solid rgba(239,68,68,.18)",
                        "& .MuiAlert-icon": {
                          color: "#f87171",
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth
                    endIcon={
                      !loading && (
                        <SendIcon sx={{ fontSize: "17px !important" }} />
                      )
                    }
                    sx={{
                      minHeight: { xs: 48, sm: 52 },
                      borderRadius: 2.5,
                      textTransform: "none",
                      fontWeight: 900,
                      fontSize: { xs: ".75rem", sm: ".82rem" },
                      background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                      boxShadow: "0 12px 30px rgba(79,70,229,.22)",
                      "&:hover": {
                        background: "linear-gradient(135deg,#818cf8,#6366f1)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 16px 35px rgba(79,70,229,.3)",
                      },
                      "&.Mui-disabled": {
                        color: "#94a3b8",
                        background: "rgba(71,85,105,.35)",
                      },
                    }}
                  >
                    {loading ? "Sending Message..." : "Send Message"}
                  </Button>
                </Stack>
              </Box>
            </MotionPaper>
          </Grid>

          {/* Support card - SECOND on phone */}
          <Grid item xs={12} md={4} sx={{ order: { xs: 2, md: 1 } }}>
            <MotionPaper
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              elevation={0}
              sx={{
                height: "100%",
                p: { xs: 2.2, sm: 3 },
                borderRadius: { xs: 3, md: 4 },
                bgcolor: "rgba(15,23,42,.72)",
                border: "1px solid rgba(148,163,184,.13)",
                color: "#fff",
                boxShadow: "0 20px 55px rgba(0,0,0,.18)",
              }}
            >
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                sx={{ mb: 2.3 }}
              >
                <Logo size="small" />

                <Box>
                  <Typography
                    fontWeight={950}
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.15rem" },
                      lineHeight: 1.1,
                    }}
                  >
                    CodeX Support
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.35,
                      color: "#64748b",
                      fontSize: ".62rem",
                    }}
                  >
                    We're here to help
                  </Typography>
                </Box>
              </Stack>

              <Typography
                sx={{
                  color: "#94a3b8",
                  fontSize: { xs: ".68rem", sm: ".74rem" },
                  lineHeight: 1.7,
                  mb: 2.2,
                }}
              >
                Whether you need help choosing a project, understanding a
                purchase, or using the platform, send us your question through
                the form.
              </Typography>

              <Stack spacing={1.1}>
                <Box
                  sx={{
                    p: 1.45,
                    borderRadius: 2.5,
                    bgcolor: "rgba(2,6,23,.45)",
                    border: "1px solid rgba(148,163,184,.1)",
                  }}
                >
                  <Stack direction="row" spacing={1.1} alignItems="center">
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(99,102,241,.1)",
                        color: "#818cf8",
                      }}
                    >
                      <AccessTimeIcon sx={{ fontSize: 18 }} />
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          color: "#64748b",
                          fontSize: ".56rem",
                          fontWeight: 900,
                          letterSpacing: ".4px",
                        }}
                      >
                        SUPPORT
                      </Typography>
                      <Typography
                        sx={{
                          mt: 0.2,
                          color: "#cbd5e1",
                          fontSize: ".68rem",
                        }}
                      >
                        We'll respond as soon as possible
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>

              <Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  borderRadius: 2.5,
                  bgcolor: "rgba(99,102,241,.055)",
                  border: "1px solid rgba(129,140,248,.12)",
                }}
              >
                <Typography
                  sx={{
                    color: "#a5b4fc",
                    fontSize: ".62rem",
                    fontWeight: 900,
                    mb: 0.55,
                  }}
                >
                  QUICK HELP
                </Typography>

                <Stack spacing={0.8}>
                  {[
                    "Mention the project name",
                    "Explain the issue clearly",
                    "Include relevant purchase details",
                  ].map((item) => (
                    <Stack
                      key={item}
                      direction="row"
                      spacing={0.7}
                      alignItems="center"
                    >
                      <CheckCircleOutlineIcon
                        sx={{
                          color: "#818cf8",
                          fontSize: 14,
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

              <Button
                variant="text"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  mt: 1.5,
                  px: 0.3,
                  color: "#818cf8",
                  textTransform: "none",
                  fontSize: ".68rem",
                  fontWeight: 800,
                  "&:hover": {
                    bgcolor: "transparent",
                    color: "#a5b4fc",
                  },
                }}
              >
                CodeX Project Marketplace
              </Button>
            </MotionPaper>
          </Grid>
        </Grid>

        {/* Trust strip */}
        <MotionPaper
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          elevation={0}
          sx={{
            mt: 2.5,
            p: { xs: 1.6, sm: 2 },
            borderRadius: 3,
            bgcolor: "rgba(15,23,42,.5)",
            border: "1px solid rgba(148,163,184,.09)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.2, sm: 3.5 }}
            justifyContent="center"
            alignItems="center"
          >
            <Stack direction="row" spacing={0.7} alignItems="center">
              <SecurityIcon sx={{ color: "#818cf8", fontSize: 17 }} />
              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: ".61rem",
                }}
              >
                Your message is handled securely
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.7} alignItems="center">
              <SupportAgentIcon sx={{ color: "#818cf8", fontSize: 17 }} />
              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: ".61rem",
                }}
              >
                Student-focused assistance
              </Typography>
            </Stack>
          </Stack>
        </MotionPaper>
      </Container>
    </Box>
  );
};

export default Contact;
