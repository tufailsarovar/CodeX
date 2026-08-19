import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useScrollTrigger,
  Menu,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/TravelExplore";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Link, useLocation, useNavigate } from "react-router-dom";

/* ---------- Elevation Scroll ---------- */
const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  return React.cloneElement(children, {
    sx: {
      ...(children.props.sx || {}),
      background: trigger
        ? "rgba(15,23,42,0.96)"
        : "linear-gradient(90deg, rgba(15,23,42,0.92), rgba(15,23,42,0.92))",
      backdropFilter: "blur(16px)",
      boxShadow: trigger
        ? "0 18px 45px rgba(15,23,42,0.8)"
        : "0 1px 0 rgba(148,163,184,0.35)",
      borderBottom: "1px solid rgba(148,163,184,0.25)",
    },
  });
};

/* ---------- Navbar ---------- */
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("codex_token");
  const user = JSON.parse(localStorage.getItem("codex_user"));
  const isAdmin = user?.isAdmin;

  const [open, setOpen] = useState(false);
  const [aktuAnchor, setAktuAnchor] = useState(null);

  const toggleDrawer = () => setOpen((prev) => !prev);

  const handleAktuOpen = (event) => {
    setAktuAnchor(event.currentTarget);
  };

  const handleAktuClose = () => {
    setAktuAnchor(null);
  };

  const handleAktuNavigate = (path) => {
    handleAktuClose();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("codex_token");
    localStorage.removeItem("codex_user");
    navigate("/");
  };

  const menuItems = [
    {
      text: "Home",
      to: "/",
      icon: <HomeIcon fontSize="small" />,
    },
    {
      text: "About",
      to: "/about",
      icon: <InfoIcon fontSize="small" />,
    },
    {
      text: "All Projects",
      to: "/projects",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      text: "Explore",
      to: "/explore",
      icon: <ExploreIcon fontSize="small" />,
    },
    {
      text: "Contact",
      to: "/contact",
      icon: <ContactMailIcon fontSize="small" />,
    },
  ];

  const aktuItems = [
    {
      text: "Study Hub",
      to: "/aktu",
    },
    {
      text: "Syllabus",
      to: "/aktu/syllabus",
    },
    {
      text: "Notes",
      to: "/aktu/notes",
    },
    {
      text: "Important Questions",
      to: "/aktu/important-questions",
    },
    {
      text: "PYQs",
      to: "/aktu/pyqs",
    },
    {
      text: "Quantum",
      to: "/aktu/quantum",
    },
    {
      text: "Question & Answers",
      to: "/aktu/question-answers",
    },
  ];

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  const isAktuActive = location.pathname.startsWith("/aktu");

  return (
    <>
      <ElevationScroll>
        <AppBar position="sticky" elevation={0}>
          <Toolbar
            sx={{
              maxWidth: 1180,
              mx: "auto",
              width: "100%",
              px: { xs: 2, sm: 3 },
              minHeight: 70,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                src="images/logo.png"
                alt="CodeX Logo"
                sx={{ height: 50, width: 50, cursor: "pointer" }}
                onClick={() => navigate("/")}
              />

              <Typography
                component={Link}
                to="/"
                sx={{
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 22,
                  background: "linear-gradient(90deg,#E5E7EB,#A5B4FC)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                CodeX
              </Typography>
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1.2,
                alignItems: "center",
              }}
            >
              {menuItems.slice(0, 1).map((item) => (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  sx={{
                    fontSize: 14,
                    textTransform: "none",
                    color: isActive(item.to)
                      ? "primary.main"
                      : "text.secondary",
                  }}
                >
                  {item.text}
                </Button>
              ))}

              {/* AKTU STUDY */}
              <Button
                onClick={handleAktuOpen}
                endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                sx={{
                  fontSize: 14,
                  textTransform: "none",
                  color: isAktuActive ? "primary.main" : "text.secondary",
                }}
              >
                AKTU Study
              </Button>

              <Menu
                anchorEl={aktuAnchor}
                open={Boolean(aktuAnchor)}
                onClose={handleAktuClose}
                MenuListProps={{
                  "aria-labelledby": "aktu-study-button",
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 220,
                    borderRadius: 2,
                    backgroundColor: "#020617",
                    border: "1px solid rgba(148,163,184,0.2)",
                  },
                }}
              >
                {aktuItems.map((item) => (
                  <MenuItem
                    key={item.to}
                    onClick={() => handleAktuNavigate(item.to)}
                    sx={{
                      color: "white",
                      fontSize: 14,
                      "&:hover": {
                        backgroundColor: "rgba(99,102,241,0.12)",
                      },
                    }}
                  >
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>

              {menuItems.slice(1).map((item) => (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  sx={{
                    fontSize: 14,
                    textTransform: "none",
                    color: isActive(item.to)
                      ? "primary.main"
                      : "text.secondary",
                  }}
                >
                  {item.text}
                </Button>
              ))}

              {/* ADMIN ICON */}
              {token && isAdmin && (
                <IconButton
                  onClick={() => navigate("/admin/dashboard")}
                  sx={{
                    ml: 1,
                    width: 42,
                    height: 42,
                    borderRadius: "12px",
                    bgcolor: "rgba(99,102,241,0.15)",
                    color: "primary.main",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: "rgba(99,102,241,0.3)",
                      transform: "scale(1.08)",
                    },
                  }}
                  title="Admin Dashboard"
                >
                  <AdminPanelSettingsIcon sx={{ fontSize: 24 }} />
                </IconButton>
              )}

              {!token ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    startIcon={<LoginIcon />}
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              )}
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              onClick={toggleDrawer}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#ffffff",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 270,
            bgcolor: "#020617",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography fontWeight={700} color="white">
            CodeX Menu
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ p: 1 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.to}
              onClick={() => {
                navigate(item.to);
                toggleDrawer();
              }}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ color: "white" }}
              />
            </ListItemButton>
          ))}

          {/* MOBILE AKTU STUDY */}
          <Box
            sx={{
              mt: 1,
              mb: 1,
              px: 1.5,
              py: 1,
              color: "primary.main",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            AKTU Study
          </Box>

          {aktuItems.map((item) => (
            <ListItemButton
              key={item.to}
              onClick={() => {
                navigate(item.to);
                toggleDrawer();
              }}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                pl: 2,
                backgroundColor: isActive(item.to)
                  ? "rgba(99,102,241,0.08)"
                  : "transparent",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: isActive(item.to)
                    ? "primary.main"
                    : "rgba(203,213,225,0.7)",
                }}
              >
                <SchoolIcon fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  color: "white",
                  fontSize: 14,
                }}
              />
            </ListItemButton>
          ))}

          {/* ADMIN OPTION */}
          {token && isAdmin && (
            <ListItemButton
              onClick={() => {
                navigate("/admin/dashboard");
                toggleDrawer();
              }}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
                <AdminPanelSettingsIcon />
              </ListItemIcon>

              <ListItemText
                primary="Admin Dashboard"
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          )}
        </Box>

        <Divider />

        <Box sx={{ p: 1 }}>
          {!token ? (
            <>
              <ListItemButton
                onClick={() => {
                  navigate("/login");
                  toggleDrawer();
                }}
              >
                <ListItemIcon
                  sx={{ color: "rgba(203,213,225,0.7)" }}
                >
                  <LoginIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Login"
                  primaryTypographyProps={{ color: "white" }}
                />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  navigate("/signup");
                  toggleDrawer();
                }}
              >
                <ListItemIcon
                  sx={{ color: "rgba(203,213,225,0.7)" }}
                >
                  <PersonAddIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Create Account"
                  primaryTypographyProps={{ color: "white" }}
                />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton
              onClick={() => {
                handleLogout();
                toggleDrawer();
              }}
            >
              <ListItemIcon
                sx={{ color: "rgba(203,213,225,0.7)" }}
              >
                <LogoutIcon />
              </ListItemIcon>

              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ color: "white" }}
              />
            </ListItemButton>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;