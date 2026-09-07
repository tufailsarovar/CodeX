import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Chip,
  SvgIcon,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const XLogoIcon = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </SvgIcon>
);

const CodeXLogo = () => (
  <Box
    sx={{
      width: { xs: 52, sm: 58 },
      height: { xs: 52, sm: 58 },
      borderRadius: { xs: 2.5, sm: 3 },
      p: "1px",
      flexShrink: 0,
      background:
        "linear-gradient(135deg,#6366f1,#8b5cf6,#f97316)",
      boxShadow: "0 12px 35px rgba(99,102,241,.25)",
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

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password;

    if (!name || !email || !password) {
      setError("Please complete all fields before creating your account.");
      return;
    }

    if (name.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("codex_token", res.data.token);
      localStorage.setItem(
        "codex_user",
        JSON.stringify(res.data),
      );

      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      minHeight: 54,
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
        boxShadow:
          "0 0 0 3px rgba(99,102,241,.08)",
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
        bgcolor: "#020617",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        py: {
          xs: 3,
          sm: 5,
          md: 7,
        },
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 8% 4%, rgba(99,102,241,.18), transparent 30%), radial-gradient(circle at 92% 18%, rgba(249,115,22,.08), transparent 28%), linear-gradient(180deg,#020617,#070b20 55%,#020617)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "12%",
          left: "50%",
          width: 430,
          height: 430,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          bgcolor: "rgba(79,70,229,.045)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
          px: {
            xs: 1.5,
            sm: 3,
          },
        }}
      >
        {/* Back */}
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{
            mb: {
              xs: 2,
              sm: 3,
            },
            color: "#64748b",
            textTransform: "none",
            fontWeight: 800,
            fontSize: {
              xs: ".68rem",
              sm: ".75rem",
            },
            px: 0.5,

            "&:hover": {
              bgcolor: "transparent",
              color: "#a5b4fc",
            },
          }}
        >
          Back to CodeX
        </Button>

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: {
              xs: 3,
              sm: 4,
            },
            bgcolor: "rgba(15,23,42,.86)",
            border:
              "1px solid rgba(148,163,184,.14)",
            boxShadow:
              "0 30px 90px rgba(0,0,0,.35)",
            color: "#fff",
            p: {
              xs: 2.2,
              sm: 4,
              md: 4.5,
            },
          }}
        >
          {/* Gradient line */}
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

          {/* Brand */}
          <Stack
            alignItems="center"
            textAlign="center"
            sx={{
              mb: {
                xs: 2.4,
                sm: 3,
              },
            }}
          >
            <CodeXLogo />

            <Typography
              sx={{
                mt: 1.4,
                fontSize: {
                  xs: "1.45rem",
                  sm: "1.7rem",
                },
                fontWeight: 950,
                lineHeight: 1,
                letterSpacing: "-.7px",
                background:
                  "linear-gradient(90deg,#fff,#a5b4fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              CodeX
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "#64748b",
                fontSize: {
                  xs: ".5rem",
                  sm: ".57rem",
                },
                fontWeight: 900,
                letterSpacing: "1px",
              }}
            >
              PROJECT MARKETPLACE
            </Typography>

            <Chip
              icon={
                <PersonAddAltRoundedIcon
                  sx={{
                    fontSize:
                      "14px !important",
                  }}
                />
              }
              label="JOIN CODEX"
              size="small"
              sx={{
                mt: 1.6,
                height: 27,
                bgcolor:
                  "rgba(99,102,241,.09)",
                color: "#a5b4fc",
                border:
                  "1px solid rgba(129,140,248,.18)",
                fontSize: {
                  xs: 7.5,
                  sm: 9,
                },
                fontWeight: 900,
                letterSpacing: ".7px",
              }}
            />
          </Stack>

          {/* Heading */}
          <Box
            sx={{
              textAlign: "center",
              mb: 2.7,
            }}
          >
            <Typography
              component="h1"
              fontWeight={950}
              sx={{
                fontSize: {
                  xs: "1.35rem",
                  sm: "1.6rem",
                },
                letterSpacing: "-.5px",
              }}
            >
              Create your account
            </Typography>

            <Typography
              sx={{
                mt: 0.7,
                color: "#64748b",
                fontSize: {
                  xs: ".68rem",
                  sm: ".75rem",
                },
                lineHeight: 1.6,
              }}
            >
              Join CodeX to buy, access and learn
              from high-quality college projects.
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <Stack spacing={1.8}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                placeholder="Enter your full name"
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineRoundedIcon
                        sx={{
                          color: "#64748b",
                          fontSize: 20,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                required
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon
                        sx={{
                          color: "#64748b",
                          fontSize: 20,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                required
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Create a secure password"
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon
                        sx={{
                          color: "#64748b",
                          fontSize: 20,
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (previous) =>
                              !previous,
                          )
                        }
                        edge="end"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        sx={{
                          color: "#64748b",
                          "&:hover": {
                            color: "#a5b4fc",
                          },
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon
                            sx={{ fontSize: 19 }}
                          />
                        ) : (
                          <VisibilityOutlinedIcon
                            sx={{ fontSize: 19 }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password note */}
              <Typography
                sx={{
                  mt: -0.8,
                  color: "#475569",
                  fontSize: ".58rem",
                  lineHeight: 1.5,
                }}
              >
                Use at least 6 characters for your
                password.
              </Typography>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    borderRadius: 2.5,
                    bgcolor:
                      "rgba(239,68,68,.08)",
                    color: "#fca5a5",
                    border:
                      "1px solid rgba(239,68,68,.18)",
                    fontSize: ".72rem",
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
                startIcon={
                  !loading && (
                    <PersonAddAltRoundedIcon
                      sx={{
                        fontSize:
                          "18px !important",
                      }}
                    />
                  )
                }
                sx={{
                  minHeight: {
                    xs: 48,
                    sm: 52,
                  },
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 900,
                  fontSize: {
                    xs: ".76rem",
                    sm: ".82rem",
                  },
                  background:
                    "linear-gradient(135deg,#6366f1,#4f46e5)",
                  boxShadow:
                    "0 12px 30px rgba(79,70,229,.22)",
                  transition:
                    "all .2s ease",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#818cf8,#6366f1)",
                    transform:
                      "translateY(-1px)",
                    boxShadow:
                      "0 16px 35px rgba(79,70,229,.3)",
                  },

                  "&.Mui-disabled": {
                    color: "#94a3b8",
                    background:
                      "rgba(71,85,105,.35)",
                  },
                }}
              >
                {loading
                  ? "Creating account..."
                  : "Create CodeX Account"}
              </Button>
            </Stack>
          </Box>

          {/* Divider */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ my: 2.5 }}
          >
            <Divider
              sx={{
                flex: 1,
                borderColor:
                  "rgba(148,163,184,.1)",
              }}
            />

            <Typography
              sx={{
                color: "#475569",
                fontSize: ".58rem",
                fontWeight: 800,
              }}
            >
              ALREADY A MEMBER?
            </Typography>

            <Divider
              sx={{
                flex: 1,
                borderColor:
                  "rgba(148,163,184,.1)",
              }}
            />
          </Stack>

          {/* Login */}
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            fullWidth
            startIcon={<LoginRoundedIcon />}
            sx={{
              minHeight: 46,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 800,
              color: "#cbd5e1",
              borderColor:
                "rgba(148,163,184,.18)",
              fontSize: {
                xs: ".7rem",
                sm: ".75rem",
              },

              "&:hover": {
                borderColor:
                  "rgba(129,140,248,.5)",
                bgcolor:
                  "rgba(99,102,241,.06)",
                color: "#a5b4fc",
              },
            }}
          >
            Login to your existing account
          </Button>

          {/* Trust */}
          <Box
            sx={{
              mt: 2.5,
              p: 1.5,
              borderRadius: 2.5,
              bgcolor:
                "rgba(99,102,241,.045)",
              border:
                "1px solid rgba(129,140,248,.1)",
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              useFlexGap
            >
              <Stack
                direction="row"
                spacing={0.6}
                alignItems="center"
              >
                <VerifiedUserOutlinedIcon
                  sx={{
                    color: "#818cf8",
                    fontSize: 16,
                  }}
                />
                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: ".58rem",
                  }}
                >
                  Secure account
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={0.6}
                alignItems="center"
              >
                <CheckCircleOutlineIcon
                  sx={{
                    color: "#22c55e",
                    fontSize: 16,
                  }}
                />
                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: ".58rem",
                  }}
                >
                  Easy access
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Paper>

        {/* Bottom branding */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
          sx={{
            mt: 2.2,
            color: "#475569",
          }}
        >
          <Stack
            direction="row"
            spacing={0.6}
            alignItems="center"
          >
            <CodeRoundedIcon
              sx={{ fontSize: 15 }}
            />
            <Typography
              sx={{
                fontSize: ".58rem",
                fontWeight: 700,
              }}
            >
              CodeX Marketplace
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Signup;