import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./Services/Reducer/rootReducer";
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
