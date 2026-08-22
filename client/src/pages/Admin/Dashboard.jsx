import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

import FolderIcon from "@mui/icons-material/Folder";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PaymentsIcon from "@mui/icons-material/Payments";
import GitHubIcon from "@mui/icons-material/GitHub";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonIcon from "@mui/icons-material/Person";
import CodeIcon from "@mui/icons-material/Code";
import SecurityIcon from "@mui/icons-material/Security";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import RefreshIcon from "@mui/icons-material/Refresh";

/* =========================================================
   COLORS
========================================================= */

const COLORS = {
  page: "#070b18",
  panel: "#0c1222",
  panelLight: "#10172a",

  primary: "#6366f1",
  primaryLight: "#818cf8",
  blue: "#3b82f6",

  success: "#22c55e",
  orange: "#f97316",

  text: "#f8fafc",
  textSoft: "#94a3b8",
  textMuted: "#64748b",

  border: "rgba(148,163,184,.14)",
};

/* =========================================================
   DASHBOARD
========================================================= */

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [projects, setProjects] =
    useState([]);

  const [freeProjects, setFreeProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =======================================================
     LOAD PROJECTS
  ======================================================= */

  const fetchProjects = async () => {
    try {
      const res =
        await api.get("/projects");

      setProjects(res.data);
    } catch (err) {
      console.error(
        "Dashboard load failed",
        err
      );
    }
  };

  /* =======================================================
     LOAD FREE PROJECTS
  ======================================================= */

  const fetchFreeProjects = async () => {
    try {
      const res =
        await api.get(
          "/free-projects"
        );

      setFreeProjects(
        res.data
      );
    } catch (err) {
      console.error(
        "Free projects load failed",
        err
      );
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  const loadDashboard = async () => {
    try {
      setLoading(true);

      await Promise.all([
        fetchProjects(),
        fetchFreeProjects(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  /* =======================================================
     EXISTING LOGIC
  ======================================================= */

  const totalProjects =
    projects.length;

  const paidProjects =
    projects.filter(
      (p) =>
        Number(p.price) > 0
    ).length;

  const totalFreeProjects =
    freeProjects.length;

  const githubProjects =
    freeProjects.filter(
      (p) =>
        p.githubLink &&
        p.githubLink.trim() !== ""
    ).length;

  const videoProjects =
    freeProjects.filter(
      (p) =>
        p.videoUrl &&
        p.videoUrl.trim() !== ""
    ).length;

  /* =======================================================
     UI
  ======================================================= */

  return (
    <Box
      sx={{
        minHeight: "100vh",

        color: COLORS.text,

        background: `
          radial-gradient(
            circle at 10% 0%,
            rgba(79,70,229,.15),
            transparent 30%
          ),
          radial-gradient(
            circle at 90% 10%,
            rgba(37,99,235,.10),
            transparent 30%
          ),
          radial-gradient(
            circle at 50% 80%,
            rgba(99,102,241,.05),
            transparent 35%
          ),
          ${COLORS.page}
        `,

        px: {
          xs: 1.5,
          sm: 2,
          md: 4,
        },

        py: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 1500,
          mx: "auto",
        }}
      >
        {/* =================================================
            HERO
        ================================================= */}

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",

            mb: {
              xs: 2.5,
              md: 4,
            },

            p: {
              xs: 2.5,
              sm: 3.5,
              md: 5,
            },

            borderRadius: {
              xs: 3,
              md: 4,
            },

            color: "#fff",

            background: `
              radial-gradient(
                circle at 90% 15%,
                rgba(96,165,250,.30),
                transparent 32%
              ),
              radial-gradient(
                circle at 5% 100%,
                rgba(129,140,248,.20),
                transparent 30%
              ),
              linear-gradient(
                135deg,
                #312e81 0%,
                #4338ca 45%,
                #2563eb 100%
              )
            `,

            border:
              "1px solid rgba(129,140,248,.28)",

            boxShadow:
              "0 25px 70px rgba(37,99,235,.20)",
          }}
        >
          {/* Decorative circle */}

          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              right: -80,
              top: -100,
              background:
                "rgba(255,255,255,.07)",
              pointerEvents:
                "none",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 150,
              height: 150,
              borderRadius: "50%",
              right: 100,
              bottom: -100,
              background:
                "rgba(255,255,255,.05)",
              pointerEvents:
                "none",
            }}
          />

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={3}
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            justifyContent="space-between"
            sx={{
              position:
                "relative",
              zIndex: 1,
            }}
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  mb: 1.5,
                }}
              >
                <DashboardIcon
                  sx={{
                    fontSize: {
                      xs: 22,
                      sm: 26,
                    },
                  }}
                />

                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 950,
                    letterSpacing:
                      "2px",
                    color:
                      "#c7d2fe",
                  }}
                >
                  CODEX • ADMIN
                </Typography>
              </Stack>

              <Typography
                fontWeight={950}
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.7rem",
                    md: "3.4rem",
                  },

                  lineHeight: 1.05,

                  letterSpacing:
                    "-1.5px",
                }}
              >
                Welcome back,
                Admin 👋
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,

                  color:
                    "#dbeafe",

                  fontSize: {
                    xs: ".9rem",
                    sm: "1rem",
                  },

                  lineHeight: 1.7,

                  maxWidth: 650,
                }}
              >
                Here’s a quick snapshot
                of your CodeX platform.
                Manage projects, free
                resources and AKTU
                study material from
                one place.
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={
                loadDashboard
              }
              disabled={loading}
              startIcon={
                <RefreshIcon />
              }
              sx={{
                minHeight: 50,

                px: 2.5,

                borderRadius: 2.5,

                textTransform:
                  "none",

                fontWeight: 900,

                color:
                  "#1e1b4b",

                background:
                  "#fff",

                whiteSpace:
                  "nowrap",

                "&:hover": {
                  background:
                    "#eef2ff",
                },
              }}
            >
              {loading
                ? "Loading..."
                : "Refresh"}
            </Button>
          </Stack>
        </Paper>

        {/* =================================================
            MAIN STATS
        ================================================= */}

        <SectionHeading
          icon={<DashboardIcon />}
          title="Platform Overview"
          subtitle="Your CodeX project statistics"
        />

        <Grid
          container
          spacing={{
            xs: 1.5,
            sm: 2,
            md: 2.5,
          }}
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        >
          <Grid
            item
            xs={6}
            md={4}
          >
            <StatCard
              icon={<FolderIcon />}
              title="Total Projects"
              value={
                totalProjects
              }
              subtitle="All projects available"
              iconColor="#818cf8"
              iconBg="rgba(99,102,241,.12)"
            />
          </Grid>

          <Grid
            item
            xs={6}
            md={4}
          >
            <StatCard
              icon={
                <CardGiftcardIcon />
              }
              title="Free Projects"
              value={
                totalFreeProjects
              }
              subtitle="Zero-cost learning resources"
              iconColor="#4ade80"
              iconBg="rgba(34,197,94,.10)"
            />
          </Grid>

          <Grid
            item
            xs={6}
            md={4}
          >
            <StatCard
              icon={
                <PaymentsIcon />
              }
              title="Paid Projects"
              value={
                paidProjects
              }
              subtitle="Revenue-generating projects"
              iconColor="#fb923c"
              iconBg="rgba(249,115,22,.10)"
            />
          </Grid>
        </Grid>

        {/* =================================================
            FREE PROJECT OVERVIEW
        ================================================= */}

        <SectionHeading
          icon={
            <CardGiftcardIcon />
          }
          title="Free Projects Overview"
          subtitle="Monitor your free learning resources"
        />

        <Grid
          container
          spacing={{
            xs: 1.5,
            sm: 2,
            md: 2.5,
          }}
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
          >
            <InfoCard
              icon={
                <CardGiftcardIcon />
              }
              title="Total Free Projects"
              value={
                totalFreeProjects
              }
              subtitle="All free resources"
              color="#4ade80"
              background="rgba(34,197,94,.10)"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
          >
            <InfoCard
              icon={
                <GitHubIcon />
              }
              title="GitHub Linked"
              value={
                githubProjects
              }
              subtitle="Open-source repositories"
              color="#c4b5fd"
              background="rgba(139,92,246,.10)"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
          >
            <InfoCard
              icon={
                <VideoLibraryIcon />
              }
              title="With Video Preview"
              value={
                videoProjects
              }
              subtitle="Demo-enabled projects"
              color="#60a5fa"
              background="rgba(59,130,246,.10)"
            />
          </Grid>
        </Grid>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <SectionHeading
          icon={<ArrowForwardIcon />}
          title="Quick Actions"
          subtitle="Manage your CodeX content"
        />

        <Grid
          container
          spacing={{
            xs: 1.5,
            sm: 2,
            md: 2.5,
          }}
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        >
          {/* ADD PROJECT */}

          <Grid
            item
            xs={12}
            sm={6}
            lg={3}
          >
            <ActionCard
              icon={<AddIcon />}
              iconColor="#818cf8"
              iconBg="rgba(99,102,241,.12)"
              title="Add New Project"
              description="Publish a new paid project."
              buttonText="Add Project"
              buttonColor="primary"
              onClick={() =>
                navigate(
                  "/admin/projects/add"
                )
              }
            />
          </Grid>

          {/* MANAGE PROJECTS */}

          <Grid
            item
            xs={12}
            sm={6}
            lg={3}
          >
            <ActionCard
              icon={<BuildIcon />}
              iconColor="#60a5fa"
              iconBg="rgba(59,130,246,.10)"
              title="Manage Projects"
              description="Edit or remove paid projects."
              buttonText="Manage Projects"
              buttonColor="blue"
              onClick={() =>
                navigate(
                  "/admin/projects"
                )
              }
            />
          </Grid>

          {/* FREE PROJECTS */}

          <Grid
            item
            xs={12}
            sm={6}
            lg={3}
          >
            <ActionCard
              icon={
                <CardGiftcardIcon />
              }
              iconColor="#4ade80"
              iconBg="rgba(34,197,94,.10)"
              title="Free Projects"
              description="Control free open-source projects."
              buttonText="Manage Free"
              buttonColor="success"
              secondaryText="Add Free"
              onClick={() =>
                navigate(
                  "/admin/free-projects"
                )
              }
              onSecondaryClick={() =>
                navigate(
                  "/admin/free-projects/add"
                )
              }
            />
          </Grid>

          {/* AKTU */}

          <Grid
            item
            xs={12}
            sm={6}
            lg={3}
          >
            <ActionCard
              icon={<SchoolIcon />}
              iconColor="#fb923c"
              iconBg="rgba(249,115,22,.10)"
              title="AKTU Study"
              description="Manage syllabus, notes, PYQs, Quantum and question answers."
              buttonText="Manage AKTU"
              buttonColor="orange"
              onClick={() =>
                navigate(
                  "/admin/aktu"
                )
              }
            />
          </Grid>
        </Grid>

        {/* =================================================
            ABOUT ADMIN
        ================================================= */}

        <SectionHeading
          icon={<PersonIcon />}
          title="About Admin"
          subtitle="CodeX platform administrator"
        />

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            borderRadius: {
              xs: 3,
              md: 4,
            },

            color:
              COLORS.text,

            background:
              "linear-gradient(145deg,#0d1428,#080d1b)",

            border:
              `1px solid ${COLORS.border}`,

            boxShadow:
              "0 20px 60px rgba(0,0,0,.28)",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={{
              xs: 2.5,
              md: 4,
            }}
            alignItems={{
              xs: "center",
              md: "flex-start",
            }}
          >
            {/* AVATAR */}

            <Avatar
              sx={{
                width: {
                  xs: 90,
                  sm: 110,
                  md: 125,
                },

                height: {
                  xs: 90,
                  sm: 110,
                  md: 125,
                },

                flexShrink: 0,

                fontSize: {
                  xs: 30,
                  sm: 38,
                  md: 44,
                },

                fontWeight: 950,

                color: "#fff",

                background:
                  "linear-gradient(135deg,#4f46e5,#2563eb)",

                border:
                  "3px solid rgba(129,140,248,.25)",

                boxShadow:
                  "0 15px 35px rgba(79,70,229,.25)",
              }}
            >
              TS
            </Avatar>

            {/* CONTENT */}

            <Box
              sx={{
                flex: 1,
                width: "100%",
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <Typography
                variant="h5"
                fontWeight={950}
              >
                Tufail Sarovar
              </Typography>

              <Typography
                sx={{
                  mt: .5,

                  color:
                    COLORS.primaryLight,

                  fontWeight: 750,
                }}
              >
                Full-Stack Developer —
                CodeX
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 2,

                  color:
                    COLORS.textSoft,

                  lineHeight: 1.8,

                  maxWidth: 850,

                  mx: {
                    xs: "auto",
                    md: 0,
                  },
                }}
              >
                I design, build, and
                maintain real-world
                college projects for
                students using modern
                web technologies. This
                admin dashboard helps
                manage pricing, quality,
                and content across CodeX.
              </Typography>

              <Divider
                sx={{
                  my: 2.5,
                  borderColor:
                    COLORS.border,
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                justifyContent={{
                  xs: "center",
                  md: "flex-start",
                }}
              >
                <AdminChip
                  icon={
                    <CodeIcon />
                  }
                  label="MERN Stack"
                />

                <AdminChip
                  icon={
                    <BuildIcon />
                  }
                  label="Admin Systems"
                />

                <AdminChip
                  icon={
                    <SecurityIcon />
                  }
                  label="Secure Payments"
                />

                <AdminChip
                  icon={
                    <ArchitectureIcon />
                  }
                  label="Project Architecture"
                />

                <AdminChip
                  icon={
                    <CodeIcon />
                  }
                  label="React + Node.js"
                />
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

/* =========================================================
   SECTION HEADING
========================================================= */

const SectionHeading = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <Stack
      direction="row"
      spacing={1.3}
      alignItems="center"
      sx={{
        mb: 1.8,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,

          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",

          flexShrink: 0,

          borderRadius: 2,

          color:
            COLORS.primaryLight,

          background:
            "rgba(99,102,241,.10)",

          border:
            "1px solid rgba(99,102,241,.16)",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          fontWeight={950}
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "1.15rem",
            },
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color:
              COLORS.textMuted,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  iconColor,
  iconBg,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",

        p: {
          xs: 1.7,
          sm: 2.3,
          md: 2.8,
        },

        borderRadius: {
          xs: 2.5,
          sm: 3,
        },

        color:
          COLORS.text,

        background:
          "linear-gradient(145deg,#10172a,#090e1d)",

        border:
          `1px solid ${COLORS.border}`,

        boxShadow:
          "0 12px 35px rgba(0,0,0,.28)",

        transition:
          "all .25s ease",

        "&:hover": {
          transform:
            "translateY(-4px)",

          borderColor:
            "rgba(99,102,241,.35)",

          boxShadow:
            "0 20px 45px rgba(0,0,0,.4)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={{
          xs: 1.2,
          sm: 1.7,
        }}
        alignItems="center"
      >
        <Box
          sx={{
            width: {
              xs: 44,
              sm: 52,
            },

            height: {
              xs: 44,
              sm: 52,
            },

            display: "flex",
            alignItems: "center",
            justifyContent:
              "center",

            flexShrink: 0,

            borderRadius: 2.5,

            color:
              iconColor,

            background:
              iconBg,
          }}
        >
          {icon}
        </Box>

        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              color:
                COLORS.textMuted,

              fontSize: {
                xs: ".7rem",
                sm: ".8rem",
              },
            }}
          >
            {title}
          </Typography>

          <Typography
            fontWeight={950}
            sx={{
              mt: .3,

              fontSize: {
                xs: "1.5rem",
                sm: "1.9rem",
                md: "2.2rem",
              },

              lineHeight: 1,
            }}
          >
            {value}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },

              mt: .5,

              color:
                COLORS.textMuted,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

