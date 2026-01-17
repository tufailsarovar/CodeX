import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Paper,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import { Link } from "react-router-dom";
import ProjectCard from "../components/Project/ProjectCard";
import api from "../api/axios";
const token = localStorage.getItem("codex_token");

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  const featured = projects[0]; // pick first project as featured

  return (
    <Box>
      {/* HERO + FEATURED */}
      <Box
        sx={{
          py: 8,
          background: "radial-gradient(circle at top, #1D4ED8 0, #020617 55%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* LEFT HERO */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                color="text.secondary"
                style={{ fontSize: "12px" }}
              >
                CodeX | Tufail Sarovar
              </Typography>
              <Typography variant="overline" color="secondary.main">
                Code | Learn | Submit | Succeed
              </Typography>

              <Typography variant="h3" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
                Structured and Scalable{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  Projects
                </Box>{" "}
                designed to achieve Academic excellence
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                CodeX offers secure instant delivery, verified payments, and
                high-quality project resources for students and developers.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  component={Link}
                  to="/explore"
                  variant="contained"
                  size="large"
                >
                  Explore Projects
                </Button>

                {/* SHOW only if user is NOT logged in */}
                {!token && (
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="large"
                  >
                    Login to Buy
                  </Button>
                )}
              </Stack>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
              >
                <ShieldIcon sx={{ color: "lightgreen", fontSize: 20 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "#b6c3cdff", opacity: 0.9 }}
                >
                  Secure Payments • Instant Access
                </Typography>
              </Box>
            </Grid>

            {/* RIGHT FEATURED PROJECT */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "rgba(15,23,42,0.85)",
                  border: "1px solid rgba(148,163,184,0.3)",
                  transition:
                    "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: "primary.main",
                    boxShadow: "0 25px 60px rgba(79,70,229,0.45)",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="primary.main"
                >
                  Featured Project
                </Typography>

                {featured ? (
                  <>
                    <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                      {featured.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, mb: 2 }}
                    >
                      {featured.description?.slice(0, 140)}...
                    </Typography>

                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                      {featured.originalPrice && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            marginRight: "8px",
                            fontWeight: 500,
                            opacity: 0.7,
                            fontSize: "15px",
                          }}
                        >
                          ₹{featured.originalPrice}
                        </span>
                      )}
                      <span>₹{featured.price}</span>
                    </Typography>

                    <Stack direction="row" spacing={2}>
                      <Button
                        component={Link}
                        to={`/projects/${featured._id}`}
                        variant="outlined"
                      >
                        View Details
                      </Button>

                      <Button
                        component={Link}
                        to={`/projects/${featured._id}`}
                        variant="contained"
                      >
                        Buy Now
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No featured project yet. Add some projects in admin.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ALL PROJECTS SECTION */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={700}>
                All Projects
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Browse all available projects.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/projects"
              variant="outlined"
              sx={{ textTransform: "none", borderRadius: 999 }}
            >
              View full list
            </Button>
          </Box>

          <Grid container spacing={3}>
            {projects.slice(0, 6).map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p._id}>
                <ProjectCard project={p} />
              </Grid>
            ))}

            {projects.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No projects yet. Add from admin.
              </Typography>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
