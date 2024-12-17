import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducer";
import rootSaga from "../sagas";

const sagaMW = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ trace: true });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMW))
);

sagaMW.run(rootSaga);

export default store;
