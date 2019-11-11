import React, { useState } from "react";
import { RouteComponentProps, Redirect } from "@reach/router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { connect } from "react-redux";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { AppState } from "../../store/reducers";
import { loginRequest, LoginRequestType } from "../../store/actions";
import { LoginState } from "../../types";

// TODO: theme spacing
const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "0 20px 0 20px"
  }
});

interface LoginPageProps extends RouteComponentProps, LoginState {
  loginRequest: LoginRequestType;
}

function LoginPage({
  loginRequest,
  loggedInUser,
  isLoadingLogin,
  errorLogin
}: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: values => {
      loginRequest({ name: values.username, password: values.password });
    }
  });

  if (loggedInUser && loggedInUser.token) {
    return <Redirect from="/login" to="/" noThrow />;
  }

  // TODO: Display errors on Textfield components
  // Also somewhere near button, Or Snackbar?
  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <TextField
        required
        id="username"
        label="Username"
        margin="normal"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      <TextField
        id="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        margin="normal"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(showPassword ? false : true)}
                onMouseDown={event => event.preventDefault()}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isLoadingLogin}
      >
        {isLoadingLogin ? <CircularProgress size={24} /> : "Login"}
      </Button>
    </form>
  );
}

export default connect(
  ({ login: { loggedInUser, errorLogin, isLoadingLogin } }: AppState) => ({
    loggedInUser,
    errorLogin,
    isLoadingLogin
  }),
  {
    loginRequest
  }
)(LoginPage);
