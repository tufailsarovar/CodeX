import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import emailjs from "@emailjs/browser";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
      );

      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, bgcolor: "rgba(15,23,42,0.9)" }}>
          <Typography variant="h4" fontWeight={700} mb={2}>
            Contact Us
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                label="Subject"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
              />
              <TextField
                label="Message"
                name="message"
                multiline
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
              />

              {success && (
                <Typography color="success.main">{success}</Typography>
              )}
              {error && <Typography color="error">{error}</Typography>}

              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
