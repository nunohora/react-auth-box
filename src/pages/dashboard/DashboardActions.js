import CatsContract from '../../../build/contracts/Cats.json'
import store from '../../store'

import { ADD_CAT } from '../../constants'

const contract = require('truffle-contract')

export const addCat = (dispatch, hash) => {
  let web3 = store.getState().web3.web3Instance

  if (typeof web3 !== 'undefined') {
    const cats = contract(CatsContract)
    cats.setProvider(web3.currentProvider)

    web3.eth.getCoinbase((error, coinbase) => {
      if (error) {
        console.error(error)
      }

      cats.deployed().then((catsInstance) => {
        catsInstance.addCat(hash, { from: coinbase, gas: 200000 }).then(() => {
          catsInstance.getCat({ from: coinbase }).then((res) => {
            dispatch({
              type: ADD_CAT,
              payload: {
                cat: res,
              },
            })
          })
        })
          .catch((e) => {
            throw e
          })
      })
    })
  } else {
    console.error('Web3 is not initialized.')
  }
}

export function getCat() {}

