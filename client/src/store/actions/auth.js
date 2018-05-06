import {
  LOGIN,
  SIGNUP,
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
  SNACKBAR_CLOSE
} from "./constants";
import axios from "axios";

export function login(username, password) {
  const request = axios.post("/api/auth/login", {
    username,
    password
  });
  return { type: LOGIN, payload: request };
}

export function signup(username, password) {
  const request = axios.post("/api/auth/signup", {
    username,
    password
  });
  return { type: SIGNUP, payload: request };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedInUserId");
  return { type: LOGOUT, payload: { auth: false } };
}

export function alertClose() {
  return { type: ALERT_CLOSE, payload: { alert: false } };
}

export function loginBoxOpen() {
  return { type: LOGIN_BOX_OPEN, payload: { loginIsOpen: true } };
}

export function loginBoxClose() {
  return { type: LOGIN_BOX_CLOSE, payload: { loginIsOpen: false } };
}

export function voteBoxOpen() {
  return { type: VOTE_BOX_OPEN, payload: { voteIsOpen: true } };
}

export function voteBoxClose() {
  return { type: VOTE_BOX_CLOSE, payload: { voteIsOpen: false } };
}

export function editBoxOpen() {
  return { type: EDIT_BOX_OPEN, payload: { editIsOpen: true } };
}

export function editBoxClose() {
  return { type: EDIT_BOX_CLOSE, payload: { editIsOpen: false } };
}

export function signupBoxOpen() {
  return { type: SIGNUP_BOX_OPEN, payload: { signupIsOpen: true } };
}

export function signupBoxClose() {
  return { type: SIGNUP_BOX_CLOSE, payload: { signupIsOpen: false } };
}

export function snackbarOpen() {
  return { type: SNACKBAR_OPEN, payload: { snackbarIsOpen: true } };
}

export function snackbarClose() {
  return { type: SNACKBAR_CLOSE, payload: { snackbarIsOpen: false } };
}
