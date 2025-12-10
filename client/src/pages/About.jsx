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
          CodeX is a digital store focused on college project selling. It is
          built as a MERN full-stack application where students can purchase
          ready-to-use academic projects with full source code, documentation
          and PPT.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          This platform is designed as a final year college project itself,
          showcasing real-world features like authentication, payment flow,
          secured downloads and email notifications.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <Typography variant="body1" color="text.secondary" paragraph>
            Purchase any project securely through Razorpay and get immediate
            access to the full project bundle — including source code,
            documentation, setup guide, and PPT — delivered instantly to your
            registered email.
          </Typography>
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, bgcolor: "rgba(15,23,42,0.8)" }}>
              <Typography variant="h6" gutterBottom>
                For Students
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Get complete, working projects with clean code. <br />
                • Learn MERN and frontend by reading real projects. <br />•
                Submit high-quality work with documentation and PPT.
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
                • Demonstrates mock payment and order handling. <br />•
                Implements secure download access on your Email.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h5" fontWeight={700} marginTop={5} gutterBottom>
          Terms & Conditions – CodeX
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <b>1. Digital Products Only</b> <br />CodeX sells digital coding projects, source
          code, documentation, and files. No physical items are shipped.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <b>2. No Refunds</b><br /> All purchases are final. Refunds are only given if the
          download link does not work and we cannot fix it.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <Typography variant="body1" color="text.secondary" paragraph>
            <b>3. Usage Rights</b><br /> You may use the purchased project for learning,
            college work, or personal use. You may not resell, share, or claim
            the project as your own.
          </Typography>
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <Typography variant="body1" color="text.secondary" paragraph>
            <b>4. Payments</b><br /> All payments must be completed online. Prices may change
            at any time.
          </Typography>
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <Typography variant="body1" color="text.secondary" paragraph>
            <b>5. Account Safety</b> <br />You are responsible for keeping your account and
            password safe.
          </Typography>
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <Typography variant="body1" color="text.secondary" paragraph>
           <b> 6. Intellectual Property </b> <br />All products, designs, and content belong
            to CodeX. Unauthorized sharing or copying is not allowed.
          </Typography>
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <Typography variant="body1" color="text.secondary" paragraph>
            <b>7. Liability</b><br /> CodeX is not responsible for any issues, errors, or
            damage caused by using the purchased code
          </Typography>
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          <Typography variant="body1" color="text.secondary" paragraph>
            <b>8. Updates</b><br /> We may update these terms anytime. Continued use of the
            site means you accept the changes.
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
