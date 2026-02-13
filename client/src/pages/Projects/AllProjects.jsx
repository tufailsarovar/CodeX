import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import api from "../../api/axios";
import ProjectCard from "../../components/Project/ProjectCard";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={3}>
          All Projects
        </Typography>

        <Grid container spacing={3} alignItems="stretch">
          {projects.map((p) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={p._id}
              sx={{ display: "flex" }}
            >
              <ProjectCard project={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AllProjects;
