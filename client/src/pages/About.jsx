import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} gutterBottom>
          About CodeX
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          CodeX is a digital store focused on college project selling. It is built as a MERN full-stack application
          where students can purchase ready-to-use academic projects with full source code, documentation and PPT.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          This platform is designed as a final year college project itself, showcasing real-world features like
          authentication, payment flow, secured downloads and email notifications.
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, bgcolor: "rgba(15,23,42,0.8)" }}>
              <Typography variant="h6" gutterBottom>
                For Students
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Get complete, working projects with clean code. <br />
                • Learn MERN and frontend by reading real projects. <br />
                • Submit high-quality work with documentation and PPT.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, bgcolor: "rgba(15,23,42,0.8)" }}>
              <Typography variant="h6" gutterBottom>
                For Demonstration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Showcases secure user authentication. <br />
                • Demonstrates mock payment and order handling. <br />
                • Implements secure download access via backend.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
