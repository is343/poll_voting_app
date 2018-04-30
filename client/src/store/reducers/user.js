import { LOGIN } from "../actions/constants";

const defaultState = {
  auth: false
};

const userReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      console.log(payload);
      return payload.data;
    default:
      return state;
  }
};

export default userReducer;
