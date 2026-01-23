import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import api from "../../api/axios";
import ProjectCard from "../../components/Project/ProjectCard";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem("codex_projects");
    if (cached) {
      setProjects(JSON.parse(cached));
      return;
    }

    api.get("/projects").then((res) => {
      localStorage.setItem("codex_projects", JSON.stringify(res.data));
      setProjects(res.data);
    });
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={3}>
          All Projects
        </Typography>

        <Grid container spacing={3}>
          {projects.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <ProjectCard project={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AllProjects;
