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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";

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

const Notes = () => {
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("");

  const [resources, setResources] = useState([]);

  const [loading, setLoading] = useState(false);

  const [selectedResource, setSelectedResource] =
    useState(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  useEffect(() => {
    if (!semester) {
      setResources([]);
      return;
    }

    const fetchNotes = async () => {
      try {
        setLoading(true);

        const res = await api.get("/aktu", {
          params: {
            branch,
            semester,
            resourceType: "notes",
          },
        });

        setResources(
          Array.isArray(res.data)
            ? res.data
            : []
        );
      } catch (error) {
        console.error(
          "Notes load failed:",
          error
        );

        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [branch, semester]);

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

        {/* =========================
            HERO
        ========================= */}

        <Box
          sx={{
            textAlign: "center",
            maxWidth: 850,
            mx: "auto",
            mb: {
              xs: 4,
              md: 6,
            },
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              mx: "auto",
              mb: 2,
              borderRadius: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, rgba(99,102,241,.25), rgba(59,130,246,.12))",
              border:
                "1px solid rgba(129,140,248,.25)",
              boxShadow:
                "0 15px 45px rgba(79,70,229,.15)",
            }}
          >
            <AutoStoriesIcon
              sx={{
                fontSize: 38,
                color: "primary.main",
              }}
            />
          </Box>

          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
              background:
                "linear-gradient(90deg,#fff,#a5b4fc)",
              WebkitBackgroundClip:
                "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            AKTU Notes
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 2,
              lineHeight: 1.8,
              fontSize: {
                xs: ".95rem",
                md: "1.05rem",
              },
            }}
          >
            Find high-quality AKTU notes organized
            branch-wise, semester-wise and
            subject-wise.
          </Typography>
        </Box>

        {/* =========================
            FILTER CARD
        ========================= */}

        <Card
          sx={{
            maxWidth: 900,
            mx: "auto",
            mb: 6,
            p: {
              xs: 1,
              md: 2,
            },
            borderRadius: 5,
            background:
              "linear-gradient(145deg, rgba(15,23,42,.95), rgba(2,6,23,.98))",
            border:
              "1px solid rgba(148,163,184,.15)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,.2)",
          }}
        >
          <CardContent>
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <FormControl fullWidth>
                <InputLabel>
                  Branch
                </InputLabel>

                <Select
                  value={branch}
                  label="Branch"
                  onChange={(e) =>
                    setBranch(
                      e.target.value
                    )
                  }
                  sx={{
                    borderRadius: 3,
                  }}
                >
                  {branches.map(
                    (item) => (
                      <MenuItem
                        key={item}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>
                  Semester
                </InputLabel>

                <Select
                  value={semester}
                  label="Semester"
                  onChange={(e) =>
                    setSemester(
                      e.target.value
                    )
                  }
                  sx={{
                    borderRadius: 3,
                  }}
                >
                  {semesters.map(
                    (item) => (
                      <MenuItem
                        key={item}
                        value={item}
                      >
                        Semester {item}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Stack>
          </CardContent>
        </Card>

        {/* =========================
            NO SEMESTER
        ========================= */}

        {!semester ? (
          <Box
            sx={{
              py: 8,
              px: 3,
              textAlign: "center",
              borderRadius: 5,
              border:
                "1px dashed rgba(148,163,184,.25)",
              background:
                "rgba(15,23,42,.35)",
            }}
          >
            <SchoolIcon
              sx={{
                fontSize: 50,
                color: "primary.main",
                mb: 1,
              }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Select Your Semester
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Choose your branch and semester
              to explore available notes.
            </Typography>
          </Box>
        ) : loading ? (
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
              Loading notes...
            </Typography>
          </Box>
        ) : resources.length === 0 ? (
          <Box
            sx={{
              py: 8,
              textAlign: "center",
              borderRadius: 5,
              border:
                "1px dashed rgba(148,163,184,.25)",
            }}
          >
            <DescriptionIcon
              sx={{
                fontSize: 50,
                color: "text.secondary",
                mb: 1,
              }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Notes Not Available
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              No notes have been uploaded for{" "}
              {branch} — Semester {semester}.
            </Typography>
          </Box>
        ) : (
          <>
            {/* =========================
                RESULTS HEADER
            ========================= */}

            <Box sx={{ mb: 4 }}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                justifyContent="space-between"
                alignItems={{
                  xs: "flex-start",
                  sm: "center",
                }}
                gap={2}
              >
                <Box>
                  <Typography
                    variant="h4"
                    fontWeight={900}
                    sx={{
                      fontSize: {
                        xs: "1.7rem",
                        md: "2.2rem",
                      },
                    }}
                  >
                    {branch} — Semester{" "}
                    {semester}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Notes & study material
                  </Typography>
                </Box>

                <Chip
                  icon={<DescriptionIcon />}
                  label={`${resources.length} ${
                    resources.length === 1
                      ? "Note"
                      : "Notes"
                  }`}
                  color="primary"
                  variant="outlined"
                />
              </Stack>
            </Box>

            {/* =========================
                NOTE CARDS
            ========================= */}

            <Grid container spacing={3}>
              {resources.map(
                (resource) => (
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
                        overflow: "hidden",
                        borderRadius: 5,
                        border:
                          "1px solid rgba(148,163,184,.15)",
                        background:
                          "linear-gradient(145deg, rgba(15,23,42,.96), rgba(2,6,23,.98))",
                        transition:
                          "all .3s ease",
                        display: "flex",
                        flexDirection:
                          "column",
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
                          height: 210,
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
                              width: "100%",
                              height: "100%",
                              objectFit:
                                "cover",
                              display:
                                "block",
                              transition:
                                "transform .5s ease",
                              "&:hover": {
                                transform:
                                  "scale(1.06)",
                              },
                            }}
                          />
                        ) : null}

                        {/* fallback */}
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
                          <DescriptionIcon
                            sx={{
                              fontSize: 58,
                              color:
                                "primary.main",
                              mb: 1,
                            }}
                          />

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            AKTU Notes
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            position:
                              "absolute",
                            top: 14,
                            left: 14,
                          }}
                        >
                          <Chip
                            label="NOTES"
                            size="small"
                            sx={{
                              color: "#fff",
                              fontWeight: 800,
                              background:
                                "rgba(79,70,229,.85)",
                              backdropFilter:
                                "blur(8px)",
                            }}
                          />
                        </Box>
                      </Box>

                      {/* CONTENT */}
                      <CardContent
                        sx={{
                          p: 3,
                          display: "flex",
                          flexDirection:
                            "column",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          sx={{
                            mb: 1,
                            lineHeight: 1.35,
                          }}
                        >
                          {
                            resource.title
                          }
                        </Typography>

                        <Typography
                          variant="body2"
                          color="primary.main"
                          fontWeight={600}
                          sx={{ mb: 1.5 }}
                        >
                          {
                            resource.subjectName
                          }

                          {resource.subjectCode
                            ? ` • ${resource.subjectCode}`
                            : ""}
                        </Typography>

                        {resource.unit && (
                          <Chip
                            label={
                              resource.unit
                            }
                            size="small"
                            variant="outlined"
                            sx={{
                              alignSelf:
                                "flex-start",
                              mb: 1.5,
                            }}
                          />
                        )}

                        {resource.description && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              lineHeight: 1.7,
                              mb: 2,
                              display:
                                "-webkit-box",
                              WebkitLineClamp: 3,
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

                        <Box sx={{ flex: 1 }} />

                        <Stack spacing={1.2}>
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
                                borderRadius: 999,
                                py: 1.2,
                                textTransform:
                                  "none",
                                fontWeight: 700,
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
                                borderRadius: 999,
                                py: 1.2,
                                textTransform:
                                  "none",
                                fontWeight: 700,
                              }}
                            >
                              Read Notes
                            </Button>
                          )}

                          {!resource.fileUrl &&
                            !resource.content && (
                              <Button
                                variant="outlined"
                                disabled
                                fullWidth
                                sx={{
                                  borderRadius: 999,
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
                )
              )}
            </Grid>
          </>
        )}
      </Container>

      {/* =========================
          CONTENT DIALOG
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
            maxHeight: "85vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            pr: 6,
            fontWeight: 800,
          }}
        >
          {selectedResource?.title}

          <IconButton
            onClick={closeContent}
            sx={{
              position: "absolute",
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
                maxHeight: 320,
                objectFit: "cover",
                borderRadius: 3,
                mb: 3,
              }}
            />
          )}

          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.9,
              color: "text.secondary",
            }}
          >
            {selectedResource?.content}
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
                textTransform: "none",
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
              textTransform: "none",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notes;