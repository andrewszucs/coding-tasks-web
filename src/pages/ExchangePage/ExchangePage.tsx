import React from "react";
import { RouteComponentProps, Link, Redirect } from "@reach/router";
import Select, { OptionTypeBase } from "react-select";
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
  fetchCountryDetailRequest,
  setValue,
  SetValueType,
  SetSelectedCountryType,
  setSelectedCountry
} from "../../store/actions";
import {
  CountrySuggestionsState,
  CountryShortlistState,
  ValueState,
  User
} from "../../types";
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
  },
  disabledCard: {
    opacity: "0.5"
  },
  selectedCard: {
    border: "1px solid #3f50b5"
  }
});

interface Props
  extends RouteComponentProps,
    CountrySuggestionsState,
    CountryShortlistState,
    ValueState {
  fetchCountries: FetchCountriesRequestType;
  fetchCountry: FetchCountryDetailRequestType;
  setValue: SetValueType;
  setSelectedCountry: SetSelectedCountryType;
  loggedInUser: User | null;
}

function ExchangePage({
  fetchCountries,
  fetchCountry,
  countrySuggestions,
  isLoadingCountrySuggestions,
  countryShortlist,
  isLoadingCountryDetail,
  value,
  setValue,
  selectedCountry,
  setSelectedCountry,
  loggedInUser
}: Props) {
  const classes = useStyles();

  const countries = countryShortlist.map(
    ({ alpha3Code: id, name, flag, population, currencies }) => ({
      id,
      name,
      flag,
      population: numbro(population).format({ average: true, mantissa: 2 }),
      isDisabled: currencies.filter(({ rate }) => Boolean(rate)).length <= 0,
      currencies: currencies.map(({ code, name, symbol, rate }) => ({
        name,
        code,
        symbol,
        rate,
        getValue: (suffix: string): string | undefined =>
          rate
            ? `${(value * rate).toLocaleString("en-US", {
                maximumFractionDigits: 0
              })} ${suffix}`
            : undefined
      }))
    })
  );

  const selectedCountryObj = countries.find(({ id }) => id === selectedCountry);
  const selectedCountryName = selectedCountryObj ? selectedCountryObj.name : "";

  const selectedCurrency =
    selectedCountryObj &&
    selectedCountryObj.currencies.reduce((acc, curr) => {
      if (acc.rate && curr.rate && curr.rate < acc.rate) {
        acc = curr;
      } else if (curr.rate && !acc.rate) {
        acc = curr;
      }
      return acc;
    });

  const sendString = `${value} SEK`;
  const receiveString = selectedCurrency
    ? `${selectedCurrency.getValue(selectedCurrency.code)}`
    : "";

  if (!loggedInUser || !loggedInUser.token) {
    return <Redirect from="/" to="/login" noThrow />;
  }

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
            type="number"
            value={value}
            onChange={event =>
              event.target.value
                ? setValue(parseInt(event.target.value))
                : setValue(0)
            }
            inputProps={{
              min: 0
            }}
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
          fetchCountry({
            code: (clickedItem as OptionTypeBase).value,
            token: loggedInUser.token
          });
        }}
        onInputChange={(inputValue, { action }) => {
          if (action !== "input-change" || inputValue.length <= 0) return;
          fetchCountries({
            name: inputValue,
            token: loggedInUser.token
          });
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
          {countries.map(
            ({ id, name, flag, population, isDisabled, currencies }) => (
              <Card
                key={id}
                className={`${isDisabled ? classes.disabledCard : ""} ${
                  id === selectedCountry ? classes.selectedCard : ""
                }`}
              >
                <CardActionArea
                  disabled={isDisabled}
                  onClick={() =>
                    selectedCountry === id
                      ? setSelectedCountry(null)
                      : setSelectedCountry(id)
                  }
                >
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
                      {currencies.map(({ name, code, symbol, getValue }) => (
                        <li className={classes.currencyRow} key={code}>
                          <Typography
                            variant="body1"
                            className={classes.currencyName}
                          >{`${name} (${code})`}</Typography>
                          <Typography
                            variant="h6"
                            className={classes.currencyValue}
                          >
                            {getValue(symbol) || "No data"}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          )}
        </div>
      </section>
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedCountry || value <= 0}
        to={`/exchange?to=${selectedCountryName}&send=${sendString}&receive=${receiveString}&stage=confirm`}
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
    },
    values: { value, selectedCountry },
    login: { loggedInUser }
  }: AppState) => ({
    countrySuggestions,
    isLoadingCountrySuggestions,
    errorCountrySuggestions,
    countryShortlist,
    isLoadingCountryDetail,
    errorCountryDetail,
    value,
    selectedCountry,
    loggedInUser
  }),
  {
    fetchCountries: fetchCountriesRequest,
    fetchCountry: fetchCountryDetailRequest,
    setValue,
    setSelectedCountry
  }
)(ExchangePage);
