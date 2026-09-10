import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
  Button,
  Paper,
  Checkbox,
  CircularProgress,
  Divider,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import CodeIcon from "@mui/icons-material/Code";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { motion } from "framer-motion";
import api from "../../api/axios";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const ProjectDetails = () => {
  const [project, setProject] = useState(() => {
    try {
      const cached = localStorage.getItem(`codex_project_${id}`);

      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(() => {
    try {
      return !localStorage.getItem(`codex_project_${id}`);
    } catch {
      return true;
    }
  });

  const [error, setError] = useState("");

  const [selectedItems, setSelectedItems] = useState({
    sourceCode: true,
    ppt: true,
    documentation: true,
  });

  const token = localStorage.getItem("codex_token");

  useEffect(() => {
    let mounted = true;

    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);

        if (!mounted) return;

        const freshProject = res.data;

        setProject(freshProject);
        setError("");
        setLoading(false);

        try {
          localStorage.setItem(
            `codex_project_${id}`,
            JSON.stringify(freshProject),
          );
        } catch (cacheError) {
          console.error("Project cache error:", cacheError);
        }
      } catch (err) {
        console.error("Project details error:", err);

        if (mounted) {
          if (!project) {
            setError("Failed to load project");
          }

          setLoading(false);
        }
      }
    };

    fetchProject();

    return () => {
      mounted = false;
    };
  }, [id]);

  const calculatePrice = () => {
    if (!project) return 0;

    let total = 0;

    if (selectedItems.sourceCode && project.files?.sourceCode) {
      total += project.itemPrices?.sourceCode || 0;
    }

    if (selectedItems.ppt && project.files?.ppt) {
      total += project.itemPrices?.ppt || 0;
    }

    if (selectedItems.documentation && project.files?.documentation) {
      total += project.itemPrices?.documentation || 0;
    }

    return total;
  };

  const handleBuy = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    const amount = calculatePrice();

    if (amount === 0) {
      alert("Please select at least one item");
      return;
    }

    try {
      const { data } = await api.post("/orders/create-order", {
        projectId: id,
        items: selectedItems,
        amount,
      });

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      );

      const openCheckout = () => {
        const options = {
          key: data.key,
          amount: data.order.amount,
          currency: "INR",
          name: "CodeX",
          description: project.title,
          order_id: data.order.id,

          handler: async function (response) {
            try {
              await api.post("/orders/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                project: id,
                items: selectedItems,
                amount,
              });

              alert("Payment successful! Download link sent to email.");
            } catch {
              alert("Payment verification failed. Please contact support.");
            }
          },

          theme: {
            color: "#6366F1",
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.open();
      };

      if (existingScript) {
        if (window.Razorpay) {
          openCheckout();
        } else {
          existingScript.addEventListener("load", openCheckout, { once: true });
        }

        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload = openCheckout;

      script.onerror = () => {
        alert("Unable to load payment gateway");
      };

      document.body.appendChild(script);
    } catch {
      alert("Payment failed");
    }
  };

  /*
   * IMPORTANT:
   * The backend Project schema uses screenshotUrl.
   */
  const mediaUrl = project?.screenshotUrl || "";

  const hasImage = typeof mediaUrl === "string" && mediaUrl.trim() !== "";

  /*
   * Kept as fallback only if an older project document
   * still contains videoUrl.
   */
  const hasVideo = Boolean(
    project?.videoUrl && String(project.videoUrl).trim() !== "",
  );

  const resourceItems = [
    {
      key: "sourceCode",
      title: "Source Code",
      price: project?.itemPrices?.sourceCode || 0,
      available: Boolean(project?.files?.sourceCode),
      icon: <CodeIcon />,
      description: "Complete project source files and implementation.",
    },
    {
      key: "ppt",
      title: "Presentation",
      price: project?.itemPrices?.ppt || 0,
      available: Boolean(project?.files?.ppt),
      icon: <SlideshowIcon />,
      description: "Ready-to-use project presentation for submission.",
    },
    {
      key: "documentation",
      title: "Documentation",
      price: project?.itemPrices?.documentation || 0,
      available: Boolean(project?.files?.documentation),
      icon: <DescriptionIcon />,
      description: "Project documentation with setup and usage details.",
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#020617",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <CircularProgress
            sx={{
              color: "#818cf8",
            }}
          />

          <Typography
            sx={{
              color: "#94a3b8",
              fontSize: {
                xs: ".82rem",
                sm: ".95rem",
              },
            }}
          >
            Loading project...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#020617",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <MotionPaper
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          sx={{
            width: "100%",
            maxWidth: 480,
            p: {
              xs: 3,
              sm: 4,
            },
            textAlign: "center",
            bgcolor: "rgba(15,23,42,.95)",
            color: "#fff",
            border: "1px solid rgba(148,163,184,.18)",
            borderRadius: 4,
          }}
        >
          <Typography
            fontWeight={900}
            sx={{
              fontSize: {
                xs: "1.15rem",
                sm: "1.4rem",
              },
            }}
          >
            Project not found
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#94a3b8",
              fontSize: ".85rem",
            }}
          >
            The project could not be loaded right now.
          </Typography>

          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
            sx={{
              mt: 2.5,
              borderRadius: 3,
              textTransform: "none",
            }}
            variant="outlined"
          >
            Go Back
          </Button>
        </MotionPaper>
      </Box>
    );
  }

  const currentPrice = calculatePrice();

  const availableCount = resourceItems.filter((item) => item.available).length;

  const selectedCount = resourceItems.filter(
    (item) => item.available && selectedItems[item.key],
  ).length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#020617",
        color: "#fff",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 15% 0%, rgba(37,99,235,.22), transparent 34%), radial-gradient(circle at 90% 25%, rgba(99,102,241,.15), transparent 30%)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          py: {
            xs: 2.5,
            sm: 4,
            md: 6,
          },
          px: {
            xs: 1.5,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* Back */}
        <MotionBox
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          sx={{
            mb: {
              xs: 2.5,
              sm: 4,
            },
          }}
        >
          <Button
            onClick={() => navigate(-1)}
            startIcon={
              <ArrowBackIcon
                sx={{
                  fontSize: {
                    xs: 16,
                    sm: 18,
                  },
                }}
              />
            }
            sx={{
              color: "#cbd5e1",
              textTransform: "none",
              borderRadius: 999,
              px: {
                xs: 1.2,
                sm: 1.7,
              },
              fontSize: {
                xs: ".72rem",
                sm: ".84rem",
              },
              "&:hover": {
                bgcolor: "rgba(148,163,184,.08)",
                color: "#fff",
              },
            }}
          >
            Back to Projects
          </Button>
        </MotionBox>

        <Grid
          container
          spacing={{
            xs: 2.5,
            sm: 3.5,
            md: 5,
          }}
          alignItems="flex-start"
        >
          {/* LEFT */}
          <Grid item xs={12} md={7.2}>
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
                duration: 0.55,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="wrap"
                sx={{
                  mb: 1.3,
                }}
              >
                <Chip
                  label={
                    project.category === "mern"
                      ? "MERN FULL STACK"
                      : project.category === "frontend"
                        ? "FRONTEND"
                        : String(project.category || "PROJECT").toUpperCase()
                  }
                  size="small"
                  sx={{
                    height: {
                      xs: 25,
                      sm: 29,
                    },
                    bgcolor: "rgba(99,102,241,.14)",
                    color: "#a5b4fc",
                    border: "1px solid rgba(129,140,248,.28)",
                    fontWeight: 900,
                    fontSize: {
                      xs: 9,
                      sm: 11,
                    },
                  }}
                />

                <Chip
                  icon={
                    <ShieldIcon
                      sx={{
                        fontSize: "15px !important",
                      }}
                    />
                  }
                  label="Secure Purchase"
                  size="small"
                  sx={{
                    height: {
                      xs: 25,
                      sm: 29,
                    },
                    bgcolor: "rgba(34,197,94,.08)",
                    color: "#86efac",
                    border: "1px solid rgba(34,197,94,.18)",
                    fontWeight: 800,
                    fontSize: {
                      xs: 8.5,
                      sm: 10,
                    },
                  }}
                />
              </Stack>

              <Typography
                component="h1"
                fontWeight={950}
                sx={{
                  fontSize: {
                    xs: "1.75rem",
                    sm: "2.35rem",
                    md: "3.2rem",
                  },
                  lineHeight: 1.08,
                  letterSpacing: "-.9px",
                  maxWidth: 850,
                  wordBreak: "break-word",
                }}
              >
                {project.title}
              </Typography>

              <Typography
                sx={{
                  mt: {
                    xs: 1.2,
                    sm: 1.6,
                  },
                  color: "#94a3b8",
                  fontSize: {
                    xs: ".82rem",
                    sm: ".96rem",
                    md: "1.04rem",
                  },
                  lineHeight: 1.75,
                  maxWidth: 780,
                }}
              >
                {project.description}
              </Typography>

              {project.techStack?.length > 0 && (
                <Stack
                  direction="row"
                  spacing={0.7}
                  flexWrap="wrap"
                  useFlexGap
                  sx={{
                    mt: {
                      xs: 1.7,
                      sm: 2.2,
                    },
                    mb: {
                      xs: 2.2,
                      sm: 3,
                    },
                  }}
                >
                  {project.techStack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: {
                          xs: 25,
                          sm: 29,
                        },
                        color: "#c7d2fe",
                        borderColor: "rgba(129,140,248,.3)",
                        bgcolor: "rgba(99,102,241,.05)",
                        fontSize: {
                          xs: 9,
                          sm: 11,
                        },
                        fontWeight: 700,
                      }}
                    />
                  ))}
                </Stack>
              )}
            </MotionBox>

            {/* PACKAGE */}
            <MotionPaper
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 0.08,
              }}
              sx={{
                mt: {
                  xs: 2.2,
                  sm: 3,
                },
                p: {
                  xs: 1.5,
                  sm: 2.3,
                  md: 3,
                },
                borderRadius: {
                  xs: 3,
                  sm: 4,
                },
                bgcolor: "rgba(15,23,42,.72)",
                border: "1px solid rgba(148,163,184,.16)",
                color: "#fff",
                backdropFilter: "blur(18px)",
                boxShadow: "0 24px 70px rgba(0,0,0,.18)",
              }}
            >
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={{
                  xs: 1.4,
                  sm: 2,
                }}
                justifyContent="space-between"
                alignItems={{
                  xs: "stretch",
                  sm: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#94a3b8",
                      fontSize: {
                        xs: ".65rem",
                        sm: ".72rem",
                      },
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: ".8px",
                    }}
                  >
                    Selected package
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="baseline"
                    sx={{ mt: 0.35 }}
                  >
                    {project.originalPrice && (
                      <Typography
                        sx={{
                          textDecoration: "line-through",
                          color: "#64748b",
                          fontSize: {
                            xs: ".8rem",
                            sm: ".95rem",
                          },
                        }}
                      >
                        ₹{project.originalPrice}
                      </Typography>
                    )}

                    <Typography
                      fontWeight={950}
                      sx={{
                        fontSize: {
                          xs: "1.55rem",
                          sm: "2rem",
                        },
                        color: "#fff",
                      }}
                    >
                      ₹{currentPrice}
                    </Typography>
                  </Stack>
                </Box>

                <Chip
                  label={`${selectedCount} of ${availableCount} selected`}
                  size="small"
                  sx={{
                    alignSelf: {
                      xs: "flex-start",
                      sm: "center",
                    },
                    color: "#86efac",
                    bgcolor: "rgba(34,197,94,.09)",
                    border: "1px solid rgba(34,197,94,.18)",
                    fontWeight: 800,
                    fontSize: {
                      xs: 9,
                      sm: 10,
                    },
                  }}
                />
              </Stack>

              <Divider
                sx={{
                  my: {
                    xs: 1.5,
                    sm: 2.2,
                  },
                  borderColor: "rgba(148,163,184,.12)",
                }}
              />

              <Typography
                fontWeight={900}
                sx={{
                  fontSize: {
                    xs: ".95rem",
                    sm: "1.1rem",
                  },
                  mb: 1.2,
                }}
              >
                Choose what you need
              </Typography>

              <Stack spacing={1}>
                {resourceItems.map((item, index) => {
                  const checked = selectedItems[item.key];

                  return (
                    <MotionBox
                      key={item.key}
                      initial={{
                        opacity: 0,
                        x: -12,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: 0.1 + index * 0.06,
                      }}
                      onClick={() => {
                        if (!item.available) return;

                        setSelectedItems({
                          ...selectedItems,
                          [item.key]: !checked,
                        });
                      }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: {
                          xs: 0.8,
                          sm: 1.2,
                        },
                        p: {
                          xs: 1,
                          sm: 1.35,
                        },
                        borderRadius: {
                          xs: 2,
                          sm: 2.5,
                        },
                        cursor: item.available ? "pointer" : "default",
                        bgcolor:
                          checked && item.available
                            ? "rgba(99,102,241,.09)"
                            : "rgba(2,6,23,.34)",
                        border: "1px solid",
                        borderColor:
                          checked && item.available
                            ? "rgba(129,140,248,.3)"
                            : "rgba(148,163,184,.1)",
                        opacity: item.available ? 1 : 0.48,
                        transition: "all .2s ease",
                        "&:hover": item.available
                          ? {
                              borderColor: "rgba(129,140,248,.4)",
                              transform: "translateX(3px)",
                            }
                          : {},
                      }}
                    >
                      <Checkbox
                        checked={Boolean(checked && item.available)}
                        disabled={!item.available}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) =>
                          setSelectedItems({
                            ...selectedItems,
                            [item.key]: event.target.checked,
                          })
                        }
                        sx={{
                          p: 0.3,
                          color: "#475569",
                          "&.Mui-checked": {
                            color: "#6366f1",
                          },
                        }}
                      />

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
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: {
                            xs: 1.7,
                            sm: 2,
                          },
                          color: item.available ? "#a5b4fc" : "#64748b",
                          bgcolor: item.available
                            ? "rgba(99,102,241,.1)"
                            : "rgba(100,116,139,.08)",
                          "& svg": {
                            fontSize: {
                              xs: 18,
                              sm: 21,
                            },
                          },
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={0.7}
                          alignItems="center"
                          flexWrap="wrap"
                        >
                          <Typography
                            fontWeight={800}
                            sx={{
                              fontSize: {
                                xs: ".76rem",
                                sm: ".9rem",
                              },
                            }}
                          >
                            {item.title}
                          </Typography>

                          <Typography
                            fontWeight={900}
                            sx={{
                              fontSize: {
                                xs: ".72rem",
                                sm: ".82rem",
                              },
                              color: item.available ? "#fff" : "#64748b",
                            }}
                          >
                            ₹{item.price}
                          </Typography>
                        </Stack>

                        <Typography
                          sx={{
                            mt: 0.2,
                            color: "#64748b",
                            fontSize: {
                              xs: ".61rem",
                              sm: ".72rem",
                            },
                            lineHeight: 1.4,
                          }}
                        >
                          {item.available
                            ? item.description
                            : "This resource has not been uploaded yet."}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          flexShrink: 0,
                          fontSize: {
                            xs: ".58rem",
                            sm: ".66rem",
                          },
                          fontWeight: 900,
                          color: item.available ? "#4ade80" : "#facc15",
                        }}
                      >
                        {item.available ? "AVAILABLE" : "COMING SOON"}
                      </Typography>
                    </MotionBox>
                  );
                })}
              </Stack>

              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={currentPrice === 0}
                onClick={handleBuy}
                startIcon={<ShoppingCartCheckoutIcon />}
                sx={{
                  mt: {
                    xs: 1.6,
                    sm: 2.2,
                  },
                  minHeight: {
                    xs: 45,
                    sm: 52,
                  },
                  borderRadius: {
                    xs: 2.5,
                    sm: 3,
                  },
                  textTransform: "none",
                  fontWeight: 900,
                  fontSize: {
                    xs: ".78rem",
                    sm: ".92rem",
                  },
                  background: "linear-gradient(90deg,#6366f1,#4f46e5)",
                  boxShadow: "0 14px 35px rgba(79,70,229,.25)",
                  "&:hover": {
                    background: "linear-gradient(90deg,#818cf8,#6366f1)",
                    boxShadow: "0 18px 45px rgba(79,70,229,.35)",
                  },
                }}
              >
                {token ? `Buy Now • ₹${currentPrice}` : "Login to Buy"}
              </Button>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 1.2 }}
              >
                <LockIcon
                  sx={{
                    fontSize: 14,
                    color: "#4ade80",
                  }}
                />

                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: {
                      xs: ".6rem",
                      sm: ".7rem",
                    },
                    textAlign: "center",
                  }}
                >
                  Secure Razorpay payment • Instant access after verification
                </Typography>
              </Stack>
            </MotionPaper>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={4.8}>
            <Box
              sx={{
                position: {
                  xs: "relative",
                  md: "sticky",
                },
                top: {
                  md: 24,
                },
              }}
            >
              {/* PROJECT PREVIEW */}
              <MotionPaper
                initial={{
                  opacity: 0,
                  scale: 0.97,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.12,
                }}
                sx={{
                  overflow: "hidden",
                  borderRadius: {
                    xs: 3,
                    sm: 4,
                  },
                  bgcolor: "#0f172a",
                  border: "1px solid rgba(148,163,184,.2)",
                  boxShadow: "0 30px 80px rgba(0,0,0,.35)",
                }}
              >
                {/* THIS IS THE IMAGE SECTION */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: {
                      xs: "16 / 9",
                      sm: "16 / 10",
                    },
                    minHeight: {
                      xs: 190,
                      sm: 240,
                      md: 270,
                    },
                    maxHeight: {
                      md: 430,
                    },
                    bgcolor: "#020617",
                    overflow: "hidden",
                  }}
                >
                  {hasImage ? (
                    <Box
                      component="img"
                      src={mediaUrl}
                      alt={project.title || "Project preview"}
                      loading="eager"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";

                        const fallback =
                          event.currentTarget.parentElement?.querySelector(
                            ".project-image-fallback",
                          );

                        if (fallback) {
                          fallback.style.display = "flex";
                        }
                      }}
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                        objectPosition: "center",
                        backgroundColor: "#020617",
                      }}
                    />
                  ) : hasVideo ? (
                    <Box
                      component="video"
                      src={project.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                        backgroundColor: "#020617",
                      }}
                    />
                  ) : null}

                  {/* FALLBACK */}
                  <Stack
                    className="project-image-fallback"
                    sx={{
                      display: hasImage || hasVideo ? "none" : "flex",
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64748b",
                      px: 3,
                      textAlign: "center",
                      bgcolor: "#020617",
                    }}
                    spacing={1}
                  >
                    <CodeIcon
                      sx={{
                        fontSize: {
                          xs: 36,
                          sm: 50,
                        },
                        color: "#4f46e5",
                      }}
                    />

                    <Typography
                      fontWeight={800}
                      sx={{
                        fontSize: {
                          xs: ".78rem",
                          sm: ".9rem",
                        },
                      }}
                    >
                      Project preview
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: ".68rem",
                        color: "#475569",
                      }}
                    >
                      Preview media will appear here when uploaded.
                    </Typography>
                  </Stack>

                  {/* LABEL */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: {
                        xs: 10,
                        sm: 14,
                      },
                      left: {
                        xs: 10,
                        sm: 14,
                      },
                      px: 1,
                      py: 0.45,
                      borderRadius: 999,
                      bgcolor: "rgba(2,6,23,.72)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,.12)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 8,
                          sm: 10,
                        },
                        fontWeight: 900,
                        color: "#e2e8f0",
                        letterSpacing: ".5px",
                      }}
                    >
                      PROJECT PREVIEW
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: {
                      xs: 1.5,
                      sm: 2.2,
                    },
                  }}
                >
                  <Typography
                    fontWeight={900}
                    sx={{
                      fontSize: {
                        xs: ".95rem",
                        sm: "1.1rem",
                      },
                    }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.55,
                      color: "#64748b",
                      fontSize: {
                        xs: ".65rem",
                        sm: ".75rem",
                      },
                      lineHeight: 1.55,
                    }}
                  >
                    Preview the project before choosing the resources you want
                    to purchase.
                  </Typography>

                  {project.livePreviewUrl && (
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      endIcon={
                        <OpenInNewIcon
                          sx={{
                            fontSize: "15px !important",
                          }}
                        />
                      }
                      onClick={() =>
                        window.open(
                          project.livePreviewUrl,
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                      sx={{
                        mt: 1.4,
                        borderRadius: 2.5,
                        minHeight: 36,
                        textTransform: "none",
                        fontWeight: 800,
                        fontSize: {
                          xs: ".68rem",
                          sm: ".76rem",
                        },
                        borderColor: "rgba(129,140,248,.35)",
                        color: "#a5b4fc",
                      }}
                    >
                      Open Live Preview
                    </Button>
                  )}
                </Box>
              </MotionPaper>

              {/* WHAT YOU GET */}
              <MotionPaper
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: 0.2,
                }}
                sx={{
                  mt: 2,
                  p: {
                    xs: 1.6,
                    sm: 2.2,
                  },
                  borderRadius: {
                    xs: 3,
                    sm: 4,
                  },
                  bgcolor: "rgba(15,23,42,.75)",
                  color: "#fff",
                  border: "1px solid rgba(148,163,184,.14)",
                }}
              >
                <Typography
                  fontWeight={900}
                  sx={{
                    fontSize: {
                      xs: ".9rem",
                      sm: "1rem",
                    },
                  }}
                >
                  What you will get
                </Typography>

                <Stack spacing={1.15} sx={{ mt: 1.5 }}>
                  {[
                    "Complete source code",
                    "Documentation (DOC/PDF)",
                    "Project presentation PPT",
                    "Setup instructions",
                    "Instant access after successful payment",
                  ].map((text) => (
                    <Stack
                      key={text}
                      direction="row"
                      spacing={1}
                      alignItems="flex-start"
                    >
                      <CheckCircleIcon
                        sx={{
                          fontSize: {
                            xs: 16,
                            sm: 18,
                          },
                          color: "#4ade80",
                          mt: 0.1,
                        }}
                      />

                      <Typography
                        sx={{
                          color: "#cbd5e1",
                          fontSize: {
                            xs: ".67rem",
                            sm: ".76rem",
                          },
                          lineHeight: 1.45,
                        }}
                      >
                        {text}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </MotionPaper>

              {/* SECURE CHECKOUT */}
              <MotionPaper
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.55,
                  delay: 0.28,
                }}
                sx={{
                  mt: 2,
                  p: {
                    xs: 1.6,
                    sm: 2.2,
                  },
                  borderRadius: {
                    xs: 3,
                    sm: 4,
                  },
                  bgcolor: "rgba(30,41,59,.45)",
                  color: "#fff",
                  border: "1px solid rgba(129,140,248,.14)",
                }}
              >
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(99,102,241,.12)",
                      color: "#818cf8",
                      flexShrink: 0,
                    }}
                  >
                    <ShieldIcon
                      sx={{
                        fontSize: 20,
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      fontWeight={900}
                      sx={{
                        fontSize: {
                          xs: ".76rem",
                          sm: ".85rem",
                        },
                      }}
                    >
                      Secure checkout
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.25,
                        color: "#64748b",
                        fontSize: {
                          xs: ".6rem",
                          sm: ".68rem",
                        },
                      }}
                    >
                      Your payment is processed securely through Razorpay.
                    </Typography>
                  </Box>
                </Stack>
              </MotionPaper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectDetails;
