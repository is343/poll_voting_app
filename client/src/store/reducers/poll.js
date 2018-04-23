import { GET_POLLS } from '../actions/constants'

const pollReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_POLLS:
      return payload
    default:
      return state
  }
}

export default pollReducer;
