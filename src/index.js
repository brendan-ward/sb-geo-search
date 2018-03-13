import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
// import axios from "axios";
// import axiosMiddleware from "redux-axios-middleware";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducers";
import "bulma/css/bulma.css";
import "./core.css";
import App from "./App";
import {ITEMS_PER_PAGE, SB_FOLDER_ID} from './config';

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("Root")
);
