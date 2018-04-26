import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import userReducer from "./user";
import pollReducer from "./poll";

export default combineReducers({
  router: routerReducer,
  users: userReducer,
  polls: pollReducer
});
