import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/Twitter";
import CodeIcon from "@mui/icons-material/Code";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Footer = () => {
  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "All Projects", to: "/projects" },
    { name: "Explore", to: "/explore" },
  ];

  const socialLinks = [
    {
      icon: GitHubIcon,
      label: "GitHub",
      link: "https://github.com/tufailsarovar",
    },
    {
      icon: LinkedInIcon,
      label: "LinkedIn",
      link: "https://linkedin.com/in/tufailsarovar",
    },
    {
      icon: XIcon,
      label: "X",
      link: "https://x.com/tufailsarovar",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: {
          xs: 5,
          sm: 7,
          md: 9,
        },
        position: "relative",
        overflow: "hidden",
        bgcolor: "#020617",
        color: "#fff",
      }}
    >
      {/* Animated top glow */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: {
            xs: "5%",
            sm: "10%",
          },
          right: {
            xs: "5%",
            sm: "10%",
          },
          height: 2,
          borderRadius: 999,
          background:
            "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, #f97316, transparent)",
          animation: "footerLine 3.5s ease-in-out infinite",
          "@keyframes footerLine": {
            "0%, 100%": {
              opacity: 0.25,
              transform: "scaleX(.7)",
            },
            "50%": {
              opacity: 1,
              transform: "scaleX(1)",
            },
          },
        }}
      />

      {/* Background glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 15% 10%, rgba(99,102,241,.12), transparent 30%), radial-gradient(circle at 85% 20%, rgba(249,115,22,.08), transparent 28%)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          py: {
            xs: 4,
            sm: 5,
            md: 6,
          },
          background: "rgba(2,6,23,.94)",
          backdropFilter: "blur(18px)",
          borderTop: "1px solid rgba(148,163,184,.18)",
          boxShadow: "0 -20px 60px rgba(15,23,42,.65)",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          <Grid
            container
            spacing={{
              xs: 3,
              sm: 4,
              md: 5,
            }}
          >
            {/* Brand */}
            <Grid item xs={12} md={5}>
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                {/* Same Logo Design as Navbar */}
                <Box
                  sx={{
                    width: {
                      xs: 42,
                      sm: 48,
                    },
                    height: {
                      xs: 42,
                      sm: 48,
                    },
                    borderRadius: {
                      xs: 2.2,
                      sm: 2.6,
                    },
                    p: "1px",
                    flexShrink: 0,
                    background:
                      "linear-gradient(135deg,#6366f1,#8b5cf6,#f97316)",
                    boxShadow: "0 8px 25px rgba(99,102,241,.2)",
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
                      alt="CodeX Logo"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                </Box>

                {/* CodeX Name */}
                <Box>
                  <Typography
                    component={Link}
                    to="/"
                    sx={{
                      textDecoration: "none",
                      fontSize: {
                        xs: "1.25rem",
                        sm: "1.4rem",
                      },
                      fontWeight: 950,
                      lineHeight: 1,
                      letterSpacing: "-.5px",
                      background: "linear-gradient(90deg,#fff,#a5b4fc)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    CodeX
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.45,
                      color: "#64748b",
                      fontSize: {
                        xs: ".58rem",
                        sm: ".65rem",
                      },
                      fontWeight: 800,
                      letterSpacing: ".7px",
                      textTransform: "uppercase",
                    }}
                  >
                    Project Marketplace
                  </Typography>
                </Box>
              </Stack>

              <Typography
                sx={{
                  maxWidth: 560,
                  color: "#94a3b8",
                  fontSize: {
                    xs: ".72rem",
                    sm: ".82rem",
                    md: ".9rem",
                  },
                  lineHeight: 1.7,
                }}
              >
                CodeX is a curated platform for high-quality academic and
                professional projects, complete with source code, documentation,
                presentations, and other ready-to-use project resources.
              </Typography>

              <Stack
                direction="row"
                spacing={0.8}
                flexWrap="wrap"
                sx={{ mt: 1.8 }}
              >
                {["Source Code", "Documentation", "PPT"].map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    sx={{
                      height: 24,
                      bgcolor: "rgba(99,102,241,.08)",
                      color: "#94a3b8",
                      border: "1px solid rgba(148,163,184,.14)",
                      fontSize: {
                        xs: "8px",
                        sm: "9px",
                      },
                      fontWeight: 800,
                    }}
                  />
                ))}
              </Stack>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={6} md={3}>
              <Typography
                fontWeight={900}
                sx={{
                  mb: 1.4,
                  fontSize: {
                    xs: ".82rem",
                    sm: ".92rem",
                  },
                }}
              >
                Quick Links
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.75,
                }}
              >
                {quickLinks.map((item) => (
                  <MuiLink
                    key={item.to}
                    component={Link}
                    to={item.to}
                    underline="none"
                    sx={{
                      width: "fit-content",
                      position: "relative",
                      color: "#94a3b8",
                      fontSize: {
                        xs: ".68rem",
                        sm: ".78rem",
                      },
                      fontWeight: 600,
                      transition: "color .2s ease, transform .2s ease",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: -3,
                        width: 0,
                        height: 2,
                        borderRadius: 999,
                        background: "linear-gradient(90deg,#6366f1,#f97316)",
                        transition: "width .25s ease",
                      },
                      "&:hover": {
                        color: "#a5b4fc",
                        transform: "translateX(3px)",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {item.name}
                  </MuiLink>
                ))}
              </Box>
            </Grid>

            {/* Social */}
            <Grid item xs={6} md={4}>
              <Typography
                fontWeight={900}
                sx={{
                  mb: 1.2,
                  fontSize: {
                    xs: ".82rem",
                    sm: ".92rem",
                  },
                }}
              >
                Stay Connected
              </Typography>

              <Typography
                sx={{
                  mb: 1.4,
                  color: "#64748b",
                  fontSize: {
                    xs: ".65rem",
                    sm: ".75rem",
                  },
                  lineHeight: 1.55,
                  maxWidth: 260,
                }}
              >
                Follow for project ideas, development updates and new releases.
              </Typography>

              <Stack direction="row" spacing={0.8}>
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Box
                      key={item.label}
                      component="a"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      sx={{
                        display: "block",
                        textDecoration: "none",
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          width: {
                            xs: 34,
                            sm: 38,
                          },
                          height: {
                            xs: 34,
                            sm: 38,
                          },
                          color: "#fff",
                          borderRadius: 2.2,
                          border: "1px solid rgba(148,163,184,.2)",
                          bgcolor: "rgba(15,23,42,.55)",
                          transition: "all .25s ease",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            color: "#a5b4fc",
                            borderColor: "#6366f1",
                            bgcolor: "rgba(99,102,241,.13)",
                            boxShadow: "0 10px 28px rgba(99,102,241,.2)",
                          },
                        }}
                      >
                        <Icon
                          sx={{
                            fontSize: {
                              xs: 17,
                              sm: 19,
                            },
                          }}
                        />
                      </IconButton>
                    </Box>
                  );
                })}
              </Stack>
            </Grid>
          </Grid>

          {/* Bottom */}
          <Box
            sx={{
              mt: {
                xs: 3.5,
                sm: 4.5,
              },
              pt: 2,
              borderTop: "1px dashed rgba(148,163,184,.18)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                color: "#64748b",
                fontSize: {
                  xs: ".58rem",
                  sm: ".68rem",
                },
              }}
            >
              © {new Date().getFullYear()} CodeX. All rights reserved.
            </Typography>

            <Typography
              component="a"
              href="https://tufailsarovar.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#475569",
                fontSize: {
                  xs: ".55rem",
                  sm: ".65rem",
                },
                fontWeight: 600,
                textDecoration: "none",
                transition: "color .2s ease",
                "&:hover": {
                  color: "#818cf8",
                },
              }}
            >
              CodeX · Tufail Sarovar
            </Typography>

            <IconButton
              size="small"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              aria-label="Back to top"
              sx={{
                width: 30,
                height: 30,
                borderRadius: 2,
                color: "#94a3b8",
                border: "1px solid rgba(148,163,184,.16)",
                "&:hover": {
                  color: "#a5b4fc",
                  borderColor: "rgba(99,102,241,.5)",
                  bgcolor: "rgba(99,102,241,.1)",
                },
              }}
            >
              <ArrowUpwardIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
