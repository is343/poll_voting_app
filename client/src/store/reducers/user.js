import { GET_USER_INFO_FULFILLED } from "../actions/constants";

const defaultState = {
  polls: [],
  userId: ''
};

const userReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_USER_INFO_FULFILLED:
      return payload.data;
    default:
      return state;
  }
};

export default userReducer;
