import { push } from "react-router-redux";

export function navigateTo(location) {
  return push(location);
}
