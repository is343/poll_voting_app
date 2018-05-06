import {
  GET_POLLS,
  GET_ONE_POLL,
  CREATE_POLL_REJECTED,
  VOTE_ON_POLL,
  SNACKBAR_OPEN,
  VOTE_ON_POLL_REJECTED,
  REQUEST_REJECTED
} from "./constants";
import axios from "axios";
import { push } from "react-router-redux";
import { history } from "../../store";

export const getPolls = () => dispatch => {
  const url = "/api/polls";
  const request = axios.get(url);
  return dispatch({ type: GET_POLLS, payload: request });
};

export const getOnePoll = pollId => dispatch => {
  const url = "/api/poll/" + pollId; // for some reason, if I axios.get with a string litteral it becomes `/poll/api/poll/${pollId}`
  const request = axios.get(url);
  return dispatch({
    type: GET_ONE_POLL,
    payload: request
  });
};

export const createPoll = pollData => dispatch => {
  const url = "/api/poll";
  const token = localStorage.getItem("token");
  const request = axios
    .post(url, pollData, {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      history.push(`/poll/${res.data._id}`);
    })
    .catch(error => {
      if (error.response) {
        return dispatch({ type: CREATE_POLL_REJECTED, payload: error });
      }
      return dispatch({ type: REQUEST_REJECTED, payload: error });
    });
};

export const voteOnPoll = (votingData, pollId) => dispatch => {
  let url = "/api/poll/" + pollId; // for some reason, if I axios.get with a string litteral it becomes `/poll/api/poll/${pollId}`
  const token = localStorage.getItem("token");
  axios
    .post(url, votingData, {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      // to refresh chart after vote
      // ADD POPUP
      console.log("====================================");
      console.log(res.data);
      console.log("====================================");
      dispatch({ type: SNACKBAR_OPEN, payload: res });
      const onePollRequest = axios.get(url);
      dispatch({ type: GET_ONE_POLL, payload: onePollRequest });
      url = "/api/polls";
      const allPollsRequest = axios.get(url);
      return dispatch({ type: GET_POLLS, payload: allPollsRequest });
    })
    .catch(error => {
      if (error.response) {
        return dispatch({ type: VOTE_ON_POLL_REJECTED, payload: error });
      }
      return dispatch({ type: REQUEST_REJECTED, payload: error });
    });
};
