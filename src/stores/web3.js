import { WEB3_INITIALIZED } from '../constants'

const initialState = {
  web3Instance: null
}

const ACTION_HANDLERS = {
  [WEB3_INITIALIZED]: (state, { payload }) => {
    return {
      ...state,
      data: payload.web3Instance,
    }
  },
}

export default function reducer(state = initialState, action = {}) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
