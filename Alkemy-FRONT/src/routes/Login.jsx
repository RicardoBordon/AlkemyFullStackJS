import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const base = import.meta.env.VITE_BASE_URL;
  const cookies = new Cookies();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = { email: data.get("email"), pass: data.get("password") };

    await axios({
      baseURL: base,
      url: "login",
      method: "post",
      data: data,
      withCredentials: false,
    })
      .then(function (response) {
        if (response.data.id_users !== undefined) {
          cookies.set("id", response.data.id_users);
          sessionStorage.setItem("user", true);
          window.location.href = "/";
        }
      }, [])
      .catch(function (response) {
        console.log(response.response.data);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response.response.data.error}`,
        });
      }, []);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />



            <Button
              type="submit"
              fullWidth
              variant="contained"
              
            >
              Sign In
            </Button>
          </Box>
          <Box sx={{ p:4 }}>
          <NavLink to="/register" variant="h5">
              {"Don't have an account? Sign Up"}
            </NavLink>.
            </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
