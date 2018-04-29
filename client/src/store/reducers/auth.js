import {
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT,
  ALERT_CLOSE
} from "../actions/constants";

const defaultState = {
  auth: localStorage.getItem("token") ? true : false,
  alert: false,
  errorMessage: ""
};

const authReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOGIN_FULFILLED:
      localStorage.setItem("token", payload.data.token);
      return { ...state, auth: true };
    case LOGIN_REJECTED:
      return {
        ...state,
        auth: false,
        alert: true,
        errorMessage: payload.response.data.message
      };
    case LOGOUT:
      return { ...state, auth: payload.auth };
    case ALERT_CLOSE:
      return { ...state, alert: payload.alert, errorMessage: "" };
    default:
      return state;
  }
};

export default authReducer;
