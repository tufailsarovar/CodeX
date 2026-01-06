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
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("codex_token", res.data.token);
      localStorage.setItem("codex_user", JSON.stringify(res.data));
      if (res.data.isAdmin) {
        navigate("/admin/dashboard"); // ADMIN LOGIN
      } else {
        navigate("/"); // NORMAL USER
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, bgcolor: "rgba(15,23,42,0.9)" }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Login to CodeX
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Access your purchased projects and continue learning.
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                fullWidth
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Button component={Link} to="/signup" size="small">
                  Sign up
                </Button>
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
