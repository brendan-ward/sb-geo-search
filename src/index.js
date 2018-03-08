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
import {ITEMS_PER_PAGE, SB_FOLDER_ID} from './config';


const client = axios.create({
  baseURL: "https://www.sciencebase.gov/catalog/items",
  responseType: "json",
  params: {
    fields: 'title,summary,previewImage,browseCategories,hasChildren',
    format: 'json',
    max: ITEMS_PER_PAGE,
    folderId: SB_FOLDER_ID
  }
});

let store = createStore(rootReducer, applyMiddleware(axiosMiddleware(client)));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("Root")
);
