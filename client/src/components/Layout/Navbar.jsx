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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

/* =========================================================
   ELEVATION ON SCROLL
========================================================= */

const ElevationScroll = ({
  children,
}) => {
  const trigger =
    useScrollTrigger({
      disableHysteresis: true,
      threshold: 10,
    });

  return React.cloneElement(
    children,
    {
      sx: {
        ...(children.props.sx ||
          {}),
        background: trigger
          ? "rgba(15,23,42,0.96)"
          : "linear-gradient(90deg, rgba(15,23,42,0.92), rgba(15,23,42,0.92))",
        backdropFilter:
          "blur(16px)",
        boxShadow: trigger
          ? "0 18px 45px rgba(15,23,42,0.8)"
          : "0 1px 0 rgba(148,163,184,0.35)",
        borderBottom:
          "1px solid rgba(148,163,184,0.25)",
      },
    }
  );
};

/* =========================================================
   NAVBAR
========================================================= */

const Navbar = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const token =
    localStorage.getItem(
      "codex_token"
    );

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem(
        "codex_user"
      )
    );
  } catch {
    user = null;
  }

  const isAdmin =
    user?.isAdmin === true;

  const [open, setOpen] =
    useState(false);

  /* =======================================================
     MAIN MENU
  ======================================================= */

  const menuItems = [
    {
      text: "Home",
      to: "/",
      icon: (
        <HomeIcon fontSize="small" />
      ),
    },
    {
      text: "About",
      to: "/about",
      icon: (
        <InfoIcon fontSize="small" />
      ),
    },
    {
      text: "All Projects",
      to: "/projects",
      icon: (
        <DashboardIcon fontSize="small" />
      ),
    },
    {
      text: "Explore",
      to: "/explore",
      icon: (
        <ExploreIcon fontSize="small" />
      ),
    },
    {
      text: "Contact",
      to: "/contact",
      icon: (
        <ContactMailIcon fontSize="small" />
      ),
    },
  ];

  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const isActive = (path) => {
    if (path === "/") {
      return (
        location.pathname === "/"
      );
    }

    return location.pathname.startsWith(
      path
    );
  };

  const isAktuActive =
    location.pathname.startsWith(
      "/aktu"
    );

  /* =======================================================
     DRAWER
  ======================================================= */

  const toggleDrawer = () => {
    setOpen(
      (previous) => !previous
    );
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "codex_token"
    );

    localStorage.removeItem(
      "codex_user"
    );

    setOpen(false);

    navigate("/");
  };

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigateAndClose = (
    path
  ) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* ===================================================
          DESKTOP / MAIN APP BAR
      =================================================== */}

      <ElevationScroll>
        <AppBar
          position="sticky"
          elevation={0}
        >
          <Toolbar
            sx={{
              maxWidth: 1180,
              mx: "auto",
              width: "100%",
              px: {
                xs: 2,
                sm: 3,
              },
              minHeight: 70,
              display: "flex",
              justifyContent:
                "space-between",
            }}
          >
            {/* =================================================
                LOGO
            ================================================= */}

            <Box
              sx={{
                display: "flex",
                alignItems:
                  "center",
                gap: 1,
              }}
            >
              <Box
                component="img"
                src="/images/logo.png"
                alt="CodeX Logo"
                sx={{
                  height: 50,
                  width: 50,
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate("/")
                }
              />

              <Typography
                component={Link}
                to="/"
                sx={{
                  textDecoration:
                    "none",
                  fontWeight: 800,
                  fontSize: 22,
                  background:
                    "linear-gradient(90deg,#E5E7EB,#A5B4FC)",
                  WebkitBackgroundClip:
                    "text",
                  color: "transparent",
                }}
              >
                CodeX
              </Typography>
            </Box>

            {/* =================================================
                DESKTOP MENU
            ================================================= */}

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                gap: 1.2,
                alignItems:
                  "center",
              }}
            >
              {/* MAIN LINKS */}

              {menuItems.map(
                (item) => (
                  <Button
                    key={
                      item.to
                    }
                    component={Link}
                    to={
                      item.to
                    }
                    sx={{
                      fontSize: 14,
                      textTransform:
                        "none",
                      color:
                        isActive(
                          item.to
                        )
                          ? "primary.main"
                          : "text.secondary",
                      fontWeight:
                        isActive(
                          item.to
                        )
                          ? 800
                          : 500,
                    }}
                  >
                    {
                      item.text
                    }
                  </Button>
                )
              )}

              {/* =================================================
                  AKTU STUDY
              ================================================= */}

              <Button
                component={Link}
                to="/aktu"
                startIcon={
                  <SchoolIcon
                    fontSize="small"
                  />
                }
                sx={{
                  fontSize: 14,
                  textTransform:
                    "none",
                  color:
                    isAktuActive
                      ? "primary.main"
                      : "text.secondary",
                  fontWeight:
                    isAktuActive
                      ? 800
                      : 500,
                }}
              >
                AKTU Study
              </Button>

              {/* =================================================
                  ADMIN
              ================================================= */}

              {token &&
                isAdmin && (
                  <IconButton
                    onClick={() =>
                      navigate(
                        "/admin/dashboard"
                      )
                    }
                    sx={{
                      ml: 1,
                      width: 42,
                      height: 42,
                      borderRadius:
                        "12px",
                      bgcolor:
                        "rgba(99,102,241,0.15)",
                      color:
                        "primary.main",
                      transition:
                        "all 0.25s ease",
                      "&:hover":
                        {
                          bgcolor:
                            "rgba(99,102,241,0.3)",
                          transform:
                            "scale(1.08)",
                        },
                    }}
                    title="Admin Dashboard"
                  >
                    <AdminPanelSettingsIcon
                      sx={{
                        fontSize: 24,
                      }}
                    />
                  </IconButton>
                )}

              {/* =================================================
                  AUTH
              ================================================= */}

              {!token ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    startIcon={
                      <LoginIcon />
                    }
                    sx={{
                      textTransform:
                        "none",
                      fontWeight:
                        700,
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    sx={{
                      textTransform:
                        "none",
                      fontWeight:
                        800,
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Button
                  onClick={
                    handleLogout
                  }
                  variant="outlined"
                  startIcon={
                    <LogoutIcon />
                  }
                  sx={{
                    textTransform:
                      "none",
                    fontWeight:
                      700,
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <IconButton
              onClick={
                toggleDrawer
              }
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
                color: "#ffffff",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <Drawer
        anchor="right"
        open={open}
        onClose={
          toggleDrawer
        }
        PaperProps={{
          sx: {
            width: {
              xs: 285,
              sm: 320,
            },
            bgcolor:
              "#020617",
          },
        }}
      >
        {/* HEADER */}

        <Box
          sx={{
            p: 2,
          }}
        >
          <Typography
            fontWeight={700}
            color="white"
          >
            CodeX Menu
          </Typography>
        </Box>

        <Divider />

        {/* =================================================
            MOBILE LINKS
        ================================================= */}

        <Box sx={{ p: 1 }}>
          {menuItems.map(
            (item) => (
              <ListItemButton
                key={item.to}
                onClick={() =>
                  navigateAndClose(
                    item.to
                  )
                }
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  backgroundColor:
                    isActive(
                      item.to
                    )
                      ? "rgba(99,102,241,0.12)"
                      : "transparent",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color:
                      isActive(
                        item.to
                      )
                        ? "primary.main"
                        : "rgba(203,213,225,0.7)",
                  }}
                >
                  {
                    item.icon
                  }
                </ListItemIcon>

                <ListItemText
                  primary={
                    item.text
                  }
                  primaryTypographyProps={{
                    color:
                      "white",
                    fontWeight:
                      isActive(
                        item.to
                      )
                        ? 700
                        : 500,
                  }}
                />
              </ListItemButton>
            )
          )}

          {/* =================================================
              AKTU STUDY
          ================================================= */}

          <ListItemButton
            onClick={() =>
              navigateAndClose(
                "/aktu"
              )
            }
            sx={{
              borderRadius: 2,
              mb: 0.5,
              backgroundColor:
                isAktuActive
                  ? "rgba(99,102,241,0.12)"
                  : "transparent",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color:
                  isAktuActive
                    ? "primary.main"
                    : "rgba(203,213,225,0.7)",
              }}
            >
              <SchoolIcon />
            </ListItemIcon>

            <ListItemText
              primary="AKTU Study"
              primaryTypographyProps={{
                color: "white",
                fontWeight:
                  isAktuActive
                    ? 700
                    : 500,
              }}
            />
          </ListItemButton>

          {/* =================================================
              ADMIN
          ================================================= */}

          {token &&
            isAdmin && (
              <ListItemButton
                onClick={() =>
                  navigateAndClose(
                    "/admin/dashboard"
                  )
                }
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color:
                      "primary.main",
                  }}
                >
                  <AdminPanelSettingsIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Admin Dashboard"
                  primaryTypographyProps={{
                    color:
                      "white",
                    fontWeight:
                      600,
                  }}
                />
              </ListItemButton>
            )}
        </Box>

        <Divider />

        {/* =================================================
            AUTH MOBILE
        ================================================= */}

        <Box sx={{ p: 1 }}>
          {!token ? (
            <>
              <ListItemButton
                onClick={() =>
                  navigateAndClose(
                    "/login"
                  )
                }
                sx={{
                  borderRadius: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      "rgba(203,213,225,0.7)",
                  }}
                >
                  <LoginIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Login"
                  primaryTypographyProps={{
                    color:
                      "white",
                  }}
                />
              </ListItemButton>

              <ListItemButton
                onClick={() =>
                  navigateAndClose(
                    "/signup"
                  )
                }
                sx={{
                  borderRadius: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      "rgba(203,213,225,0.7)",
                  }}
                >
                  <PersonAddIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Create Account"
                  primaryTypographyProps={{
                    color:
                      "white",
                  }}
                />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton
              onClick={
                handleLogout
              }
              sx={{
                borderRadius: 2,
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    "rgba(203,213,225,0.7)",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>

              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  color:
                    "white",
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