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
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ NEW STATE
  const [selectedItems, setSelectedItems] = useState({
    sourceCode: true,
    ppt: true,
    documentation: true,
  });

  const token = localStorage.getItem("codex_token");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // ✅ PRICE CALCULATION
  const calculatePrice = () => {
    let total = 0;

    if (selectedItems.sourceCode && project.files?.sourceCode) {
      total += project.itemPrices?.sourceCode || 0;
    }

    if (selectedItems.ppt && project.files?.ppt) {
      total += project.itemPrices?.ppt || 0;
    }

    if (selectedItems.documentation && project.files?.documentation) {
      total += project.itemPrices?.documentation || 0;
    }

    return total;
  };

  // =====================
  // BUY HANDLER (SINGLE)
  // =====================
  const handleBuy = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    const amount = calculatePrice();
    if (amount === 0) {
      alert("Please select at least one item");
      return;
    }

    try {
      const { data } = await api.post("/orders/create-order", {
        projectId: id,
        items: selectedItems,
        amount,
      });

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: data.key,
          amount: data.order.amount,
          currency: "INR",
          name: "CodeX",
          description: project.title,
          order_id: data.order.id,
          handler: async function (response) {
            await api.post("/orders/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              project: id,
              items: selectedItems,
              amount,
            });

            alert("Payment successful! Download link sent to email.");
          },
          theme: { color: "#6366F1" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (err) {
      alert("Payment failed");
    }
  };

  if (loading)
    return (
      <Container sx={{ py: 6 }}>
        <Typography>Loading...</Typography>
      </Container>
    );

  if (error || !project)
    return (
      <Container sx={{ py: 6 }}>
        <Typography color="error">Project not found</Typography>
      </Container>
    );

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* LEFT */}
          <Grid item xs={12} md={7}>
            <Typography variant="overline" color="secondary.main">
              {project.category}
            </Typography>

            <Typography variant="h4" fontWeight={700} gutterBottom>
              {project.title}
            </Typography>

            <Typography color="text.secondary" paragraph>
              {project.description}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
              {project.techStack?.map((tech) => (
                <Chip key={tech} label={tech} size="small" />
              ))}
            </Stack>

            {/* PRICE */}
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              {project.originalPrice && (
                <span
                  style={{
                    textDecoration: "line-through",
                    marginRight: "10px",
                    fontWeight: 500,
                    opacity: 0.7,
                  }}
                >
                  ₹{project.originalPrice}
                </span>
              )}
              <span>₹{calculatePrice()}</span>
            </Typography>

            {/* CHECKBOXES */}
            <Stack spacing={1} sx={{ mb: 2 }}>
              {/* SOURCE CODE */}
              <label>
                <input
                  type="checkbox"
                  disabled={!project.files?.sourceCode}
                  checked={selectedItems.sourceCode}
                  onChange={(e) =>
                    setSelectedItems({
                      ...selectedItems,
                      sourceCode: e.target.checked,
                    })
                  }
                />{" "}
                <span
                  style={{
                    textDecoration: project.files?.sourceCode
                      ? "none"
                      : "line-through",
                    opacity: project.files?.sourceCode ? 1 : 0.5,
                  }}
                >
                  Source Code (₹{project.itemPrices?.sourceCode})
                </span>
                {!project.files?.sourceCode && (
                  <span
                    style={{ marginLeft: 6, color: "#facc15", fontWeight: 500 }}
                  >
                    — Not available
                  </span>
                )}
              </label>

              {/* PPT */}
              <label>
                <input
                  type="checkbox"
                  disabled={!project.files?.ppt}
                  checked={selectedItems.ppt}
                  onChange={(e) =>
                    setSelectedItems({
                      ...selectedItems,
                      ppt: e.target.checked,
                    })
                  }
                />{" "}
                <span
                  style={{
                    textDecoration: project.files?.ppt
                      ? "none"
                      : "line-through",
                    opacity: project.files?.ppt ? 1 : 0.5,
                  }}
                >
                  PPT (₹{project.itemPrices?.ppt})
                </span>
                {!project.files?.ppt && (
                  <span
                    style={{ marginLeft: 6, color: "#facc15", fontWeight: 500 }}
                  >
                    — Not available
                  </span>
                )}
              </label>

              {/* DOCUMENTATION */}
              <label>
                <input
                  type="checkbox"
                  disabled={!project.files?.documentation}
                  checked={selectedItems.documentation}
                  onChange={(e) =>
                    setSelectedItems({
                      ...selectedItems,
                      documentation: e.target.checked,
                    })
                  }
                />{" "}
                <span
                  style={{
                    textDecoration: project.files?.documentation
                      ? "none"
                      : "line-through",
                    opacity: project.files?.documentation ? 1 : 0.5,
                  }}
                >
                  Documentation (₹{project.itemPrices?.documentation})
                </span>
                {!project.files?.documentation && (
                  <span
                    style={{ marginLeft: 6, color: "#facc15", fontWeight: 500 }}
                  >
                    — Not available
                  </span>
                )}
              </label>
            </Stack>

            {/* SINGLE BUY BUTTON */}
            <Button
              variant="contained"
              disabled={calculatePrice() === 0}
              onClick={handleBuy}
            >
              Buy Now
            </Button>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: "sticky", top: 80 }}>
              {/* IMAGE */}
              <Paper
                sx={{
                  overflow: "hidden",
                  borderRadius: 3,
                  mb: 2,
                  border: "1px solid rgba(148,163,184,0.4)",
                }}
              >
                <img
                  src={project.screenshotUrl}
                  alt={project.title}
                  style={{ width: "100%", display: "block" }}
                />
              </Paper>

              {/* WHAT YOU WILL GET (RESTORED) */}
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
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectDetails;
