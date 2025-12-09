import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Tabs, Tab } from "@mui/material";
import api from "../../api/axios";
import ProjectCard from "../../components/Project/ProjectCard";

const ExploreProjects = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const params = category === "all" ? {} : { category };
        const res = await api.get("/projects", { params });
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, [category]);

  const handleTabChange = (e, newVal) => {
    setCategory(newVal);
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={1}>
          Explore Projects
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Filter by category to find perfect projects for your submission.
        </Typography>
        <Tabs
          value={category}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 4 }}
        >
          <Tab value="all" label="All" />
          <Tab value="frontend" label="Frontend" />
          <Tab value="mern" label="MERN Full Stack" />
        </Tabs>

        <Grid container spacing={3}>
          {projects.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <ProjectCard project={p} />
            </Grid>
          ))}
          {projects.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No projects found in this category.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ExploreProjects;
