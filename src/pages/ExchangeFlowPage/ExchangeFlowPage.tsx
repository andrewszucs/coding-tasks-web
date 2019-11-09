import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import queryString from "query-string";

import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    "& > *": {
      width: "100%"
    }
  },
  center: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center"
  },
  verticalCenter: {
    display: "flex",
    alignItems: "center"
  },
  stretch: {
    flex: 1
  },
  marginBottom: {
    marginBottom: "10px"
  }
});

export default function ExchangeFlowPage({ location }: RouteComponentProps) {
  const classes = useStyles();

  const { from, stage, to, value } =
    (location && queryString.parse(location.search)) || {};

  console.log(from, stage, to, value);
  switch (stage) {
    case "confirm":
      return (
        <div className={classes.root}>
          <Typography
            variant="h5"
            className={`${classes.center} ${classes.verticalCenter} ${classes.stretch}`}
          >
            Are you sure you want to send {value} {from} to {to}?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.marginBottom}
            to={`/exchange?from=${from}&to=${to}&value=${value}&stage=finish`}
            component={Link}
          >
            Confirm
          </Button>
          <Button variant="contained" color="secondary" to="/" component={Link}>
            Cancel
          </Button>
        </div>
      );

    default:
      return (
        <div className={classes.root}>
          <Typography
            variant="h5"
            className={`${classes.center} ${classes.verticalCenter} ${classes.stretch}`}
          >
            You have successfully sent {value} {from} to {to}!
          </Typography>
          <Button variant="contained" color="primary" to="/" component={Link}>
            Finish
          </Button>
        </div>
      );
  }
}
