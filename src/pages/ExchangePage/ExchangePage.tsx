import React from "react";
import { RouteComponentProps, Link } from "@reach/router";
import Select, { OptionsType, ValueType, OptionTypeBase } from "react-select";
import {
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActionArea
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import numbro from "numbro";
import { Person } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  FetchCountriesRequestType,
  FetchCountryDetailRequestType,
  fetchCountriesRequest,
  fetchCountryDetailRequest
} from "../../store/actions";
import { CountrySuggestionsState, CountryShortlistState } from "../../types";
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
  },
  countryList: {
    overflow: "scroll",
    margin: "10px 0"
  },
  listGrid: {
    display: "grid",
    gridTemplateColumns: "48% 48%",
    gridGap: "4%"
  },
  flagCircle: {
    height: "3rem",
    width: "3rem",
    borderRadius: "50%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "#FFFFFF",
    border: "1px solid #e0e0e0"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  populationIcon: { marginRight: "0.1rem" },
  populationContainer: { display: "flex", alignItems: "flex-end" },
  currencyList: {
    padding: 0,
    marginBottom: 0
  },
  currencyRow: {
    listStyle: "none"
  },
  currencyName: {
    fontSize: "0.75rem"
  },
  currencyValue: {
    textAlign: "center"
  }
});

interface Props
  extends RouteComponentProps,
    CountrySuggestionsState,
    CountryShortlistState {
  fetchCountries: FetchCountriesRequestType;
  fetchCountry: FetchCountryDetailRequestType;
}

// TODO: Add components and styling
function ExchangePage({
  fetchCountries,
  fetchCountry,
  countrySuggestions,
  isLoadingCountrySuggestions,
  countryShortlist,
  isLoadingCountryDetail
}: Props) {
  const classes = useStyles();

  const countries = countryShortlist.map(
    ({ alpha3Code: id, name, flag, population, currencies }) => ({
      id,
      name,
      flag,
      population: numbro(population).format({ average: true, mantissa: 2 }),
      currencies: currencies.map(({ code, name, symbol, rate }) => ({
        name,
        code,
        symbol,
        value: rate
          ? (290 * rate).toLocaleString("en-US", {
              maximumFractionDigits: 0
            })
          : "No data"
      }))
    })
  );

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={`${classes.center}`}>
        Send
      </Typography>
      <section
        className={`${classes.center} ${classes.exchangeInputContainer}`}
      >
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
      </section>
      <Typography variant="h5" className={`${classes.center}`}>
        To
      </Typography>
      <Select
        name="country"
        isLoading={isLoadingCountrySuggestions}
        isClearable
        isSearchable
        placeholder="Type a country's name"
        options={countrySuggestions.map(({ alpha3Code, name }) => ({
          value: alpha3Code,
          label: name
        }))}
        value={null}
        onChange={(clickedItem, { action }) => {
          if (
            action !== "select-option" ||
            !clickedItem ||
            Array.isArray(clickedItem)
          ) {
            return;
          }
          fetchCountry((clickedItem as OptionTypeBase).value);
        }}
        onInputChange={(inputValue, { action }) => {
          if (action !== "input-change" || inputValue.length <= 0) return;
          fetchCountries(inputValue);
        }}
        noOptionsMessage={({ inputValue }) => {
          if (inputValue !== "") {
            return `See all results for "${inputValue}"`;
          }
          return "Start typing to search!";
        }}
      />
      <section className={`${classes.stretch} ${classes.countryList}`}>
        <div className={classes.listGrid}>
          {countries.map(({ id, name, flag, population, currencies }) => (
            <Card key={id}>
              <CardActionArea>
                <CardContent className={classes.cardContent}>
                  <div
                    style={{ backgroundImage: `url("${flag}")` }}
                    className={classes.flagCircle}
                  />
                  <Typography variant="subtitle1">{name}</Typography>
                  <Typography
                    variant="caption"
                    className={classes.populationContainer}
                  >
                    <Person className={classes.populationIcon} />
                    {population}
                  </Typography>
                  <ul className={classes.currencyList}>
                    {currencies.map(({ name, code, symbol, value }) => (
                      <li className={classes.currencyRow} key={code}>
                        <Typography
                          variant="body1"
                          className={classes.currencyName}
                        >{`${name} (${code})`}</Typography>
                        <Typography
                          variant="h6"
                          className={classes.currencyValue}
                        >{`${value} ${symbol}`}</Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </section>
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

export default connect(
  ({
    countrySuggestions: {
      countrySuggestions,
      isLoadingCountrySuggestions,
      errorCountrySuggestions
    },
    countryShortlist: {
      countryShortlist,
      isLoadingCountryDetail,
      errorCountryDetail
    }
  }: AppState) => ({
    countrySuggestions,
    isLoadingCountrySuggestions,
    errorCountrySuggestions,
    countryShortlist,
    isLoadingCountryDetail,
    errorCountryDetail
  }),
  {
    fetchCountries: fetchCountriesRequest,
    fetchCountry: fetchCountryDetailRequest
  }
)(ExchangePage);
