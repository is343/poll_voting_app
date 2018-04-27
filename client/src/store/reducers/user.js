import { LOGIN } from "../actions/constants";

const defaultState = {
  auth: false
};

const userReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return payload;
    default:
      return state;
  }
};

export default userReducer;
