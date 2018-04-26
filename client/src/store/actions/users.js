import { LOGIN } from "./constants";

export const login = () => dispatch => {
  return fetch("/users")
    .then(res => res.json())
    .then(users => {
      return dispatch({ type: LOGIN, payload: users });
    });
};
