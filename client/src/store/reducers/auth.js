import {
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT,
  ALERT_CLOSE,
  LOGIN_BOX_OPEN,
  LOGIN_BOX_CLOSE,
  GET_POLLS_REJECTED,
  GET_ONE_POLL_REJECTED,
  CREATE_POLL_REJECTED,
  REQUEST_REJECTED
} from "../actions/constants";

const defaultState = {
  auth: localStorage.getItem("token") ? true : false,
  alert: false,
  errorMessage: "",
  loginIsOpen: false
};

const authReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOGIN_FULFILLED:
      localStorage.setItem("token", payload.data.token);
      return { ...state, auth: true };
    case LOGIN_REJECTED:
    case GET_POLLS_REJECTED:
    case CREATE_POLL_REJECTED:
    case GET_ONE_POLL_REJECTED:
      // to differenciate different types of errors
      if (payload.response.data.message == null) {
        return {
          ...state,
          auth: false,
          alert: true,
          errorMessage: `${payload.message}: ${payload.response.statusText}`
        };
      }
      return {
        ...state,
        auth: false,
        alert: true,
        errorMessage: payload.response.data.message
      };
    case REQUEST_REJECTED:
      return {
        ...state,
        auth: false,
        alert: true,
        errorMessage: `${payload.message}: ${payload.response.statusText}`
      };
    case LOGOUT:
      return { ...state, auth: payload.auth };
    case ALERT_CLOSE:
      return { ...state, alert: payload.alert, errorMessage: "" };
    case LOGIN_BOX_OPEN:
      return { ...state, loginIsOpen: payload.loginIsOpen };
    case LOGIN_BOX_CLOSE:
      return { ...state, loginIsOpen: payload.loginIsOpen };
    default:
      return state;
  }
};

export default authReducer;
