import { LOGIN } from "../actions/constants";

const userReducer = (state = [], { type, payload }) => {
  switch (type) {
    case LOGIN:
      return payload;
    default:
      return state;
  }
};

export default userReducer;
