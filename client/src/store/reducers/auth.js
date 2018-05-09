import {
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  SIGNUP_FULFILLED,
  SIGNUP_REJECTED,
  LOGOUT,
  ALERT_CLOSE,
  LOGIN_BOX_OPEN,
  LOGIN_BOX_CLOSE,
  VOTE_BOX_OPEN,
  VOTE_BOX_CLOSE,
  EDIT_BOX_OPEN,
  EDIT_BOX_CLOSE,
  SIGNUP_BOX_OPEN,
  SIGNUP_BOX_CLOSE,
  SNACKBAR_OPEN,
  SNACKBAR_CLOSE,
  GET_POLLS_REJECTED,
  GET_ONE_POLL_REJECTED,
  CREATE_POLL_REJECTED,
  GET_USER_INFO_REJECTED,
  VOTE_ON_POLL_REJECTED,
  DELETE_POLL_REJECTED,
  REQUEST_REJECTED
} from "../actions/constants";

const defaultState = {
  auth: localStorage.getItem("token") ? true : false,
  alert: false,
  errorMessage: "",
  loginIsOpen: false,
  signupIsOpen: false,
  voteIsOpen: false,
  editIsOpen: false,
  snackbarIsOpen: false,
  snackbarMessage: ""
};

const authReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOGIN_FULFILLED:
    case SIGNUP_FULFILLED:
      localStorage.setItem("token", payload.data.token);
      localStorage.setItem("loggedInUserId", payload.data.userId);
      return { ...state, auth: true };
    case LOGIN_REJECTED:
    case SIGNUP_REJECTED:
      // to differenciate different types of errors
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUserId");
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
    case GET_POLLS_REJECTED:
    case CREATE_POLL_REJECTED:
    case GET_ONE_POLL_REJECTED:
    case GET_USER_INFO_REJECTED:
    case VOTE_ON_POLL_REJECTED:
    case DELETE_POLL_REJECTED:
      if (payload.response.data.message != null) {
        return {
          ...state,
          auth: false,
          alert: true,
          errorMessage: payload.response.data.message
        };
      }
      return {
        ...state,
        alert: true,
        errorMessage: payload.message
      };
    case REQUEST_REJECTED:
      return {
        ...state,
        alert: true,
        errorMessage: `${payload.message}: ${payload.response.statusText}`
      };
    case LOGOUT:
      return { ...state, auth: payload.auth };
    case ALERT_CLOSE:
      return { ...state, alert: payload.alert, errorMessage: "" };
    case LOGIN_BOX_OPEN:
    case LOGIN_BOX_CLOSE:
      return { ...state, loginIsOpen: payload.loginIsOpen };
    case VOTE_BOX_OPEN:
    case VOTE_BOX_CLOSE:
      return { ...state, voteIsOpen: payload.voteIsOpen };
    case EDIT_BOX_OPEN:
    case EDIT_BOX_CLOSE:
      return { ...state, editIsOpen: payload.editIsOpen };
    case SIGNUP_BOX_OPEN:
    case SIGNUP_BOX_CLOSE:
      return { ...state, signupIsOpen: payload.signupIsOpen };
    case SNACKBAR_OPEN:
      return {
        ...state,
        snackbarIsOpen: true,
        snackbarMessage: payload.data.message
      };
    case SNACKBAR_CLOSE:
      return {
        ...state,
        snackbarIsOpen: payload.snackbarIsOpen,
        snackbarMessage: ""
      };
    default:
      return state;
  }
};

export default authReducer;
