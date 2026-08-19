import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  TextField,
  Chip,
  Stack,
  InputAdornment,
  Skeleton,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarIcon from "@mui/icons-material/Star";
import QuizIcon from "@mui/icons-material/Quiz";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ImageIcon from "@mui/icons-material/Image";

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

const typeConfig = {
  syllabus: {
    label: "Syllabus",
    icon: <MenuBookIcon />,
  },
  notes: {
    label: "Notes",
    icon: <MenuBookIcon />,
  },
  "important-questions": {
    label: "Important Questions",
    icon: <StarIcon />,
  },
  pyq: {
    label: "Previous Year Paper",
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

const priorityConfig = {
  normal: {
    label: "Normal",
  },
  important: {
    label: "Important",
  },
  "very-important": {
    label: "Very Important",
  },
};

const AKTUResourceList = ({
  resourceType,
  title,
  description,
  icon,
}) => {
  const [branch, setBranch] = useState("CSE");
  const [semester, setSemester] = useState("");
  const [resources, setResources] = useState([]);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const config =
    typeConfig[resourceType] || {
      label: "AKTU Resources",
      icon: <SchoolIcon />,
    };

  /* =========================
     FETCH
  ========================= */

  useEffect(() => {
    if (!semester) {
      setResources([]);
      return;
    }

    const fetchResources = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/aktu", {
          params: {
            branch,
            semester,
            resourceType,
          },
        });

        setResources(
          Array.isArray(res.data)
            ? res.data
            : []
        );
      } catch (err) {
        console.error(
          "AKTU resource load failed:",
          err
        );

        setResources([]);

        setError(
          err.response?.data?.message ||
            "Unable to load resources right now."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [branch, semester, resourceType]);

  /* =========================
     SEARCH
  ========================= */

  const filteredResources = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    if (!value) {
      return resources;
    }

    return resources.filter((item) => {
      return [
        item.title,
        item.subjectName,
        item.subjectCode,
        item.description,
        item.unit,
        item.content,
        item.year,
      ]
        .filter(Boolean)
        .some((field) =>
          String(field)
            .toLowerCase()
            .includes(value)
        );
    });
  }, [resources, search]);

  /* =========================
     IMAGE ERROR
  ========================= */

  const hideBrokenImage = (event) => {
    event.currentTarget.style.display =
      "none";

    const fallback =
      event.currentTarget.parentElement?.querySelector(
        ".image-fallback"
      );

    if (fallback) {
      fallback.style.display = "flex";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: {
          xs: 4,
          md: 7,
        },
        background:
          "linear-gradient(180deg,#080d1d 0%,#050816 45%,#020617 100%)",
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
            px: {
              xs: 2,
              md: 6,
            },
            py: {
              xs: 5,
              md: 7,
            },
            mb: 4,
            borderRadius: 5,
            border:
              "1px solid rgba(129,140,248,0.18)",
            background:
              "radial-gradient(circle at 50% 0%, rgba(79,70,229,0.25), transparent 55%), linear-gradient(145deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.3)",
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              mx: "auto",
              mb: 2,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.light",
              background:
                "linear-gradient(135deg,rgba(99,102,241,0.3),rgba(59,130,246,0.12))",
              border:
                "1px solid rgba(129,140,248,0.25)",
              boxShadow:
                "0 15px 40px rgba(79,70,229,0.18)",
            }}
          >
            {icon || config.icon}
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
              backgroundClip: "text",
              WebkitBackgroundClip:
                "text",
              color: "transparent",
            }}
          >
            {title || config.label}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 760,
              mx: "auto",
              mt: 2,
              lineHeight: 1.8,
              fontSize: {
                xs: "0.95rem",
                md: "1.05rem",
              },
            }}
          >
            {description ||
              `Find high-quality AKTU ${config.label.toLowerCase()} resources organized by branch and semester.`}
          </Typography>
        </Box>

        {/* =========================
            FILTER PANEL
        ========================= */}

        <Card
          sx={{
            p: {
              xs: 2,
              md: 3,
            },
            mb: 5,
            borderRadius: 4,
            background:
              "linear-gradient(145deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))",
            border:
              "1px solid rgba(148,163,184,0.16)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
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
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
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
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
            >
              <TextField
                fullWidth
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search subject, title, code, unit..."
                disabled={!semester}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Card>

        {/* =========================
            INITIAL STATE
        ========================= */}

        {!semester && (
          <Box
            sx={{
              py: 9,
              px: 2,
              textAlign: "center",
              borderRadius: 5,
              border:
                "1px dashed rgba(148,163,184,0.25)",
              background:
                "rgba(15,23,42,0.35)",
            }}
          >
            <SchoolIcon
              sx={{
                fontSize: 65,
                color:
                  "rgba(129,140,248,0.65)",
                mb: 2,
              }}
            />

            <Typography
              variant="h5"
              fontWeight={800}
            >
              Select Your Semester
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Choose your branch and
              semester above to explore
              {` ${config.label.toLowerCase()}`}
              .
            </Typography>
          </Box>
        )}

        {/* =========================
            LOADING
        ========================= */}

        {semester && loading && (
          <Grid
            container
            spacing={3}
          >
            {[1, 2, 3].map(
              (item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={item}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: "hidden",
                      background:
                        "rgba(15,23,42,0.9)",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={210}
                    />

                    <Box sx={{ p: 3 }}>
                      <Skeleton
                        width="80%"
                        height={32}
                      />

                      <Skeleton
                        width="60%"
                      />

                      <Skeleton
                        width="100%"
                        height={70}
                      />
                    </Box>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        )}

        {/* =========================
            ERROR
        ========================= */}

        {semester &&
          !loading &&
          error && (
            <Box
              sx={{
                py: 7,
                textAlign: "center",
                borderRadius: 4,
                border:
                  "1px solid rgba(248,113,113,0.2)",
                background:
                  "rgba(127,29,29,0.12)",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={800}
                color="error.light"
              >
                Unable to load resources
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                {error}
              </Typography>
            </Box>
          )}

        {/* =========================
            RESULTS
        ========================= */}

        {semester &&
          !loading &&
          !error && (
            <>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: {
                    xs: "flex-start",
                    md: "center",
                  },
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight={900}
                  >
                    {branch} — Semester{" "}
                    {semester}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {filteredResources.length}{" "}
                    {config.label.toLowerCase()}{" "}
                    available
                  </Typography>
                </Box>

                {search && (
                  <Chip
                    label={`Search: ${search}`}
                    onDelete={() =>
                      setSearch("")
                    }
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Box>

              {filteredResources.length ===
              0 ? (
                <Box
                  sx={{
                    py: 8,
                    textAlign: "center",
                    borderRadius: 5,
                    border:
                      "1px dashed rgba(148,163,184,0.25)",
                  }}
                >
                  <SearchIcon
                    sx={{
                      fontSize: 55,
                      color:
                        "text.secondary",
                      mb: 1,
                    }}
                  />

                  <Typography
                    variant="h6"
                    fontWeight={800}
                  >
                    No resources found
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Try another search or
                    select another semester.
                  </Typography>
                </Box>
              ) : (
                <Grid
                  container
                  spacing={3}
                >
                  {filteredResources.map(
                    (resource) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={4}
                        key={
                          resource._id
                        }
                      >
                        <Card
                          sx={{
                            height: "100%",
                            overflow:
                              "hidden",
                            borderRadius: 4,
                            display:
                              "flex",
                            flexDirection:
                              "column",
                            background:
                              "linear-gradient(180deg,rgba(15,23,42,0.98),rgba(2,6,23,0.98))",
                            border:
                              "1px solid rgba(148,163,184,0.16)",
                            transition:
                              "all 0.28s ease",
                            "&:hover": {
                              transform:
                                "translateY(-7px)",
                              borderColor:
                                "rgba(99,102,241,0.5)",
                              boxShadow:
                                "0 25px 60px rgba(0,0,0,0.4)",
                            },
                          }}
                        >
                          {/* IMAGE */}

                          <Box
                            sx={{
                              height: 220,
                              position:
                                "relative",
                              overflow:
                                "hidden",
                              background:
                                "linear-gradient(135deg,#111827,#020617)",
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
                                onError={
                                  hideBrokenImage
                                }
                                sx={{
                                  width:
                                    "100%",
                                  height:
                                    "100%",
                                  objectFit:
                                    "cover",
                                  display:
                                    "block",
                                }}
                              />
                            ) : null}

                            {/* FALLBACK */}

                            <Box
                              className="image-fallback"
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
                                color:
                                  "rgba(148,163,184,0.7)",
                              }}
                            >
                              <ImageIcon
                                sx={{
                                  fontSize: 60,
                                  mb: 1,
                                }}
                              />

                              <Typography
                                variant="body2"
                              >
                                No image
                                available
                              </Typography>
                            </Box>

                            {/* OVERLAY */}

                            <Box
                              sx={{
                                position:
                                  "absolute",
                                inset: 0,
                                background:
                                  "linear-gradient(180deg,rgba(0,0,0,0.05) 35%,rgba(2,6,23,0.9) 100%)",
                                pointerEvents:
                                  "none",
                              }}
                            />

                            {/* TYPE */}

                            <Chip
                              icon={
                                config.icon
                              }
                              label={
                                config.label
                              }
                              size="small"
                              sx={{
                                position:
                                  "absolute",
                                top: 14,
                                left: 14,
                                color:
                                  "#fff",
                                background:
                                  "rgba(15,23,42,0.88)",
                                backdropFilter:
                                  "blur(10px)",
                                fontWeight: 800,
                              }}
                            />

                            {/* PRIORITY */}

                            {resource.priority &&
                              resource.priority !==
                                "normal" && (
                                <Chip
                                  label={
                                    priorityConfig[
                                      resource
                                        .priority
                                    ]?.label ||
                                    resource.priority
                                  }
                                  size="small"
                                  color={
                                    resource.priority ===
                                    "very-important"
                                      ? "error"
                                      : "warning"
                                  }
                                  sx={{
                                    position:
                                      "absolute",
                                    top: 14,
                                    right: 14,
                                    fontWeight: 800,
                                  }}
                                />
                              )}
                          </Box>

                          {/* CARD CONTENT */}

                          <Box
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
                              fontWeight={900}
                              sx={{
                                mb: 1,
                                lineHeight:
                                  1.35,
                                color:
                                  "#f8fafc",
                              }}
                            >
                              {
                                resource.title
                              }
                            </Typography>

                            <Typography
                              variant="body2"
                              color="primary.light"
                              fontWeight={700}
                              sx={{
                                mb: 0.5,
                              }}
                            >
                              {
                                resource.subjectName
                              }
                            </Typography>

                            {resource.subjectCode && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mb: 1.5,
                                }}
                              >
                                {
                                  resource.subjectCode
                                }
                              </Typography>
                            )}

                            <Divider
                              sx={{
                                mb: 2,
                                borderColor:
                                  "rgba(148,163,184,0.12)",
                              }}
                            />

                            {/* META */}

                            <Stack
                              direction="row"
                              spacing={1}
                              flexWrap="wrap"
                              useFlexGap
                              sx={{
                                mb: 2,
                              }}
                            >
                              {resource.unit && (
                                <Chip
                                  size="small"
                                  label={
                                    resource.unit
                                  }
                                  variant="outlined"
                                />
                              )}

                              {resource.year && (
                                <Chip
                                  size="small"
                                  icon={
                                    <CalendarMonthIcon />
                                  }
                                  label={
                                    resource.year
                                  }
                                  variant="outlined"
                                />
                              )}

                              {resource.questionFrequency >
                                0 && (
                                <Chip
                                  size="small"
                                  icon={
                                    <TrendingUpIcon />
                                  }
                                  label={`${resource.questionFrequency}x frequency`}
                                  color="primary"
                                  variant="outlined"
                                />
                              )}
                            </Stack>

                            {/* DESCRIPTION */}

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

                            {/* CONTENT */}

                            {resource.content && (
                              <Box
                                sx={{
                                  mb: 2,
                                  p: 1.5,
                                  borderRadius: 2,
                                  background:
                                    "rgba(99,102,241,0.06)",
                                  border:
                                    "1px solid rgba(99,102,241,0.1)",
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{
                                    display:
                                      "block",
                                    mb: 0.5,
                                    fontWeight:
                                      700,
                                  }}
                                >
                                  CONTENT
                                </Typography>

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    display:
                                      "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient:
                                      "vertical",
                                    overflow:
                                      "hidden",
                                    lineHeight:
                                      1.6,
                                  }}
                                >
                                  {
                                    resource.content
                                  }
                                </Typography>
                              </Box>
                            )}

                            <Box
                              sx={{
                                mt: "auto",
                              }}
                            >
                              {resource.fileUrl ? (
                                <Button
                                  fullWidth
                                  variant="contained"
                                  startIcon={
                                    <PictureAsPdfIcon />
                                  }
                                  href={
                                    resource.fileUrl
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  sx={{
                                    borderRadius: 999,
                                    py: 1.2,
                                    textTransform:
                                      "none",
                                    fontWeight: 800,
                                  }}
                                >
                                  View / Download
                                </Button>
                              ) : (
                                <Button
                                  fullWidth
                                  variant="outlined"
                                  startIcon={
                                    <VisibilityIcon />
                                  }
                                  disabled
                                  sx={{
                                    borderRadius: 999,
                                    py: 1.2,
                                    textTransform:
                                      "none",
                                  }}
                                >
                                  Content Available
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    )
                  )}
                </Grid>
              )}
            </>
          )}
      </Container>
    </Box>
  );
};

export default AKTUResourceList;