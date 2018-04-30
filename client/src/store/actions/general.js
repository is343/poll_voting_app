import {
  CREATE_POLL,
  CREATE_POLL_REJECTED,
  REQUEST_REJECTED
} from "./constants";

import axios from "axios";
import { push } from "react-router-redux";

import { history } from "../../store";

export function navigateTo(location) {
  return push(location);
}

export const createPoll = pollData => dispatch => {
  const url = "/api/poll";
  const token = localStorage.getItem("token");
  const request = axios
    .post(url, pollData, {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      console.log("res", res);
      console.log(res.data._id);
      history.push(`/poll/${res.data._id}`);
    })
    .catch(error => {
      if (error.response) {
        return dispatch({ type: CREATE_POLL_REJECTED, payload: error });
      }
      return dispatch({ type: REQUEST_REJECTED, payload: error });
    });
};
