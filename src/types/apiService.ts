export interface Country {
  name: string;
  alpha3Code: string;
  flag: string;
}

export interface CountryDetail extends Country {
  population: number;
  currencies: Currency[];
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  base: "SEK";
  rate: number | null;
}

export interface ApiServiceError {
  error: string;
  code?: string;
}

export interface User {
  id: string;
  username: string;
  token: string;
}
