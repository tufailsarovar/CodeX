import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  Chip,
  CircularProgress,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import ExploreIcon from "@mui/icons-material/Explore";
import CategoryIcon from "@mui/icons-material/Category";

import api from "../../api/axios";
import ProjectCard from "../../components/Project/ProjectCard";

const MotionBox = motion(Box);

/* =========================
   PROJECT CATEGORIES
========================= */

const PROJECT_CATEGORIES = [
  {
    value: "all",
    label: "All Projects",
  },
  {
    value: "frontend",
    label: "Frontend",
  },
  {
    value: "mern",
    label: "MERN Full Stack",
  },
  {
    value: "backend",
    label: "Backend",
  },
  {
    value: "javascript",
    label: "JavaScript",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "java",
    label: "Java",
  },
  {
    value: "c-cpp",
    label: "C / C++",
  },
  {
    value: "data-science",
    label: "Data Science",
  },
  {
    value: "data-analysis",
    label: "Data Analysis",
  },
  {
    value: "ai-ml",
    label: "AI / ML",
  },
  {
    value: "deep-learning",
    label: "Deep Learning",
  },
  {
    value: "mobile-app",
    label: "Mobile Apps",
  },
  {
    value: "cybersecurity",
    label: "Cybersecurity",
  },
  {
    value: "cloud-devops",
    label: "Cloud / DevOps",
  },
  {
    value: "automation",
    label: "Automation",
  },
  {
    value: "php",
    label: "PHP",
  },
  {
    value: "other",
    label: "Other",
  },
];

