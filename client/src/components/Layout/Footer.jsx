import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated gradient top border */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 2,
          background:
            "linear-gradient(90deg, rgba(96,165,250,0), #6366F1, #F97316, rgba(96,165,250,0))",
          filter: "blur(0.3px)",
          opacity: 0.9,
          animation: "pulseLine 3.5s ease-in-out infinite",
          "@keyframes pulseLine": {
            "0%, 100%": { opacity: 0.2 },
            "50%": { opacity: 1 },
          },
        }}
      />

      <Box
        sx={{
          py: 3.5,
          background: "rgba(2,6,23,0.92)",
          backdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(148,163,184,0.35)",
          boxShadow: "0 -10px 40px rgba(15,23,42,0.9)",
          transform: "translateY(10px)",
          opacity: 0,
          animation: "footerEnter 0.5s ease-out forwards",
          "@keyframes footerEnter": {
            "0%": { opacity: 0, transform: "translateY(18px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="flex-start">
            {/* Brand / description */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  mb: 1,
                  background: "linear-gradient(90deg, #E5E7EB, #A5B4FC)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                CodeX
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ready-made college projects with source code, documentation and
                PPT — built to submit and easy to learn from.
              </Typography>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={6} md={4}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                Quick Links
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
                {[
                  { name: "Home", to: "/" },
                  { name: "About", to: "/about" },
                  { name: "All Projects", to: "/projects" },
                  { name: "Explore", to: "/explore" },
                  { name: "Login", to: "/login" },
                ].map((item) => (
                  <MuiLink
                    key={item.to}
                    component={Link}
                    to={item.to}
                    underline="none"
                    color="text.secondary"
                    sx={{
                      fontSize: 14,
                      position: "relative",
                      width: "fit-content",
                      transition: "color 0.25s ease",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: -2,
                        width: 0,
                        height: 2,
                        borderRadius: 999,
                        background: "linear-gradient(90deg, #6366F1, #F97316)",
                        transition: "width 0.25s ease-out",
                      },
                      "&:hover": {
                        color: "primary.main",
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
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                Stay Connected
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1.2 }}
              >
                Follow for more project ideas & updates.
              </Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                {[GitHubIcon, LinkedInIcon, InstagramIcon].map((Icon, idx) => (
                  <IconButton
                    size="small"
                    sx={{
                      color: "text.primary", // <<< WHITE ICON COLOR
                      borderRadius: 2,
                      border: "1px solid rgba(148,163,184,0.4)",
                      transition:
                        "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-2px) scale(1.04)",
                        borderColor: "primary.main",
                        background: "rgba(79,70,229,0.25)",
                        boxShadow: "0 10px 25px rgba(79,70,229,0.55)",
                      },
                    }}
                  >
                    <GitHubIcon fontSize="small" sx={{ color: "white" }} />
                  </IconButton>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Bottom tiny bar */}
          <Box
            sx={{
              mt: 3,
              pt: 1.5,
              borderTop: "1px dashed rgba(148,163,184,0.25)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} CodeX. All rights reserved.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Built as a MERN full-stack college project.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
