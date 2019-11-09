import React from "react";
import { RouteComponentProps } from "@reach/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

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

export default function LoginPage(props: RouteComponentProps) {
  // TODO: when API req comes back it sets the token in the state
  // if token is set already, Login should render a Redirect to /

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
      alert(JSON.stringify(values, null, 2));
    }
  });

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
        type="password"
        autoComplete="current-password"
        margin="normal"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
  );
}
