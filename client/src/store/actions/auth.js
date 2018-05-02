import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  ALERT_CLOSE,
  LOGIN_BOX_OPEN,
  LOGIN_BOX_CLOSE,
  SIGNUP_BOX_OPEN,
  SIGNUP_BOX_CLOSE
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

export function signupBoxOpen() {
  return { type: SIGNUP_BOX_OPEN, payload: { signupIsOpen: true } };
}

export function signupBoxClose() {
  return { type: SIGNUP_BOX_CLOSE, payload: { signupIsOpen: false } };
}
