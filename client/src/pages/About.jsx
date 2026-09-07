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
import EmailIcon from "@mui/icons-material/Email";
import StorageIcon from "@mui/icons-material/Storage";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";
import LayersIcon from "@mui/icons-material/Layers";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const About = () => {
  const features = [
    {
      icon: <CodeIcon />,
      title: "Ready-to-Use Projects",
      text: "Complete academic projects with organized source code and practical implementation.",
    },
    {
      icon: <MenuBookIcon />,
      title: "Documentation",
      text: "Project documentation helps students understand installation, functionality and implementation.",
    },
    {
      icon: <SchoolIcon />,
      title: "Student Focused",
      text: "Designed especially for college students working on academic and final-year projects.",
    },
    {
      icon: <PaymentIcon />,
      title: "Online Payments",
      text: "Integrated payment flow allows users to securely purchase digital project bundles.",
    },
    {
      icon: <CloudDownloadIcon />,
      title: "Digital Delivery",
      text: "Purchased project files are delivered digitally without any physical shipping.",
    },
    {
      icon: <SecurityIcon />,
      title: "Secure Access",
      text: "Authentication and protected access help keep purchased project resources secure.",
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
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 8% 5%, rgba(99,102,241,.16), transparent 30%), radial-gradient(circle at 92% 12%, rgba(249,115,22,.09), transparent 28%)",
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
        {/* Hero */}
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
          <Chip
            icon={
              <CodeIcon
                sx={{
                  fontSize:
                    "15px !important",
                }}
              />
            }
            label="ABOUT CODEX"
            sx={{
              mb: 1.8,
              height: 30,
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
              letterSpacing: 1,
            }}
          />

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
              WebkitTextFillColor:
                "transparent",
            }}
          >
            Build. Learn. Submit.
          </Typography>

          <Typography
            sx={{
              mt: 1.5,
              color: "#94a3b8",
              fontSize: {
                xs: ".78rem",
                sm: ".95rem",
                md: "1.05rem",
              },
              lineHeight: 1.7,
              maxWidth: 720,
              mx: "auto",
            }}
          >
            CodeX is a digital marketplace created
            to help college students discover,
            understand and work with ready-to-use
            academic software projects.
          </Typography>
        </Box>

        {/* About cards */}
        <Grid
          container
          spacing={{
            xs: 1.5,
            sm: 2.5,
            md: 3,
          }}
          sx={{ mb: 7 }}
        >
          <Grid item xs={12} md={7}>
            <Paper
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
                bgcolor:
                  "rgba(15,23,42,.78)",
                border:
                  "1px solid rgba(148,163,184,.14)",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background:
                    "rgba(99,102,241,.08)",
                  filter: "blur(25px)",
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor:
                      "rgba(99,102,241,.12)",
                    color: "#818cf8",
                  }}
                >
                  <RocketLaunchIcon
                    sx={{ fontSize: 20 }}
                  />
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
                CodeX is a digital store focused on
                college project selling. It is built
                as a MERN full-stack application where
                students can purchase ready-to-use
                academic projects with source code,
                documentation and presentation files.
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
                The platform itself demonstrates
                real-world software development
                concepts including authentication,
                project management, payment processing,
                protected digital downloads and email
                notifications.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper
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
                bgcolor:
                  "rgba(15,23,42,.78)",
                border:
                  "1px solid rgba(148,163,184,.14)",
                color: "#fff",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor:
                      "rgba(249,115,22,.1)",
                    color: "#fb923c",
                  }}
                >
                  <VerifiedIcon
                    sx={{ fontSize: 20 }}
                  />
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
                  What You Get
                </Typography>
              </Stack>

              <Stack spacing={1.2}>
                {[
                  "Complete source code",
                  "Project documentation",
                  "Presentation / PPT",
                  "Setup instructions",
                  "Digital project delivery",
                  "Learning-friendly structure",
                ].map((item) => (
                  <Stack
                    key={item}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <Box
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
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Features */}
        <Box sx={{ mb: 8 }}>
          <Box
            sx={{
              textAlign: "center",
              mb: 3,
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
              Everything designed around the
              student project experience.
            </Typography>
          </Box>

          <Grid
            container
            spacing={{
              xs: 1.3,
              sm: 2,
              md: 2.5,
            }}
          >
            {features.map((feature) => (
              <Grid
                item
                xs={6}
                md={4}
                key={feature.title}
              >
                <Paper
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
                    bgcolor:
                      "rgba(15,23,42,.65)",
                    border:
                      "1px solid rgba(148,163,184,.12)",
                    color: "#fff",
                    transition:
                      "transform .25s ease, border-color .25s ease, background .25s ease",
                    "&:hover": {
                      transform:
                        "translateY(-5px)",
                      borderColor:
                        "rgba(129,140,248,.35)",
                      bgcolor:
                        "rgba(15,23,42,.9)",
                    },
                  }}
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
                      mb: 1.3,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor:
                        "rgba(99,102,241,.1)",
                      color: "#818cf8",
                    }}
                  >
                    {React.cloneElement(
                      feature.icon,
                      {
                        sx: {
                          fontSize: {
                            xs: 18,
                            sm: 21,
                          },
                        },
                      },
                    )}
                  </Box>

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
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How it works */}
        <Paper
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
            bgcolor:
              "rgba(15,23,42,.7)",
            border:
              "1px solid rgba(148,163,184,.14)",
            color: "#fff",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
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
              A simple digital project buying
              experience.
            </Typography>
          </Box>

          <Grid
            container
            spacing={{
              xs: 2,
              md: 3,
            }}
          >
            {[
              {
                number: "01",
                title: "Explore",
                text: "Browse projects and find one that matches your technology or academic requirements.",
              },
              {
                number: "02",
                title: "Choose",
                text: "Open project details, review the available files, technologies and pricing.",
              },
              {
                number: "03",
                title: "Purchase",
                text: "Complete the online payment through the integrated payment flow.",
              },
              {
                number: "04",
                title: "Receive",
                text: "Access your purchased digital project bundle and use it for learning or academic work.",
              },
            ].map((step) => (
              <Grid
                item
                xs={6}
                md={3}
                key={step.number}
              >
                <Box sx={{ textAlign: "center" }}>
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
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Technology stack */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 2.5 }}>
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
              Built using modern full-stack
              development technologies.
            </Typography>
          </Box>

          <Stack
            direction="row"
            justifyContent="center"
            flexWrap="wrap"
            gap={1}
          >
            {technologies.map((technology) => (
              <Chip
                key={technology}
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
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Student section */}
        <Grid
          container
          spacing={{
            xs: 1.5,
            md: 3,
          }}
          sx={{ mb: 7 }}
        >
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 2.2,
                  sm: 3,
                },
                height: "100%",
                borderRadius: 3.5,
                bgcolor:
                  "rgba(15,23,42,.75)",
                border:
                  "1px solid rgba(148,163,184,.14)",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1.2 }}
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
                  For Students
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
                Get complete projects with clean
                code, documentation and PPT.
                Explore real implementations to
                understand how frontend and
                full-stack applications are
                structured. Use the projects as a
                learning reference and for permitted
                academic or personal work.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 2.2,
                  sm: 3,
                },
                height: "100%",
                borderRadius: 3.5,
                bgcolor:
                  "rgba(15,23,42,.75)",
                border:
                  "1px solid rgba(148,163,184,.14)",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1.2 }}
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
                  Digital Experience
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
                CodeX brings project discovery,
                online purchasing and digital
                delivery together in one platform.
                The application demonstrates how a
                modern digital marketplace can handle
                users, projects, orders and protected
                resources.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Project purpose */}
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2.2,
              sm: 3,
              md: 4,
            },
            mb: 7,
            borderRadius: 4,
            bgcolor:
              "linear-gradient(135deg,rgba(30,41,59,.7),rgba(15,23,42,.8))",
            background:
              "linear-gradient(135deg,rgba(30,41,59,.7),rgba(15,23,42,.8))",
            border:
              "1px solid rgba(129,140,248,.15)",
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
          >
            <Box
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
            </Box>

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
                A Real-World MERN Project
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
                CodeX is itself designed as a
                practical full-stack college project,
                bringing together frontend UI, backend
                APIs, database operations,
                authentication, payments and digital
                resource management in one
                application.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Divider */}
        <Divider
          sx={{
            mb: 5,
            borderColor:
              "rgba(148,163,184,.14)",
          }}
        />

        {/* Terms */}
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

        {/* Bottom note */}
        <Box
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
            CodeX · Built as a MERN full-stack
            college project by Tufail Sarovar.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;