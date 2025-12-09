import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useScrollTrigger
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/TravelExplore";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
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
      borderBottom: "1px solid rgba(148,163,184,0.25)"
    }
  });
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("codex_token");
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("codex_token");
    localStorage.removeItem("codex_user");
    navigate("/login");
  };

  const toggleDrawer = () => setOpen((prev) => !prev);

  const menuItems = [
    { text: "Home", to: "/", icon: <HomeIcon fontSize="small" /> },
    { text: "About", to: "/about", icon: <InfoIcon fontSize="small" /> },
    { text: "All Projects", to: "/projects", icon: <DashboardIcon fontSize="small" /> },
    { text: "Explore", to: "/explore", icon: <ExploreIcon fontSize="small" /> }
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
              gap: 2
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  background:
                    "conic-gradient(from 180deg at 50% 50%, #6366F1, #F97316, #22C55E, #6366F1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 30px rgba(79,70,229,0.7)"
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 800, color: "#0B1120", fontSize: 14 }}
                >
                  CX
                </Typography>
              </Box>

              <Box>
                <Typography
                  component={Link}
                  to="/"
                  sx={{
                    textDecoration: "none",
                    fontWeight: 800,
                    letterSpacing: 1,
                    fontSize: 22,
                    background: "linear-gradient(90deg, #E5E7EB, #A5B4FC)",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  CodeX
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: { xs: "none", sm: "block" } }}
                >
                  College Project Store
                </Typography>
              </Box>
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1.5
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  disableRipple
                  sx={{
                    position: "relative",
                    px: 1.5,
                    py: 0.5,
                    fontSize: 14,
                    color: isActive(item.to) ? "primary.main" : "text.secondary",
                    textTransform: "none",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: isActive(item.to) ? "100%" : 0,
                      height: 2,
                      borderRadius: 999,
                      bgcolor: "primary.main",
                      transition: "width 0.25s ease-out"
                    },
                    "&:hover::after": {
                      width: "100%"
                    },
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent"
                    }
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
                    sx={{
                      borderRadius: 999,
                      fontSize: 14,
                      textTransform: "none",
                      borderColor: "rgba(148,163,184,0.7)",
                      color: "text.primary",
                      "&:hover": {
                        borderColor: "primary.main",
                        backgroundColor: "rgba(79,70,229,0.1)"
                      }
                    }}
                    startIcon={<LoginIcon fontSize="small" />}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    sx={{
                      borderRadius: 999,
                      fontSize: 14,
                      textTransform: "none",
                      px: 2.6,
                      background:
                        "linear-gradient(90deg, #6366F1, #8B5CF6, #F97316)",
                      boxShadow:
                        "0 14px 30px rgba(88,80,236,0.7), 0 0 0 1px rgba(15,23,42,0.4)",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #4F46E5, #7C3AED, #EA580C)",
                        boxShadow: "0 18px 40px rgba(79,70,229,0.9)"
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  startIcon={<LogoutIcon fontSize="small" />}
                  sx={{
                    borderRadius: 999,
                    fontSize: 14,
                    textTransform: "none",
                    borderColor: "rgba(248,113,113,0.8)",
                    color: "error.light",
                    "&:hover": {
                      borderColor: "error.main",
                      backgroundColor: "rgba(239,68,68,0.1)"
                    }
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={toggleDrawer}
              color="inherit"
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
            borderLeft: "1px solid rgba(148,163,184,0.35)"
          }
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            CodeX Menu
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Navigate through the store
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(148,163,184,0.25)" }} />

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
                  : "transparent"
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: isActive(item.to) ? "primary.main" : "text.secondary"
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: isActive(item.to) ? 600 : 400
                }}
              />
            </ListItemButton>
          ))}
        </Box>

        <Divider sx={{ my: 1, borderColor: "rgba(148,163,184,0.25)" }} />

        <Box sx={{ p: 1, pb: 2 }}>
          {!token ? (
            <>
              <ListItemButton
                onClick={() => {
                  navigate("/login");
                  toggleDrawer();
                }}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Login"
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  navigate("/signup");
                  toggleDrawer();
                }}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  background:
                    "linear-gradient(90deg, rgba(99,102,241,0.15), rgba(248,113,113,0.18))"
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <ExploreIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Create Account"
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 600
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
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: "rgba(239,68,68,0.14)"
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "error.light" }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "error.light"
                }}
              />
            </ListItemButton>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
