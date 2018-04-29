import { LOGIN, LOGOUT, ALERT_CLOSE } from "./constants";
import axios from "axios";

export function login(username, password) {
  const request = axios.post("/api/auth/login", {
    username,
    password
  });
  return { type: LOGIN, payload: request };
}

export function logout() {
  localStorage.removeItem("token");
  return { type: LOGOUT, payload: { auth: false } };
}

export function alertClose() {
  return { type: ALERT_CLOSE, payload: { alert: false } };
}
