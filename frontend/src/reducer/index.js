import { combineReducers } from "redux";
import superheroReducer from "./superheroReducer";

const rootReducer = combineReducers({
  superheroReducer,
});

export default rootReducer;
