import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        bgcolor: "rgba(15,23,42,0.9)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 40px rgba(15,23,42,0.7)"
        }
      }}
    >
      {project.screenshotUrl && (
        <CardMedia
          component="img"
          height="160"
          image={project.screenshotUrl}
          alt={project.title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" color="secondary.main" fontWeight={600} gutterBottom>
          {project.category === "mern" ? "MERN Full Stack" : project.category === "frontend" ? "Frontend" : "Project"}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }} noWrap>
          {project.description}
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mb: 1 }}>
          {project.techStack?.slice(0, 4).map((tech) => (
            <Chip key={tech} label={tech} size="small" variant="outlined" />
          ))}
        </Stack>
        <Typography variant="subtitle1" fontWeight={700}>
          ₹{project.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
        {project.livePreviewUrl && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => window.open(project.livePreviewUrl, "_blank")}
          >
            Live Preview
          </Button>
        )}
        <Button
          size="small"
          variant="contained"
          onClick={() => navigate(`/projects/${project._id}`)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