const ExploreProjects = () => {
  const [projects, setProjects] = useState(() => {
    try {
      const cached = localStorage.getItem("codex_explore_projects_all");

      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [category, setCategory] = useState("all");

  const [loading, setLoading] = useState(() => {
    try {
      return !localStorage.getItem("codex_explore_projects_all");
    } catch {
      return true;
    }
  });

  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      try {
        const params = category === "all" ? {} : { category };

        const cacheKey =
          category === "all"
            ? "codex_explore_projects_all"
            : `codex_explore_projects_${category}`;

        const cached = localStorage.getItem(cacheKey);

        if (cached && mounted) {
          try {
            const cachedProjects = JSON.parse(cached);

            if (Array.isArray(cachedProjects)) {
              setProjects(cachedProjects);
              setLoading(false);
            }
          } catch {
            localStorage.removeItem(cacheKey);
          }
        }

        const res = await api.get("/projects", {
          params,
          timeout: 15000,
        });

        if (!mounted) return;

        const freshProjects = Array.isArray(res.data) ? res.data : [];

        setProjects(freshProjects);
        setError("");

        try {
          localStorage.setItem(cacheKey, JSON.stringify(freshProjects));
        } catch (cacheError) {
          console.error("Explore projects cache error:", cacheError);
        }
      } catch (err) {
        console.error("Explore projects error:", err);

        if (mounted && projects.length === 0) {
          setProjects([]);
          setError("Unable to load projects. Please try again.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      mounted = false;
    };
  }, [category]);

  const handleTabChange = (_, newValue) => {
    setCategory(newValue);
  };

  const handleRetry = () => {
    setCategory((current) => (current === "all" ? "all" : current));
  };

  const categoryCount = projects.length;

  const selectedCategory = PROJECT_CATEGORIES.find(
    (item) => item.value === category,
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: {
          xs: 3,
          sm: 5,
          md: 7,
        },
        bgcolor: "#020617",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* =========================
          BACKGROUND
      ========================= */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 8% 0%, rgba(99,102,241,.18), transparent 32%), radial-gradient(circle at 92% 15%, rgba(37,99,235,.13), transparent 30%)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 140,
          left: "50%",
          width: 500,
          height: 500,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,.055), transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          px: {
            xs: 1.5,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* =========================
            HEADER
        ========================= */}

        <MotionBox
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            justifyContent="space-between"
            sx={{
              mb: {
                xs: 2.5,
                sm: 3.5,
              },
            }}
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Box
                  sx={{
                    width: {
                      xs: 34,
                      sm: 42,
                    },
                    height: {
                      xs: 34,
                      sm: 42,
                    },
                    borderRadius: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(99,102,241,.12)",
                    border: "1px solid rgba(129,140,248,.2)",
                    color: "#818cf8",
                  }}
                >
                  <ExploreIcon
                    sx={{
                      fontSize: {
                        xs: 19,
                        sm: 23,
                      },
                    }}
                  />
                </Box>

                <Chip
                  label="PROJECT MARKETPLACE"
                  size="small"
                  sx={{
                    height: {
                      xs: 23,
                      sm: 27,
                    },
                    bgcolor: "rgba(99,102,241,.1)",
                    color: "#a5b4fc",
                    border: "1px solid rgba(129,140,248,.2)",
                    fontSize: {
                      xs: 8,
                      sm: 10,
                    },
                    fontWeight: 900,
                    letterSpacing: ".5px",
                  }}
                />
              </Stack>

              <Typography
                component="h1"
                fontWeight={950}
                sx={{
                  fontSize: {
                    xs: "1.65rem",
                    sm: "2.2rem",
                    md: "2.8rem",
                  },
                  lineHeight: 1.1,
                  letterSpacing: "-.8px",
                }}
              >
                Explore{" "}
                <Box
                  component="span"
                  sx={{
                    color: "transparent",
                    background:
                      "linear-gradient(90deg,#60a5fa,#818cf8,#c084fc)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Projects
                </Box>
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  color: "#94a3b8",
                  maxWidth: 720,
                  fontSize: {
                    xs: ".75rem",
                    sm: ".9rem",
                    md: "1rem",
                  },
                  lineHeight: 1.65,
                }}
              >
                Discover projects across software, data, AI, development,
                automation and more — with complete resources to help you build,
                learn and deliver.
              </Typography>
            </Box>

            {!loading && !error && (
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  minWidth: 100,
                  borderRadius: 3,
                  bgcolor: "rgba(15,23,42,.75)",
                  border: "1px solid rgba(148,163,184,.14)",
                }}
              >
                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: ".62rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  Showing
                </Typography>

                <Typography
                  fontWeight={900}
                  sx={{
                    fontSize: {
                      xs: ".85rem",
                      sm: ".95rem",
                    },
                  }}
                >
                  {categoryCount} {categoryCount === 1 ? "Project" : "Projects"}
                </Typography>
              </Box>
            )}
          </Stack>
        </MotionBox>

        {/* =========================
            CATEGORY TABS
        ========================= */}

        <MotionBox
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.08,
          }}
          sx={{
            mb: {
              xs: 3,
              sm: 4,
            },

            p: {
              xs: 0.5,
              sm: 0.8,
            },

            borderRadius: {
              xs: 3,
              sm: 4,
            },

            bgcolor: "rgba(15,23,42,.72)",

            border: "1px solid rgba(148,163,184,.14)",

            boxShadow: "0 18px 50px rgba(0,0,0,.12)",

            overflowX: "auto",

            scrollbarWidth: "none",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Tabs
            value={category}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons={false}
            allowScrollButtonsMobile
            sx={{
              minHeight: {
                xs: 46,
                sm: 52,
              },

              "& .MuiTabs-flexContainer": {
                gap: {
                  xs: 0.25,
                  sm: 0.5,
                },
              },

              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 999,
                background: "linear-gradient(90deg,#818cf8,#6366f1,#a78bfa)",
                boxShadow: "0 0 12px rgba(129,140,248,.45)",
              },

              "& .MuiTab-root": {
                minHeight: {
                  xs: 46,
                  sm: 52,
                },

                minWidth: {
                  xs: "auto",
                  sm: 120,
                },

                px: {
                  xs: 1.5,
                  sm: 2,
                },

                borderRadius: 2.5,

                color: "#64748b",

                textTransform: "none",

                fontSize: {
                  xs: ".68rem",
                  sm: ".8rem",
                },

                fontWeight: 800,

                whiteSpace: "nowrap",

                transition:
                  "color .25s ease, background .25s ease, transform .25s ease",

                "&:hover": {
                  color: "#cbd5e1",
                  bgcolor: "rgba(99,102,241,.06)",
                },
              },

              "& .MuiTab-root.Mui-selected": {
                color: "#fff",
                bgcolor: "rgba(99,102,241,.08)",
              },
            }}
          >
            {PROJECT_CATEGORIES.map((item) => (
              <Tab
                key={item.value}
                value={item.value}
                icon={
                  <CategoryIcon
                    sx={{
                      fontSize: {
                        xs: 15,
                        sm: 17,
                      },
                    }}
                  />
                }
                iconPosition="start"
                label={item.label}
              />
            ))}
          </Tabs>
        </MotionBox>

        {/* Selected Category */}
        {!loading && !error && (
          <MotionBox
            key={category}
            initial={{
              opacity: 0,
              y: -5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            sx={{
              mb: 2.5,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#818cf8",
                  boxShadow: "0 0 10px rgba(129,140,248,.7)",
                }}
              />

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: ".7rem",
                  fontWeight: 700,
                }}
              >
                Browsing:
              </Typography>

              <Typography
                sx={{
                  color: "#cbd5e1",
                  fontSize: ".7rem",
                  fontWeight: 900,
                }}
              >
                {selectedCategory?.label}
              </Typography>
            </Stack>
          </MotionBox>
        )}

        {/* =========================
            LOADING
        ========================= */}

        {loading && (
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack alignItems="center" spacing={1.5}>
              <CircularProgress
                size={34}
                thickness={4}
                sx={{
                  color: "#818cf8",
                }}
              />

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: ".78rem",
                }}
              >
                Loading projects...
              </Typography>
            </Stack>
          </Box>
        )}

        {/* =========================
            ERROR
        ========================= */}

        {!loading && error && (
          <MotionBox
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            sx={{
              minHeight: 280,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: 500,
                p: {
                  xs: 3,
                  sm: 4,
                },
                textAlign: "center",
                bgcolor: "rgba(15,23,42,.9)",
                color: "#fff",
                border: "1px solid rgba(248,113,113,.18)",
                borderRadius: 4,
              }}
            >
              <Typography
                fontWeight={900}
                sx={{
                  fontSize: "1rem",
                }}
              >
                Unable to load projects
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  color: "#64748b",
                  fontSize: ".75rem",
                }}
              >
                {error}
              </Typography>

              <Button
                variant="outlined"
                onClick={handleRetry}
                sx={{
                  mt: 2,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 800,
                }}
              >
                Try Again
              </Button>
            </Paper>
          </MotionBox>
        )}

        {/* =========================
            PROJECTS
        ========================= */}

        {!loading && !error && projects.length > 0 && (
          <AnimatePresence mode="wait">
            <MotionBox
              key={category}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <Grid
                container
                spacing={{
                  xs: 1.2,
                  sm: 2,
                  md: 3,
                }}
              >
                {projects.map((project, index) => (
                  <Grid item xs={6} sm={6} md={4} key={project._id}>
                    <MotionBox
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: Math.min(index * 0.045, 0.45),
                      }}
                      sx={{
                        height: "100%",
                      }}
                    >
                      <ProjectCard project={project} />
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
            </MotionBox>
          </AnimatePresence>
        )}

        {/* =========================
            EMPTY
        ========================= */}

        {!loading && !error && projects.length === 0 && (
          <MotionBox
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            sx={{
              minHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                maxWidth: 520,
                p: {
                  xs: 3,
                  sm: 5,
                },
                textAlign: "center",
                bgcolor: "rgba(15,23,42,.78)",
                color: "#fff",
                border: "1px solid rgba(148,163,184,.14)",
                borderRadius: 4,
              }}
            >
              <Box
                sx={{
                  width: 58,
                  height: 58,
                  mx: "auto",
                  mb: 1.5,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(99,102,241,.1)",
                  color: "#818cf8",
                }}
              >
                <ExploreIcon />
              </Box>

              <Typography
                fontWeight={900}
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.15rem",
                  },
                }}
              >
                No projects found
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  color: "#64748b",
                  fontSize: {
                    xs: ".7rem",
                    sm: ".78rem",
                  },
                }}
              >
                There are currently no projects available in this category.
              </Typography>
            </Paper>
          </MotionBox>
        )}
      </Container>
    </Box>
  );
};

export default ExploreProjects;
