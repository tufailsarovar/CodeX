import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import api from "../../api/axios";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("codex_token");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        setError("Failed to load project");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // ✅ RAZORPAY SDK LOADER (FIX)
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ============================
  // REAL RAZORPAY PAYMENT HANDLER
  // ============================
  const handleBuy = async () => {
    const token = localStorage.getItem("codex_token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // 1) Create order on backend
      const { data } = await api.post("/orders/create-order", {
        projectId: id,
      });

      // ✅ FIX: Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Razorpay SDK not loaded. Check internet.");
        return;
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "CodeX",
        description: data.project.title,
        order_id: data.order.id,

        handler: async function (response) {
          try {
            // 2) Verify payment on backend
            await api.post("/orders/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              project: id,
              amount: project.price,
            });

            alert(
              "Payment successful! Download link has been sent to your registered email."
            );
          } catch (err) {
            console.error("Verification failed:", err);
            alert("Payment captured but verification failed. Contact support.");
          }
        },

        theme: { color: "#6366F1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Unable to start payment. Try again.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 6 }}>
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  if (error || !project) {
    return (
      <Box sx={{ py: 6 }}>
        <Container>
          <Typography color="error">{error || "Project not found"}</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* LEFT SECTION */}
          <Grid item xs={12} md={7}>
            <Typography variant="overline" color="secondary.main">
              {project.category === "mern"
                ? "MERN Full Stack"
                : project.category === "frontend"
                ? "Frontend"
                : "Project"}
            </Typography>

            <Typography variant="h4" fontWeight={700} gutterBottom>
              {project.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {project.description}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
              {project.techStack?.map((tech) => (
                <Chip key={tech} label={tech} size="small" />
              ))}
            </Stack>

            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              ₹{project.price}
            </Typography>

            <Stack direction="row" spacing={2}>
              {project.livePreviewUrl && (
                <Button
                  variant="outlined"
                  onClick={() => window.open(project.livePreviewUrl, "_blank")}
                >
                  Live Preview
                </Button>
              )}

              <Button variant="contained" onClick={handleBuy}>
                Buy & Get ZIP
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT SECTION */}
          <Grid item xs={12} md={5}>
            <Paper
              sx={{
                overflow: "hidden",
                borderRadius: 3,
                border: "1px solid rgba(148,163,184,0.4)",
                mb: 2,
              }}
            >
              {project.screenshotUrl ? (
                <Box
                  component="img"
                  src={project.screenshotUrl}
                  alt={project.title}
                  sx={{ width: "100%", display: "block" }}
                />
              ) : (
                <Box sx={{ p: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Screenshot not available.
                  </Typography>
                </Box>
              )}
            </Paper>

            <Paper sx={{ p: 3, bgcolor: "rgba(15,23,42,0.9)" }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                What you will get
              </Typography>

              <Typography variant="body2" color="text.secondary">
                • Complete source code
                <br />
                • Documentation (DOC/PDF)
                <br />
                • PPT
                <br />• Setup instructions
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectDetails;
