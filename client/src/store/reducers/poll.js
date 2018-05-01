import {
  GET_POLLS,
  GET_POLLS_FULFILLED,
  CREATE_POLL_FULFILLED,
  GET_ONE_POLL_FULFILLED
} from "../actions/constants";
import { navigateTo } from "../actions/general";

const defaultState = {
  polls: [],
  activePoll: {}
  // activePoll: {
  //   choices: ["one", "two", "three"],
  //   votes: [1, 3, 1],
  //   _id: "SyXrvJB3G",
  //   title: "test",
  //   totalVotes: 3,
  //   userId: "5ad766170c3801179bdb1990",
  //   username: "test",
  //   createdAt: "2018-04-18T15:41:46.814Z",
  //   updatedAt: "2018-04-30T15:27:33.019Z",
  //   __v: 1
  // }
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
