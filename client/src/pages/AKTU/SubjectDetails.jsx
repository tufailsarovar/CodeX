import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";

import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import StarIcon from "@mui/icons-material/Star";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";

import api from "../../api/axios";

const resourceTypeInfo = {
  syllabus: {
    label: "Syllabus",
    icon: <MenuBookIcon />,
  },

  notes: {
    label: "Notes",
    icon: <DescriptionIcon />,
  },

  "important-questions": {
    label: "Important Questions",
    icon: <StarIcon />,
  },

  pyq: {
    label: "PYQs",
    icon: <PictureAsPdfIcon />,
  },

  quantum: {
    label: "Quantum",
    icon: <QuizIcon />,
  },

  "question-answers": {
    label: "Question & Answers",
    icon: <QuestionAnswerIcon />,
  },
};

const resourceTypes = [
  "syllabus",
  "notes",
  "important-questions",
  "pyq",
  "quantum",
  "question-answers",
];

const SubjectDetails = () => {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const branch =
    searchParams.get("branch") ||
    "CSE";

  const semester =
    searchParams.get("semester") ||
    "";

  const subject =
    searchParams.get("subject") ||
    "";

  const [resources, setResources] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [activeType, setActiveType] =
    useState("all");

  const [selectedResource, setSelectedResource] =
    useState(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  useEffect(() => {
    if (!semester || !subject) {
      setResources([]);
      return;
    }

    const fetchResources = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          "/aktu",
          {
            params: {
              branch,
              semester,
              subjectName: subject,
            },
          }
        );

        setResources(
          Array.isArray(res.data)
            ? res.data
            : []
        );
      } catch (error) {
        console.error(
          "Subject resources load failed:",
          error
        );

        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [
    branch,
    semester,
    subject,
  ]);

  const filteredResources =
    activeType === "all"
      ? resources
      : resources.filter(
          (resource) =>
            resource.resourceType ===
            activeType
        );

  const openContent = (resource) => {
    setSelectedResource(resource);
    setDialogOpen(true);
  };

  const closeContent = () => {
    setDialogOpen(false);
    setSelectedResource(null);
  };

  return (
    <Box
      sx={{
        py: {
          xs: 4,
          md: 7,
        },
      }}
    >
      <Container maxWidth="lg">

        {/* BACK */}

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() =>
            navigate(
              `/aktu/subjects?branch=${encodeURIComponent(
                branch
              )}&semester=${encodeURIComponent(
                semester
              )}`
            )
          }
          sx={{
            mb: 4,
            textTransform: "none",
            borderRadius: 999,
          }}
        >
          Back to Subjects
        </Button>

        {/* HERO */}

        <Card
          sx={{
            mb: 5,
            overflow: "hidden",
            borderRadius: 5,
            background:
              "linear-gradient(135deg, rgba(30,41,59,.95), rgba(30,27,75,.9), rgba(2,6,23,.98))",
            border:
              "1px solid rgba(129,140,248,.2)",
            boxShadow:
              "0 25px 70px rgba(0,0,0,.25)",
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 3,
                md: 5,
              },
            }}
          >
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              spacing={3}
              alignItems={{
                xs: "flex-start",
                md: "center",
              }}
            >
              <Box
                sx={{
                  width: 75,
                  height: 75,
                  flexShrink: 0,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "rgba(99,102,241,.15)",
                  border:
                    "1px solid rgba(129,140,248,.25)",
                }}
              >
                <SchoolIcon
                  sx={{
                    fontSize: 42,
                    color:
                      "primary.main",
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  sx={{
                    fontSize: {
                      xs: "1.9rem",
                      md: "2.8rem",
                    },
                  }}
                >
                  {subject}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    fontSize:
                      "1.05rem",
                  }}
                >
                  {branch} • Semester{" "}
                  {semester}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mt: 2,
                  }}
                  flexWrap="wrap"
                >
                  <Chip
                    label={`${resources.length} Resources`}
                    color="primary"
                    variant="outlined"
                  />

                  <Chip
                    label="AKTU Study"
                    variant="outlined"
                  />
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* FILTERS */}

        <Box
          sx={{
            mb: 4,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={`All (${resources.length})`}
            clickable
            color={
              activeType === "all"
                ? "primary"
                : "default"
            }
            onClick={() =>
              setActiveType("all")
            }
            sx={{
              px: 1,
              py: 2.2,
              fontWeight: 700,
            }}
          />

          {resourceTypes.map(
            (type) => {
              const count =
                resources.filter(
                  (resource) =>
                    resource.resourceType ===
                    type
                ).length;

              const info =
                resourceTypeInfo[type];

              return (
                <Chip
                  key={type}
                  icon={info.icon}
                  label={`${info.label} (${count})`}
                  clickable
                  color={
                    activeType === type
                      ? "primary"
                      : "default"
                  }
                  onClick={() =>
                    setActiveType(type)
                  }
                  sx={{
                    px: 1,
                    py: 2.2,
                    fontWeight: 600,
                  }}
                />
              );
            }
          )}
        </Box>

        <Divider sx={{ mb: 5 }} />

        {/* LOADING */}

        {loading ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <CircularProgress />

            <Typography
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Loading resources...
            </Typography>
          </Box>
        ) : filteredResources.length ===
          0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 3,
              borderRadius: 5,
              border:
                "1px dashed rgba(148,163,184,.25)",
              background:
                "rgba(15,23,42,.3)",
            }}
          >
            <MenuBookIcon
              sx={{
                fontSize: 52,
                color:
                  "text.secondary",
                mb: 1,
              }}
            />

            <Typography
              variant="h6"
              fontWeight={800}
            >
              No Resources Available
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              No resources are currently
              available for this subject.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredResources.map(
              (resource) => {
                const info =
                  resourceTypeInfo[
                    resource.resourceType
                  ];

                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={resource._id}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        overflow:
                          "hidden",
                        borderRadius: 5,
                        border:
                          "1px solid rgba(148,163,184,.15)",
                        background:
                          "linear-gradient(145deg, rgba(15,23,42,.96), rgba(2,6,23,.98))",
                        display:
                          "flex",
                        flexDirection:
                          "column",
                        transition:
                          "all .3s ease",
                        "&:hover": {
                          transform:
                            "translateY(-8px)",
                          borderColor:
                            "rgba(99,102,241,.45)",
                          boxShadow:
                            "0 25px 60px rgba(0,0,0,.3)",
                        },
                      }}
                    >

                      {/* IMAGE */}

                      <Box
                        sx={{
                          height: 205,
                          position:
                            "relative",
                          overflow:
                            "hidden",
                          background:
                            "linear-gradient(135deg,#111827,#1e1b4b)",
                        }}
                      >
                        {resource.imageUrl ? (
                          <Box
                            component="img"
                            src={
                              resource.imageUrl
                            }
                            alt={
                              resource.title
                            }
                            onError={(
                              e
                            ) => {
                              e.currentTarget.style.display =
                                "none";
                            }}
                            sx={{
                              width:
                                "100%",
                              height:
                                "100%",
                              objectFit:
                                "cover",
                              transition:
                                "transform .5s ease",
                              "&:hover": {
                                transform:
                                  "scale(1.06)",
                              },
                            }}
                          />
                        ) : null}

                        <Box
                          sx={{
                            position:
                              "absolute",
                            inset: 0,
                            display:
                              resource.imageUrl
                                ? "none"
                                : "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            flexDirection:
                              "column",
                            background:
                              "linear-gradient(135deg,rgba(79,70,229,.2),rgba(15,23,42,.9))",
                          }}
                        >
                          {info?.icon || (
                            <MenuBookIcon />
                          )}

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mt: 1,
                            }}
                          >
                            {
                              info?.label
                            }
                          </Typography>
                        </Box>

                        <Chip
                          icon={
                            info?.icon
                          }
                          label={
                            info?.label ||
                            "Resource"
                          }
                          size="small"
                          sx={{
                            position:
                              "absolute",
                            top: 14,
                            left: 14,
                            color: "#fff",
                            fontWeight: 700,
                            background:
                              "rgba(79,70,229,.85)",
                            backdropFilter:
                              "blur(8px)",
                          }}
                        />
                      </Box>

                      {/* CONTENT */}

                      <CardContent
                        sx={{
                          p: 3,
                          flex: 1,
                          display:
                            "flex",
                          flexDirection:
                            "column",
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          sx={{
                            mb: 1,
                            lineHeight:
                              1.35,
                          }}
                        >
                          {
                            resource.title
                          }
                        </Typography>

                        {resource.unit && (
                          <Typography
                            variant="body2"
                            color="primary.main"
                            fontWeight={600}
                            sx={{
                              mb: 1.5,
                            }}
                          >
                            {
                              resource.unit
                            }
                          </Typography>
                        )}

                        {resource.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              lineHeight:
                                1.7,
                              mb: 2,
                              display:
                                "-webkit-box",
                              WebkitLineClamp:
                                3,
                              WebkitBoxOrient:
                                "vertical",
                              overflow:
                                "hidden",
                            }}
                          >
                            {
                              resource.description
                            }
                          </Typography>
                        )}

                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          sx={{
                            mb: 2,
                          }}
                        >
                          {resource.year && (
                            <Chip
                              size="small"
                              label={`Year ${resource.year}`}
                              variant="outlined"
                            />
                          )}

                          {resource.priority &&
                            resource.priority !==
                              "normal" && (
                              <Chip
                                size="small"
                                label={
                                  resource.priority
                                }
                                color="warning"
                              />
                            )}
                        </Stack>

                        <Box
                          sx={{
                            flex: 1,
                          }}
                        />

                        <Stack
                          spacing={1.2}
                        >
                          {resource.fileUrl && (
                            <Button
                              href={
                                resource.fileUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="contained"
                              startIcon={
                                <PictureAsPdfIcon />
                              }
                              fullWidth
                              sx={{
                                borderRadius:
                                  999,
                                py: 1.2,
                                textTransform:
                                  "none",
                                fontWeight:
                                  700,
                              }}
                            >
                              View / Download
                            </Button>
                          )}

                          {resource.content && (
                            <Button
                              variant={
                                resource.fileUrl
                                  ? "outlined"
                                  : "contained"
                              }
                              startIcon={
                                <VisibilityIcon />
                              }
                              fullWidth
                              onClick={() =>
                                openContent(
                                  resource
                                )
                              }
                              sx={{
                                borderRadius:
                                  999,
                                py: 1.2,
                                textTransform:
                                  "none",
                                fontWeight:
                                  700,
                              }}
                            >
                              Read Content
                            </Button>
                          )}

                          {!resource.fileUrl &&
                            !resource.content && (
                              <Button
                                variant="outlined"
                                disabled
                                fullWidth
                                sx={{
                                  borderRadius:
                                    999,
                                  textTransform:
                                    "none",
                                }}
                              >
                                Content Not Available
                              </Button>
                            )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              }
            )}
          </Grid>
        )}
      </Container>

      {/* =========================
          RESOURCE CONTENT DIALOG
      ========================= */}

      <Dialog
        open={dialogOpen}
        onClose={closeContent}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            background:
              "linear-gradient(145deg,#0f172a,#020617)",
            border:
              "1px solid rgba(148,163,184,.2)",
            maxHeight: "88vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            pr: 6,
          }}
        >
          {selectedResource?.title}

          <IconButton
            onClick={closeContent}
            sx={{
              position:
                "absolute",
              right: 12,
              top: 12,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent>
          {selectedResource?.imageUrl && (
            <Box
              component="img"
              src={
                selectedResource.imageUrl
              }
              alt={
                selectedResource.title
              }
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
              sx={{
                width: "100%",
                maxHeight: 340,
                objectFit: "cover",
                borderRadius: 3,
                mb: 3,
              }}
            />
          )}

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            sx={{ mb: 3 }}
          >
            <Chip
              label={
                resourceTypeInfo[
                  selectedResource
                    ?.resourceType
                ]?.label ||
                "Resource"
              }
              color="primary"
            />

            {selectedResource?.unit && (
              <Chip
                label={
                  selectedResource.unit
                }
                variant="outlined"
              />
            )}
          </Stack>

          <Typography
            sx={{
              whiteSpace:
                "pre-wrap",
              lineHeight: 1.9,
              color:
                "text.secondary",
            }}
          >
            {
              selectedResource?.content
            }
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          {selectedResource?.fileUrl && (
            <Button
              href={
                selectedResource.fileUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={
                <PictureAsPdfIcon />
              }
              sx={{
                borderRadius: 999,
                textTransform:
                  "none",
              }}
            >
              Open File
            </Button>
          )}

          <Button
            onClick={closeContent}
            variant="outlined"
            sx={{
              borderRadius: 999,
              textTransform:
                "none",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubjectDetails;