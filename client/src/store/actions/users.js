import { GET_USERS } from './constants';


export const getUsers = () => dispatch => {
  return fetch('/users')
    .then(res => res.json())
    .then(users => {
      return dispatch({ type: GET_USERS, payload: users })})
}