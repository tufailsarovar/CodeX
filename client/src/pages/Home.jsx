import React, { useEffect, useRef, useState } from "react";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import ProjectCard from "../components/Project/ProjectCard";
import api from "../api/axios";

const MotionBox = motion(Box);

const Home = () => {
  const token = localStorage.getItem("codex_token");

  /* =====================================================
     PROJECT STATES
  ===================================================== */

  const [projects, setProjects] = useState([]);
  const [featuredCategory, setFeaturedCategory] = useState("all");

  /* =====================================================
     EXPLORE PROJECTS INTERACTION REFS
  ===================================================== */

  const exploreTrackRef = useRef(null);
  const explorePositionRef = useRef(0);
  const exploreDraggingRef = useRef(false);
  const explorePausedRef = useRef(false);
  const exploreDidDragRef = useRef(false);
  const explorePointerIdRef = useRef(null);
  const explorePointerRef = useRef({
    startX: 0,
    startPosition: 0,
  });
  const exploreResumeTimerRef = useRef(null);

  const [exploreIsDragging, setExploreIsDragging] = useState(false);

  const [freeProjects, setFreeProjects] = useState([]);

  const [projectsLoading, setProjectsLoading] = useState(true);

  const [freeProjectsLoading, setFreeProjectsLoading] = useState(true);

  const [projectsTimedOut, setProjectsTimedOut] = useState(false);

  const [freeProjectsTimedOut, setFreeProjectsTimedOut] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  /* =====================================================
     FETCH FREE PROJECTS
  ===================================================== */

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setFreeProjectsLoading(false);
      setFreeProjectsTimedOut(true);
    }, 30000);

    const fetchFreeProjects = async () => {
      try {
        const res = await api.get("/free-projects");

        setFreeProjects(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Free projects error:", error);
      } finally {
        clearTimeout(timeoutId);
        setFreeProjectsLoading(false);
      }
    };

    fetchFreeProjects();

    return () => clearTimeout(timeoutId);
  }, []);

  /* =====================================================
     FETCH PROJECTS
  ===================================================== */

  /* =====================================================
   FETCH PROJECTS
===================================================== */

  useEffect(() => {
    let cancelled = false;
    let timeoutId;

    const fetchProjects = async () => {
      setProjectsLoading(true);
      setProjectsTimedOut(false);

      const maxRetries = 3;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const res = await api.get("/projects", {
            timeout: 15000,
          });

          if (cancelled) return;

          const projectData = Array.isArray(res.data) ? res.data : [];

          const sortedProjects = [...projectData].sort((a, b) => {
            const aAvailable = Object.values(a.files || {}).some(
              (url) => typeof url === "string" && url.trim() !== "",
            );

            const bAvailable = Object.values(b.files || {}).some(
              (url) => typeof url === "string" && url.trim() !== "",
            );

            return Number(bAvailable) - Number(aAvailable);
          });

          setProjects(sortedProjects);
          setProjectsLoading(false);
          setProjectsTimedOut(false);

          return;
        } catch (error) {
          console.error(
            `Projects request failed (attempt ${attempt}/${maxRetries}):`,
            error,
          );

          if (attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
          }
        }
      }

      if (!cancelled) {
        setProjects([]);
        setProjectsLoading(false);
        setProjectsTimedOut(true);
      }
    };

    timeoutId = setTimeout(() => {
      if (!cancelled) {
        setProjectsLoading(false);
        setProjectsTimedOut(true);
      }
    }, 30000);

    fetchProjects();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  /* =====================================================
     HERO PROJECT CAROUSEL
  ===================================================== */

  useEffect(() => {
    if (projects.length < 2) {
      return;
    }

    const visible = projects.slice(0, 5);

    const interval = setInterval(() => {
      setActiveIndex((previous) =>
        previous === visible.length - 1 ? 0 : previous + 1,
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [projects]);

  /* =====================================================
     EXPLORE PROJECTS AUTO SCROLL
     FRAME-RATE INDEPENDENT + DRAG + TOUCH + PAUSE
  ===================================================== */

  useEffect(() => {
    const track = exploreTrackRef.current;

    if (!track) return;

    let frameId;
    let lastTime = performance.now();

    explorePositionRef.current = 0;
    track.style.transform = "translate3d(0,0,0)";

    const animate = (now) => {
      const delta = Math.min(now - lastTime, 32);
      lastTime = now;

      if (!exploreDraggingRef.current && !explorePausedRef.current) {
        const speed = window.innerWidth < 600 ? 0.035 : 0.055;
        explorePositionRef.current -= speed * delta;

        const halfWidth = track.scrollWidth / 2;

        if (halfWidth > 0 && explorePositionRef.current <= -halfWidth) {
          explorePositionRef.current += halfWidth;
        }

        track.style.transform = `translate3d(${explorePositionRef.current}px,0,0)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);

      if (exploreResumeTimerRef.current) {
        clearTimeout(exploreResumeTimerRef.current);
      }
    };
  }, [featuredCategory, projects]);

  /* =====================================================
     HELPERS
  ===================================================== */

  const isAnyFileAvailable = (files = {}) =>
    Object.values(files).some(
      (url) => typeof url === "string" && url.trim() !== "",
    );

  const visibleProjects = projects.slice(0, 5);

  const total = visibleProjects.length;

  /* =====================================================
     AKTU RESOURCE CARDS
  ===================================================== */

  const aktuResources = [
    {
      icon: <MenuBookIcon />,
      title: "AKTU Syllabus",
      description: "Find branch-wise and year-wise AKTU syllabus in one place.",
      tag: "Free",
      tagColor: "success",
      iconBackground: "rgba(34,197,94,.12)",
    },

    {
      icon: <DescriptionIcon />,
      title: "AKTU Notes",
      description:
        "Access organized study notes for your branch and academic year.",
      tag: "Paid",
      tagColor: "warning",
      iconBackground: "rgba(245,158,11,.12)",
    },

    {
      icon: <PictureAsPdfIcon />,
      title: "Previous Year Papers",
      description:
        "Prepare with AKTU previous year question papers and exam material.",
      tag: "Paid",
      tagColor: "warning",
      iconBackground: "rgba(245,158,11,.12)",
    },

    {
      icon: <QuestionAnswerIcon />,
      title: "Important Questions",
      description:
        "Focus on important exam questions and question-answer resources.",
      tag: "Paid",
      tagColor: "warning",
      iconBackground: "rgba(245,158,11,.12)",
    },

    {
      icon: <AutoStoriesIcon />,
      title: "Quantum",
      description:
        "Explore useful AKTU Quantum study material organized by year.",
      tag: "Paid",
      tagColor: "warning",
      iconBackground: "rgba(245,158,11,.12)",
    },

    {
      icon: <SchoolIcon />,
      title: "Question & Answers",
      description:
        "Get exam-focused questions and answers for your AKTU preparation.",
      tag: "Paid",
      tagColor: "warning",
      iconBackground: "rgba(245,158,11,.12)",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* =================================================
          HERO
      ================================================= */}

      <Box
        sx={{
          py: {
            xs: 4.5,
            sm: 6.5,
            md: 2,
          },

          background:
            "radial-gradient(circle at 70% 10%, rgba(37,99,235,.55) 0%, rgba(30,64,175,.22) 28%, transparent 55%), linear-gradient(135deg,#020617 0%,#06143d 48%,#020617 100%)",

          color: "#fff",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 2, sm: 3, md: 0 },
          }}
        >
          <Grid
            container
            spacing={{
              xs: 5,
              md: 7,
            }}
            alignItems="center"
          >
            {/* HERO LEFT */}

            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{
                  color: "#f3e65b",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                }}
              >
                Code • Learn • Submit • Succeed
              </Typography>

              <Typography
                component="h1"
                fontWeight={900}
                sx={{
                  mt: 2,
                  mb: 2,

                  fontSize: {
                    xs: "1.85rem",
                    sm: "2.65rem",
                    md: "3.7rem",
                  },

                  lineHeight: {
                    xs: 1.12,
                    sm: 1.08,
                  },
                  letterSpacing: {
                    xs: "-0.7px",
                    sm: "-1.2px",
                    md: "-1.5px",
                  },
                  maxWidth: {
                    xs: 520,
                    md: 650,
                  },
                }}
              >
                Structured and Scalable{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#60a5fa",
                  }}
                >
                  Projects
                </Box>{" "}
                designed for academic excellence.
              </Typography>

              <Typography
                sx={{
                  mb: 3.5,
                  color: "#cbd5e1",
                  maxWidth: 570,

                  fontSize: {
                    xs: ".82rem",
                    sm: ".95rem",
                    md: "1.08rem",
                  },

                  lineHeight: {
                    xs: 1.6,
                    md: 1.75,
                  },
                }}
              >
                CodeX offers secure payments, instant delivery and high-quality
                project resources for students.
              </Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={1.5}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "auto",
                  },
                }}
              >
                <Button
                  component={Link}
                  to="/explore"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 900,
                    px: 3,
                    minHeight: {
                      xs: 46,
                      sm: 52,
                    },
                  }}
                >
                  Explore Projects
                </Button>

                {!token && (
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 800,
                      px: 3,
                      minHeight: 52,
                      color: "#fff",
                      borderColor: "rgba(255,255,255,.4)",
                    }}
                  >
                    Login to Buy
                  </Button>
                )}
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  mt: 2.5,
                  color: "#cbd5e1",
                }}
              >
                <ShieldIcon
                  sx={{
                    color: "#4ade80",
                    fontSize: 21,
                  }}
                />

                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    fontSize: {
                      xs: ".72rem",
                      sm: ".875rem",
                    },
                  }}
                >
                  Secure Payments • Instant Access
                </Typography>
              </Stack>
            </Grid>

            {/* HERO RIGHT */}

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",

                  height: {
                    xs: 270,
                    sm: 340,
                    md: 430,
                  },

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  overflow: "hidden",
                }}
              >
                {projectsLoading ? (
                  <CircularProgress
                    sx={{
                      color: "#fff",
                    }}
                  />
                ) : projects.length === 0 ? (
                  <Typography
                    sx={{
                      color: "#cbd5e1",
                      textAlign: "center",
                    }}
                  >
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
                          y: position === 0 ? 0 : position === -1 ? -95 : 95,

                          scale: position === 0 ? 1 : 0.9,

                          opacity: position === 0 ? 1 : 0.38,

                          rotateX:
                            position === 0 ? 0 : position === -1 ? 2 : -2,
                        }}
                        transition={{
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        sx={{
                          position: "absolute",

                          width: "92%",

                          p: {
                            xs: 2.5,
                            sm: 3,
                          },

                          borderRadius: 4,

                          background: "linear-gradient(180deg,#0f172a,#020617)",

                          border: "1px solid rgba(148,163,184,.3)",

                          color: "#fff",

                          zIndex: position === 0 ? 3 : 1,

                          boxShadow:
                            position === 0
                              ? "0 25px 70px rgba(0,0,0,.4)"
                              : "none",
                        }}
                      >
                        <Stack spacing={{ xs: 1.1, sm: 1.7, md: 2 }}>
                          <Typography
                            fontWeight={800}
                            sx={{
                              fontSize: {
                                xs: ".95rem",
                                sm: "1.05rem",
                                md: "1.15rem",
                              },
                              lineHeight: 1.3,
                            }}
                          >
                            {project.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: "#cbd5e1",
                              lineHeight: {
                                xs: 1.45,
                                md: 1.65,
                              },
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 3,
                              overflow: "hidden",
                            }}
                          >
                            {project.description?.slice(0, 120)}
                            ...
                          </Typography>

                          <Typography
                            fontWeight={900}
                            sx={{
                              fontSize: {
                                xs: "1.05rem",
                                sm: "1.15rem",
                                md: "1.2rem",
                              },
                            }}
                          >
                            ₹{project.price}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: {
                                xs: 11,
                                sm: 12,
                                md: 13,
                              },
                              fontWeight: 700,
                              color: isAnyFileAvailable(project.files)
                                ? "#4ade80"
                                : "#facc15",
                            }}
                          >
                            {isAnyFileAvailable(project.files)
                              ? "● Available"
                              : "● Coming soon"}
                          </Typography>

                          <Stack direction="row" spacing={{ xs: 1, sm: 1.3 }}>
                            <Button
                              component={Link}
                              to={`/projects/${project._id}`}
                              variant="outlined"
                              size="small"
                              sx={{
                                borderRadius: 2.5,
                                textTransform: "none",
                                color: "#fff",
                                borderColor: "rgba(255,255,255,.35)",
                              }}
                            >
                              View
                            </Button>

                            <Button
                              component={Link}
                              to={`/projects/${project._id}`}
                              variant="contained"
                              size="small"
                              sx={{
                                borderRadius: 2.5,
                                textTransform: "none",
                                fontWeight: 800,
                              }}
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

      {/* =================================================
    EXPLORE PROJECTS
    FILTER + AUTO SMOOTH SCROLL
================================================= */}

      <Box
        sx={{
          py: {
            xs: 4.5,
            sm: 5.5,
            md: 7,
          },
          background: "#020617",
          color: "#fff",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* ================= HEADER ================= */}

        <Container
          maxWidth="lg"
          sx={{
            px: {
              xs: 2,
              sm: 3,
              md: 0,
            },
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              component="h2"
              fontWeight={900}
              sx={{
                fontSize: {
                  xs: "1.35rem",
                  sm: "1.8rem",
                  md: "2.15rem",
                },
                lineHeight: 1.2,
                letterSpacing: "-.5px",
              }}
            >
              Explore Projects
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "#94a3b8",
                fontSize: {
                  xs: ".72rem",
                  sm: ".85rem",
                  md: ".9rem",
                },
              }}
            >
              Filter by category to find perfect projects for your submission.
            </Typography>
          </MotionBox>

          {/* ================= CATEGORY TABS ================= */}

          <Box
            sx={{
              mt: 2.2,
              mb: 3,
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            <Stack
              direction="row"
              sx={{
                width: "fit-content",
                borderBottom: "1px solid rgba(148,163,184,.12)",
              }}
            >
              {[
                {
                  label: "ALL",
                  value: "all",
                },
                {
                  label: "FRONTEND",
                  value: "frontend",
                },
                {
                  label: "MERN FULL STACK",
                  value: "mern",
                },
                {
                  label: "BACKEND",
                  value: "backend",
                },
                {
                  label: "JAVASCRIPT",
                  value: "javascript",
                },
                {
                  label: "PYTHON",
                  value: "python",
                },
                {
                  label: "JAVA",
                  value: "java",
                },
                {
                  label: "C / C++",
                  value: "c-cpp",
                },
                {
                  label: "DATA SCIENCE",
                  value: "data-science",
                },
                {
                  label: "DATA ANALYSIS",
                  value: "data-analysis",
                },
                {
                  label: "AI / ML",
                  value: "ai-ml",
                },
                {
                  label: "DEEP LEARNING",
                  value: "deep-learning",
                },
                {
                  label: "MOBILE APPS",
                  value: "mobile-app",
                },
                {
                  label: "CYBERSECURITY",
                  value: "cybersecurity",
                },
                {
                  label: "CLOUD / DEVOPS",
                  value: "cloud-devops",
                },
                {
                  label: "AUTOMATION",
                  value: "automation",
                },
                {
                  label: "PHP",
                  value: "php",
                },
                {
                  label: "OTHER",
                  value: "other",
                },
              ].map((tab) => {
                const active = featuredCategory === tab.value;

                return (
                  <Box
                    key={tab.value}
                    onClick={() => setFeaturedCategory(tab.value)}
                    sx={{
                      position: "relative",

                      px: {
                        xs: 1.8,
                        sm: 2.7,
                        md: 3.2,
                      },

                      py: {
                        xs: 1.1,
                        sm: 1.4,
                      },

                      cursor: "pointer",

                      color: active ? "#6366f1" : "#94a3b8",

                      fontSize: {
                        xs: ".68rem",
                        sm: ".8rem",
                        md: ".85rem",
                      },

                      fontWeight: 700,

                      whiteSpace: "nowrap",

                      transition: "color .25s ease",

                      "&:hover": {
                        color: "#fff",
                      },

                      "&::after": {
                        content: '""',
                        position: "absolute",

                        left: 0,
                        right: 0,
                        bottom: -1,

                        height: 2,

                        borderRadius: "3px 3px 0 0",

                        background: "linear-gradient(90deg,#6366f1,#818cf8)",

                        transform: active ? "scaleX(1)" : "scaleX(0)",

                        transition: "transform .25s ease",
                      },
                    }}
                  >
                    {tab.label}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Container>

        {/* ================= PROJECT MARQUEE ================= */}

        {(() => {
          const filteredProjects =
            featuredCategory === "all"
              ? projects
              : projects.filter((project) => {
                  const projectCategory = String(project.category || "")
                    .trim()
                    .toLowerCase();

                  return projectCategory === featuredCategory.toLowerCase();
                });

          if (projectsLoading) {
            return (
              <Box
                sx={{
                  py: 5,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  size={27}
                  sx={{
                    color: "#6366f1",
                  }}
                />
              </Box>
            );
          }

          if (filteredProjects.length === 0) {
            return (
              <Box
                sx={{
                  mx: {
                    xs: 2,
                    sm: 3,
                    md: 0,
                  },

                  py: 4,

                  textAlign: "center",

                  borderRadius: 3,

                  border: "1px solid rgba(148,163,184,.15)",

                  background: "rgba(15,23,42,.55)",
                }}
              >
                <Typography
                  fontWeight={800}
                  sx={{
                    fontSize: ".9rem",
                    color: "#e2e8f0",
                  }}
                >
                  No projects found
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    color: "#64748b",
                    fontSize: ".72rem",
                  }}
                >
                  No projects are available in this category yet.
                </Typography>
              </Box>
            );
          }

          return (
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
                position: "relative",

                /* Mobile fade */
                "&::before": {
                  content: '""',
                  position: "absolute",
                  zIndex: 5,

                  left: 0,
                  top: 0,
                  bottom: 0,

                  width: {
                    xs: 6,
                    sm: 25,
                    md: 60,
                  },

                  background: "linear-gradient(90deg,#020617,transparent)",

                  pointerEvents: "none",
                },

                "&::after": {
                  content: '""',
                  position: "absolute",
                  zIndex: 5,

                  right: 0,
                  top: 0,
                  bottom: 0,

                  width: {
                    xs: 6,
                    sm: 25,
                    md: 60,
                  },

                  background: "linear-gradient(270deg,#020617,transparent)",

                  pointerEvents: "none",
                },
              }}
            >
              <MotionBox
                key={featuredCategory}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <MotionBox
                  ref={exploreTrackRef}
                  sx={{
                    display: "flex",
                    width: "max-content",
                    gap: {
                      xs: 1,
                      sm: 2,
                      md: 2.5,
                    },
                    px: {
                      xs: 1.5,
                      sm: 4,
                      md: 7,
                    },
                    willChange: "transform",
                    cursor: exploreIsDragging ? "grabbing" : "grab",
                    userSelect: "none",
                    touchAction: "pan-y",
                    WebkitUserSelect: "none",
                    WebkitTouchCallout: "none",
                  }}
                  onMouseEnter={() => {
                    explorePausedRef.current = true;
                  }}
                  onMouseLeave={() => {
                    if (exploreDraggingRef.current) return;

                    if (exploreResumeTimerRef.current) {
                      clearTimeout(exploreResumeTimerRef.current);
                    }

                    exploreResumeTimerRef.current = setTimeout(() => {
                      explorePausedRef.current = false;
                    }, 250);
                  }}
                  onPointerDown={(event) => {
                    exploreDraggingRef.current = true;
                    explorePausedRef.current = true;
                    exploreDidDragRef.current = false;
                    explorePointerIdRef.current = event.pointerId;

                    explorePointerRef.current = {
                      startX: event.clientX,
                      startPosition: explorePositionRef.current,
                    };

                    setExploreIsDragging(true);

                    event.currentTarget.setPointerCapture(event.pointerId);
                  }}
                  onPointerMove={(event) => {
                    if (
                      !exploreDraggingRef.current ||
                      explorePointerIdRef.current !== event.pointerId
                    ) {
                      return;
                    }

                    const delta =
                      event.clientX - explorePointerRef.current.startX;

                    if (Math.abs(delta) > 5) {
                      exploreDidDragRef.current = true;
                    }

                    const trackElement = event.currentTarget;
                    const halfWidth = trackElement.scrollWidth / 2;

                    let nextPosition =
                      explorePointerRef.current.startPosition + delta;

                    if (halfWidth > 0) {
                      while (nextPosition <= -halfWidth) {
                        nextPosition += halfWidth;
                      }

                      while (nextPosition > 0) {
                        nextPosition -= halfWidth;
                      }
                    }

                    explorePositionRef.current = nextPosition;

                    trackElement.style.transform = `translate3d(${nextPosition}px, 0, 0)`;
                  }}
                  onPointerUp={(event) => {
                    if (explorePointerIdRef.current !== event.pointerId) {
                      return;
                    }

                    exploreDraggingRef.current = false;
                    explorePointerIdRef.current = null;
                    setExploreIsDragging(false);

                    try {
                      event.currentTarget.releasePointerCapture(
                        event.pointerId,
                      );
                    } catch {}

                    if (exploreResumeTimerRef.current) {
                      clearTimeout(exploreResumeTimerRef.current);
                    }

                    exploreResumeTimerRef.current = setTimeout(() => {
                      explorePausedRef.current = false;
                      exploreDidDragRef.current = false;
                    }, 450);
                  }}
                  onPointerCancel={(event) => {
                    if (explorePointerIdRef.current !== event.pointerId) {
                      return;
                    }

                    exploreDraggingRef.current = false;
                    explorePointerIdRef.current = null;
                    setExploreIsDragging(false);

                    try {
                      event.currentTarget.releasePointerCapture(
                        event.pointerId,
                      );
                    } catch {}

                    if (exploreResumeTimerRef.current) {
                      clearTimeout(exploreResumeTimerRef.current);
                    }

                    exploreResumeTimerRef.current = setTimeout(() => {
                      explorePausedRef.current = false;
                      exploreDidDragRef.current = false;
                    }, 450);
                  }}
                  onClickCapture={(event) => {
                    if (exploreDidDragRef.current) {
                      event.preventDefault();
                      event.stopPropagation();
                      exploreDidDragRef.current = false;
                    }
                  }}
                >
                  {/* ================= FIRST SET ================= */}

                  {filteredProjects.map((project, index) => (
                    <MotionBox
                      key={`home-project-${project._id}-${index}`}
                      whileHover={{
                        y: -5,
                        scale: 1.01,
                      }}
                      sx={{
                        width: {
                          xs: "calc((100vw - 36px) / 2)",
                          sm: 295,
                          md: 335,
                        },
                        maxWidth: {
                          xs: "calc((100vw - 36px) / 2)",
                          sm: 295,
                          md: 335,
                        },
                        minWidth: {
                          xs: "calc((100vw - 36px) / 2)",
                          sm: 295,
                          md: 335,
                        },
                        flexShrink: 0,
                        "& > *": {
                          width: "100%",
                          maxWidth: "100%",
                        },
                      }}
                    >
                      <ProjectCard project={project} />
                    </MotionBox>
                  ))}

                  {/* ================= DUPLICATE SET ================= */}

                  {filteredProjects.map((project, index) => (
                    <MotionBox
                      key={`home-project-copy-${project._id}-${index}`}
                      whileHover={{
                        y: -5,
                        scale: 1.01,
                      }}
                      sx={{
                        width: {
                          xs: "calc((100vw - 36px) / 2)",
                          sm: 295,
                          md: 335,
                        },
                        maxWidth: {
                          xs: "calc((100vw - 36px) / 2)",
                          sm: 295,
                          md: 335,
                        },
                        minWidth: {
                          xs: "calc((100vw - 36px) / 2)",
                          sm: 295,
                          md: 335,
                        },
                        flexShrink: 0,
                        "& > *": {
                          width: "100%",
                          maxWidth: "100%",
                        },
                      }}
                    >
                      <ProjectCard project={project} />
                    </MotionBox>
                  ))}
                </MotionBox>
              </MotionBox>
            </Box>
          );
        })()}

        {/* ================= VIEW ALL ================= */}

        <Container
          maxWidth="lg"
          sx={{
            mt: {
              xs: 2.5,
              sm: 3,
            },

            textAlign: "center",

            px: {
              xs: 2,
              sm: 3,
              md: 0,
            },
          }}
        >
          <Button
            component={Link}
            to="/projects"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: 999,

              px: {
                xs: 2.2,
                sm: 2.8,
              },

              py: {
                xs: 0.7,
                sm: 0.9,
              },

              minHeight: {
                xs: 34,
                sm: 40,
              },

              fontSize: {
                xs: ".7rem",
                sm: ".8rem",
              },

              textTransform: "none",

              fontWeight: 800,

              color: "#a5b4fc",

              borderColor: "rgba(129,140,248,.4)",

              "&:hover": {
                borderColor: "#6366f1",

                background: "rgba(99,102,241,.08)",
              },
            }}
          >
            View All Projects
          </Button>
        </Container>
      </Box>
      {/* =================================================
          ALL PROJECTS
          PHONE = 1 COLUMN
          TABLET = 2 COLUMNS
          DESKTOP = 3 COLUMNS
      ================================================= */}

      <Box
        sx={{
          py: {
            xs: 5,
            md: 7,
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            px: {
              xs: 1.5,
              sm: 3,
              md: 0,
            },
          }}
        >
          <Box
            sx={{
              mb: 3,

              display: "flex",

              justifyContent: "space-between",

              alignItems: {
                xs: "flex-start",
                sm: "center",
              },

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={900}>
                All Projects
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                Browse all available academic projects.
              </Typography>
            </Box>
          </Box>

          {/* PROJECT GRID */}

          <Grid
            container
            spacing={{
              xs: 2,
              sm: 2,
              md: 3,
            }}
          >
            {projectsLoading ? (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  py: 5,
                }}
              >
                <CircularProgress />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                  }}
                >
                  Loading projects from server…
                </Typography>
              </Box>
            ) : (
              projects.slice(0, 6).map((project) => (
                <Grid item xs={6} sm={6} md={4} key={project._id}>
                  <ProjectCard project={project} />
                </Grid>
              ))
            )}

            {!projectsLoading && projects.length === 0 && (
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  py: 5,
                }}
              >
                <Typography color="text.secondary">
                  {projectsTimedOut
                    ? "No project uploaded yet from admin"
                    : "No projects available."}
                </Typography>
              </Box>
            )}
          </Grid>

          {/* VIEW FULL PROJECT LIST - BELOW PROJECT CARDS */}
          {!projectsLoading && projects.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: { xs: 3, md: 4 },
              }}
            >
              <Button
                component={Link}
                to="/projects"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  fontWeight: 700,
                }}
              >
                View Full List
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      {/* =================================================
    PROJECT REQUEST CTA
================================================= */}

      <Box
        sx={{
          py: { xs: 3, sm: 4, md: 5 },
          px: { xs: 1.5, sm: 2, md: 3 },
          background: "#0b1228",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            sx={{
              position: "relative",
              overflow: "hidden",
              textAlign: "center",

              py: {
                xs: 3.2,
                sm: 4,
                md: 4.8,
              },

              px: {
                xs: 1.8,
                sm: 3,
                md: 5,
              },

              borderRadius: {
                xs: 2.5,
                sm: 3.5,
                md: 4,
              },

              border: "1px solid rgba(99,102,241,.20)",

              background:
                "linear-gradient(135deg, rgba(30,41,85,.72) 0%, rgba(17,27,58,.88) 55%, rgba(15,23,42,.96) 100%)",

              boxShadow: "0 18px 50px rgba(0,0,0,.20)",

              "&::before": {
                content: '""',
                position: "absolute",
                width: { xs: 140, sm: 220, md: 280 },
                height: { xs: 140, sm: 220, md: 280 },
                borderRadius: "50%",
                background: "rgba(99,102,241,.10)",
                filter: "blur(45px)",
                top: -100,
                left: "50%",
                transform: "translateX(-50%)",
                pointerEvents: "none",
              },

              "&::after": {
                content: '""',
                position: "absolute",
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: "1px solid rgba(129,140,248,.08)",
                right: { xs: -45, sm: -30 },
                bottom: -45,
                pointerEvents: "none",
              },
            }}
          >
            {/* Small Badge */}
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.7,
                mb: { xs: 1.2, sm: 1.5 },

                px: { xs: 1.2, sm: 1.5 },
                py: { xs: 0.55, sm: 0.65 },

                borderRadius: 999,

                background: "rgba(99,102,241,.10)",

                border: "1px solid rgba(129,140,248,.20)",

                color: "#a5b4fc",

                fontSize: {
                  xs: "0.56rem",
                  sm: "0.64rem",
                },

                fontWeight: 900,
                letterSpacing: ".5px",
              }}
            >
              <AssignmentIcon
                sx={{
                  fontSize: {
                    xs: 13,
                    sm: 15,
                  },
                }}
              />
              CAN'T FIND WHAT YOU NEED?
            </MotionBox>

            {/* Heading */}
            <MotionBox
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.45 }}
            >
              <Typography
                component="h2"
                fontWeight={950}
                sx={{
                  position: "relative",
                  zIndex: 1,

                  fontSize: {
                    xs: "1.35rem",
                    sm: "1.8rem",
                    md: "2.25rem",
                  },

                  lineHeight: 1.15,
                  letterSpacing: "-.6px",

                  color: "#ffffff",
                }}
              >
                Need a Custom Project?
              </Typography>
            </MotionBox>

            {/* Description */}
            <MotionBox
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Typography
                sx={{
                  position: "relative",
                  zIndex: 1,

                  mt: { xs: 1, sm: 1.2 },

                  mx: "auto",

                  maxWidth: {
                    xs: 330,
                    sm: 580,
                    md: 650,
                  },

                  color: "#94a3c7",

                  fontSize: {
                    xs: "0.68rem",
                    sm: "0.78rem",
                    md: "0.88rem",
                  },

                  lineHeight: {
                    xs: 1.65,
                    sm: 1.7,
                  },
                }}
              >
                Can't find the exact project you're looking for? Tell us what
                you need and we'll help you with the right source code,
                documentation, PPT, or complete project.
              </Typography>
            </MotionBox>

            {/* Button */}
            <MotionBox
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.38, duration: 0.45 }}
              whileHover={{ y: -3 }}
              sx={{
                display: "inline-block",
                mt: { xs: 1.8, sm: 2.2 },
                position: "relative",
                zIndex: 2,
              }}
            >
              <Button
                component={Link}
                to="/project-request"
                variant="contained"
                endIcon={
                  <ArrowForwardIcon
                    sx={{
                      fontSize: {
                        xs: "16px !important",
                        sm: "18px !important",
                      },
                    }}
                  />
                }
                sx={{
                  minHeight: {
                    xs: 40,
                    sm: 44,
                  },

                  px: {
                    xs: 2,
                    sm: 2.7,
                  },

                  borderRadius: 999,

                  textTransform: "none",

                  fontWeight: 900,

                  fontSize: {
                    xs: "0.68rem",
                    sm: "0.78rem",
                  },

                  color: "#fff",

                  background: "linear-gradient(135deg,#6366f1,#4f46e5)",

                  boxShadow: "0 10px 28px rgba(79,70,229,.28)",

                  transition: "all .25s ease",

                  "&:hover": {
                    background: "linear-gradient(135deg,#818cf8,#6366f1)",

                    boxShadow: "0 14px 32px rgba(79,70,229,.38)",
                  },
                }}
              >
                Request a Project
              </Button>
            </MotionBox>
          </MotionBox>
        </Container>
      </Box>

      {/* =================================================
    AKTU STUDY HUB
================================================= */}

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          py: { xs: 4, sm: 5.5, md: 7 },
          px: { xs: 1.5, sm: 2, md: 3 },
          color: "#fff",
          background:
            "linear-gradient(180deg,#020617 0%,#07112b 50%,#020617 100%)",
        }}
      >
        {/* Soft animated background glows */}
        <MotionBox
          animate={{
            x: [0, 35, 0],
            y: [0, 20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            width: { xs: 180, sm: 280, md: 360 },
            height: { xs: 180, sm: 280, md: 360 },
            borderRadius: "50%",
            background: "rgba(99,102,241,.10)",
            filter: "blur(75px)",
            top: { xs: -90, sm: -130 },
            left: { xs: -70, sm: -100 },
            pointerEvents: "none",
          }}
        />

        <MotionBox
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            width: { xs: 180, sm: 280, md: 360 },
            height: { xs: 180, sm: 280, md: 360 },
            borderRadius: "50%",
            background: "rgba(37,99,235,.08)",
            filter: "blur(80px)",
            right: { xs: -80, sm: -100 },
            bottom: { xs: -80, sm: -120 },
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* HEADER */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            sx={{
              textAlign: "center",
              maxWidth: 720,
              mx: "auto",
              mb: { xs: 3, sm: 4.5, md: 5.5 },
            }}
          >
            {/* Icon */}
            <MotionBox
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              sx={{
                width: { xs: 48, sm: 62, md: 70 },
                height: { xs: 48, sm: 62, md: 70 },
                mx: "auto",
                mb: { xs: 1.5, sm: 2 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: { xs: 2.5, sm: 3.5 },
                background: "linear-gradient(135deg,#6366f1,#2563eb)",
                boxShadow: "0 12px 35px rgba(79,70,229,.25)",
              }}
            >
              <SchoolIcon
                sx={{
                  fontSize: { xs: 27, sm: 34, md: 39 },
                  color: "#fff",
                }}
              />
            </MotionBox>

            <Chip
              label="AKTU STUDY RESOURCES"
              size="small"
              sx={{
                mb: { xs: 1, sm: 1.3 },
                height: { xs: 24, sm: 28 },
                color: "#a5b4fc",
                background: "rgba(99,102,241,.09)",
                border: "1px solid rgba(129,140,248,.20)",
                fontWeight: 900,
                fontSize: {
                  xs: ".52rem",
                  sm: ".62rem",
                },
                letterSpacing: ".5px",
              }}
            />

            <Typography
              component="h2"
              fontWeight={950}
              sx={{
                fontSize: {
                  xs: "1.55rem",
                  sm: "2.25rem",
                  md: "3rem",
                },
                lineHeight: 1.1,
                letterSpacing: {
                  xs: "-.6px",
                  sm: "-1px",
                },
                background: "linear-gradient(90deg,#fff,#c7d2fe,#818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AKTU Study Hub
            </Typography>

            <Typography
              sx={{
                mt: { xs: 1, sm: 1.3 },
                mx: "auto",
                maxWidth: 590,
                color: "#94a3b8",
                fontSize: {
                  xs: ".68rem",
                  sm: ".8rem",
                  md: ".92rem",
                },
                lineHeight: 1.7,
              }}
            >
              Everything you need for AKTU preparation in one place, organized
              by branch and academic year.
            </Typography>
          </MotionBox>

          {/* RESOURCE CARDS */}
          <Grid
            container
            spacing={{
              xs: 1,
              sm: 1.8,
              md: 2.3,
            }}
          >
            {aktuResources.map((resource, index) => (
              <Grid item xs={6} sm={6} md={4} key={resource.title}>
                <MotionBox
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  sx={{
                    height: "100%",
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      height: "100%",
                      minHeight: {
                        xs: 145,
                        sm: 180,
                        md: 205,
                      },

                      p: {
                        xs: 1.25,
                        sm: 2,
                        md: 2.5,
                      },

                      borderRadius: {
                        xs: 2.2,
                        sm: 3,
                        md: 3.5,
                      },

                      background:
                        "linear-gradient(145deg,rgba(15,23,42,.90),rgba(8,15,35,.82))",

                      border: "1px solid rgba(148,163,184,.12)",

                      color: "#fff",

                      backdropFilter: "blur(12px)",

                      transition:
                        "border-color .25s ease, box-shadow .25s ease",

                      "&:hover": {
                        borderColor: "rgba(99,102,241,.45)",
                        boxShadow: "0 14px 35px rgba(0,0,0,.22)",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="space-between"
                      spacing={0.5}
                    >
                      {/* Icon */}
                      <MotionBox
                        whileHover={{
                          rotate: 5,
                          scale: 1.08,
                        }}
                        sx={{
                          width: {
                            xs: 34,
                            sm: 44,
                            md: 48,
                          },
                          height: {
                            xs: 34,
                            sm: 44,
                            md: 48,
                          },

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          flexShrink: 0,

                          borderRadius: {
                            xs: 1.8,
                            sm: 2.5,
                          },

                          background: "rgba(99,102,241,.10)",

                          color: "#818cf8",

                          "& svg": {
                            fontSize: {
                              xs: 18,
                              sm: 24,
                              md: 27,
                            },
                          },
                        }}
                      >
                        {resource.icon}
                      </MotionBox>

                      <Chip
                        size="small"
                        label={resource.tag}
                        color={resource.tagColor}
                        sx={{
                          height: {
                            xs: 19,
                            sm: 23,
                          },

                          fontWeight: 900,

                          fontSize: {
                            xs: 7,
                            sm: 9,
                          },

                          "& .MuiChip-label": {
                            px: {
                              xs: 0.65,
                              sm: 0.9,
                            },
                          },
                        }}
                      />
                    </Stack>

                    <Typography
                      fontWeight={900}
                      sx={{
                        mt: {
                          xs: 1.1,
                          sm: 1.7,
                        },

                        mb: {
                          xs: 0.45,
                          sm: 0.7,
                        },

                        fontSize: {
                          xs: ".76rem",
                          sm: ".95rem",
                          md: "1.05rem",
                        },

                        lineHeight: 1.25,
                      }}
                    >
                      {resource.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#64748b",

                        fontSize: {
                          xs: ".58rem",
                          sm: ".7rem",
                          md: ".8rem",
                        },

                        lineHeight: 1.5,

                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",

                        WebkitLineClamp: {
                          xs: 3,
                          sm: 3,
                        },

                        overflow: "hidden",
                      }}
                    >
                      {resource.description}
                    </Typography>
                  </Paper>
                </MotionBox>
              </Grid>
            ))}
          </Grid>

          {/* CTA */}
          <MotionBox
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.5,
            }}
            sx={{
              mt: {
                xs: 2.5,
                sm: 3.5,
                md: 4.5,
              },

              p: {
                xs: 1.5,
                sm: 2.5,
                md: 3,
              },

              borderRadius: {
                xs: 2.5,
                sm: 3,
              },

              background:
                "linear-gradient(135deg,rgba(99,102,241,.10),rgba(37,99,235,.07))",

              border: "1px solid rgba(129,140,248,.16)",
            }}
          >
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={{
                xs: 1.5,
                sm: 2,
              }}
              alignItems={{
                xs: "stretch",
                sm: "center",
              }}
              justifyContent="space-between"
            >
              <Box>
                <Typography
                  fontWeight={900}
                  sx={{
                    fontSize: {
                      xs: ".82rem",
                      sm: "1rem",
                      md: "1.1rem",
                    },
                  }}
                >
                  Ready to explore AKTU resources?
                </Typography>

                <Typography
                  sx={{
                    mt: 0.35,
                    color: "#64748b",
                    fontSize: {
                      xs: ".59rem",
                      sm: ".7rem",
                      md: ".8rem",
                    },
                    lineHeight: 1.5,
                  }}
                >
                  Choose your branch, year and study material.
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/aktu"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  flexShrink: 0,

                  minHeight: {
                    xs: 36,
                    sm: 42,
                  },

                  px: {
                    xs: 1.8,
                    sm: 2.4,
                  },

                  borderRadius: 999,

                  textTransform: "none",

                  fontWeight: 900,

                  fontSize: {
                    xs: ".62rem",
                    sm: ".72rem",
                  },

                  background: "linear-gradient(135deg,#6366f1,#4f46e5)",

                  boxShadow: "0 8px 22px rgba(79,70,229,.22)",

                  "&:hover": {
                    background: "linear-gradient(135deg,#818cf8,#6366f1)",
                    transform: "translateY(-2px)",
                  },

                  transition: "all .25s ease",
                }}
              >
                Explore AKTU
              </Button>
            </Stack>
          </MotionBox>

          {/* FEATURES */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            sx={{
              mt: {
                xs: 2,
                sm: 2.8,
                md: 3.5,
              },

              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: {
                xs: 1.2,
                sm: 2.5,
              },
            }}
          >
            {[
              {
                icon: <SchoolIcon />,
                text: "Branch-wise",
              },
              {
                icon: <MenuBookIcon />,
                text: "1st–4th Year",
              },
              {
                icon: <PictureAsPdfIcon />,
                text: "PDF Material",
              },
            ].map((feature) => (
              <Stack
                key={feature.text}
                direction="row"
                spacing={0.55}
                alignItems="center"
              >
                <Box
                  sx={{
                    display: "flex",
                    color: "#818cf8",

                    "& svg": {
                      fontSize: {
                        xs: 14,
                        sm: 17,
                      },
                    },
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: {
                      xs: ".55rem",
                      sm: ".65rem",
                    },
                    fontWeight: 800,
                  }}
                >
                  {feature.text}
                </Typography>
              </Stack>
            ))}
          </MotionBox>
        </Container>
      </Box>

      {/* =================================================
          FREE PROJECTS
          HORIZONTAL SCROLL
      ================================================= */}

      <Box
        sx={{
          py: {
            xs: 5,
            md: 7,
          },

          backgroundColor: "#020617",

          color: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              mb: 3,

              display: "flex",

              justifyContent: "space-between",

              alignItems: {
                xs: "flex-start",
                sm: "center",
              },

              flexDirection: {
                xs: "column",
                sm: "row",
              },

              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={900}>
                Free Projects
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                Open-source projects you can download from GitHub.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/free-projects"
              sx={{
                textTransform: "none",

                fontWeight: 700,

                borderRadius: 999,

                color: "#e0f2fe",

                border: "1px solid rgba(148,163,184,.35)",

                px: 2.5,
              }}
            >
              See All Free Projects →
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",

              gap: 3,

              overflowX: "auto",

              pb: 3,

              px: 1,

              my: 4,

              "&::-webkit-scrollbar": {
                height: 7,
              },

              "&::-webkit-scrollbar-track": {
                background: "rgba(148,163,184,.12)",

                borderRadius: 10,
              },

              "&::-webkit-scrollbar-thumb": {
                background: "rgba(99,102,241,.7)",

                borderRadius: 10,
              },
            }}
          >
            {freeProjectsLoading ? (
              <Box
                sx={{
                  minWidth: 280,

                  textAlign: "center",

                  py: 4,
                }}
              >
                <CircularProgress size={28} />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                  }}
                >
                  Loading free projects…
                </Typography>
              </Box>
            ) : (
              freeProjects.slice(0, 6).map((project) => (
                <Paper
                  key={project._id}
                  sx={{
                    minWidth: {
                      xs: "78vw",
                      sm: 288,
                    },
                    maxWidth: {
                      xs: "78vw",
                      sm: 288,
                    },

                    position: "relative",

                    borderRadius: 4,

                    overflow: "hidden",

                    background:
                      "linear-gradient(180deg,rgba(15,23,42,.88),rgba(2,6,23,.95))",

                    border: "1px solid rgba(148,163,184,.25)",

                    color: "#fff",

                    transition: "all .3s ease",

                    "&:hover": {
                      transform: "translateY(-5px)",

                      borderColor: "rgba(99,102,241,.6)",

                      boxShadow: "0 16px 40px rgba(79,70,229,.3)",
                    },
                  }}
                >
                  {/* FREE BADGE */}

                  <Box
                    sx={{
                      position: "absolute",

                      top: 10,
                      left: -35,

                      transform: "rotate(-45deg)",

                      background: "linear-gradient(90deg,#22c55e,#4ade80)",

                      color: "#022c22",

                      px: 5,

                      py: 0.35,

                      fontSize: 10,

                      fontWeight: 900,

                      letterSpacing: ".8px",

                      zIndex: 2,
                    }}
                  >
                    FREE
                  </Box>

                  {project.videoUrl && (
                    <video
                      src={project.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        width: "100%",

                        height: 152,

                        objectFit: "cover",
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      p: 2,
                    }}
                  >
                    <Typography
                      fontWeight={900}
                      sx={{
                        mb: 0.5,
                      }}
                    >
                      {project.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1.5,
                        lineHeight: 1.5,
                      }}
                    >
                      {project.description?.slice(0, 90)}
                      ...
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",

                        flexWrap: "wrap",

                        gap: 0.6,

                        mb: 1.5,
                      }}
                    >
                      {project.techStack?.slice(0, 4).map((tech, index) => (
                        <Box
                          key={index}
                          sx={{
                            px: 1,

                            py: 0.25,

                            fontSize: 10,

                            borderRadius: 999,

                            color: "#c7d2fe",

                            background: "rgba(99,102,241,.15)",

                            border: "1px solid rgba(99,102,241,.35)",
                          }}
                        >
                          {tech}
                        </Box>
                      ))}
                    </Box>

                    <Button
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                      size="small"
                      sx={{
                        borderRadius: 999,

                        fontWeight: 800,

                        textTransform: "none",

                        color: "#fff",

                        background:
                          "linear-gradient(90deg,rgba(99,102,241,.85),rgba(34,211,238,.85))",
                      }}
                    >
                      Download Code
                    </Button>
                  </Box>
                </Paper>
              ))
            )}

            {!freeProjectsLoading && freeProjects.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                {freeProjectsTimedOut
                  ? "No project uploaded yet from admin"
                  : "No free projects available."}
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
