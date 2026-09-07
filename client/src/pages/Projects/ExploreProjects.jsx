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
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ExploreIcon from "@mui/icons-material/Explore";
import CodeIcon from "@mui/icons-material/Code";
import LayersIcon from "@mui/icons-material/Layers";
import api from "../../api/axios";
import ProjectCard from "../../components/Project/ProjectCard";

const MotionBox = motion(Box);

const ExploreProjects = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const params =
          category === "all"
            ? {}
            : { category };

        const res = await api.get("/projects", {
          params,
          timeout: 15000,
        });

        if (mounted) {
          setProjects(
            Array.isArray(res.data)
              ? res.data
              : [],
          );
        }
      } catch (err) {
        console.error(
          "Explore projects error:",
          err,
        );

        if (mounted) {
          setProjects([]);
          setError(
            "Unable to load projects. Please try again.",
          );
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
    setCategory((current) =>
      current === "all"
        ? "all"
        : current,
    );
  };

  const categoryCount = projects.length;

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
      {/* Background glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 8% 0%, rgba(99,102,241,.18), transparent 32%), radial-gradient(circle at 92% 15%, rgba(37,99,235,.13), transparent 30%)",
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
        {/* Header */}
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
                    bgcolor:
                      "rgba(99,102,241,.12)",
                    border:
                      "1px solid rgba(129,140,248,.2)",
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
                    bgcolor:
                      "rgba(99,102,241,.1)",
                    color: "#a5b4fc",
                    border:
                      "1px solid rgba(129,140,248,.2)",
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
                Explore Projects
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  color: "#94a3b8",
                  maxWidth: 650,
                  fontSize: {
                    xs: ".75rem",
                    sm: ".9rem",
                    md: "1rem",
                  },
                  lineHeight: 1.6,
                }}
              >
                Find ready-to-use academic projects,
                source code, presentations and
                documentation for your submission.
              </Typography>
            </Box>

            {!loading && !error && (
              <Box
                sx={{
                  px: 1.5,
                  py: 1,
                  borderRadius: 3,
                  bgcolor:
                    "rgba(15,23,42,.75)",
                  border:
                    "1px solid rgba(148,163,184,.14)",
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
                  {categoryCount}{" "}
                  {categoryCount === 1
                    ? "Project"
                    : "Projects"}
                </Typography>
              </Box>
            )}
          </Stack>
        </MotionBox>

        {/* Category tabs */}
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
              xs: 0.55,
              sm: 0.8,
            },
            borderRadius: {
              xs: 3,
              sm: 4,
            },
            bgcolor:
              "rgba(15,23,42,.7)",
            border:
              "1px solid rgba(148,163,184,.14)",
            overflowX: "auto",
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
            sx={{
              minHeight: {
                xs: 42,
                sm: 48,
              },

              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 999,
                background:
                  "linear-gradient(90deg,#818cf8,#6366f1)",
              },

              "& .MuiTab-root": {
                minHeight: {
                  xs: 42,
                  sm: 48,
                },
                minWidth: {
                  xs: 82,
                  sm: 120,
                },
                px: {
                  xs: 1.4,
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
                transition:
                  "all .2s ease",
              },

              "& .MuiTab-root.Mui-selected": {
                color: "#fff",
              },
            }}
          >
            <Tab
              value="all"
              icon={
                <LayersIcon
                  sx={{
                    fontSize: {
                      xs: 16,
                      sm: 18,
                    },
                  }}
                />
              }
              iconPosition="start"
              label="All Projects"
            />

            <Tab
              value="frontend"
              icon={
                <CodeIcon
                  sx={{
                    fontSize: {
                      xs: 16,
                      sm: 18,
                    },
                  }}
                />
              }
              iconPosition="start"
              label="Frontend"
            />

            <Tab
              value="mern"
              icon={
                <CodeIcon
                  sx={{
                    fontSize: {
                      xs: 16,
                      sm: 18,
                    },
                  }}
                />
              }
              iconPosition="start"
              label="MERN Full Stack"
            />
          </Tabs>
        </MotionBox>

        {/* Loading */}
        {loading && (
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              alignItems="center"
              spacing={1.5}
            >
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

        {/* Error */}
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
              sx={{
                width: "100%",
                maxWidth: 500,
                p: {
                  xs: 3,
                  sm: 4,
                },
                textAlign: "center",
                bgcolor:
                  "rgba(15,23,42,.9)",
                color: "#fff",
                border:
                  "1px solid rgba(248,113,113,.18)",
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

        {/* Projects */}
        {!loading &&
          !error &&
          projects.length > 0 && (
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
                  {projects.map(
                    (project, index) => (
                      <Grid
                        item
                        xs={6}
                        sm={6}
                        md={4}
                        key={project._id}
                      >
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
                            delay:
                              Math.min(
                                index * 0.045,
                                0.45,
                              ),
                          }}
                          sx={{
                            height: "100%",
                          }}
                        >
                          <ProjectCard
                            project={project}
                          />
                        </MotionBox>
                      </Grid>
                    ),
                  )}
                </Grid>
              </MotionBox>
            </AnimatePresence>
          )}

        {/* Empty */}
        {!loading &&
          !error &&
          projects.length === 0 && (
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
                sx={{
                  width: "100%",
                  maxWidth: 520,
                  p: {
                    xs: 3,
                    sm: 5,
                  },
                  textAlign: "center",
                  bgcolor:
                    "rgba(15,23,42,.78)",
                  color: "#fff",
                  border:
                    "1px solid rgba(148,163,184,.14)",
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
                    bgcolor:
                      "rgba(99,102,241,.1)",
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
                  There are currently no
                  projects available in this
                  category.
                </Typography>
              </Paper>
            </MotionBox>
          )}
      </Container>
    </Box>
  );
};

export default ExploreProjects;