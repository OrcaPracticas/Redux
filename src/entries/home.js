import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { hydrate } from "react-dom";
import Home from "../pages/containers/home";
import data from "../api.json";
import reducer from "../reducers/data";

/**
 * Creando store
 */
const INITIAL_STATE = {
    data,
    search: [],
};

const STORE = createStore(
    reducer,
    INITIAL_STATE,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const homeContainer = document.getElementById("home-container");
hydrate(
    <Provider store={STORE}>
        <Home />
    </Provider>, homeContainer,
);
