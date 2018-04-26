import { GET_POLLS } from "./constants";

export const getPolls = () => dispatch => {
  return fetch("/users")
    .then(res => res.json())
    .then(polls => {
      return dispatch({ type: GET_POLLS, payload: polls });
    });
};
