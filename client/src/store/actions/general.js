import axios from "axios";
import { push } from "react-router-redux";

export function navigateTo(location) {
  return push(location);
}
