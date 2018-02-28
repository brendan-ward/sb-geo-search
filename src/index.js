import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import rootReducer from "./reducers";
import "bulma/css/bulma.css";
import "./core.css";
import App from "./App";

const client = axios.create({
  baseURL: "https://www.sciencebase.gov/catalog/items",
  responseType: "json"
});

let store = createStore(rootReducer, applyMiddleware(axiosMiddleware(client)));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("Root")
);
