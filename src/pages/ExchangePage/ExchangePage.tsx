import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import Select from "react-select";
import { Typography, Button, TextField } from "@material-ui/core";
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
    justifyContent: "center"
  },
  verticalCenter: {
    display: "flex",
    alignItems: "center"
  },
  stretch: {
    flex: 1
  },
  exchangeInputContainer: {
    "& > div:first-child": {
      marginRight: "10px"
    }
  },
  exchangeInputText: {
    fontSize: "1.5rem"
  },
  exchangeInput: {
    width: "33%"
  }
});

// TODO: Add components and styling
export default function ExchangePage(props: RouteComponentProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={`${classes.center}`}>
        Send
      </Typography>
      <div className={`${classes.center} ${classes.exchangeInputContainer}`}>
        <div dir="rtl" className={classes.exchangeInput}>
          <TextField
            placeholder="0"
            type="number"
            InputProps={{
              classes: {
                input: classes.exchangeInputText
              }
            }}
          />
        </div>
        <Typography variant="h6" className={`${classes.verticalCenter}`}>
          SEK
        </Typography>
      </div>
      <Typography variant="h5" className={`${classes.center}`}>
        To
      </Typography>
      <Select
        name="country"
        isLoading={false}
        isClearable
        isSearchable
        placeholder="Type the name of a country"
        options={[{ value: 1, label: "1" }]}
        value={null}
        onChange={(o, { action }) => {
          if (action !== "select-option") return;
          console.log("change", o, action);
        }}
        onInputChange={(inputValue, { action }) => {
          if (action !== "input-change") return;
          console.log("input", inputValue);
        }}
        noOptionsMessage={({ inputValue }) => {
          if (inputValue !== "") {
            return `See all results for "${inputValue}"`;
          }
          return "Start typing to search!";
        }}
      />
      <div className={classes.stretch}>Country shortlist</div>
      <Button
        variant="contained"
        color="primary"
        to={`/exchange?from=SEK&to=HUF&value=290&stage=confirm`}
        component={Link}
      >
        Continue
      </Button>
    </div>
  );
}
