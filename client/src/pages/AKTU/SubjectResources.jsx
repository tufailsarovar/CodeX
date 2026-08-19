import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import api from "../../api/axios";

const branches = [
  "CSE",
  "IT",
  "AI/ML",
  "AI & DS",
  "ECE",
  "ME",
  "CE",
];

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

const resourceTypes = [
  {
    value: "syllabus",
    label: "Syllabus",
  },
  {
    value: "notes",
    label: "Notes",
  },
  {
    value: "important-questions",
    label: "Important Questions",
  },
  {
    value: "pyq",
    label: "PYQs",
  },
  {
    value: "quantum",
    label: "Quantum",
  },
  {
    value: "question-answers",
    label: "Question & Answers",
  },
];

const SubjectResources = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialBranch = searchParams.get("branch") || "CSE";
  const initialSemester = searchParams.get("semester") || "";

  const [branch, setBranch] = useState(initialBranch);
  const [semester, setSemester] = useState(initialSemester);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!semester) {
      setSubjects([]);
      return;
    }

    const fetchSubjects = async () => {
      try {
        setLoading(true);

        const res = await api.get("/aktu", {
          params: {
            branch,
            semester,
          },
        });

        const resources = res.data || [];

        const uniqueSubjects = [];

        resources.forEach((resource) => {
          const exists = uniqueSubjects.some(
            (subject) =>
              subject.subjectName === resource.subjectName &&
              subject.subjectCode === resource.subjectCode
          );

          if (
            resource.subjectName &&
            !exists
          ) {
            uniqueSubjects.push({
              subjectName: resource.subjectName,
              subjectCode: resource.subjectCode || "",
            });
          }
        });

        setSubjects(uniqueSubjects);
      } catch (error) {
        console.error("Subjects load failed:", error);
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [branch, semester]);

  const handleSubjectClick = (subject) => {
    navigate(
      `/aktu/subject?branch=${encodeURIComponent(
        branch
      )}&semester=${encodeURIComponent(
        semester
      )}&subject=${encodeURIComponent(
        subject.subjectName
      )}`
    );
  };

  return (
    <Box sx={{ py: 7 }}>
      <Container maxWidth="lg">
        {/* HEADER */}
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          <MenuBookIcon
            sx={{
              fontSize: 45,
              color: "primary.main",
              mb: 1,
            }}
          />

          <Typography variant="h4" fontWeight={800}>
            AKTU Subjects
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Select your branch and semester to explore
            subject-wise AKTU study material.
          </Typography>
        </Box>

        {/* FILTERS */}
        <Card
          sx={{
            maxWidth: 800,
            mx: "auto",
            mb: 5,
            p: 2,
            borderRadius: 4,
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.92), rgba(2,6,23,0.96))",
            border:
              "1px solid rgba(148,163,184,0.2)",
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Branch</InputLabel>

                  <Select
                    value={branch}
                    label="Branch"
                    onChange={(e) =>
                      setBranch(e.target.value)
                    }
                  >
                    {branches.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Semester</InputLabel>

                  <Select
                    value={semester}
                    label="Semester"
                    onChange={(e) =>
                      setSemester(e.target.value)
                    }
                  >
                    {semesters.map((item) => (
                      <MenuItem key={item} value={item}>
                        Semester {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* SUBJECTS */}
        {!semester ? (
          <Box
            sx={{
              textAlign: "center",
              py: 5,
              borderRadius: 4,
              border:
                "1px dashed rgba(148,163,184,0.3)",
            }}
          >
            <Typography color="text.secondary">
              Select a branch and semester to view subjects.
            </Typography>
          </Box>
        ) : loading ? (
          <Box
            sx={{
              textAlign: "center",
              py: 6,
            }}
          >
            <CircularProgress />

            <Typography
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Loading subjects...
            </Typography>
          </Box>
        ) : subjects.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 5,
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
              No Subjects Available
            </Typography>

            <Typography color="text.secondary">
              No study resources have been added for{" "}
              {branch} - Semester {semester} yet.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={700}>
                {branch} — Semester {semester}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Select a subject to view all available
                resources.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {subjects.map((subject) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={`${subject.subjectName}-${subject.subjectCode}`}
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
                        transform: "translateY(-5px)",
                        boxShadow:
                          "0 18px 40px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mb: 1 }}
                      >
                        {subject.subjectName}
                      </Typography>

                      {subject.subjectCode && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {subject.subjectCode}
                        </Typography>
                      )}

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          flex: 1,
                          mb: 3,
                          lineHeight: 1.6,
                        }}
                      >
                        Notes, PYQs, Quantum, important
                        questions and answers.
                      </Typography>

                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() =>
                          handleSubjectClick(subject)
                        }
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                        }}
                      >
                        Explore Subject
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default SubjectResources;