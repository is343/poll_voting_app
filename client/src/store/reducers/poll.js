import {
  GET_POLLS,
  GET_POLLS_FULFILLED,
  CREATE_POLL_FULFILLED
} from "../actions/constants";
import { navigateTo } from "../actions/general";

const defaultState = {
  polls: []
};

const pollReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_POLLS:
      return payload;
    case GET_POLLS_FULFILLED:
      return payload.data;
    default:
      return state;
  }
};

export default pollReducer;
