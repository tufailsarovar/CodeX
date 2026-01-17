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

        // ✅ sort: AVAILABLE first, LOCKED later
        const sortedProjects = res.data.sort((a, b) => {
          const aAvailable = Object.values(a.files || {}).some(
            (url) => typeof url === "string" && url.trim() !== ""
          );
          const bAvailable = Object.values(b.files || {}).some(
            (url) => typeof url === "string" && url.trim() !== ""
          );

          return Number(bAvailable) - Number(aAvailable);
        });

        setProjects(sortedProjects);
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

        <Grid container spacing={3}>
          {projects.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id}>
              <ProjectCard project={p} />
            </Grid>
          ))}

          {projects.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No projects yet. Add some from admin side.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default AllProjects;
