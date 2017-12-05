import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from '../constants'

const initialState = {
  data: null
}

const ACTION_HANDLERS = {
  [USER_LOGGED_IN]: (state, { payload }) => {
    return {
      ...state,
      data: payload.data,
    }
  },
  [USER_LOGGED_OUT]: () => {
    return {
      data: null,
    }
  }
}

export default function reducer(state = initialState, action = {}) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
