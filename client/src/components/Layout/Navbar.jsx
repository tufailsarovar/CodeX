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
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("codex_token");
    localStorage.removeItem("codex_user");
    navigate("/");
  };

  const menuItems = [
    { text: "Home", to: "/", icon: <HomeIcon fontSize="small" /> },
    { text: "About", to: "/about", icon: <InfoIcon fontSize="small" /> },
    {
      text: "All Projects",
      to: "/projects",
      icon: <DashboardIcon fontSize="small" />,
    },
    { text: "Explore", to: "/explore", icon: <ExploreIcon fontSize="small" /> },
    {
      text: "Contact",
      to: "/contact",
      icon: <ContactMailIcon fontSize="small" />,
    },
  ];

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

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

            {/* Desktop Menu (unchanged) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
              {menuItems.map((item) => (
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
                  <Button component={Link} to="/signup" variant="contained">
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

            {/* Mobile Menu Icon (WHITE) */}
            <IconButton
              onClick={toggleDrawer}
              sx={{ display: { xs: "flex", md: "none" }, color: "#ffffff" }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      {/* Mobile Drawer */}
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

        {/* Main Links */}
        <Box sx={{ p: 1 }}>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.to}
              onClick={() => {
                navigate(item.to);
                toggleDrawer();
              }}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: isActive(item.to)
                  ? "rgba(79,70,229,0.16)"
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
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: isActive(item.to) ? 600 : 400,
                }}
              />
            </ListItemButton>
          ))}
        </Box>

        <Divider />

        {/* Auth Section */}
        <Box sx={{ p: 1 }}>
          {!token ? (
            <>
              <ListItemButton
                onClick={() => {
                  navigate("/login");
                  toggleDrawer();
                }}
              >
                <ListItemIcon sx={{ color: "rgba(203,213,225,0.7)" }}>
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
                <ListItemIcon sx={{ color: "rgba(203,213,225,0.7)" }}>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Create Account"
                  primaryTypographyProps={{
                    color: "white",
                    fontWeight: 600,
                  }}
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
              <ListItemIcon sx={{ color: "rgba(203,213,225,0.7)" }}>
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
