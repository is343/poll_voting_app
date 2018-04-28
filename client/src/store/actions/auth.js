import { LOGIN, LOGOUT, ALERT_CLOSE } from "./constants";
import axios from "axios";

export function login() {
  const request = axios.post("/api/auth/login", {
    username: "test2",
    password: "password"
  });

  // axios
  //   .post("/api/auth/login", {
  //     username: "test2",
  //     password: "password"
  //   })
  //   .then(res => {
  //     console.log(res.data);
  //     localStorage.setItem("token", res.data.token);
  //     return { type: LOGIN, payload: { auth: true } };
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
  return { type: LOGIN, payload: request };
}

export function logout() {
  localStorage.setItem("token", null);
  return { type: LOGOUT, payload: { auth: false } };
}

export function alertClose() {
  return { type: ALERT_CLOSE, payload: { alert: false } };
}
