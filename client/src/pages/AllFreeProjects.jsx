import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import api from "../api/axios";

const AllFreeProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchFreeProjects = async () => {
      try {
        const res = await api.get("/free-projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFreeProjects();
  }, []);

  return (
    <Box sx={{ py: 6, backgroundColor: "#020617",mt: "5", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Free Projects
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={4}>
          All open-source projects available for free download.
        </Typography>

        <Grid container spacing={3}>
          {projects.map((p) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
              <Paper
                sx={{
                  minWidth: 288,
                  maxWidth: 288,
                  mx: "auto",
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  background:
                    "linear-gradient(180deg, rgba(15,23,42,0.88), rgba(2,6,23,0.95))",
                  border: "1px solid rgba(148,163,184,0.25)",
                  boxShadow: "0 8px 20px rgba(0,0,0,.25)",
                  transition: "box-shadow .35s ease, border-color .35s ease",
                  "&:hover": {
                    borderColor: "rgba(99,102,241,.6)",
                    boxShadow: "0 16px 40px rgba(79,70,229,.35)",
                  },
                }}
              >
                {/* FREE RIBBON */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: -36,
                    transform: "rotate(-45deg)",
                    background:
                      "linear-gradient(90deg, #22c55e, #4ade80)",
                    color: "#022c22",
                    px: 5,
                    py: 0.35,
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.8px",
                    zIndex: 2,
                  }}
                >
                  FREE
                </Box>

                {/* VIDEO */}
                {p.videoUrl && (
                  <video
                    src={p.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: 152,
                      objectFit: "cover",
                    }}
                  />
                )}

                {/* CONTENT */}
                <Box sx={{ p: 2 }}>
                  <Typography fontWeight={800} sx={{ mb: 0.4 }}>
                    {p.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.2, lineHeight: 1.5 }}
                  >
                    {p.description?.slice(0, 90)}...
                  </Typography>

                  {/* TECH STACK */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.6,
                      mb: 1.5,
                    }}
                  >
                    {p.techStack?.slice(0, 4).map((tech, i) => (
                      <Box
                        key={i}
                        sx={{
                          px: 1,
                          py: 0.25,
                          fontSize: "10px",
                          borderRadius: 999,
                          color: "#c7d2fe",
                          background:
                            "rgba(99,102,241,0.15)",
                          border:
                            "1px solid rgba(99,102,241,0.35)",
                        }}
                      >
                        {tech}
                      </Box>
                    ))}
                  </Box>

                  <Button
                    href={p.githubLink}
                    target="_blank"
                    fullWidth
                    size="small"
                    sx={{
                      borderRadius: 999,
                      fontWeight: 600,
                      textTransform: "none",
                      color: "#e0f2fe",
                      background:
                        "linear-gradient(90deg, rgba(99,102,241,.85), rgba(34,211,238,.85))",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, rgba(99,102,241,1), rgba(34,211,238,1))",
                      },
                    }}
                  >
                    Download Code
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {projects.length === 0 && (
          <Typography variant="body2" color="text.secondary" mt={3}>
            No free projects found.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default AllFreeProjects;
