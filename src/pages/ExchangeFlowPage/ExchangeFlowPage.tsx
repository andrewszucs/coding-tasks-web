import React from "react";
import { RouteComponentProps } from "@reach/router";
import queryString from "query-string";

export default function ExchangeFlowPage({ location }: RouteComponentProps) {
  const { from, stage, to, value } =
    (location && queryString.parse(location.search)) || {};

  console.log(from, stage, to, value);
  return <div>ExchangeFlowPage</div>;
}
