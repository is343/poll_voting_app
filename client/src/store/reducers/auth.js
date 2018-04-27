import { LOGIN, LOGOUT, ALERT_OPEN, ALERT_CLOSE } from "../actions/constants";

const defaultState = {
  auth: false,
  alert: false
};

const userReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      console.log(payload);
      localStorage.setItem("token", payload.data.token);
      return { ...state, auth: true };
    case LOGOUT:
      return { ...state, auth: payload.auth };
    case ALERT_OPEN:
      return { ...state, alert: payload.alert };
    case ALERT_CLOSE:
      return { ...state, alert: payload.alert };
    default:
      return state;
  }
};

export default userReducer;
