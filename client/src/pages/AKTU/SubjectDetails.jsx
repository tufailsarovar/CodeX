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
} from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import StarIcon from "@mui/icons-material/Star";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

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

const SubjectDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const branch = searchParams.get("branch") || "CSE";
  const semester = searchParams.get("semester") || "";
  const subject = searchParams.get("subject") || "";

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState("all");

  useEffect(() => {
    if (!semester || !subject) {
      setResources([]);
      return;
    }

    const fetchResources = async () => {
      try {
        setLoading(true);

        const res = await api.get("/aktu", {
          params: {
            branch,
            semester,
            subjectName: subject,
          },
        });

        setResources(res.data || []);
      } catch (error) {
        console.error("Subject resources load failed:", error);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [branch, semester, subject]);

  const filteredResources =
    activeType === "all"
      ? resources
      : resources.filter(
          (resource) => resource.resourceType === activeType
        );

  const resourceTypes = [
    "syllabus",
    "notes",
    "important-questions",
    "pyq",
    "quantum",
    "question-answers",
  ];

  return (
    <Box sx={{ py: 7 }}>
      <Container maxWidth="lg">
        {/* BACK BUTTON */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() =>
            navigate(
              `/aktu/subjects?branch=${encodeURIComponent(
                branch
              )}&semester=${encodeURIComponent(semester)}`
            )
          }
          sx={{
            mb: 4,
            textTransform: "none",
          }}
        >
          Back to Subjects
        </Button>

        {/* HEADER */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              fontSize: {
                xs: "1.8rem",
                md: "2.4rem",
              },
            }}
          >
            {subject}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            {branch} • Semester {semester}
          </Typography>
        </Box>

        {/* RESOURCE FILTER */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            mb: 4,
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
            onClick={() => setActiveType("all")}
          />

          {resourceTypes.map((type) => {
            const count = resources.filter(
              (resource) =>
                resource.resourceType === type
            ).length;

            const info = resourceTypeInfo[type];

            return (
              <Chip
                key={type}
                label={`${info.label} (${count})`}
                clickable
                color={
                  activeType === type
                    ? "primary"
                    : "default"
                }
                onClick={() => setActiveType(type)}
              />
            );
          })}
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* LOADING */}
        {loading ? (
          <Box
            sx={{
              textAlign: "center",
              py: 7,
            }}
          >
            <CircularProgress />

            <Typography
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Loading subject resources...
            </Typography>
          </Box>
        ) : filteredResources.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
              borderRadius: 4,
              border:
                "1px dashed rgba(148,163,184,0.3)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ mb: 1 }}
            >
              No Resources Available
            </Typography>

            <Typography color="text.secondary">
              No{" "}
              {activeType === "all"
                ? "resources"
                : resourceTypeInfo[activeType]?.label.toLowerCase()}{" "}
              are available for this subject yet.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredResources.map((resource) => {
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
                      borderRadius: 4,
                      border:
                        "1px solid rgba(148,163,184,0.2)",
                      background:
                        "linear-gradient(180deg, rgba(15,23,42,0.92), rgba(2,6,23,0.96))",
                    }}
                  >
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* ICON */}
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "primary.main",
                          background:
                            "rgba(99,102,241,0.12)",
                          mb: 2,
                        }}
                      >
                        {info?.icon || <MenuBookIcon />}
                      </Box>

                      {/* TYPE */}
                      <Chip
                        label={
                          info?.label ||
                          resource.resourceType
                        }
                        size="small"
                        sx={{
                          alignSelf: "flex-start",
                          mb: 2,
                        }}
                      />

                      {/* TITLE */}
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mb: 1 }}
                      >
                        {resource.title}
                      </Typography>

                      {/* UNIT */}
                      {resource.unit && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {resource.unit}
                        </Typography>
                      )}

                      {/* DESCRIPTION */}
                      {resource.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.7,
                            mb: 2,
                          }}
                        >
                          {resource.description}
                        </Typography>
                      )}

                      {/* EXTRA INFO */}
                      {resource.year && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Year: {resource.year}
                        </Typography>
                      )}

                      {resource.questionFrequency > 0 && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Asked{" "}
                          {resource.questionFrequency}{" "}
                          time
                          {resource.questionFrequency !==
                          1
                            ? "s"
                            : ""}
                        </Typography>
                      )}

                      <Box sx={{ flex: 1 }} />

                      {/* CONTENT BUTTONS */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        {resource.fileUrl && (
                          <Button
                            href={resource.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            fullWidth
                            sx={{
                              borderRadius: 999,
                              textTransform: "none",
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
                            fullWidth
                            sx={{
                              borderRadius: 999,
                              textTransform: "none",
                            }}
                            onClick={() =>
                              window.alert(
                                resource.content
                              )
                            }
                          >
                            Read Content
                          </Button>
                        )}

                        {!resource.fileUrl &&
                          !resource.content && (
                            <Button
                              variant="outlined"
                              fullWidth
                              disabled
                              sx={{
                                borderRadius: 999,
                                textTransform: "none",
                              }}
                            >
                              Content Not Available
                            </Button>
                          )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SubjectDetails;