import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { ApolloProvider } from "@apollo/react-hooks";
import LayoutContextProvider from "./Layout";
import { onError } from "apollo-link-error";
const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { createUploadLink } = require("apollo-upload-client");

const token = localStorage.getItem("token");

// console.log(token);

const logoutLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      return forward(operation);
    }
    if (networkError.statusCode === 401) {
      window.localStorage.removeItem("token");
      window.location.replace("#/login");
    }
  }
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(
    createUploadLink({
      uri: "http://localhost:6001/admin",
      credentials: "same-origin",
      headers: {
        authorization: token
      }
    })
  )
});
ReactDOM.render(
  <LayoutContextProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </LayoutContextProvider>,
  document.getElementById("root")
);
