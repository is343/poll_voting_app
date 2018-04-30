import { GET_POLLS } from "./constants";
import axios from "axios";

export const getPolls = () => dispatch => {
  const url = "/users";
  const token = localStorage.getItem("token");
  const request = axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return dispatch({ type: GET_POLLS, payload: request });
};
