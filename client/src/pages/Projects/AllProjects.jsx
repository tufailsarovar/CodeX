import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  CircularProgress,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import AppsIcon from "@mui/icons-material/Apps";
import RefreshIcon from "@mui/icons-material/Refresh";
import api from "../../api/axios";
import ProjectCard from "../../components/Project/ProjectCard";

const MotionBox = motion(Box);

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/projects", {
          timeout: 15000,
          headers: {
            "Cache-Control": "max-age=60",
          },
        });

        if (mounted) {
          setProjects(Array.isArray(res.data) ? res.data : []);
        }
      } catch (err) {
        console.error("All projects error:", err);

        if (mounted) {
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
  }, [refreshKey]);

  const handleRetry = () => {
    setRefreshKey((prev) => prev + 1);
  };

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
            "radial-gradient(circle at 8% 0%, rgba(99,102,241,.18), transparent 32%), radial-gradient(circle at 92% 12%, rgba(37,99,235,.13), transparent 30%)",
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
                sm: 4,
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
                  <AppsIcon
                    sx={{
                      fontSize: {
                        xs: 19,
                        sm: 23,
                      },
                    }}
                  />
                </Box>

                <Chip
                  label="CODEX MARKETPLACE"
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
                All Projects
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  color: "#94a3b8",
                  maxWidth: 680,
                  fontSize: {
                    xs: ".75rem",
                    sm: ".9rem",
                    md: "1rem",
                  },
                  lineHeight: 1.6,
                }}
              >
                Browse our complete collection of academic projects, source
                code, presentations and documentation.
              </Typography>
            </Box>

            {!loading && !error && (
              <Box
                sx={{
                  px: 1.7,
                  py: 1.1,
                  minWidth: {
                    xs: "auto",
                    sm: 120,
                  },
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
                  Total
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
                  {projects.length}{" "}
                  {projects.length === 1 ? "Project" : "Projects"}
                </Typography>
              </Box>
            )}
          </Stack>
        </MotionBox>

        {/* Loading */}
        {loading && (
          <MotionBox
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            sx={{
              minHeight: 360,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack alignItems="center" spacing={1.5}>
              <CircularProgress
                size={36}
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
                Loading all projects...
              </Typography>
            </Stack>
          </MotionBox>
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
              minHeight: 330,
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
                  lineHeight: 1.5,
                }}
              >
                {error}
              </Typography>

              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleRetry}
                sx={{
                  mt: 2,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 800,
                  minHeight: 38,
                }}
              >
                Try Again
              </Button>
            </Paper>
          </MotionBox>
        )}

        {/* Projects */}
        {!loading && !error && projects.length > 0 && (
          <AnimatePresence mode="wait">
            <MotionBox
              key={refreshKey}
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
                alignItems="stretch"
              >
                {projects.map((project, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={4}
                    key={project._id}
                    sx={{
                      display: "flex",
                      minWidth: 0,
                    }}
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
                        delay: Math.min(index * 0.045, 0.45),
                      }}
                      sx={{
                        width: "100%",
                        minWidth: 0,
                        display: "flex",
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

        {/* Empty */}
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
              minHeight: 330,
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
                  width: 60,
                  height: 60,
                  mx: "auto",
                  mb: 1.5,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(99,102,241,.1)",
                  border: "1px solid rgba(129,140,248,.14)",
                  color: "#818cf8",
                }}
              >
                <AppsIcon />
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
                No projects available
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  color: "#64748b",
                  fontSize: {
                    xs: ".7rem",
                    sm: ".78rem",
                  },
                  lineHeight: 1.5,
                }}
              >
                There are currently no projects available in the marketplace.
              </Typography>
            </Paper>
          </MotionBox>
        )}
      </Container>
    </Box>
  );
};

export default AllProjects;
