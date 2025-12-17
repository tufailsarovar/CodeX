import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Stack
} from "@mui/material";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // 🔹 Later you can connect backend or email service here
    setTimeout(() => {
      setSuccess("Your message has been sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1200);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, bgcolor: "rgba(15,23,42,0.9)" }}>
          <Typography variant="h4" fontWeight={700} mb={1}>
            Contact Us
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Have questions or need support? Get in touch with us.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Your Name"
                name="name"
                fullWidth
                required
                value={form.name}
                onChange={handleChange}
              />

              <TextField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
              />

              <TextField
                label="Subject"
                name="subject"
                fullWidth
                required
                value={form.subject}
                onChange={handleChange}
              />

              <TextField
                label="Description"
                name="message"
                fullWidth
                required
                multiline
                rows={4}
                value={form.message}
                onChange={handleChange}
              />

              {success && (
                <Typography color="success.main" variant="body2">
                  {success}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Stack>
          </Box>

          {/* Razorpay-friendly owner info */}
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mt={3}
            textAlign="center"
          >
            Managed by <strong>Tufail Sarovar</strong> | CEO, CodeX
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
