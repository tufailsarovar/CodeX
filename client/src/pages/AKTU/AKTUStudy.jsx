import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DescriptionIcon from "@mui/icons-material/Description";
import StarIcon from "@mui/icons-material/Star";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const resources = [
  {
    title: "Syllabus",
    description:
      "Find branch-wise and semester-wise AKTU syllabus and subject information.",
    icon: <MenuBookIcon />,
    path: "/aktu/syllabus",
  },
  {
    title: "Notes",
    description:
      "Study easy-to-understand notes organized according to semester and subjects.",
    icon: <DescriptionIcon />,
    path: "/aktu/notes",
  },
  {
    title: "Important Questions",
    description:
      "Focus your preparation on important and exam-oriented questions.",
    icon: <StarIcon />,
    path: "/aktu/important-questions",
  },
  {
    title: "PYQs",
    description:
      "Practice previous year question papers and understand exam patterns.",
    icon: <PictureAsPdfIcon />,
    path: "/aktu/pyqs",
  },
  {
    title: "Quantum",
    description:
      "Explore exam-focused Quantum resources and important question banks.",
    icon: <QuizIcon />,
    path: "/aktu/quantum",
  },
  {
    title: "Question & Answers",
    description:
      "Learn important questions with simple and easy-to-understand answers.",
    icon: <QuestionAnswerIcon />,
    path: "/aktu/question-answers",
  },
];

const AKTUStudy = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: {
          xs: 4,
          md: 7,
        },
        background:
          "linear-gradient(180deg,#080d1d 0%,#050816 50%,#020617 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* =========================
            HERO
        ========================= */}

        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            py: {
              xs: 6,
              md: 9,
            },
            px: 3,
            mb: 6,
            borderRadius: 6,
            background:
              "radial-gradient(circle at 50% 0%,rgba(79,70,229,0.3),transparent 55%),linear-gradient(145deg,#0f172a,#020617)",
            border:
              "1px solid rgba(129,140,248,0.2)",
            boxShadow:
              "0 30px 90px rgba(0,0,0,0.35)",
          }}
        >
          <Box
            sx={{
              width: 82,
              height: 82,
              mx: "auto",
              mb: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              color: "primary.light",
              background:
                "linear-gradient(135deg,rgba(99,102,241,0.3),rgba(59,130,246,0.12))",
              border:
                "1px solid rgba(129,140,248,0.3)",
              boxShadow:
                "0 20px 50px rgba(79,70,229,0.2)",
            }}
          >
            <SchoolIcon
              sx={{ fontSize: 48 }}
            />
          </Box>

          <Typography
            variant="h2"
            fontWeight={950}
            sx={{
              fontSize: {
                xs: "2.4rem",
                md: "4rem",
              },
              background:
                "linear-gradient(90deg,#ffffff,#a5b4fc,#60a5fa)",
              backgroundClip: "text",
              WebkitBackgroundClip:
                "text",
              color: "transparent",
            }}
          >
            AKTU Study Hub
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 2,
              maxWidth: 780,
              mx: "auto",
              fontSize: {
                xs: "1rem",
                md: "1.15rem",
              },
              lineHeight: 1.8,
            }}
          >
            Your complete AKTU preparation
            platform for syllabus, notes,
            important questions, PYQs,
            Quantum and question answers.
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="center"
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                navigate("/aktu/notes")
              }
              endIcon={
                <ArrowForwardIcon />
              }
              sx={{
                borderRadius: 999,
                px: 4,
                py: 1.3,
                textTransform:
                  "none",
                fontWeight: 800,
              }}
            >
              Start Studying
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() =>
                navigate("/aktu/pyqs")
              }
              sx={{
                borderRadius: 999,
                px: 4,
                py: 1.3,
                textTransform:
                  "none",
                fontWeight: 800,
              }}
            >
              Practice PYQs
            </Button>
          </Stack>
        </Box>

        {/* =========================
            SECTION TITLE
        ========================= */}

        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={900}
          >
            Explore AKTU Resources
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
            }}
          >
            Everything you need for your
            semester preparation.
          </Typography>
        </Box>

        {/* =========================
            RESOURCE CARDS
        ========================= */}

        <Grid
          container
          spacing={3}
        >
          {resources.map(
            (resource) => (
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
                    borderRadius: 5,
                    background:
                      "linear-gradient(145deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))",
                    border:
                      "1px solid rgba(148,163,184,0.15)",
                    transition:
                      "all .28s ease",
                    "&:hover": {
                      transform:
                        "translateY(-8px)",
                      borderColor:
                        "rgba(99,102,241,0.45)",
                      boxShadow:
                        "0 25px 60px rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3.5,
                      height: "100%",
                      display: "flex",
                      flexDirection:
                        "column",
                    }}
                  >
                    <Box
                      sx={{
                        width: 62,
                        height: 62,
                        mb: 2.5,
                        borderRadius: 4,
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        color:
                          "primary.light",
                        background:
                          "linear-gradient(135deg,rgba(99,102,241,0.22),rgba(59,130,246,0.08))",
                        border:
                          "1px solid rgba(99,102,241,0.15)",
                      }}
                    >
                      {resource.icon}
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight={900}
                      sx={{ mb: 1 }}
                    >
                      {resource.title}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        flex: 1,
                        mb: 3,
                      }}
                    >
                      {
                        resource.description
                      }
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={
                        <ArrowForwardIcon />
                      }
                      onClick={() =>
                        navigate(
                          resource.path
                        )
                      }
                      sx={{
                        borderRadius: 999,
                        textTransform:
                          "none",
                        fontWeight: 800,
                        py: 1.2,
                      }}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>

        {/* =========================
            BOTTOM CTA
        ========================= */}

        <Box
          sx={{
            mt: 7,
            p: {
              xs: 4,
              md: 6,
            },
            borderRadius: 5,
            textAlign: "center",
            background:
              "radial-gradient(circle at 50% 0%,rgba(79,70,229,0.2),transparent 60%),rgba(15,23,42,0.75)",
            border:
              "1px solid rgba(129,140,248,0.16)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={900}
          >
            Prepare Smarter 🚀
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1.5,
              maxWidth: 650,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Select your branch and semester,
            find the right material and focus
            on what actually matters for your
            AKTU exams.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AKTUStudy;