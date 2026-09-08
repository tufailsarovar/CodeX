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
          AKTU STUDY HUB
      ================================================= */}

      <Box
        sx={{
          py: {
            xs: 6,
            md: 9,
          },

          background:
            "linear-gradient(180deg,#020617 0%,#0f172a 50%,#020617 100%)",

          color: "#fff",

          position: "relative",

          overflow: "hidden",
        }}
      >
        {/* BACKGROUND GLOW */}

        <Box
          sx={{
            position: "absolute",

            width: 350,
            height: 350,

            borderRadius: "50%",

            background: "rgba(79,70,229,.18)",

            filter: "blur(100px)",

            top: -150,
            left: -100,
          }}
        />

        <Box
          sx={{
            position: "absolute",

            width: 350,
            height: 350,

            borderRadius: "50%",

            background: "rgba(14,165,233,.12)",

            filter: "blur(100px)",

            bottom: -150,
            right: -100,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* AKTU HEADER */}

          <Box
            sx={{
              textAlign: "center",

              maxWidth: 800,

              mx: "auto",

              mb: {
                xs: 4,
                md: 6,
              },
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,

                mx: "auto",
                mb: 2.5,

                display: "flex",

                alignItems: "center",
                justifyContent: "center",

                borderRadius: 4,

                background: "linear-gradient(135deg,#6366f1,#2563eb)",

                boxShadow: "0 15px 45px rgba(79,70,229,.3)",
              }}
            >
              <SchoolIcon
                sx={{
                  fontSize: 40,
                  color: "#fff",
                }}
              />
            </Box>

            <Chip
              label="AKTU STUDY RESOURCES"
              sx={{
                mb: 1.5,

                color: "#c7d2fe",

                background: "rgba(99,102,241,.12)",

                border: "1px solid rgba(129,140,248,.3)",

                fontWeight: 800,
              }}
            />

            <Typography
              component="h2"
              fontWeight={950}
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.7rem",
                  md: "3.4rem",
                },

                lineHeight: 1.1,

                letterSpacing: "-1px",
              }}
            >
              AKTU Study Hub
            </Typography>

            <Typography
              sx={{
                mt: 1.8,

                color: "#94a3b8",

                fontSize: {
                  xs: ".95rem",
                  md: "1.08rem",
                },

                lineHeight: 1.8,
              }}
            >
              Everything you need for AKTU preparation in one place — organized
              by branch and academic year.
            </Typography>
          </Box>

          {/* AKTU GRID
              PHONE = 2
              TABLET = 2
              DESKTOP = 3
          */}

          <Grid
            container
            spacing={{
              xs: 1.2,
              sm: 2,
              md: 2.5,
            }}
          >
            {aktuResources.map((resource) => (
              <Grid item xs={6} sm={6} md={4} key={resource.title}>
                <Paper
                  sx={{
                    height: "100%",

                    p: {
                      xs: 1.5,
                      sm: 2.5,
                      md: 3,
                    },

                    borderRadius: {
                      xs: 2.5,
                      md: 4,
                    },

                    background: "rgba(15,23,42,.75)",

                    border: "1px solid rgba(148,163,184,.16)",

                    color: "#fff",

                    backdropFilter: "blur(12px)",

                    transition: "all .3s ease",

                    "&:hover": {
                      transform: "translateY(-6px)",

                      borderColor: "rgba(99,102,241,.55)",

                      boxShadow: "0 20px 45px rgba(0,0,0,.25)",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={0.5}
                  >
                    <Box
                      sx={{
                        width: {
                          xs: 38,
                          sm: 52,
                        },

                        height: {
                          xs: 38,
                          sm: 52,
                        },

                        flexShrink: 0,

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        borderRadius: {
                          xs: 2,
                          sm: 3,
                        },

                        background: resource.iconBackground,

                        color: "#818cf8",

                        "& svg": {
                          fontSize: {
                            xs: 21,
                            sm: 29,
                          },
                        },
                      }}
                    >
                      {resource.icon}
                    </Box>

                    <Chip
                      size="small"
                      label={resource.tag}
                      color={resource.tagColor}
                      sx={{
                        fontWeight: 800,

                        fontSize: {
                          xs: 9,
                          sm: 11,
                        },

                        height: {
                          xs: 22,
                          sm: 28,
                        },
                      }}
                    />
                  </Stack>

                  <Typography
                    fontWeight={900}
                    sx={{
                      mt: {
                        xs: 1.4,
                        sm: 2.2,
                      },

                      mb: 0.8,

                      fontSize: {
                        xs: ".88rem",
                        sm: "1.1rem",
                      },

                      lineHeight: 1.25,
                    }}
                  >
                    {resource.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#94a3b8",

                      lineHeight: 1.55,

                      fontSize: {
                        xs: ".72rem",
                        sm: ".875rem",
                      },

                      display: "-webkit-box",

                      WebkitBoxOrient: "vertical",

                      WebkitLineClamp: {
                        xs: 3,
                        sm: 4,
                      },

                      overflow: "hidden",
                    }}
                  >
                    {resource.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* AKTU CTA */}

          <Box
            sx={{
              mt: 4.5,

              p: {
                xs: 2,
                sm: 3.5,
              },

              borderRadius: 4,

              background:
                "linear-gradient(135deg,rgba(79,70,229,.2),rgba(14,165,233,.1))",

              border: "1px solid rgba(129,140,248,.25)",
            }}
          >
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
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
                      xs: "1rem",
                      sm: "1.15rem",
                    },
                  }}
                >
                  Looking for AKTU study material?
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#94a3b8",

                    mt: 0.5,

                    fontSize: {
                      xs: ".75rem",
                      sm: ".875rem",
                    },
                  }}
                >
                  Select your branch, year and resource type from the AKTU Study
                  page.
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/aktu"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  flexShrink: 0,

                  borderRadius: 3,

                  textTransform: "none",

                  fontWeight: 900,

                  minHeight: 50,

                  px: 3,
                }}
              >
                Explore AKTU
              </Button>
            </Stack>
          </Box>

          {/* AKTU FEATURES */}

          <Grid
            container
            spacing={2}
            sx={{
              mt: 3,
            }}
          >
            <Grid item xs={12} sm={4}>
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                justifyContent={{
                  xs: "center",
                  sm: "flex-start",
                }}
              >
                <SchoolIcon
                  sx={{
                    color: "#818cf8",
                  }}
                />

                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="text.secondary"
                >
                  Branch-wise resources
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                justifyContent="center"
              >
                <MenuBookIcon
                  sx={{
                    color: "#818cf8",
                  }}
                />

                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="text.secondary"
                >
                  1st to 4th Year
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                justifyContent={{
                  xs: "center",
                  sm: "flex-end",
                }}
              >
                <PictureAsPdfIcon
                  sx={{
                    color: "#818cf8",
                  }}
                />

                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="text.secondary"
                >
                  PDF study material
                </Typography>
              </Stack>
            </Grid>
          </Grid>
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
