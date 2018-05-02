import { GET_USER_INFO } from "./constants";
import axios from "axios";

export const getUserInfo = userId => dispatch => {
  const url = "/api/user/" + userId; // for some reason, if I axios.get with a string litteral it becomes `/poll/api/poll/${pollId}`
  const request = axios.get(url);
  return dispatch({
    type: GET_USER_INFO,
    payload: request
  });
};