import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  TextField,
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Snackbar,
  Divider,
} from "@mui/material";

import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";

import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

/* =========================================================
   RESOURCE TYPES
========================================================= */

const RESOURCE_TYPES = [
  {
    value: "syllabus",
    label: "Syllabus",
  },
  {
    value: "notes",
    label: "Notes",
  },
  {
    value: "important-questions",
    label: "Important Questions",
  },
  {
    value: "pyq",
    label: "PYQ",
  },
  {
    value: "quantum",
    label: "Quantum",
  },
  {
    value: "question-answers",
    label: "Question & Answers",
  },
];

/* =========================================================
   BRANCHES
========================================================= */

const BRANCHES = [
  "CSE",
  "IT",
  "ECE",
  "EE",
  "ME",
  "CE",
  "AI",
  "AIML",
  "CS",
];

/* =========================================================
   YEARS
========================================================= */

const YEARS = [
  {
    value: 1,
    label: "1st Year",
  },
  {
    value: 2,
    label: "2nd Year",
  },
  {
    value: 3,
    label: "3rd Year",
  },
  {
    value: 4,
    label: "4th Year",
  },
];

/* =========================================================
   RAZORPAY SCRIPT
========================================================= */

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.onload = () => resolve(true);
      existingScript.onerror = () => resolve(false);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    script.onload = () => resolve(true);

    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

/* =========================================================
   GOOGLE DRIVE IMAGE CONVERTER
========================================================= */

