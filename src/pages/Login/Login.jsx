import "./Login.css";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Link } from "react-router-dom";

import { loginThunk } from "../../store/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

const Login = () => {
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);

  const errorMessage = useSelector((state) => state.AuthReducer.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const login = data.get("user");
    const pass = data.get("password");
    dispatch(loginThunk({ pass }));
    // navigate("/");
  };

  return (
    <div className="Login">
      <Container maxWidth="xs">
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
            {/* <TextField
              margin="normal"
              required={true}
              fullWidth
              id="user"
              label="Username"
              name="user"
              autoComplete="email"
              autoFocus
            /> */}
            <TextField
              margin="normal"
              required={true}
              fullWidth
              name="password"
              label="Auth Key"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            {/* <Link to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link> */}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
