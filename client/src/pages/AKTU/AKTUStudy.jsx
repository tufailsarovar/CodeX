import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import StarIcon from "@mui/icons-material/Star";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const resources = [
  {
    title: "Syllabus",
    description:
      "Find AKTU branch-wise and semester-wise syllabus.",
    icon: <MenuBookIcon />,
    path: "/aktu/syllabus",
  },
  {
    title: "Notes",
    description:
      "Access easy-to-understand notes for your semester and subjects.",
    icon: <DescriptionIcon />,
    path: "/aktu/notes",
  },
  {
    title: "Important Questions",
    description:
      "Prepare with important and exam-focused questions.",
    icon: <StarIcon />,
    path: "/aktu/important-questions",
  },
  {
    title: "PYQs",
    description:
      "Practice previous year question papers for AKTU exams.",
    icon: <PictureAsPdfIcon />,
    path: "/aktu/pyqs",
  },
  {
    title: "Quantum",
    description:
      "Get exam-focused Quantum resources and question banks.",
    icon: <QuizIcon />,
    path: "/aktu/quantum",
  },
  {
    title: "Question & Answers",
    description:
      "Study important questions with easy-to-understand answers.",
    icon: <QuestionAnswerIcon />,
    path: "/aktu/question-answers",
  },
];

const AKTUStudy = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 7 }}>
      <Container maxWidth="lg">
        {/* HERO */}
        <Box
          sx={{
            textAlign: "center",
            maxWidth: 850,
            mx: "auto",
            mb: 7,
          }}
        >
          <SchoolIcon
            sx={{
              fontSize: 55,
              color: "primary.main",
              mb: 1,
            }}
          />

          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            AKTU Study Hub
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 2,
              fontSize: {
                xs: "1rem",
                md: "1.1rem",
              },
              lineHeight: 1.8,
            }}
          >
            Everything you need for AKTU exam preparation —
            syllabus, notes, important questions, PYQs, Quantum
            and question answers in one place.
          </Typography>
        </Box>

        {/* RESOURCE CARDS */}
        <Grid container spacing={3}>
          {resources.map((resource) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={resource.path}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border:
                    "1px solid rgba(148,163,184,0.2)",
                  background:
                    "linear-gradient(180deg, rgba(15,23,42,0.92), rgba(2,6,23,0.96))",
                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow:
                      "0 20px 45px rgba(0,0,0,0.25)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      width: 55,
                      height: 55,
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
                    {resource.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mb: 1 }}
                  >
                    {resource.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.7,
                      flex: 1,
                      mb: 3,
                    }}
                  >
                    {resource.description}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      navigate(resource.path)
                    }
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                    }}
                  >
                    Explore {resource.title}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* BOTTOM INFO */}
        <Box
          sx={{
            mt: 7,
            p: {
              xs: 3,
              md: 5,
            },
            borderRadius: 4,
            textAlign: "center",
            border:
              "1px solid rgba(148,163,184,0.2)",
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.8), rgba(2,6,23,0.9))",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ mb: 1 }}
          >
            Prepare Smarter for AKTU Exams 🚀
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Select your branch and semester to find the study
            material you need and prepare everything from one
            place.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AKTUStudy;