const getImageUrl = (url) => {
  if (!url) {
    return "";
  }

  const value = String(url).trim();

  if (!value) {
    return "";
  }

  /*
   * Google Drive:
   *
   * https://drive.google.com/file/d/FILE_ID/view
   *
   * becomes:
   *
   * https://drive.google.com/thumbnail?id=FILE_ID&sz=w1200
   */

  const fileMatch = value.match(
    /drive\.google\.com\/file\/d\/([^/]+)/
  );

  if (fileMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1200`;
  }

  /*
   * Google Drive open?id=FILE_ID
   */

  const openMatch = value.match(
    /drive\.google\.com\/open\?id=([^&]+)/
  );

  if (openMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w1200`;
  }

  /*
   * Google Drive uc?id=FILE_ID
   */

  const ucMatch = value.match(
    /drive\.google\.com\/uc\?.*id=([^&]+)/
  );

  if (ucMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${ucMatch[1]}&sz=w1200`;
  }

  /*
   * Already a normal image URL
   */

  return value;
};

/* =========================================================
   TITLES
========================================================= */

const getResourceTitle = (resourceType) => {
  switch (resourceType) {
    case "syllabus":
      return "AKTU Syllabus";

    case "notes":
      return "AKTU Notes";

    case "important-questions":
      return "Important Questions";

    case "pyq":
      return "Previous Year Questions";

    case "quantum":
      return "AKTU Quantum";

    case "question-answers":
      return "Question & Answers";

    default:
      return "AKTU Study Material";
  }
};

/* =========================================================
   DESCRIPTIONS
========================================================= */

const getResourceDescription = (resourceType) => {
  switch (resourceType) {
    case "syllabus":
      return "Official branch-wise and year-wise AKTU syllabus.";

    case "notes":
      return "Detailed study notes prepared for AKTU students.";

    case "important-questions":
      return "Important questions to help you prepare for your AKTU exams.";

    case "pyq":
      return "Previous year question papers for better exam preparation.";

    case "quantum":
      return "Useful Quantum study material for AKTU preparation.";

    case "question-answers":
      return "Question and answer resources for focused revision.";

    default:
      return "Study material for AKTU students.";
  }
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const AKTUStudy = () => {
  const navigate = useNavigate();

  const [branch, setBranch] = useState("CSE");

  const [academicYear, setAcademicYear] =
    useState(1);

  const [resourceType, setResourceType] =
    useState("syllabus");

  const [search, setSearch] = useState("");

  const [resources, setResources] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [purchaseLoading, setPurchaseLoading] =
    useState(false);

  const [purchaseError, setPurchaseError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  /* =======================================================
     FETCH RESOURCES
  ======================================================= */

  const loadResources = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/aktu/public",
        {
          params: {
            branch,
            academicYear,
          },
        }
      );

      const data = Array.isArray(
        response.data
      )
        ? response.data
        : [];

      setResources(data);
    } catch (err) {
      console.error(
        "Load AKTU resources error:",
        err
      );

      setResources([]);

      setError(
        err?.response?.data?.message ||
          "Unable to load AKTU resources."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, [branch, academicYear]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredResources = useMemo(() => {
    const selectedType =
      resourceType
        ?.toLowerCase()
        .trim();

    const searchText =
      search
        .toLowerCase()
        .trim();

    return resources.filter(
      (resource) => {
        const type = String(
          resource.resourceType || ""
        )
          .toLowerCase()
          .trim();

        const year = Number(
          resource.academicYear
        );

        if (type !== selectedType) {
          return false;
        }

        if (
          branch &&
          String(resource.branch || "")
            .toLowerCase()
            .trim() !==
            branch
              .toLowerCase()
              .trim()
        ) {
          return false;
        }

        if (
          year !==
          Number(academicYear)
        ) {
          return false;
        }

        if (searchText) {
          const searchable = [
            resource.branch,
            resource.description,
            resource.unit,
            resource.resourceType,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          if (
            !searchable.includes(
              searchText
            )
          ) {
            return false;
          }
        }

        return true;
      }
    );
  }, [
    resources,
    resourceType,
    branch,
    academicYear,
    search,
  ]);

  /* =======================================================
     OPEN FREE PDF
  ======================================================= */

  const openFreePdf = (resource) => {
    if (!resource?.fileUrl) {
      setPurchaseError(
        "PDF link is not available."
      );

      return;
    }

    window.open(
      resource.fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =======================================================
     BUY PAID RESOURCE
  ======================================================= */

  const buyResource = async (resource) => {
    if (!resource?._id) {
      setPurchaseError(
        "Resource information is missing."
      );

      return;
    }

    if (purchaseLoading) {
      return;
    }

    /*
     * Check login.
     */

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

    if (!user?.token) {
      navigate("/login", {
        state: {
          from: "/aktu",
        },
      });

      return;
    }

    const amount = Number(
      resource.price
    );

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setPurchaseError(
        "Invalid resource price."
      );

      return;
    }

    try {
      setPurchaseLoading(true);
      setPurchaseError("");

      /* -----------------------------------------
         LOAD RAZORPAY
      ----------------------------------------- */

      const razorpayLoaded =
        await loadRazorpayScript();

      if (!razorpayLoaded) {
        throw new Error(
          "Razorpay checkout could not be loaded. Please check your internet connection."
        );
      }

      /* -----------------------------------------
         CREATE SERVER ORDER
      ----------------------------------------- */

      const response =
        await api.post(
          "/aktu-payment/create-order",
          {
            resourceId:
              resource._id,
          }
        );

      const data =
        response?.data;

      if (
        !data?.success ||
        !data?.order?.id
      ) {
        throw new Error(
          data?.message ||
            "Failed to create payment order."
        );
      }

      if (!data?.key) {
        throw new Error(
          "Razorpay key is missing from server response."
        );
      }

      /* -----------------------------------------
         OPEN RAZORPAY
      ----------------------------------------- */

      const options = {
        key: data.key,

        amount:
          data.order.amount,

        currency:
          data.order.currency ||
          "INR",

        name: "CodeX",

        description:
          resource.description ||
          getResourceTitle(
            resource.resourceType
          ),

        order_id:
          data.order.id,

        prefill: {
          name:
            user?.name ||
            "",
          email:
            user?.email ||
            "",
          contact:
            user?.phone ||
            user?.mobile ||
            "",
        },

        notes: {
          resourceId:
            resource._id,
        },

        theme: {
          color: "#6366f1",
        },

        modal: {
          confirm_close: true,

          ondismiss: () => {
            setPurchaseLoading(
              false
            );
          },
        },

        handler:
          async function (
            paymentResponse
          ) {
            try {
              setPurchaseError("");

              const verifyResponse =
                await api.post(
                  "/aktu-payment/verify",
                  {
                    razorpay_order_id:
                      paymentResponse.razorpay_order_id,

                    razorpay_payment_id:
                      paymentResponse.razorpay_payment_id,

                    razorpay_signature:
                      paymentResponse.razorpay_signature,

                    resourceId:
                      resource._id,
                  }
                );

              const verifyData =
                verifyResponse?.data;

              if (
                !verifyData?.success ||
                !verifyData?.paymentSuccess
              ) {
                throw new Error(
                  verifyData?.message ||
                    "Payment verification failed."
                );
              }

              setSuccessMessage(
                verifyData?.emailSent
                  ? "Payment successful! The PDF link has been sent to your registered email."
                  : "Payment successful! Please check your email or contact support if you do not receive the PDF."
              );

              /*
               * Payment is verified.
               *
               * We can now safely open the PDF.
               */

              if (
                resource.fileUrl
              ) {
                setTimeout(() => {
                  window.open(
                    resource.fileUrl,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }, 700);
              }
            } catch (verifyError) {
              console.error(
                "AKTU payment verification error:",
                verifyError
              );

              setPurchaseError(
                verifyError?.response
                  ?.data?.message ||
                  verifyError?.message ||
                  "Payment was completed but verification failed. Please contact support."
              );
            } finally {
              setPurchaseLoading(
                false
              );
            }
          },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.on(
        "payment.failed",
        (response) => {
          console.error(
            "Razorpay payment failed:",
            response
          );

          setPurchaseError(
            response?.error
              ?.description ||
              "Payment failed. Please try again."
          );

          setPurchaseLoading(
            false
          );
        }
      );

      razorpay.open();
    } catch (err) {
      console.error(
        "AKTU purchase error:",
        err
      );

      setPurchaseError(
        err?.response?.data
          ?.message ||
          err?.message ||
          "Unable to start payment."
      );

      setPurchaseLoading(false);
    }
  };

  /* =======================================================
     CLEAR SEARCH
  ======================================================= */

  const clearSearch = () => {
    setSearch("");
  };

  /* =======================================================
     LABELS
  ======================================================= */

  const yearLabel =
    YEARS.find(
      (item) =>
        item.value ===
        Number(
          academicYear
        )
    )?.label ||
    "1st Year";

  const pageTitle =
    getResourceTitle(
      resourceType
    );

  const pageDescription =
    getResourceDescription(
      resourceType
    );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "#f8fafc",
        background:
          "linear-gradient(180deg,#080d1d 0%,#070b16 55%,#050811 100%)",
        pb: {
          xs: 6,
          md: 10,
        },
      }}
    >
      {/* =================================================
          HERO
      ================================================= */}

      <Box
        sx={{
          position: "relative",
          overflow: "hidden",

          pt: {
            xs: 5,
            sm: 7,
            md: 8,
          },

          pb: {
            xs: 5,
            md: 7,
          },

          background: `
            radial-gradient(
              circle at 50% 0%,
              rgba(99,102,241,.22),
              transparent 35%
            ),
            radial-gradient(
              circle at 0% 60%,
              rgba(37,99,235,.10),
              transparent 30%
            )
          `,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            top: -240,
            left: "50%",
            transform:
              "translateX(-50%)",
            background:
              "rgba(99,102,241,.12)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: {
                xs: 72,
                sm: 86,
              },

              height: {
                xs: 72,
                sm: 86,
              },

              mx: "auto",
              mb: 2.5,

              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",

              borderRadius: 4,

              background:
                "linear-gradient(135deg,#6366f1,#2563eb)",

              boxShadow:
                "0 20px 60px rgba(79,70,229,.35)",
            }}
          >
            <MenuBookRoundedIcon
              sx={{
                color: "#fff",
                fontSize: {
                  xs: 42,
                  sm: 52,
                },
              }}
            />
          </Box>

          <Typography
            fontWeight={950}
            sx={{
              fontSize: {
                xs: "2.4rem",
                sm: "3.4rem",
                md: "4.2rem",
              },

              lineHeight: 1,

              letterSpacing:
                "-2px",

              background:
                "linear-gradient(90deg,#fff,#c7d2fe)",

              WebkitBackgroundClip:
                "text",

              WebkitTextFillColor:
                "transparent",
            }}
          >
            AKTU Study
          </Typography>

          <Typography
            sx={{
              mt: 2,
              mx: "auto",
              maxWidth: 900,
              color: "#94a3b8",
              fontSize: {
                xs: ".92rem",
                sm: "1.05rem",
                md: "1.12rem",
              },
              lineHeight: 1.8,
            }}
          >
            Find AKTU syllabus,
            notes, important
            questions, PYQs,
            Quantum and question
            answers branch-wise
            and year-wise in one
            place.
          </Typography>
        </Container>
      </Box>

      {/* =================================================
          FILTERS
      ================================================= */}

      <Container
        maxWidth="xl"
        sx={{
          mt: -1,
          position: "relative",
          zIndex: 5,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 1.5,
              sm: 2,
              md: 2.5,
            },

            borderRadius: {
              xs: 3,
              md: 4,
            },

            background:
              "rgba(8,13,29,.96)",

            border:
              "1px solid rgba(148,163,184,.12)",

            boxShadow:
              "0 25px 70px rgba(0,0,0,.35)",

            backdropFilter:
              "blur(20px)",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={1.5}
          >
            <TextField
              select
              fullWidth
              label="Branch"
              value={branch}
              onChange={(e) =>
                setBranch(
                  e.target.value
                )
              }
              sx={selectStyles}
            >
              {BRANCHES.map(
                (item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                )
              )}
            </TextField>

            <TextField
              select
              fullWidth
              label="Academic Year"
              value={academicYear}
              onChange={(e) =>
                setAcademicYear(
                  Number(
                    e.target.value
                  )
                )
              }
              sx={selectStyles}
            >
              {YEARS.map(
                (item) => (
                  <MenuItem
                    key={item.value}
                    value={
                      item.value
                    }
                  >
                    {item.label}
                  </MenuItem>
                )
              )}
            </TextField>

            <TextField
              fullWidth
              label="Search"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search resources..."
              sx={selectStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),

                endAdornment:
                  search ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={
                          clearSearch
                        }
                        sx={{
                          color:
                            "#94a3b8",
                        }}
                      >
                        <CloseRoundedIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
              }}
            />
          </Stack>

          {/* RESOURCE TABS */}

          <Box
            sx={{
              mt: 2,

              display: "flex",

              gap: 1,

              overflowX:
                "auto",

              pb: 0.5,

              "&::-webkit-scrollbar":
                {
                  height: 4,
                },

              "&::-webkit-scrollbar-thumb":
                {
                  background:
                    "rgba(99,102,241,.35)",
                  borderRadius: 10,
                },
            }}
          >
            {RESOURCE_TYPES.map(
              (item) => {
                const active =
                  resourceType ===
                  item.value;

                return (
                  <Button
                    key={
                      item.value
                    }
                    onClick={() =>
                      setResourceType(
                        item.value
                      )
                    }
                    startIcon={
                      item.value ===
                      "syllabus" ? (
                        <MenuBookOutlinedIcon />
                      ) : (
                        <PictureAsPdfRoundedIcon />
                      )
                    }
                    sx={{
                      flexShrink: 0,

                      minHeight: 42,

                      px: 2,

                      borderRadius: 2.5,

                      textTransform:
                        "none",

                      fontWeight: 850,

                      whiteSpace:
                        "nowrap",

                      color: active
                        ? "#fff"
                        : "#94a3b8",

                      background:
                        active
                          ? "linear-gradient(135deg,#6366f1,#4f46e5)"
                          : "transparent",

                      border:
                        active
                          ? "1px solid rgba(129,140,248,.5)"
                          : "1px solid transparent",

                      "&:hover": {
                        background:
                          active
                            ? "linear-gradient(135deg,#6366f1,#4f46e5)"
                            : "rgba(99,102,241,.08)",

                        color:
                          "#fff",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              }
            )}
          </Box>
        </Paper>
      </Container>

      {/* =================================================
          CONTENT
      ================================================= */}

      <Container
        maxWidth="xl"
        sx={{
          mt: {
            xs: 4,
            md: 5,
          },
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "flex-end",
          }}
          sx={{
            mb: 3,
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                mb: 1,
              }}
            >
              <SchoolRoundedIcon
                sx={{
                  color:
                    "#818cf8",
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  color:
                    "#818cf8",
                  fontWeight: 850,
                }}
              >
                {branch} •{" "}
                {yearLabel}
              </Typography>
            </Stack>

            <Typography
              fontWeight={950}
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.7rem",
                },

                lineHeight: 1.1,
              }}
            >
              {pageTitle}
            </Typography>

            <Typography
              sx={{
                mt: 0.8,
                color:
                  "#64748b",
                fontSize:
                  ".95rem",
              }}
            >
              {pageDescription}
            </Typography>
          </Box>

          <Chip
            icon={
              resourceType ===
              "syllabus" ? (
                <LockOpenRoundedIcon />
              ) : (
                <WorkspacePremiumRoundedIcon />
              )
            }
            label={
              resourceType ===
              "syllabus"
                ? "Free Resources"
                : "Premium Resources"
            }
            sx={{
              color:
                resourceType ===
                "syllabus"
                  ? "#86efac"
                  : "#fdba74",

              background:
                resourceType ===
                "syllabus"
                  ? "rgba(34,197,94,.08)"
                  : "rgba(249,115,22,.08)",

              border:
                resourceType ===
                "syllabus"
                  ? "1px solid rgba(34,197,94,.2)"
                  : "1px solid rgba(249,115,22,.2)",

              fontWeight: 800,
            }}
          />
        </Stack>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              color: "#fecaca",
              background:
                "rgba(127,29,29,.18)",
              border:
                "1px solid rgba(248,113,113,.2)",

              "& .MuiAlert-icon": {
                color:
                  "#f87171",
              },
            }}
          >
            {error}
          </Alert>
        )}

        {/* =================================================
            PURCHASE ERROR
        ================================================= */}

        {purchaseError && (
          <Alert
            severity="error"
            onClose={() =>
              setPurchaseError("")
            }
            sx={{
              mb: 3,
              color: "#fecaca",
              background:
                "rgba(127,29,29,.18)",
              border:
                "1px solid rgba(248,113,113,.2)",

              "& .MuiAlert-icon": {
                color:
                  "#f87171",
              },
            }}
          >
            {purchaseError}
          </Alert>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <LoadingState />
        ) : filteredResources.length >
          0 ? (
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0,1fr))",
                lg: "repeat(3, minmax(0,1fr))",
              },

              gap: {
                xs: 2,
                sm: 2.5,
                lg: 3,
              },
            }}
          >
            {filteredResources.map(
              (resource) => (
                <ResourceCard
                  key={
                    resource._id
                  }
                  resource={
                    resource
                  }
                  onOpen={
                    openFreePdf
                  }
                  onBuy={
                    buyResource
                  }
                  purchaseLoading={
                    purchaseLoading
                  }
                />
              )
            )}
          </Box>
        ) : (
          <EmptyState
            resourceType={
              resourceType
            }
            branch={branch}
            academicYear={
              academicYear
            }
          />
        )}
      </Container>

      {/* =================================================
          SUCCESS SNACKBAR
      ================================================= */}

      <Snackbar
        open={
          Boolean(
            successMessage
          )
        }
        autoHideDuration={7000}
        onClose={() =>
          setSuccessMessage("")
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          icon={
            <CheckCircleRoundedIcon />
          }
          onClose={() =>
            setSuccessMessage("")
          }
          sx={{
            borderRadius: 3,
            fontWeight: 700,
          }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

/* =========================================================
   RESOURCE CARD
========================================================= */

const ResourceCard = ({
  resource,
  onOpen,
  onBuy,
  purchaseLoading,
}) => {
  const isFree =
    resource.resourceType ===
      "syllabus" ||
    resource.accessType ===
      "free" ||
    Number(resource.price) <=
      0;

  const image = getImageUrl(
    resource.imageUrl
  );

  const handleImageError = (
    event
  ) => {
    /*
     * Prevent broken-image icon.
     */

    event.currentTarget.style.display =
      "none";

    const fallback =
      event.currentTarget.parentElement?.querySelector(
        ".aktu-image-fallback"
      );

    if (fallback) {
      fallback.style.display =
        "flex";
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",

        borderRadius: 3.5,

        background:
          "linear-gradient(145deg,#10172a,#080d19)",

        border:
          "1px solid rgba(148,163,184,.12)",

        color: "#f8fafc",

        boxShadow:
          "0 15px 45px rgba(0,0,0,.28)",

        transition:
          "transform .25s ease,border-color .25s ease,box-shadow .25s ease",

        "&:hover": {
          transform:
            "translateY(-5px)",

          borderColor:
            isFree
              ? "rgba(34,197,94,.35)"
              : "rgba(249,115,22,.35)",

          boxShadow:
            "0 25px 55px rgba(0,0,0,.4)",
        },
      }}
    >
      {/* =================================================
          PAID IMAGE
      ================================================= */}

      {!isFree && (
        <Box
          sx={{
            height: {
              xs: 210,
              sm: 230,
            },

            position:
              "relative",

            overflow:
              "hidden",

            background:
              "linear-gradient(135deg,#111827,#1e1b4b)",
          }}
        >
          {image ? (
            <>
              <Box
                component="img"
                src={image}
                alt={
                  resource.description ||
                  "AKTU study material"
                }
                onError={
                  handleImageError
                }
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit:
                    "cover",
                  display: "block",

                  transition:
                    "transform .4s ease",

                  "&:hover": {
                    transform:
                      "scale(1.04)",
                  },
                }}
              />

              <Box
                className="aktu-image-fallback"
                sx={{
                  position:
                    "absolute",

                  inset: 0,

                  display: "none",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  flexDirection:
                    "column",

                  gap: 1,

                  background:
                    "linear-gradient(135deg,#111827,#1e1b4b)",
                }}
              >
                <ImageRoundedIcon
                  sx={{
                    fontSize: 55,
                    color:
                      "#6366f1",
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    color:
                      "#94a3b8",
                  }}
                >
                  Preview unavailable
                </Typography>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                flexDirection:
                  "column",
                gap: 1,
              }}
            >
              <PictureAsPdfRoundedIcon
                sx={{
                  fontSize: 65,
                  color:
                    "#6366f1",
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  color:
                    "#64748b",
                }}
              >
                PDF Resource
              </Typography>
            </Box>
          )}

          {/* PAID BADGE */}

          <Chip
            icon={
              <LockRoundedIcon />
            }
            label="Premium"
            size="small"
            sx={{
              position:
                "absolute",

              top: 14,
              left: 14,

              color:
                "#fed7aa",

              background:
                "rgba(124,45,18,.92)",

              border:
                "1px solid rgba(249,115,22,.4)",

              fontWeight: 850,

              backdropFilter:
                "blur(10px)",
            }}
          />

          {/* PRICE */}

          <Box
            sx={{
              position:
                "absolute",

              right: 14,
              bottom: 14,

              px: 1.5,
              py: 0.8,

              borderRadius: 2,

              color: "#fff",

              background:
                "rgba(7,11,24,.9)",

              border:
                "1px solid rgba(255,255,255,.12)",

              backdropFilter:
                "blur(10px)",
            }}
          >
            <Typography
              fontWeight={950}
              sx={{
                fontSize:
                  "1.1rem",
              }}
            >
              ₹
              {Number(
                resource.price ||
                  0
              )}
            </Typography>
          </Box>
        </Box>
      )}

      {/* =================================================
          FREE HEADER
      ================================================= */}

      {isFree && (
        <Box
          sx={{
            px: 2.5,
            pt: 2.5,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Box
              sx={{
                width: 46,
                height: 46,

                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",

                borderRadius: 2,

                color:
                  "#4ade80",

                background:
                  "rgba(34,197,94,.10)",

                border:
                  "1px solid rgba(34,197,94,.12)",
              }}
            >
              <MenuBookRoundedIcon />
            </Box>

            <Chip
              icon={
                <LockOpenRoundedIcon />
              }
              label="Free"
              size="small"
              sx={{
                color:
                  "#86efac",

                background:
                  "rgba(34,197,94,.08)",

                border:
                  "1px solid rgba(34,197,94,.2)",

                fontWeight: 800,
              }}
            />
          </Stack>
        </Box>
      )}

      {/* =================================================
          CONTENT
      ================================================= */}

      <Box
        sx={{
          p: 2.5,
        }}
      >
        <Typography
          fontWeight={950}
          sx={{
            fontSize:
              "1.2rem",

            lineHeight: 1.35,
          }}
        >
          {isFree
            ? "AKTU Syllabus"
            : resource.unit
            ? `Unit ${resource.unit}`
            : resource.description ||
              "AKTU Study Material"}
        </Typography>

        {resource.description && (
          <Typography
            sx={{
              mt: 0.8,

              color:
                "#94a3b8",

              fontSize:
                ".9rem",

              lineHeight: 1.6,

              display:
                "-webkit-box",

              WebkitLineClamp: 2,

              WebkitBoxOrient:
                "vertical",

              overflow:
                "hidden",
            }}
          >
            {
              resource.description
            }
          </Typography>
        )}

        {/* META */}

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{
            mt: 2,
          }}
        >
          <Chip
            icon={
              <CalendarMonthRoundedIcon />
            }
            label={
              resource.academicYear
                ? `Year ${resource.academicYear}`
                : "AKTU"
            }
            size="small"
            sx={{
              color:
                "#cbd5e1",

              background:
                "rgba(148,163,184,.06)",

              border:
                "1px solid rgba(148,163,184,.12)",
            }}
          />

          <Chip
            label={
              resource.branch ||
              "AKTU"
            }
            size="small"
            sx={{
              color:
                "#c7d2fe",

              background:
                "rgba(99,102,241,.08)",

              border:
                "1px solid rgba(99,102,241,.15)",
            }}
          />
        </Stack>

        {/* =================================================
            ACTION
        ================================================= */}

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            if (isFree) {
              onOpen(resource);
            } else {
              onBuy(resource);
            }
          }}
          disabled={
            purchaseLoading
          }
          startIcon={
            purchaseLoading ? (
              <CircularProgress
                size={19}
                sx={{
                  color: "#fff",
                }}
              />
            ) : isFree ? (
              <PictureAsPdfRoundedIcon />
            ) : (
              <ShoppingCartCheckoutRoundedIcon />
            )
          }
          endIcon={
            !purchaseLoading &&
            isFree ? (
              <ArrowForwardRoundedIcon />
            ) : null
          }
          sx={{
            mt: 2.5,

            minHeight: 48,

            borderRadius: 2.2,

            textTransform:
              "none",

            fontWeight: 900,

            color: "#fff",

            background:
              isFree
                ? "linear-gradient(135deg,#16a34a,#15803d)"
                : "linear-gradient(135deg,#f97316,#ea580c)",

            boxShadow:
              isFree
                ? "0 8px 25px rgba(22,163,74,.18)"
                : "0 8px 25px rgba(249,115,22,.18)",

            "&:hover": {
              background:
                isFree
                  ? "linear-gradient(135deg,#15803d,#166534)"
                  : "linear-gradient(135deg,#ea580c,#c2410c)",
            },

            "&.Mui-disabled": {
              color: "#fff",
              opacity: 0.7,
            },
          }}
        >
          {purchaseLoading
            ? "Processing..."
            : isFree
            ? "Open PDF"
            : `Buy Now • ₹${Number(
                resource.price || 0
              )}`}
        </Button>

        {!isFree && (
          <Stack
            direction="row"
            spacing={0.8}
            alignItems="center"
            justifyContent="center"
            sx={{
              mt: 1.2,
              color: "#64748b",
            }}
          >
            <LockRoundedIcon
              sx={{
                fontSize: 15,
              }}
            />

            <Typography
              variant="caption"
            >
              Secure Razorpay payment
            </Typography>
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

/* =========================================================
   LOADING
========================================================= */

const LoadingState = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: 360,

        display: "flex",

        flexDirection:
          "column",

        alignItems:
          "center",

        justifyContent:
          "center",

        borderRadius: 4,

        background:
          "linear-gradient(145deg,#0c1222,#080d1a)",

        border:
          "1px solid rgba(148,163,184,.12)",
      }}
    >
      <CircularProgress
        size={42}
        sx={{
          color:
            "#6366f1",
        }}
      />

      <Typography
        fontWeight={850}
        sx={{
          mt: 2,
        }}
      >
        Loading resources...
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mt: 0.5,
          color:
            "#64748b",
        }}
      >
        Fetching AKTU study material
      </Typography>
    </Paper>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({
  resourceType,
  branch,
  academicYear,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: 390,

        display: "flex",

        flexDirection:
          "column",

        alignItems:
          "center",

        justifyContent:
          "center",

        textAlign: "center",

        px: 2,

        borderRadius: 4,

        background:
          "radial-gradient(circle at center,rgba(99,102,241,.07),transparent 50%),#090e1b",

        border:
          "1px solid rgba(148,163,184,.12)",
      }}
    >
      <Box
        sx={{
          width: 76,
          height: 76,

          display: "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          borderRadius: 3,

          color:
            "#818cf8",

          background:
            "rgba(99,102,241,.09)",

          border:
            "1px solid rgba(99,102,241,.16)",
        }}
      >
        <MenuBookRoundedIcon
          sx={{
            fontSize: 38,
          }}
        />
      </Box>

      <Typography
        fontWeight={950}
        sx={{
          mt: 2.5,

          fontSize: {
            xs: "1.35rem",
            sm: "1.6rem",
          },
        }}
      >
        No{" "}
        {getResourceTitle(
          resourceType
        ).toLowerCase()}{" "}
        available
      </Typography>

      <Typography
        sx={{
          mt: 1,

          color:
            "#64748b",

          maxWidth: 520,

          lineHeight: 1.7,
        }}
      >
        There are currently no
        resources for{" "}
        <strong>
          {branch}
        </strong>{" "}
        —{" "}
        <strong>
          Year {academicYear}
        </strong>
        . Try another year,
        branch, or resource
        type.
      </Typography>
    </Paper>
  );
};

/* =========================================================
   SELECT STYLES
========================================================= */

const selectStyles = {
  "& .MuiInputLabel-root": {
    color: "#64748b",
  },

  "& .MuiInputLabel-root.Mui-focused":
    {
      color: "#818cf8",
    },

  "& .MuiOutlinedInput-root": {
    color: "#f8fafc",

    borderRadius: 2.5,

    background:
      "rgba(255,255,255,.015)",

    "& fieldset": {
      borderColor:
        "rgba(148,163,184,.12)",
    },

    "&:hover fieldset": {
      borderColor:
        "rgba(129,140,248,.3)",
    },

    "&.Mui-focused fieldset": {
      borderColor:
        "#6366f1",
    },
  },

  "& .MuiSvgIcon-root": {
    color: "#64748b",
  },

  "& .MuiSelect-icon": {
    color: "#64748b",
  },
};

export default AKTUStudy;