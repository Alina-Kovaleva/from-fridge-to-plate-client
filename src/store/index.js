import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";

import { thunk as reduxThunk } from "redux-thunk";
import reducer from "./rootReducer";

const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

const store = createStore(reducer, enhancer);

export default store;
