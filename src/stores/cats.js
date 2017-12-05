import { ADD_CAT } from '../constants'

const ACTION_HANDLERS = {
  [ADD_CAT]: (state, { payload }) => {
    return {
      ...state,
      cat: payload.cat,
    }
  }
}

const initialState = {
  cat: '',
}

export default function reducer(state = initialState, action = {}) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
