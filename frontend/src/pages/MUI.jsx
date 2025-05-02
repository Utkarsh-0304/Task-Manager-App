import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const FullPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  minHeight: "100vh",
  background: "linear-gradient(to right, #1e3a8a, #1f2937)", // Blue to gray gradient
  color: "white",
}));

const LeftSideContent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  minHeight: "100vh",
  color: "white",
  textAlign: "center",
  padding: theme.spacing(4),
  "& span": {
    backgroundColor: "rgba(59, 130, 246, 0.7)",
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  width: "50%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function SignIn(props) {
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const validateInputs = (data) => {
    const username = data.get("username");
    const password = data.get("password");

    let isValid = true;

    if (!username) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter a valid username.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (!validateInputs(data)) {
      return;
    }

    const username = data.get("username");
    const password = data.get("password");

    console.log(username, password);

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/home");
      } else {
        console.log("User not logged in");
      }
    } catch (err) {
      console.log("Error occurred", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <NavBar />
      <FullPageContainer>
        <LeftSideContent>
          <Typography variant="h4" component="div" gutterBottom>
            "Your go-to <span>task management tool</span>"
          </Typography>
        </LeftSideContent>
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField
                  error={usernameError}
                  helperText={usernameErrorMessage}
                  id="username"
                  type="text"
                  name="username"
                  placeholder="your username"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={usernameError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained">
                {!loading ? "Sign in" : "Signing In"}
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography sx={{ textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                <Link
                  onClick={() => navigate("/signup")}
                  variant="body2"
                  sx={{
                    alignSelf: "center",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Card>
        </SignInContainer>
      </FullPageContainer>
    </>
  );
}
