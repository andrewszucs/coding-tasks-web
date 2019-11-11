import React from "react";
import { RouteComponentProps, Link, Redirect } from "@reach/router";
import queryString from "query-string";

import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { User } from "../../types";

import { connect } from "react-redux";
import { AppState } from "../../store/reducers";

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
    flexDirection: "column",
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

interface Props extends RouteComponentProps {
  loggedInUser: User | null;
}

function ExchangeFlowPage({ uri, location, loggedInUser, ...rest }: Props) {
  const classes = useStyles();

  const { to, send, receive, stage } =
    (location && queryString.parse(location.search)) || {};

  if (!loggedInUser || !loggedInUser.token) {
    return (
      <Redirect
        from={location ? `${location.pathname}${location.search}` : "/exchange"}
        to="/login"
        noThrow
      />
    );
  }

  switch (stage) {
    case "confirm":
      return (
        <div className={classes.root}>
          <div
            className={`${classes.center} ${classes.verticalCenter} ${classes.stretch}`}
          >
            <Typography variant="h5" gutterBottom>
              Are you sure you want to send {send} to {to}?
            </Typography>
            <Typography variant="subtitle1">That's {receive}!</Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            className={classes.marginBottom}
            to={`/exchange?to=${to}&send=${send}&receive=${receive}&stage=finish`}
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
            Your friend will receive {receive}!
          </Typography>
          <Button variant="contained" color="primary" to="/" component={Link}>
            Finish
          </Button>
        </div>
      );
  }
}

export default connect(
  ({ login: { loggedInUser } }: AppState) => ({
    loggedInUser
  }),
  {}
)(ExchangeFlowPage);
