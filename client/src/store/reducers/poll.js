import {
  GET_POLLS_FULFILLED,
  GET_ONE_POLL_FULFILLED
} from "../actions/constants";

const defaultState = {
  polls: [],
  activePoll: {}
};

const pollReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_POLLS_FULFILLED:
      return { ...state, polls: payload.data };
    case GET_ONE_POLL_FULFILLED:
      return { ...state, activePoll: payload.data };
    default:
      return state;
  }
};

export default pollReducer;
