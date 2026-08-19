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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
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

const PYQs = () => {
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!semester) {
      setResources([]);
      return;
    }

    const fetchPYQs = async () => {
      try {
        setLoading(true);

        const res = await api.get("/aktu", {
          params: {
            branch,
            semester,
            resourceType: "pyq",
          },
        });

        setResources(res.data || []);
      } catch (error) {
        console.error("PYQs load failed:", error);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPYQs();
  }, [branch, semester]);

  return (
    <Box sx={{ py: 7 }}>
      <Container maxWidth="lg">
        {/* HEADER */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <PictureAsPdfIcon
            sx={{
              fontSize: 45,
              color: "primary.main",
              mb: 1,
            }}
          />

          <Typography variant="h4" fontWeight={800}>
            AKTU Previous Year Questions
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Practice previous year question papers organized
            branch-wise, semester-wise and subject-wise.
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

        {/* RESULTS */}
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
              Select a branch and semester to view previous
              year papers.
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
              Loading previous year papers...
            </Typography>
          </Box>
        ) : resources.length === 0 ? (
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
              PYQs Not Available
            </Typography>

            <Typography color="text.secondary">
              No previous year papers have been uploaded for{" "}
              {branch} - Semester {semester} yet.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={700}>
                {branch} — Semester {semester} PYQs
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {resources.length} previous year paper
                {resources.length !== 1 ? "s" : ""} available
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {resources.map((resource) => (
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
                    <CardContent>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
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
                        <PictureAsPdfIcon />
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
                        sx={{ mb: 1 }}
                      >
                        {resource.subjectName}
                        {resource.subjectCode
                          ? ` (${resource.subjectCode})`
                          : ""}
                      </Typography>

                      {resource.year && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Year: {resource.year}
                        </Typography>
                      )}

                      {resource.description && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 3,
                            lineHeight: 1.6,
                          }}
                        >
                          {resource.description}
                        </Typography>
                      )}

                      {resource.fileUrl ? (
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
                          View / Download PYQ
                        </Button>
                      ) : resource.content ? (
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            borderRadius: 999,
                            textTransform: "none",
                          }}
                          onClick={() =>
                            window.alert(resource.content)
                          }
                        >
                          View Questions
                        </Button>
                      ) : (
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

export default PYQs;