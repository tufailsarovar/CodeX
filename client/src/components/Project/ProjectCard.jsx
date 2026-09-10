import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const isAnyFileAvailable = () => {
    const files = project.files || {};

    return Object.values(files).some(
      (url) => typeof url === "string" && url.trim() !== "",
    );
  };

  const wholePrice =
    project.price ||
    (project.itemPrices
      ? (project.itemPrices.sourceCode || 0) +
        (project.itemPrices.ppt || 0) +
        (project.itemPrices.documentation || 0)
      : 0);

  const available = isAnyFileAvailable();

  return (
    <Card
      sx={{
        bgcolor: "rgba(15,23,42,0.95)",
        width: "100%",
        height: "100%",
        minWidth: 0,

        display: "flex",
        flexDirection: "column",

        borderRadius: {
          xs: 2,
          sm: 3,
        },

        overflow: "hidden",

        transition: "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 40px rgba(15,23,42,0.7)",
        },
      }}
    >
      {/* ================= PROJECT IMAGE ================= */}

      {project.screenshotUrl && (
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={project.screenshotUrl}
            alt={project.title}
            loading="lazy"
            sx={{
              width: "100%",

              height: {
                xs: 105,
                sm: 160,
                md: 220,
              },

              objectFit: "cover",

              display: "block",

              transition: "transform .3s ease",

              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          />
        </Box>
      )}
      {/* ================= CONTENT ================= */}

      <CardContent
        sx={{
          flexGrow: 1,
          minWidth: 0,

          p: {
            xs: 1.1,
            sm: 1.8,
            md: 2,
          },

          "&:last-child": {
            pb: {
              xs: 1.1,
              sm: 1.8,
              md: 2,
            },
          },
        }}
      >
        {/* CATEGORY */}

        <Typography
          color="secondary.main"
          fontWeight={700}
          sx={{
            fontSize: {
              xs: "9px",
              sm: "11px",
              md: "12px",
            },

            mb: {
              xs: 0.35,
              sm: 0.6,
            },

            textTransform: "uppercase",

            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {project.category === "mern"
            ? "MERN Full Stack"
            : project.category === "frontend"
              ? "Frontend"
              : "Project"}
        </Typography>

        {/* TITLE */}

        <Typography
          fontWeight={800}
          sx={{
            fontSize: {
              xs: "12px",
              sm: "15px",
              md: "17px",
            },

            lineHeight: 1.25,

            mb: {
              xs: 0.6,
              sm: 0.8,
            },

            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: {
              xs: 2,
              sm: 2,
            },

            overflow: "hidden",

            wordBreak: "break-word",
          }}
        >
          {project.title}
        </Typography>

        {/* DESCRIPTION */}

        <Typography
          color="text.secondary"
          sx={{
            fontSize: {
              xs: "9px",
              sm: "11px",
              md: "13px",
            },

            lineHeight: 1.45,

            mb: {
              xs: 0.8,
              sm: 1.2,
            },

            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: {
              xs: 2,
              sm: 2,
            },

            overflow: "hidden",

            minHeight: {
              xs: "26px",
              sm: "32px",
            },
          }}
        >
          {project.description}
        </Typography>

        {/* TECH STACK */}

        <Stack
          direction="row"
          spacing={0.4}
          flexWrap="wrap"
          sx={{
            mb: {
              xs: 0.8,
              sm: 1.2,
            },

            maxHeight: {
              xs: 25,
              sm: 32,
            },

            overflow: "hidden",
          }}
        >
          {project.techStack?.slice(0, 3).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              variant="outlined"
              sx={{
                height: {
                  xs: 18,
                  sm: 23,
                },

                fontSize: {
                  xs: "8px",
                  sm: "10px",
                },

                "& .MuiChip-label": {
                  px: {
                    xs: 0.7,
                    sm: 1,
                  },
                },
              }}
            />
          ))}
        </Stack>

        {/* ================= PRICE ================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: {
              xs: 0.5,
              sm: 0.8,
            },
          }}
        >
          {project.originalPrice && (
            <Typography
              component="span"
              sx={{
                textDecoration: "line-through",
                opacity: 0.6,

                fontSize: {
                  xs: "8px",
                  sm: "11px",
                },
              }}
            >
              ₹{project.originalPrice}
            </Typography>
          )}

          <Typography
            fontWeight={900}
            sx={{
              fontSize: {
                xs: "12px",
                sm: "16px",
              },
            }}
          >
            ₹{wholePrice}
          </Typography>

          <Typography
            component="span"
            fontWeight={700}
            sx={{
              fontSize: {
                xs: "8px",
                sm: "10px",
              },

              color: available ? "#22c55e" : "#facc15",
            }}
          >
            {available ? "Available" : "Coming soon"}
          </Typography>
        </Box>
      </CardContent>

      {/* ================= ACTIONS ================= */}

      <CardActions
        sx={{
          px: {
            xs: 1.1,
            sm: 1.8,
            md: 2,
          },

          pb: {
            xs: 1.1,
            sm: 1.8,
            md: 2,
          },

          pt: 0,

          gap: {
            xs: 0.6,
            sm: 1,
          },

          flexWrap: "nowrap",
        }}
      >
        {project.livePreviewUrl && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => window.open(project.livePreviewUrl, "_blank")}
            sx={{
              minWidth: 0,
              flex: 1,

              px: {
                xs: 0.5,
                sm: 1.2,
              },

              minHeight: {
                xs: 28,
                sm: 34,
              },

              borderRadius: {
                xs: 1.5,
                sm: 2.5,
              },

              fontSize: {
                xs: "8px",
                sm: "11px",
              },

              textTransform: "none",

              whiteSpace: "nowrap",
            }}
          >
            Live Preview
          </Button>
        )}

        <Button
          size="small"
          variant="contained"
          onClick={() => navigate(`/projects/${project._id}`)}
          sx={{
            minWidth: 0,
            flex: 1,

            px: {
              xs: 0.5,
              sm: 1.2,
            },

            minHeight: {
              xs: 28,
              sm: 34,
            },

            borderRadius: {
              xs: 1.5,
              sm: 2.5,
            },

            fontSize: {
              xs: "8px",
              sm: "11px",
            },

            fontWeight: 800,

            textTransform: "none",

            whiteSpace: "nowrap",
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
