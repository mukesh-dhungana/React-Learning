import { createStore } from "redux";
import { rootReducer } from "../Reducer/index";

export const Store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
