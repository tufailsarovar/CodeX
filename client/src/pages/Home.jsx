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
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const token = localStorage.getItem("codex_token");

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [freeProjects, setFreeProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [freeProjectsLoading, setFreeProjectsLoading] = useState(true);
  const [projectsTimedOut, setProjectsTimedOut] = useState(false);
  const [freeProjectsTimedOut, setFreeProjectsTimedOut] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // ---------------- FETCH FREE PROJECTS ----------------
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setFreeProjectsLoading(false);
      setFreeProjectsTimedOut(true);
    }, 30000);

    const fetchFreeProjects = async () => {
      try {
        const res = await api.get("/free-projects");
        setFreeProjects(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        clearTimeout(timeoutId);
        setFreeProjectsLoading(false);
      }
    };

    fetchFreeProjects();
    return () => clearTimeout(timeoutId);
  }, []);

  // ---------------- FETCH PROJECTS ----------------
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setProjectsLoading(false);
      setProjectsTimedOut(true);
    }, 30000);

    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");

        const sortedProjects = res.data.sort((a, b) => {
          const aAvailable = Object.values(a.files || {}).some(
            (url) => typeof url === "string" && url.trim() !== "",
          );
          const bAvailable = Object.values(b.files || {}).some(
            (url) => typeof url === "string" && url.trim() !== "",
          );
          return Number(bAvailable) - Number(aAvailable);
        });

        setProjects(sortedProjects);
      } catch (err) {
        console.error(err);
      } finally {
        clearTimeout(timeoutId);
        setProjectsLoading(false);
      }
    };

    fetchProjects();
    return () => clearTimeout(timeoutId);
  }, []);

  // ---------------- CONTINUOUS CAROUSEL ----------------
  useEffect(() => {
    if (projects.length < 2) return;

    const visible = projects.slice(0, 5);

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === visible.length - 1 ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(interval);
  }, [projects]);

  const isAnyFileAvailable = (files = {}) =>
    Object.values(files).some(
      (url) => typeof url === "string" && url.trim() !== "",
    );

  const visibleProjects = projects.slice(0, 5);
  const total = visibleProjects.length;

  return (
    <Box>
      {/* HERO + CAROUSEL */}
      <Box
        sx={{
          py: 8,
          background: "radial-gradient(circle at top, #1D4ED8 0, #020617 55%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* LEFT CONTENT */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2">CodeX | Tufail Sarovar</Typography>

              <Typography variant="overline" color="secondary.main">
                Code | Learn | Submit | Succeed
              </Typography>

              <Typography fontWeight={800} sx={{ mt: 2, mb: 2 }} variant="h4">
                Structured and Scalable{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  Projects
                </Box>{" "}
                designed to achieve Academic excellence
              </Typography>

              <Typography sx={{ mb: 3 }}>
                CodeX offers secure instant delivery, verified payments, and
                high-quality project resources.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button component={Link} to="/explore" variant="contained">
                  Explore Projects
                </Button>

                {!token && (
                  <Button component={Link} to="/login" variant="outlined">
                    Login to Buy
                  </Button>
                )}
              </Stack>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
              >
                <ShieldIcon sx={{ color: "lightgreen", fontSize: 20 }} />
                <Typography variant="body2">
                  Secure Payments • Instant Access
                </Typography>
              </Box>
            </Grid>

            {/* RIGHT CAROUSEL */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  height: 380,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {projectsLoading ? (
                  <CircularProgress />
                ) : projects.length === 0 ? (
                  <Typography>
                    {projectsTimedOut
                      ? "No project uploaded yet from admin"
                      : "No projects available."}
                  </Typography>
                ) : (
                  visibleProjects.map((project, index) => {
                    const position =
                      index === activeIndex
                        ? 0
                        : index === (activeIndex - 1 + total) % total
                          ? -1
                          : index === (activeIndex + 1) % total
                            ? 1
                            : 2;

                    return (
                      <MotionBox
                        key={project._id}
                        animate={{
                          y: position === 0 ? 0 : position === -1 ? -120 : 120,
                          scale: position === 0 ? 1 : 0.85,
                          opacity: position === 0 ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.6 }}
                        sx={{
                          position: "absolute",
                          width: "92%",
                          p: 3,
                          borderRadius: 4,
                          background: "linear-gradient(180deg,#0f172a,#020617)",
                          border: "1px solid rgba(148,163,184,0.3)",
                          color: "#fff",
                          zIndex: position === 0 ? 3 : 1,
                        }}
                      >
                        <Stack spacing={2}>
                          <Typography fontWeight={700}>
                            {project.title}
                          </Typography>

                          <Typography variant="body2">
                            {project.description?.slice(0, 120)}...
                          </Typography>

                          <Typography fontWeight={700}>
                            ₹{project.price}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: isAnyFileAvailable(project.files)
                                ? "#22c55e"
                                : "#facc15",
                            }}
                          >
                            {isAnyFileAvailable(project.files)
                              ? "Available"
                              : "Coming soon"}
                          </Typography>

                          <Stack direction="row" spacing={2}>
                            <Button
                              component={Link}
                              to={`/projects/${project._id}`}
                              variant="outlined"
                              size="small"
                            >
                              View
                            </Button>

                            <Button
                              component={Link}
                              to={`/projects/${project._id}`}
                              variant="contained"
                              size="small"
                            >
                              Buy
                            </Button>
                          </Stack>
                        </Stack>
                      </MotionBox>
                    );
                  })
                )}
              </Box>
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
            {projectsLoading ? (
              <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
                <CircularProgress />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Loading projects from server…
                </Typography>
              </Box>
            ) : (
              projects.slice(0, 6).map((p) => (
                <Grid item xs={12} sm={6} md={4} key={p._id}>
                  <ProjectCard project={p} />
                </Grid>
              ))
            )}

            {projects.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                {projectsTimedOut ? "No project uploaded yet from admin" : ""}
              </Typography>
            )}
          </Grid>
        </Container>
      </Box>
      {/* FREE PROJECTS SECTION */}
      <Box sx={{ py: 6, my: 6, backgroundColor: "#020617" }}>
        <Container maxWidth="lg">
          {/* HEADER */}
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
                Free Projects
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Open-source projects you can download from GitHub.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/free-projects"
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 999,
                px: 2.5,
                color: "#e0f2fe",
                border: "1px solid rgba(148,163,184,0.35)",
                "&:hover": {
                  borderColor: "primary.main",
                  background: "rgba(99,102,241,0.08)",
                },
              }}
            >
              See all free projects →
            </Button>
          </Box>

          {/* SCROLL AREA */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              pb: 3,
              px: 1,
              my: 5,
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-track": {
                background: "rgba(148,163,184,0.12)",
                borderRadius: 10,
              },
              "&::-webkit-scrollbar-thumb": {
                background:
                  "linear-gradient(90deg, rgba(99,102,241,.8), rgba(34,211,238,.8))",
                borderRadius: 10,
              },
            }}
          >
            {freeProjectsLoading ? (
              <Box sx={{ minWidth: 200, textAlign: "center", py: 4 }}>
                <CircularProgress size={28} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Loading free projects…
                </Typography>
              </Box>
            ) : (
              freeProjects.slice(0, 6).map((p) => (
                <Paper
                  key={p._id}
                  sx={{
                    minWidth: 288, // ↓ 20% smaller
                    maxWidth: 288,
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    background:
                      "linear-gradient(180deg, rgba(15,23,42,0.88), rgba(2,6,23,0.95))",
                    border: "1px solid rgba(148,163,184,0.25)",
                    boxShadow: "0 8px 20px rgba(0,0,0,.25)",
                    transition: "box-shadow .35s ease, border-color .35s ease",
                    "&:hover": {
                      borderColor: "rgba(99,102,241,.6)",
                      boxShadow: "0 16px 40px rgba(79,70,229,.35)",
                    },
                  }}
                >
                  {/* FREE RIBBON */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: -36,
                      transform: "rotate(-45deg)",
                      background: "linear-gradient(90deg, #22c55e, #4ade80)",
                      color: "#022c22",
                      px: 5,
                      py: 0.35,
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "0.8px",
                      zIndex: 2,
                    }}
                  >
                    FREE
                  </Box>

                  {/* VIDEO */}
                  {p.videoUrl && (
                    <video
                      src={p.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: "100%",
                        height: 152, // ↓ 20% smaller
                        objectFit: "cover",
                      }}
                    />
                  )}

                  {/* CONTENT */}
                  <Box sx={{ p: 2 }}>
                    <Typography fontWeight={800} sx={{ mb: 0.4 }}>
                      {p.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1.2, lineHeight: 1.5 }}
                    >
                      {p.description?.slice(0, 90)}...
                    </Typography>

                    {/* TECH STACK */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.6,
                        mb: 1.5,
                      }}
                    >
                      {p.techStack?.slice(0, 4).map((tech, i) => (
                        <Box
                          key={i}
                          sx={{
                            px: 1,
                            py: 0.25,
                            fontSize: "10px",
                            borderRadius: 999,
                            color: "#c7d2fe",
                            background: "rgba(99,102,241,0.15)",
                            border: "1px solid rgba(99,102,241,0.35)",
                          }}
                        >
                          {tech}
                        </Box>
                      ))}
                    </Box>

                    <Button
                      href={p.githubLink}
                      target="_blank"
                      fullWidth
                      size="small"
                      sx={{
                        borderRadius: 999,
                        fontWeight: 600,
                        textTransform: "none",
                        color: "#e0f2fe",
                        background:
                          "linear-gradient(90deg, rgba(99,102,241,.85), rgba(34,211,238,.85))",
                        "&:hover": {
                          background:
                            "linear-gradient(90deg, rgba(99,102,241,1), rgba(34,211,238,1))",
                        },
                      }}
                    >
                      Download Code
                    </Button>
                  </Box>
                </Paper>
              ))
            )}

            {freeProjects.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                {freeProjectsTimedOut
                  ? "No project uploaded yet from admin"
                  : ""}
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
