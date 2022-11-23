import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

export default function Reducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    default:
      return state;
  }
}
