import { LOGIN } from "./constants";
import axios from "axios";

export const login = () => dispatch => {
  const token = localStorage.getItem("token");
  const request = axios.get("/users", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return dispatch({ type: LOGIN, payload: request });
};
