import React, {
  useEffect,
  useState,
} from "react";

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
  const token =
    localStorage.getItem("codex_token");

  /* =====================================================
     PROJECT STATES
  ===================================================== */

  const [projects, setProjects] =
    useState([]);

  const [freeProjects, setFreeProjects] =
    useState([]);

  const [projectsLoading, setProjectsLoading] =
    useState(true);

  const [freeProjectsLoading, setFreeProjectsLoading] =
    useState(true);

  const [projectsTimedOut, setProjectsTimedOut] =
    useState(false);

  const [freeProjectsTimedOut, setFreeProjectsTimedOut] =
    useState(false);

  const [activeIndex, setActiveIndex] =
    useState(0);

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
        const res = await api.get(
          "/free-projects"
        );

        setFreeProjects(
          Array.isArray(res.data)
            ? res.data
            : []
        );
      } catch (error) {
        console.error(
          "Free projects error:",
          error
        );
      } finally {
        clearTimeout(timeoutId);
        setFreeProjectsLoading(false);
      }
    };

    fetchFreeProjects();

    return () =>
      clearTimeout(timeoutId);
  }, []);

  /* =====================================================
     FETCH PROJECTS
  ===================================================== */

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setProjectsLoading(false);
      setProjectsTimedOut(true);
    }, 30000);

    const fetchProjects = async () => {
      try {
        const res = await api.get(
          "/projects"
        );

        const projectData =
          Array.isArray(res.data)
            ? res.data
            : [];

        const sortedProjects =
          [...projectData].sort(
            (a, b) => {
              const aAvailable =
                Object.values(
                  a.files || {}
                ).some(
                  (url) =>
                    typeof url ===
                      "string" &&
                    url.trim() !== ""
                );

              const bAvailable =
                Object.values(
                  b.files || {}
                ).some(
                  (url) =>
                    typeof url ===
                      "string" &&
                    url.trim() !== ""
                );

              return (
                Number(bAvailable) -
                Number(aAvailable)
              );
            }
          );

        setProjects(
          sortedProjects
        );
      } catch (error) {
        console.error(
          "Projects error:",
          error
        );
      } finally {
        clearTimeout(timeoutId);
        setProjectsLoading(false);
      }
    };

    fetchProjects();

    return () =>
      clearTimeout(timeoutId);
  }, []);

  /* =====================================================
     HERO PROJECT CAROUSEL
  ===================================================== */

  useEffect(() => {
    if (projects.length < 2) {
      return;
    }

    const visible =
      projects.slice(0, 5);

    const interval =
      setInterval(() => {
        setActiveIndex(
          (previous) =>
            previous ===
            visible.length - 1
              ? 0
              : previous + 1
        );
      }, 2500);

    return () =>
      clearInterval(interval);
  }, [projects]);

  /* =====================================================
     HELPERS
  ===================================================== */

  const isAnyFileAvailable = (
    files = {}
  ) =>
    Object.values(files).some(
      (url) =>
        typeof url === "string" &&
        url.trim() !== ""
    );

  const visibleProjects =
    projects.slice(0, 5);

  const total =
    visibleProjects.length;

  /* =====================================================
     AKTU RESOURCE CARDS
  ===================================================== */

  const aktuResources = [
    {
      icon: <MenuBookIcon />,
      title: "AKTU Syllabus",
      description:
        "Find branch-wise and year-wise AKTU syllabus in one place.",
      tag: "Free",
      tagColor: "success",
      iconBackground:
        "rgba(34,197,94,.12)",
    },

    {
      icon: <DescriptionIcon />,
      title: "AKTU Notes",
      description:
        "Access organized study notes for your branch and academic year.",
      tag: "Paid",
      tagColor: "warning",
      iconBackground:
        "rgba(245,158,11,.12)",
    },

    {
      icon: <PictureAsPdfIcon />,
      title: "Previous Year Papers",
      description:
        "Prepare with AKTU previous year question papers and exam material.",
      tag: "Paid",
      tagColor: "warning",
      iconBackground:
        "rgba(245,158,11,.12)",
    },

    {
      icon: <QuestionAnswerIcon />,
      title: "Important Questions",
      description:
        "Focus on important exam questions and question-answer resources.",
      tag: "Paid",
      tagColor: "warning",
      iconBackground:
        "rgba(245,158,11,.12)",
    },

    {
      icon: <AutoStoriesIcon />,
      title: "Quantum",
      description:
        "Explore useful AKTU Quantum study material organized by year.",
      tag: "Paid",
      tagColor: "warning",
      iconBackground:
        "rgba(245,158,11,.12)",
    },

    {
      icon: <SchoolIcon />,
      title: "Question & Answers",
      description:
        "Get exam-focused questions and answers for your AKTU preparation.",
      tag: "Paid",
      tagColor: "warning",
      iconBackground:
        "rgba(245,158,11,.12)",
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
            xs: 6,
            sm: 8,
            md: 11,
          },

          background:
            "radial-gradient(circle at top, #1D4ED8 0, #020617 55%)",

          color: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={{
              xs: 5,
              md: 7,
            }}
            alignItems="center"
          >
            {/* HERO LEFT */}

            <Grid
              item
              xs={12}
              md={6}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#c7d2fe",
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                CodeX | Tufail Sarovar
              </Typography>

              <Typography
                variant="overline"
                sx={{
                  color: "#a5b4fc",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                }}
              >
                Code • Learn • Submit •
                Succeed
              </Typography>

              <Typography
                component="h1"
                fontWeight={900}
                sx={{
                  mt: 2,
                  mb: 2,

                  fontSize: {
                    xs: "2.2rem",
                    sm: "3rem",
                    md: "3.7rem",
                  },

                  lineHeight: 1.08,
                  letterSpacing: "-1.5px",
                }}
              >
                Structured and
                Scalable{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#60a5fa",
                  }}
                >
                  Projects
                </Box>{" "}
                designed for academic
                excellence.
              </Typography>

              <Typography
                sx={{
                  mb: 3.5,
                  color: "#cbd5e1",
                  maxWidth: 570,

                  fontSize: {
                    xs: ".95rem",
                    md: "1.08rem",
                  },

                  lineHeight: 1.75,
                }}
              >
                CodeX offers secure
                payments, instant delivery
                and high-quality project
                resources for students.
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
                  endIcon={
                    <ArrowForwardIcon />
                  }
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 900,
                    px: 3,
                    minHeight: 52,
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
                      borderColor:
                        "rgba(255,255,255,.4)",
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
                >
                  Secure Payments •
                  Instant Access
                </Typography>
              </Stack>
            </Grid>

            {/* HERO RIGHT */}

            <Grid
              item
              xs={12}
              md={6}
            >
              <Box
                sx={{
                  position: "relative",

                  height: {
                    xs: 350,
                    sm: 390,
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
                  visibleProjects.map(
                    (
                      project,
                      index
                    ) => {
                      const position =
                        index ===
                        activeIndex
                          ? 0
                          : index ===
                              (activeIndex -
                                1 +
                                total) %
                                total
                            ? -1
                            : index ===
                                (activeIndex +
                                  1) %
                                  total
                              ? 1
                              : 2;

                      return (
                        <MotionBox
                          key={
                            project._id
                          }
                          animate={{
                            y:
                              position === 0
                                ? 0
                                : position === -1
                                  ? -120
                                  : 120,

                            scale:
                              position === 0
                                ? 1
                                : 0.85,

                            opacity:
                              position === 0
                                ? 1
                                : 0.5,
                          }}
                          transition={{
                            duration: 0.6,
                          }}
                          sx={{
                            position:
                              "absolute",

                            width: "92%",

                            p: {
                              xs: 2.5,
                              sm: 3,
                            },

                            borderRadius: 4,

                            background:
                              "linear-gradient(180deg,#0f172a,#020617)",

                            border:
                              "1px solid rgba(148,163,184,.3)",

                            color: "#fff",

                            zIndex:
                              position ===
                              0
                                ? 3
                                : 1,

                            boxShadow:
                              position ===
                              0
                                ? "0 25px 70px rgba(0,0,0,.4)"
                                : "none",
                          }}
                        >
                          <Stack spacing={2}>
                            <Typography
                              fontWeight={800}
                              sx={{
                                fontSize:
                                  "1.15rem",
                              }}
                            >
                              {
                                project.title
                              }
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                color:
                                  "#cbd5e1",
                                lineHeight:
                                  1.65,
                              }}
                            >
                              {project.description?.slice(
                                0,
                                120
                              )}
                              ...
                            </Typography>

                            <Typography
                              fontWeight={900}
                              sx={{
                                fontSize:
                                  "1.2rem",
                              }}
                            >
                              ₹
                              {
                                project.price
                              }
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: 13,
                                fontWeight: 700,
                                color:
                                  isAnyFileAvailable(
                                    project.files
                                  )
                                    ? "#4ade80"
                                    : "#facc15",
                              }}
                            >
                              {isAnyFileAvailable(
                                project.files
                              )
                                ? "● Available"
                                : "● Coming soon"}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={1.5}
                            >
                              <Button
                                component={
                                  Link
                                }
                                to={`/projects/${project._id}`}
                                variant="outlined"
                                size="small"
                                sx={{
                                  borderRadius:
                                    2.5,
                                  textTransform:
                                    "none",
                                  color:
                                    "#fff",
                                  borderColor:
                                    "rgba(255,255,255,.35)",
                                }}
                              >
                                View
                              </Button>

                              <Button
                                component={
                                  Link
                                }
                                to={`/projects/${project._id}`}
                                variant="contained"
                                size="small"
                                sx={{
                                  borderRadius:
                                    2.5,
                                  textTransform:
                                    "none",
                                  fontWeight:
                                    800,
                                }}
                              >
                                Buy
                              </Button>
                            </Stack>
                          </Stack>
                        </MotionBox>
                      );
                    }
                  )
                )}
              </Box>
            </Grid>
          </Grid>
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
        <Container maxWidth="lg">
          <Box
            sx={{
              mb: 3,

              display: "flex",

              justifyContent:
                "space-between",

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
              <Typography
                variant="h5"
                fontWeight={900}
              >
                All Projects
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                Browse all available
                academic projects.
              </Typography>
            </Box>

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
                  Loading projects
                  from server…
                </Typography>
              </Box>
            ) : (
              projects
                .slice(0, 6)
                .map(
                  (project) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={
                        project._id
                      }
                    >
                      <ProjectCard
                        project={
                          project
                        }
                      />
                    </Grid>
                  )
                )
            )}

            {!projectsLoading &&
              projects.length === 0 && (
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    py: 5,
                  }}
                >
                  <Typography
                    color="text.secondary"
                  >
                    {projectsTimedOut
                      ? "No project uploaded yet from admin"
                      : "No projects available."}
                  </Typography>
                </Box>
              )}
          </Grid>
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

            background:
              "rgba(79,70,229,.18)",

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

            background:
              "rgba(14,165,233,.12)",

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
                justifyContent:
                  "center",

                borderRadius: 4,

                background:
                  "linear-gradient(135deg,#6366f1,#2563eb)",

                boxShadow:
                  "0 15px 45px rgba(79,70,229,.3)",
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

                background:
                  "rgba(99,102,241,.12)",

                border:
                  "1px solid rgba(129,140,248,.3)",

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

                letterSpacing:
                  "-1px",
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
              Everything you need for
              AKTU preparation in one
              place — organized by
              branch and academic year.
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
            {aktuResources.map(
              (resource) => (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  key={
                    resource.title
                  }
                >
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

                      background:
                        "rgba(15,23,42,.75)",

                      border:
                        "1px solid rgba(148,163,184,.16)",

                      color: "#fff",

                      backdropFilter:
                        "blur(12px)",

                      transition:
                        "all .3s ease",

                      "&:hover": {
                        transform:
                          "translateY(-6px)",

                        borderColor:
                          "rgba(99,102,241,.55)",

                        boxShadow:
                          "0 20px 45px rgba(0,0,0,.25)",
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

                          alignItems:
                            "center",

                          justifyContent:
                            "center",

                          borderRadius: {
                            xs: 2,
                            sm: 3,
                          },

                          background:
                            resource.iconBackground,

                          color:
                            "#818cf8",

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
                        label={
                          resource.tag
                        }
                        color={
                          resource.tagColor
                        }
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
                      {
                        resource.title
                      }
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          "#94a3b8",

                        lineHeight: 1.55,

                        fontSize: {
                          xs: ".72rem",
                          sm: ".875rem",
                        },

                        display:
                          "-webkit-box",

                        WebkitBoxOrient:
                          "vertical",

                        WebkitLineClamp: {
                          xs: 3,
                          sm: 4,
                        },

                        overflow:
                          "hidden",
                      }}
                    >
                      {
                        resource.description
                      }
                    </Typography>
                  </Paper>
                </Grid>
              )
            )}
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

              border:
                "1px solid rgba(129,140,248,.25)",
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
                  Looking for AKTU
                  study material?
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color:
                      "#94a3b8",

                    mt: 0.5,

                    fontSize: {
                      xs: ".75rem",
                      sm: ".875rem",
                    },
                  }}
                >
                  Select your branch,
                  year and resource type
                  from the AKTU Study
                  page.
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/aktu"
                variant="contained"
                size="large"
                endIcon={
                  <ArrowForwardIcon />
                }
                sx={{
                  flexShrink: 0,

                  borderRadius: 3,

                  textTransform:
                    "none",

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
            <Grid
              item
              xs={12}
              sm={4}
            >
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
                    color:
                      "#818cf8",
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

            <Grid
              item
              xs={12}
              sm={4}
            >
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                justifyContent="center"
              >
                <MenuBookIcon
                  sx={{
                    color:
                      "#818cf8",
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

            <Grid
              item
              xs={12}
              sm={4}
            >
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
                    color:
                      "#818cf8",
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

          backgroundColor:
            "#020617",

          color: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              mb: 3,

              display: "flex",

              justifyContent:
                "space-between",

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
              <Typography
                variant="h5"
                fontWeight={900}
              >
                Free Projects
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                }}
              >
                Open-source projects
                you can download from
                GitHub.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/free-projects"
              sx={{
                textTransform:
                  "none",

                fontWeight: 700,

                borderRadius: 999,

                color: "#e0f2fe",

                border:
                  "1px solid rgba(148,163,184,.35)",

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

              "&::-webkit-scrollbar-track":
                {
                  background:
                    "rgba(148,163,184,.12)",

                  borderRadius: 10,
                },

              "&::-webkit-scrollbar-thumb":
                {
                  background:
                    "rgba(99,102,241,.7)",

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
                <CircularProgress
                  size={28}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                  }}
                >
                  Loading free
                  projects…
                </Typography>
              </Box>
            ) : (
              freeProjects
                .slice(0, 6)
                .map(
                  (project) => (
                    <Paper
                      key={
                        project._id
                      }
                      sx={{
                        minWidth: 288,
                        maxWidth: 288,

                        position:
                          "relative",

                        borderRadius: 4,

                        overflow:
                          "hidden",

                        background:
                          "linear-gradient(180deg,rgba(15,23,42,.88),rgba(2,6,23,.95))",

                        border:
                          "1px solid rgba(148,163,184,.25)",

                        color: "#fff",

                        transition:
                          "all .3s ease",

                        "&:hover": {
                          transform:
                            "translateY(-5px)",

                          borderColor:
                            "rgba(99,102,241,.6)",

                          boxShadow:
                            "0 16px 40px rgba(79,70,229,.3)",
                        },
                      }}
                    >
                      {/* FREE BADGE */}

                      <Box
                        sx={{
                          position:
                            "absolute",

                          top: 10,
                          left: -35,

                          transform:
                            "rotate(-45deg)",

                          background:
                            "linear-gradient(90deg,#22c55e,#4ade80)",

                          color:
                            "#022c22",

                          px: 5,

                          py: 0.35,

                          fontSize: 10,

                          fontWeight: 900,

                          letterSpacing:
                            ".8px",

                          zIndex: 2,
                        }}
                      >
                        FREE
                      </Box>

                      {project.videoUrl && (
                        <video
                          src={
                            project.videoUrl
                          }
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{
                            width:
                              "100%",

                            height: 152,

                            objectFit:
                              "cover",
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
                          {
                            project.title
                          }
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1.5,
                            lineHeight: 1.5,
                          }}
                        >
                          {project.description?.slice(
                            0,
                            90
                          )}
                          ...
                        </Typography>

                        <Box
                          sx={{
                            display:
                              "flex",

                            flexWrap:
                              "wrap",

                            gap: 0.6,

                            mb: 1.5,
                          }}
                        >
                          {project.techStack
                            ?.slice(
                              0,
                              4
                            )
                            .map(
                              (
                                tech,
                                index
                              ) => (
                                <Box
                                  key={
                                    index
                                  }
                                  sx={{
                                    px: 1,

                                    py: 0.25,

                                    fontSize:
                                      10,

                                    borderRadius:
                                      999,

                                    color:
                                      "#c7d2fe",

                                    background:
                                      "rgba(99,102,241,.15)",

                                    border:
                                      "1px solid rgba(99,102,241,.35)",
                                  }}
                                >
                                  {
                                    tech
                                  }
                                </Box>
                              )
                            )}
                        </Box>

                        <Button
                          href={
                            project.githubLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          fullWidth
                          size="small"
                          sx={{
                            borderRadius:
                              999,

                            fontWeight: 800,

                            textTransform:
                              "none",

                            color: "#fff",

                            background:
                              "linear-gradient(90deg,rgba(99,102,241,.85),rgba(34,211,238,.85))",
                          }}
                        >
                          Download Code
                        </Button>
                      </Box>
                    </Paper>
                  )
                )
            )}

            {!freeProjectsLoading &&
              freeProjects.length ===
                0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
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