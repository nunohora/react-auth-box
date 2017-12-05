import { combineReducers } from 'redux'
import cats from './stores/cats'
import web3 from './stores/web3'
import user from './stores/user'

const reducer = combineReducers({
  cats,
  user,
  web3,
})

export default reducer
