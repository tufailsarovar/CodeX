import React, { useEffect, useState } from "react";
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
  Chip,
  Stack,
  Avatar,
  Tooltip,
  useScrollTrigger,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CodeIcon from "@mui/icons-material/Code";

import { Link, useLocation, useNavigate } from "react-router-dom";

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  return React.cloneElement(children, {
    sx: {
      ...(children.props.sx || {}),
      background: trigger ? "rgba(2,6,23,0.97)" : "rgba(2,6,23,0.88)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: trigger
        ? "0 18px 50px rgba(0,0,0,.38)"
        : "0 1px 0 rgba(148,163,184,.12)",
      borderBottom: "1px solid rgba(148,163,184,.14)",
      transition: "background .3s ease, box-shadow .3s ease",
    },
  });
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("codex_token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("codex_user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem("codex_token"));

      try {
        setUser(JSON.parse(localStorage.getItem("codex_user")));
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", syncAuth);
    window.addEventListener("authChanged", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authChanged", syncAuth);
    };
  }, []);

  const isAdmin = user?.isAdmin === true;

  const menuItems = [
    {
      text: "Home",
      to: "/",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      to: "/about",
      icon: <InfoIcon />,
    },
    {
      text: "All Projects",
      to: "/projects",
      icon: <DashboardIcon />,
    },
    {
      text: "Explore",
      to: "/explore",
      icon: <ExploreIcon />,
    },
    {
      text: "Contact",
      to: "/contact",
      icon: <ContactMailIcon />,
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const isAktuActive = location.pathname.startsWith("/aktu");

  const toggleDrawer = (value) => {
    setOpen(typeof value === "boolean" ? value : !open);
  };

  const navigateAndClose = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("codex_token");
    localStorage.removeItem("codex_user");

    setToken(null);
    setUser(null);
    setOpen(false);

    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
  };

  const navButtonSx = (active) => ({
    position: "relative",
    minHeight: 40,
    px: 1.3,
    borderRadius: 2,
    textTransform: "none",
    fontSize: 13,
    fontWeight: active ? 800 : 600,
    color: active ? "#fff" : "#94a3b8",
    transition: "color .2s ease, background .2s ease, transform .2s ease",
    "&::after": {
      content: '""',
      position: "absolute",
      left: "20%",
      right: "20%",
      bottom: 2,
      height: 2,
      borderRadius: 999,
      background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
      transform: active ? "scaleX(1)" : "scaleX(0)",
      transition: "transform .25s ease",
    },
    "&:hover": {
      color: "#fff",
      bgcolor: "rgba(99,102,241,.08)",
      transform: "translateY(-1px)",
    },
  });

  return (
    <>
      <ElevationScroll>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            top: 0,
            zIndex: 1200,
          }}
        >
          <Toolbar
            sx={{
              width: "100%",
              maxWidth: 1280,
              mx: "auto",
              minHeight: {
                xs: 62,
                sm: 68,
                md: 72,
              },
              px: {
                xs: 1.5,
                sm: 3,
                md: 4,
              },
              gap: 2,
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  width: {
                    xs: 38,
                    sm: 44,
                  },
                  height: {
                    xs: 38,
                    sm: 44,
                  },
                  borderRadius: {
                    xs: 2,
                    sm: 2.5,
                  },
                  p: "1px",
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6,#f97316)",
                  boxShadow: "0 8px 25px rgba(99,102,241,.2)",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "inherit",
                    overflow: "hidden",
                    bgcolor: "#020617",
                  }}
                >
                  <Box
                    component="img"
                    src="/images/logo.png"
                    alt="CodeX"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  ml: {
                    xs: 1,
                    sm: 1.2,
                  },
                  minWidth: 0,
                  display: "block",
                }}
              >
                <Typography
                  component={Link}
                  to="/"
                  sx={{
                    textDecoration: "none",
                    display: "block",
                    fontSize: {
                      xs: 17,
                      sm: 19,
                      md: 21,
                    },
                    fontWeight: 950,
                    lineHeight: 1,
                    letterSpacing: "-.5px",
                    whiteSpace: "nowrap",
                    background: "linear-gradient(90deg,#fff,#a5b4fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  CodeX
                </Typography>

                <Typography
                  sx={{
                    mt: 0.35,
                    color: "#64748b",
                    fontSize: {
                      xs: 7,
                      sm: 8,
                    },
                    fontWeight: 800,
                    letterSpacing: {
                      xs: ".5px",
                      sm: ".7px",
                    },
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Project Marketplace
                </Typography>
              </Box>
            </Box>

            {/* Desktop navigation */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                gap: 0.25,
              }}
            >
              {menuItems.map((item) => {
                const active = isActive(item.to);

                return (
                  <Button
                    key={item.to}
                    component={Link}
                    to={item.to}
                    startIcon={React.cloneElement(item.icon, {
                      sx: {
                        fontSize: "17px !important",
                      },
                    })}
                    sx={navButtonSx(active)}
                  >
                    {item.text}
                  </Button>
                );
              })}

              <Button
                component={Link}
                to="/aktu"
                startIcon={
                  <SchoolIcon
                    sx={{
                      fontSize: "17px !important",
                    }}
                  />
                }
                sx={navButtonSx(isAktuActive)}
              >
                AKTU Study
              </Button>
            </Box>

            {/* Desktop actions */}
            <Stack
              direction="row"
              spacing={0.8}
              alignItems="center"
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                flexShrink: 0,
              }}
            >
              {token && isAdmin && (
                <Tooltip title="Admin Dashboard">
                  <IconButton
                    onClick={() => navigate("/admin/dashboard")}
                    sx={{
                      width: 39,
                      height: 39,
                      borderRadius: 2.2,
                      color: "#a5b4fc",
                      bgcolor: "rgba(99,102,241,.1)",
                      border: "1px solid rgba(129,140,248,.18)",
                      transition: "all .2s ease",
                      "&:hover": {
                        bgcolor: "rgba(99,102,241,.2)",
                        borderColor: "rgba(129,140,248,.5)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <AdminPanelSettingsIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Tooltip>
              )}

              {!token ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    startIcon={
                      <LoginIcon
                        sx={{
                          fontSize: "17px !important",
                        }}
                      />
                    }
                    sx={{
                      height: 38,
                      px: 1.4,
                      borderRadius: 2,
                      color: "#cbd5e1",
                      border: "1px solid rgba(148,163,184,.2)",
                      textTransform: "none",
                      fontSize: 12,
                      fontWeight: 800,
                      "&:hover": {
                        borderColor: "#6366f1",
                        bgcolor: "rgba(99,102,241,.08)",
                      },
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/signup"
                    endIcon={
                      <ArrowForwardIcon
                        sx={{
                          fontSize: "16px !important",
                        }}
                      />
                    }
                    sx={{
                      height: 38,
                      px: 1.5,
                      borderRadius: 2,
                      color: "#fff",
                      background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                      textTransform: "none",
                      fontSize: 12,
                      fontWeight: 900,
                      boxShadow: "0 8px 22px rgba(79,70,229,.22)",
                      "&:hover": {
                        background: "linear-gradient(135deg,#818cf8,#6366f1)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 12px 28px rgba(79,70,229,.3)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleLogout}
                  startIcon={
                    <LogoutIcon
                      sx={{
                        fontSize: "17px !important",
                      }}
                    />
                  }
                  sx={{
                    height: 38,
                    px: 1.5,
                    borderRadius: 2,
                    color: "#cbd5e1",
                    border: "1px solid rgba(148,163,184,.2)",
                    textTransform: "none",
                    fontSize: 12,
                    fontWeight: 800,
                    "&:hover": {
                      color: "#fca5a5",
                      borderColor: "rgba(248,113,113,.5)",
                      bgcolor: "rgba(248,113,113,.06)",
                    },
                  }}
                >
                  Logout
                </Button>
              )}
            </Stack>

            {/* Mobile menu */}
            <IconButton
              onClick={() => toggleDrawer()}
              aria-label="Open menu"
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
                ml: "auto",
                width: 40,
                height: 40,
                borderRadius: 2.2,
                color: "#fff",
                bgcolor: "rgba(15,23,42,.7)",
                border: "1px solid rgba(148,163,184,.16)",
                "&:hover": {
                  bgcolor: "rgba(99,102,241,.12)",
                  borderColor: "rgba(129,140,248,.4)",
                },
              }}
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
        onClose={() => toggleDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: {
              xs: "86vw",
              sm: 350,
            },
            maxWidth: 360,
            bgcolor: "#020617",
            color: "#fff",
            borderLeft: "1px solid rgba(148,163,184,.14)",
            backgroundImage:
              "radial-gradient(circle at 100% 0%, rgba(99,102,241,.14), transparent 35%)",
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            px: 2,
            py: 1.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(148,163,184,.12)",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src="/images/logo.png"
              alt="CodeX"
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                bgcolor: "#0f172a",
                border: "1px solid rgba(129,140,248,.25)",
              }}
            />

            <Box>
              <Typography
                fontWeight={950}
                sx={{
                  fontSize: "1rem",
                  lineHeight: 1,
                }}
              >
                CodeX
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,
                  color: "#64748b",
                  fontSize: ".58rem",
                  fontWeight: 800,
                  letterSpacing: ".5px",
                }}
              >
                PROJECT MARKETPLACE
              </Typography>
            </Box>
          </Stack>

          <IconButton
            onClick={() => toggleDrawer(false)}
            sx={{
              width: 36,
              height: 36,
              color: "#94a3b8",
              borderRadius: 2,
              "&:hover": {
                color: "#fff",
                bgcolor: "rgba(148,163,184,.08)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* User status */}
        {token && user && (
          <Box
            sx={{
              mx: 1.2,
              mt: 1.2,
              p: 1.3,
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,.7)",
              border: "1px solid rgba(148,163,184,.12)",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: "rgba(99,102,241,.18)",
                  color: "#a5b4fc",
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
              </Avatar>

              <Box
                sx={{
                  minWidth: 0,
                }}
              >
                <Typography
                  fontWeight={800}
                  noWrap
                  sx={{
                    fontSize: ".75rem",
                  }}
                >
                  {user?.name || "Welcome back"}
                </Typography>

                <Typography
                  noWrap
                  sx={{
                    color: "#64748b",
                    fontSize: ".6rem",
                  }}
                >
                  {user?.email || "Account"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}

        {/* Navigation */}
        <Box sx={{ p: 1.2 }}>
          <Typography
            sx={{
              px: 1,
              mb: 0.8,
              color: "#475569",
              fontSize: ".58rem",
              fontWeight: 900,
              letterSpacing: ".8px",
              textTransform: "uppercase",
            }}
          >
            Navigation
          </Typography>

          {menuItems.map((item) => {
            const active = isActive(item.to);

            return (
              <ListItemButton
                key={item.to}
                onClick={() => navigateAndClose(item.to)}
                sx={{
                  minHeight: 46,
                  mb: 0.5,
                  px: 1.2,
                  borderRadius: 2.5,
                  color: active ? "#fff" : "#94a3b8",
                  bgcolor: active ? "rgba(99,102,241,.12)" : "transparent",
                  border: active
                    ? "1px solid rgba(129,140,248,.12)"
                    : "1px solid transparent",
                  transition: "all .2s ease",
                  "&:hover": {
                    color: "#fff",
                    bgcolor: "rgba(99,102,241,.08)",
                    transform: "translateX(2px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 38,
                    color: active ? "#818cf8" : "#64748b",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: {
                      fontSize: 20,
                    },
                  })}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: active ? 800 : 600,
                  }}
                />

                {active && (
                  <Box
                    sx={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      bgcolor: "#818cf8",
                      boxShadow: "0 0 10px rgba(129,140,248,.8)",
                    }}
                  />
                )}
              </ListItemButton>
            );
          })}

          <ListItemButton
            onClick={() => navigateAndClose("/aktu")}
            sx={{
              minHeight: 46,
              mb: 0.5,
              px: 1.2,
              borderRadius: 2.5,
              color: isAktuActive ? "#fff" : "#94a3b8",
              bgcolor: isAktuActive ? "rgba(99,102,241,.12)" : "transparent",
              border: isAktuActive
                ? "1px solid rgba(129,140,248,.12)"
                : "1px solid transparent",
              "&:hover": {
                color: "#fff",
                bgcolor: "rgba(99,102,241,.08)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 38,
                color: isAktuActive ? "#818cf8" : "#64748b",
              }}
            >
              <SchoolIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>

            <ListItemText
              primary="AKTU Study"
              primaryTypographyProps={{
                fontSize: 13,
                fontWeight: isAktuActive ? 800 : 600,
              }}
            />

            <Chip
              label="Study"
              size="small"
              sx={{
                height: 20,
                bgcolor: "rgba(99,102,241,.1)",
                color: "#818cf8",
                border: "1px solid rgba(129,140,248,.15)",
                fontSize: 8,
                fontWeight: 900,
              }}
            />
          </ListItemButton>
        </Box>

        <Divider
          sx={{
            borderColor: "rgba(148,163,184,.12)",
          }}
        />

        {/* Account */}
        <Box sx={{ p: 1.2 }}>
          <Typography
            sx={{
              px: 1,
              mb: 0.8,
              color: "#475569",
              fontSize: ".58rem",
              fontWeight: 900,
              letterSpacing: ".8px",
              textTransform: "uppercase",
            }}
          >
            Account
          </Typography>

          {token && isAdmin && (
            <ListItemButton
              onClick={() => navigateAndClose("/admin/dashboard")}
              sx={{
                minHeight: 46,
                mb: 0.5,
                px: 1.2,
                borderRadius: 2.5,
                color: "#a5b4fc",
                bgcolor: "rgba(99,102,241,.08)",
                "&:hover": {
                  bgcolor: "rgba(99,102,241,.15)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: "#818cf8",
                }}
              >
                <AdminPanelSettingsIcon sx={{ fontSize: 20 }} />
              </ListItemIcon>

              <ListItemText
                primary="Admin Dashboard"
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: 800,
                }}
              />
            </ListItemButton>
          )}

          {!token ? (
            <>
              <ListItemButton
                onClick={() => navigateAndClose("/login")}
                sx={{
                  minHeight: 46,
                  mb: 0.5,
                  px: 1.2,
                  borderRadius: 2.5,
                  color: "#cbd5e1",
                  "&:hover": {
                    bgcolor: "rgba(99,102,241,.08)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 38,
                    color: "#64748b",
                  }}
                >
                  <LoginIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Login"
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                />
              </ListItemButton>

              <ListItemButton
                onClick={() => navigateAndClose("/signup")}
                sx={{
                  minHeight: 46,
                  px: 1.2,
                  borderRadius: 2.5,
                  color: "#fff",
                  bgcolor: "linear-gradient(135deg,#6366f1,#4f46e5)",
                  background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                  boxShadow: "0 8px 24px rgba(79,70,229,.2)",
                  "&:hover": {
                    background: "linear-gradient(135deg,#818cf8,#6366f1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 38,
                    color: "#fff",
                  }}
                >
                  <PersonAddIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Create Account"
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: 900,
                  }}
                />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 46,
                px: 1.2,
                borderRadius: 2.5,
                color: "#fca5a5",
                "&:hover": {
                  bgcolor: "rgba(248,113,113,.07)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: "#f87171",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>

              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: 700,
                }}
              />
            </ListItemButton>
          )}
        </Box>

        {/* Drawer footer */}
        <Box
          sx={{
            mt: "auto",
            p: 2,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 3,
              bgcolor: "rgba(15,23,42,.65)",
              border: "1px solid rgba(148,163,184,.1)",
              textAlign: "center",
            }}
          >
            <CodeIcon
              sx={{
                color: "#6366f1",
                fontSize: 20,
                mb: 0.4,
              }}
            />

            <Typography
              sx={{
                color: "#64748b",
                fontSize: ".58rem",
                lineHeight: 1.5,
              }}
            >
              CodeX · Academic Project Marketplace
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