/* =========================================================
   INFO CARD
========================================================= */

const InfoCard = ({
  icon,
  title,
  value,
  subtitle,
  color,
  background,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",

        p: {
          xs: 2,
          sm: 2.5,
        },

        borderRadius: 3,

        color:
          COLORS.text,

        background:
          "linear-gradient(145deg,#10172a,#090e1d)",

        border:
          `1px solid ${COLORS.border}`,

        boxShadow:
          "0 12px 35px rgba(0,0,0,.25)",

        transition:
          "all .25s ease",

        "&:hover": {
          transform:
            "translateY(-4px)",

          borderColor:
            "rgba(99,102,241,.3)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="center"
      >
        <Box
          sx={{
            width: 48,
            height: 48,

            display: "flex",
            alignItems: "center",
            justifyContent:
              "center",

            flexShrink: 0,

            borderRadius: 2.5,

            color,

            background,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography
            variant="body2"
            sx={{
              color:
                COLORS.textMuted,
            }}
          >
            {title}
          </Typography>

          <Typography
            fontWeight={950}
            sx={{
              mt: .2,

              fontSize: {
                xs: "1.6rem",
                sm: "1.9rem",
              },
            }}
          >
            {value}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color:
                COLORS.textMuted,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

/* =========================================================
   ACTION CARD
========================================================= */

const ActionCard = ({
  icon,
  iconColor,
  iconBg,
  title,
  description,
  buttonText,
  buttonColor,
  secondaryText,
  onClick,
  onSecondaryClick,
}) => {
  const getButtonStyles =
    () => {
      if (
        buttonColor ===
        "success"
      ) {
        return {
          background:
            "linear-gradient(135deg,#16a34a,#15803d)",

          "&:hover": {
            background:
              "linear-gradient(135deg,#15803d,#166534)",
          },
        };
      }

      if (
        buttonColor ===
        "orange"
      ) {
        return {
          background:
            "linear-gradient(135deg,#f97316,#ea580c)",

          "&:hover": {
            background:
              "linear-gradient(135deg,#ea580c,#c2410c)",
          },
        };
      }

      if (
        buttonColor ===
        "blue"
      ) {
        return {
          background:
            "linear-gradient(135deg,#3b82f6,#2563eb)",

          "&:hover": {
            background:
              "linear-gradient(135deg,#2563eb,#1d4ed8)",
          },
        };
      }

      return {
        background:
          "linear-gradient(135deg,#6366f1,#4f46e5)",

        "&:hover": {
          background:
            "linear-gradient(135deg,#4f46e5,#4338ca)",
        },
      };
    };

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",

        p: {
          xs: 2,
          sm: 2.5,
        },

        borderRadius: 3,

        display: "flex",
        flexDirection:
          "column",

        color:
          COLORS.text,

        background:
          "linear-gradient(145deg,#0d1428,#080d1b)",

        border:
          `1px solid ${COLORS.border}`,

        boxShadow:
          "0 12px 35px rgba(0,0,0,.25)",

        transition:
          "all .25s ease",

        "&:hover": {
          transform:
            "translateY(-5px)",

          borderColor:
            "rgba(99,102,241,.35)",

          boxShadow:
            "0 20px 45px rgba(0,0,0,.38)",
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,

          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",

          borderRadius: 2.5,

          color:
            iconColor,

          background:
            iconBg,

          mb: 2,
        }}
      >
        {icon}
      </Box>

      <Typography
        fontWeight={950}
        sx={{
          fontSize: "1.05rem",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mt: .8,
          mb: 2.5,

          color:
            COLORS.textSoft,

          lineHeight: 1.6,

          minHeight: {
            xs: "auto",
            sm: 48,
          },
        }}
      >
        {description}
      </Typography>

      <Box
        sx={{
          mt: "auto",
        }}
      >
        {secondaryText ? (
          <Stack
            direction="row"
            spacing={1}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={
                onSecondaryClick
              }
              startIcon={
                <AddIcon />
              }
              sx={{
                borderRadius: 2,
                textTransform:
                  "none",
                fontWeight: 850,

                background:
                  "rgba(99,102,241,.15)",

                color:
                  "#c7d2fe",

                border:
                  "1px solid rgba(99,102,241,.2)",

                "&:hover": {
                  background:
                    "rgba(99,102,241,.25)",
                },
              }}
            >
              {secondaryText}
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={onClick}
              sx={{
                borderRadius: 2,
                textTransform:
                  "none",
                fontWeight: 850,
                ...getButtonStyles(),
              }}
            >
              {buttonText}
            </Button>
          </Stack>
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={onClick}
            endIcon={
              <ArrowForwardIcon />
            }
            sx={{
              minHeight: 44,

              borderRadius: 2,

              textTransform:
                "none",

              fontWeight: 900,

              ...getButtonStyles(),
            }}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

/* =========================================================
   ADMIN CHIP
========================================================= */

const AdminChip = ({
  icon,
  label,
}) => {
  return (
    <Chip
      icon={icon}
      label={label}
      sx={{
        color:
          "#cbd5e1",

        background:
          "rgba(99,102,241,.08)",

        border:
          "1px solid rgba(99,102,241,.16)",

        fontWeight: 750,

        "& .MuiChip-icon": {
          color:
            COLORS.primaryLight,
        },
      }}
    />
  );
};

export default AdminDashboard;