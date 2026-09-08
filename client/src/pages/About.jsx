import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import PaymentIcon from "@mui/icons-material/Payment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import StorageIcon from "@mui/icons-material/Storage";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";
import LayersIcon from "@mui/icons-material/Layers";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const About = () => {
  const features = [
    {
      icon: <CodeIcon />,
      title: "Ready-to-Use Projects",
      text: "Explore practical projects with organized resources, implementation files and useful materials.",
    },
    {
      icon: <MenuBookIcon />,
      title: "Complete Resources",
      text: "Access documentation, guides, presentations and supporting files in one convenient place.",
    },
    {
      icon: <LayersIcon />,
      title: "Multiple Categories",
      text: "Discover projects across different technologies, development stacks, industries and use cases.",
    },
    {
      icon: <PaymentIcon />,
      title: "Secure Payments",
      text: "Purchase digital resources through a secure, simple and convenient online payment experience.",
    },
    {
      icon: <CloudDownloadIcon />,
      title: "Digital Delivery",
      text: "Access purchased digital resources without physical shipping or unnecessary waiting.",
    },
    {
      icon: <SecurityIcon />,
      title: "Protected Access",
      text: "Authentication and protected access help keep your account and purchased resources secure.",
    },
  ];

  const technologies = [
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "Material UI",
    "Razorpay",
    "REST API",
    "JWT Authentication",
  ];

  const steps = [
    {
      number: "01",
      title: "Explore",
      text: "Browse projects and resources by category, technology and available options.",
    },
    {
      number: "02",
      title: "Review",
      text: "Check project details, technologies, available resources and pricing before choosing.",
    },
    {
      number: "03",
      title: "Purchase",
      text: "Complete your purchase through the available secure online payment process.",
    },
    {
      number: "04",
      title: "Access",
      text: "Receive your digital resources and access the files included with your purchase.",
    },
  ];

  const getItems = [
    "Ready-to-use project resources",
    "Complete source code",
    "Documentation and guides",
    "Presentation / PPT resources",
    "Setup and usage information",
    "Secure digital delivery",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: {
          xs: 4,
          sm: 6,
          md: 8,
        },
        bgcolor: "#020617",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 8% 5%, rgba(99,102,241,.16), transparent 30%), radial-gradient(circle at 92% 12%, rgba(249,115,22,.09), transparent 28%)",
        }}
      />

      <MotionBox
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(99,102,241,.08)",
          filter: "blur(80px)",
          top: 180,
          left: -120,
          pointerEvents: "none",
        }}
      />

      <MotionBox
        animate={{
          x: [0, -25, 0],
          y: [0, -20, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "rgba(37,99,235,.07)",
          filter: "blur(90px)",
          top: 650,
          right: -150,
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
        {/* =====================================================
            HERO
        ===================================================== */}

        <Box
          sx={{
            textAlign: "center",
            maxWidth: 850,
            mx: "auto",
            mb: {
              xs: 5,
              sm: 7,
              md: 9,
            },
          }}
        >
          <MotionBox
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
            }}
          >
            <Chip
              icon={
                <CodeIcon
                  sx={{
                    fontSize: "15px !important",
                  }}
                />
              }
              label="ABOUT CODEX"
              sx={{
                mb: 1.8,
                height: 32,
                bgcolor: "rgba(99,102,241,.1)",
                color: "#a5b4fc",
                border: "1px solid rgba(129,140,248,.25)",
                fontSize: {
                  xs: 8,
                  sm: 10,
                },
                fontWeight: 900,
                letterSpacing: 1.2,
              }}
            />
          </MotionBox>

          <MotionBox
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
          >
            <Typography
              component="h1"
              fontWeight={950}
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.8rem",
                  md: "3.7rem",
                },
                lineHeight: 1.05,
                letterSpacing: "-1.5px",
                background:
                  "linear-gradient(90deg,#fff,#a5b4fc,#818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Discover. Build. Learn.
            </Typography>
          </MotionBox>

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
              duration: 0.8,
              delay: 0.2,
            }}
          >
            <Typography
              sx={{
                mt: 1.5,
                color: "#94a3b8",
                fontSize: {
                  xs: ".78rem",
                  sm: ".95rem",
                  md: "1.05rem",
                },
                lineHeight: 1.75,
                maxWidth: 760,
                mx: "auto",
              }}
            >
              CodeX is a digital project marketplace where you
              can discover, explore and access ready-to-use
              projects, source code, documentation,
              presentations and other useful digital resources
              — all in one place.
            </Typography>
          </MotionBox>
        </Box>

        {/* =====================================================
            ABOUT CARDS
        ===================================================== */}

        <Grid
          container
          spacing={{
            xs: 1.5,
            sm: 2.5,
            md: 3,
          }}
          sx={{
            mb: 7,
          }}
        >
          {/* WHAT IS CODEX */}

          <Grid item xs={12} md={7}>
            <MotionPaper
              initial={{
                opacity: 0,
                x: -45,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
              }}
              elevation={0}
              sx={{
                height: "100%",
                p: {
                  xs: 2.2,
                  sm: 3,
                  md: 4,
                },
                borderRadius: {
                  xs: 3,
                  md: 4,
                },
                bgcolor: "rgba(15,23,42,.78)",
                border: "1px solid rgba(148,163,184,.14)",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
                transition: "border-color .3s ease, box-shadow .3s ease",
                "&:hover": {
                  borderColor: "rgba(129,140,248,.4)",
                  boxShadow: "0 25px 70px rgba(0,0,0,.25)",
                },
              }}
            >
              <MotionBox
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                sx={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: "rgba(99,102,241,.08)",
                  filter: "blur(25px)",
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  mb: 1.5,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <MotionBox
                  whileHover={{
                    scale: 1.12,
                    rotate: 6,
                  }}
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(99,102,241,.12)",
                    color: "#818cf8",
                  }}
                >
                  <RocketLaunchIcon
                    sx={{
                      fontSize: 20,
                    }}
                  />
                </MotionBox>

                <Typography
                  fontWeight={900}
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      sm: "1.15rem",
                    },
                  }}
                >
                  What is CodeX?
                </Typography>
              </Stack>

              <Typography
                sx={{
                  color: "#94a3b8",
                  fontSize: {
                    xs: ".72rem",
                    sm: ".82rem",
                    md: ".9rem",
                  },
                  lineHeight: 1.8,
                  mb: 1.5,
                }}
              >
                CodeX is a digital marketplace built to make
                project discovery and digital resources simple,
                organized and accessible. Explore projects
                across different technologies, categories and
                use cases, with useful resources available
                through one platform.
              </Typography>

              <Typography
                sx={{
                  color: "#94a3b8",
                  fontSize: {
                    xs: ".72rem",
                    sm: ".82rem",
                    md: ".9rem",
                  },
                  lineHeight: 1.8,
                }}
              >
                From source code and documentation to
                presentations and other digital resources,
                CodeX brings valuable project materials together
                while providing a smooth experience for
                browsing, purchasing and accessing digital
                content.
              </Typography>
            </MotionPaper>
          </Grid>

          {/* WHAT YOU GET */}

          <Grid item xs={12} md={5}>
            <MotionPaper
              initial={{
                opacity: 0,
                x: 45,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              elevation={0}
              sx={{
                height: "100%",
                p: {
                  xs: 2.2,
                  sm: 3,
                  md: 4,
                },
                borderRadius: {
                  xs: 3,
                  md: 4,
                },
                bgcolor: "rgba(15,23,42,.78)",
                border: "1px solid rgba(148,163,184,.14)",
                color: "#fff",
                transition: "border-color .3s ease, box-shadow .3s ease",
                "&:hover": {
                  borderColor: "rgba(251,146,60,.35)",
                  boxShadow: "0 25px 70px rgba(0,0,0,.25)",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  mb: 2,
                }}
              >
                <MotionBox
                  whileHover={{
                    scale: 1.12,
                    rotate: -6,
                  }}
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(249,115,22,.1)",
                    color: "#fb923c",
                  }}
                >
                  <VerifiedIcon
                    sx={{
                      fontSize: 20,
                    }}
                  />
                </MotionBox>

                <Typography
                  fontWeight={900}
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      sm: "1.15rem",
                    },
                  }}
                >
                  What You Get
                </Typography>
              </Stack>

              <Stack spacing={1.2}>
                {getItems.map((item, index) => (
                  <MotionBox
                    key={item}
                    initial={{
                      opacity: 0,
                      x: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.07,
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <MotionBox
                        animate={{
                          scale: [1, 1.25, 1],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: index * 0.15,
                        }}
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          bgcolor: "#818cf8",
                          flexShrink: 0,
                          boxShadow:
                            "0 0 10px rgba(129,140,248,.5)",
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#cbd5e1",
                          fontSize: {
                            xs: ".68rem",
                            sm: ".78rem",
                          },
                        }}
                      >
                        {item}
                      </Typography>
                    </Stack>
                  </MotionBox>
                ))}
              </Stack>
            </MotionPaper>
          </Grid>
        </Grid>

        {/* =====================================================
            FEATURES
        ===================================================== */}

        <Box
          sx={{
            mb: 8,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: 3,
            }}
          >
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
              }}
            >
              <Typography
                fontWeight={950}
                sx={{
                  fontSize: {
                    xs: "1.45rem",
                    sm: "1.8rem",
                    md: "2.1rem",
                  },
                }}
              >
                Why CodeX?
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  color: "#64748b",
                  fontSize: {
                    xs: ".7rem",
                    sm: ".8rem",
                  },
                }}
              >
                Everything designed to make discovering and
                using digital projects easier.
              </Typography>
            </MotionBox>
          </Box>

          <Grid
            container
            spacing={{
              xs: 1.3,
              sm: 2,
              md: 2.5,
            }}
          >
            {features.map((feature, index) => (
              <Grid
                item
                xs={6}
                md={4}
                key={feature.title}
              >
                <MotionPaper
                  initial={{
                    opacity: 0,
                    y: 35,
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
                    duration: 0.55,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.015,
                  }}
                  elevation={0}
                  sx={{
                    height: "100%",
                    p: {
                      xs: 1.5,
                      sm: 2.2,
                      md: 2.7,
                    },
                    borderRadius: {
                      xs: 2.5,
                      sm: 3,
                    },
                    bgcolor: "rgba(15,23,42,.65)",
                    border: "1px solid rgba(148,163,184,.12)",
                    color: "#fff",
                    transition:
                      "border-color .3s ease, background .3s ease, box-shadow .3s ease",
                    "&:hover": {
                      borderColor: "rgba(129,140,248,.4)",
                      bgcolor: "rgba(15,23,42,.9)",
                      boxShadow:
                        "0 18px 45px rgba(0,0,0,.2)",
                    },
                  }}
                >
                  <MotionBox
                    whileHover={{
                      scale: 1.12,
                      rotate: 5,
                    }}
                    sx={{
                      width: {
                        xs: 34,
                        sm: 42,
                      },
                      height: {
                        xs: 34,
                        sm: 42,
                      },
                      mb: 1.3,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(99,102,241,.1)",
                      color: "#818cf8",
                    }}
                  >
                    {React.cloneElement(feature.icon, {
                      sx: {
                        fontSize: {
                          xs: 18,
                          sm: 21,
                        },
                      },
                    })}
                  </MotionBox>

                  <Typography
                    fontWeight={850}
                    sx={{
                      fontSize: {
                        xs: ".72rem",
                        sm: ".85rem",
                      },
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.7,
                      color: "#64748b",
                      fontSize: {
                        xs: ".6rem",
                        sm: ".7rem",
                        md: ".75rem",
                      },
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.text}
                  </Typography>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* =====================================================
            HOW CODEX WORKS
        ===================================================== */}

        <MotionPaper
          initial={{
            opacity: 0,
            y: 35,
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
            duration: 0.7,
          }}
          elevation={0}
          sx={{
            p: {
              xs: 2.2,
              sm: 3,
              md: 4,
            },
            mb: 7,
            borderRadius: {
              xs: 3,
              md: 4,
            },
            bgcolor: "rgba(15,23,42,.7)",
            border: "1px solid rgba(148,163,184,.14)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <MotionBox
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "35%",
              height: 1,
              background:
                "linear-gradient(90deg,transparent,#818cf8,transparent)",
              opacity: 0.7,
            }}
          />

          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
            <Typography
              fontWeight={950}
              sx={{
                fontSize: {
                  xs: "1.4rem",
                  sm: "1.8rem",
                },
              }}
            >
              How CodeX Works
            </Typography>

            <Typography
              sx={{
                mt: 0.7,
                color: "#64748b",
                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
              }}
            >
              A simple journey from discovering a project to
              accessing the resources you need.
            </Typography>
          </Box>

          <Grid
            container
            spacing={{
              xs: 2,
              md: 3,
            }}
          >
            {steps.map((step, index) => (
              <Grid
                item
                xs={6}
                md={3}
                key={step.number}
              >
                <MotionBox
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  sx={{
                    textAlign: "center",
                    p: {
                      xs: 1,
                      sm: 1.5,
                    },
                    borderRadius: 3,
                    transition:
                      "background .3s ease",
                    "&:hover": {
                      background:
                        "rgba(99,102,241,.05)",
                    },
                  }}
                >
                  <Typography
                    fontWeight={950}
                    sx={{
                      fontSize: {
                        xs: "1.4rem",
                        sm: "1.8rem",
                      },
                      color: "#6366f1",
                      opacity: 0.9,
                    }}
                  >
                    {step.number}
                  </Typography>

                  <Typography
                    fontWeight={850}
                    sx={{
                      mt: 0.4,
                      fontSize: {
                        xs: ".75rem",
                        sm: ".9rem",
                      },
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.6,
                      color: "#64748b",
                      fontSize: {
                        xs: ".58rem",
                        sm: ".68rem",
                      },
                      lineHeight: 1.55,
                    }}
                  >
                    {step.text}
                  </Typography>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </MotionPaper>

        {/* =====================================================
            TECHNOLOGY STACK
        ===================================================== */}

        <Box
          sx={{
            mb: 8,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: 2.5,
            }}
          >
            <Typography
              fontWeight={950}
              sx={{
                fontSize: {
                  xs: "1.4rem",
                  sm: "1.8rem",
                },
              }}
            >
              Technology Behind CodeX
            </Typography>

            <Typography
              sx={{
                mt: 0.7,
                color: "#64748b",
                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
              }}
            >
              Built with modern technologies for a reliable
              digital marketplace experience.
            </Typography>
          </Box>

          <Stack
            direction="row"
            justifyContent="center"
            flexWrap="wrap"
            gap={1}
          >
            {technologies.map((technology, index) => (
              <MotionBox
                key={technology}
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                }}
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
              >
                <Chip
                  icon={
                    <LayersIcon
                      sx={{
                        fontSize:
                          "15px !important",
                      }}
                    />
                  }
                  label={technology}
                  sx={{
                    height: {
                      xs: 27,
                      sm: 32,
                    },
                    bgcolor:
                      "rgba(15,23,42,.75)",
                    color: "#cbd5e1",
                    border:
                      "1px solid rgba(148,163,184,.15)",
                    fontSize: {
                      xs: ".58rem",
                      sm: ".68rem",
                    },
                    fontWeight: 700,
                    transition:
                      "border-color .25s ease",
                    "&:hover": {
                      borderColor:
                        "rgba(129,140,248,.5)",
                    },
                  }}
                />
              </MotionBox>
            ))}
          </Stack>
        </Box>

        {/* =====================================================
            AUDIENCE + DIGITAL EXPERIENCE
        ===================================================== */}

        <Grid
          container
          spacing={{
            xs: 1.5,
            md: 3,
          }}
          sx={{
            mb: 7,
          }}
        >
          <Grid item xs={12} md={6}>
            <MotionPaper
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              whileHover={{
                y: -5,
              }}
              elevation={0}
              sx={{
                p: {
                  xs: 2.2,
                  sm: 3,
                },
                height: "100%",
                borderRadius: 3.5,
                bgcolor: "rgba(15,23,42,.75)",
                border:
                  "1px solid rgba(148,163,184,.14)",
                transition:
                  "border-color .3s ease, box-shadow .3s ease",
                "&:hover": {
                  borderColor:
                    "rgba(129,140,248,.4)",
                  boxShadow:
                    "0 20px 55px rgba(0,0,0,.2)",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  mb: 1.2,
                }}
              >
                <SchoolIcon
                  sx={{
                    color: "#818cf8",
                  }}
                />

                <Typography
                  fontWeight={900}
                  sx={{
                    fontSize: {
                      xs: ".95rem",
                      sm: "1.1rem",
                    },
                  }}
                >
                  For Students & Learners
                </Typography>
              </Stack>

              <Typography
                sx={{
                  color: "#94a3b8",
                  fontSize: {
                    xs: ".68rem",
                    sm: ".78rem",
                  },
                  lineHeight: 1.75,
                }}
              >
                Discover complete projects and useful
                resources that can help you explore real
                implementations, understand development
                concepts and build practical knowledge.
                Use available resources responsibly for
                learning, permitted academic work or
                personal development.
              </Typography>
            </MotionPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <MotionPaper
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              whileHover={{
                y: -5,
              }}
              elevation={0}
              sx={{
                p: {
                  xs: 2.2,
                  sm: 3,
                },
                height: "100%",
                borderRadius: 3.5,
                bgcolor: "rgba(15,23,42,.75)",
                border:
                  "1px solid rgba(148,163,184,.14)",
                transition:
                  "border-color .3s ease, box-shadow .3s ease",
                "&:hover": {
                  borderColor:
                    "rgba(251,146,60,.4)",
                  boxShadow:
                    "0 20px 55px rgba(0,0,0,.2)",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  mb: 1.2,
                }}
              >
                <SupportAgentIcon
                  sx={{
                    color: "#fb923c",
                  }}
                />

                <Typography
                  fontWeight={900}
                  sx={{
                    fontSize: {
                      xs: ".95rem",
                      sm: "1.1rem",
                    },
                  }}
                >
                  Simple Digital Experience
                </Typography>
              </Stack>

              <Typography
                sx={{
                  color: "#94a3b8",
                  fontSize: {
                    xs: ".68rem",
                    sm: ".78rem",
                  },
                  lineHeight: 1.75,
                }}
              >
                CodeX brings project discovery, online
                purchasing and digital delivery together
                in one platform. The experience is designed
                to make it easier to find useful resources,
                understand what is included and access
                digital content efficiently.
              </Typography>
            </MotionPaper>
          </Grid>
        </Grid>

        {/* =====================================================
            PLATFORM PURPOSE
        ===================================================== */}

        <MotionPaper
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
          }}
          elevation={0}
          sx={{
            p: {
              xs: 2.2,
              sm: 3,
              md: 4,
            },
            mb: 7,
            borderRadius: 4,
            background:
              "linear-gradient(135deg,rgba(30,41,59,.7),rgba(15,23,42,.8))",
            border:
              "1px solid rgba(129,140,248,.15)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <MotionBox
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              border:
                "1px solid rgba(129,140,248,.08)",
              right: -80,
              top: -80,
            }}
          />

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
          >
            <MotionBox
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor:
                  "rgba(99,102,241,.12)",
                color: "#818cf8",
                flexShrink: 0,
              }}
            >
              <StorageIcon />
            </MotionBox>

            <Box>
              <Typography
                fontWeight={900}
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                  },
                }}
              >
                Built for a Modern Digital Marketplace
              </Typography>

              <Typography
                sx={{
                  mt: 0.6,
                  color: "#94a3b8",
                  fontSize: {
                    xs: ".68rem",
                    sm: ".78rem",
                  },
                  lineHeight: 1.7,
                }}
              >
                CodeX brings together a modern frontend,
                backend APIs, database operations,
                authentication, payment processing and
                digital resource management to create a
                complete marketplace experience.
              </Typography>
            </Box>
          </Stack>
        </MotionPaper>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <Divider
          sx={{
            mb: 5,
            borderColor:
              "rgba(148,163,184,.14)",
          }}
        />

        {/* =====================================================
            TERMS
        ===================================================== */}

        <Box>
          <Typography
            variant="h5"
            fontWeight={950}
            sx={{
              mb: 2.5,
              fontSize: {
                xs: "1.3rem",
                sm: "1.7rem",
              },
            }}
          >
            Terms & Conditions
          </Typography>

          <Stack spacing={2}>
            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
                lineHeight: 1.75,
              }}
            >
              <b>1. Digital Products Only</b>
              <br />
              CodeX sells digital coding projects,
              source code, documentation,
              presentations and related files. No
              physical products are shipped.
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
                lineHeight: 1.75,
              }}
            >
              <b>2. No Refunds</b>
              <br />
              All purchases are final. A refund may
              only be considered if a purchased
              download does not work and the issue
              cannot be resolved.
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
                lineHeight: 1.75,
              }}
            >
              <b>3. Usage Rights</b>
              <br />
              Purchased projects may be used for
              learning, permitted college work or
              personal use. Reselling, redistributing
              or sharing purchased files is not
              permitted.
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
                lineHeight: 1.75,
              }}
            >
              <b>4. Payments</b>
              <br />
              Payments are completed online through
              the available payment system. Project
              prices may change at any time.
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
                lineHeight: 1.75,
              }}
            >
              <b>5. Account Safety</b>
              <br />
              Users are responsible for protecting
              their account credentials and should
              never share their password with others.
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
                lineHeight: 1.75,
              }}
            >
              <b>6. Intellectual Property</b>
              <br />
              CodeX content, designs and platform
              materials are protected. Unauthorized
              copying, redistribution or commercial
              resale of purchased resources is not
              permitted.
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
                lineHeight: 1.75,
              }}
            >
              <b>7. Liability</b>
              <br />
              CodeX is not responsible for problems,
              errors or damage resulting from the use
              or modification of purchased source
              code.
            </Typography>

            <Typography
              sx={{
                color: "#94a3b8",
                fontSize: {
                  xs: ".68rem",
                  sm: ".78rem",
                },
                lineHeight: 1.75,
              }}
            >
              <b>8. Updates</b>
              <br />
              CodeX may update these terms when
              necessary. Continued use of the
              platform indicates acceptance of the
              updated terms.
            </Typography>
          </Stack>
        </Box>

        {/* =====================================================
            BOTTOM NOTE
        ===================================================== */}

        <MotionBox
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
          }}
          sx={{
            mt: 5,
            p: {
              xs: 1.5,
              sm: 2,
            },
            borderRadius: 3,
            bgcolor:
              "rgba(15,23,42,.5)",
            border:
              "1px solid rgba(148,163,184,.1)",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#64748b",
              fontSize: {
                xs: ".58rem",
                sm: ".68rem",
              },
            }}
          >
            CodeX · A modern digital marketplace for
            projects and resources.
          </Typography>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default About;