import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import getWeb3 from './util/web3/getWeb3'

import store from './store'

import { Layout } from 'antd'
import Nav from './Nav'
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'

import 'antd/dist/antd.css'

// Initialize web3 and set in Redux.
getWeb3
  .then(() => {
    console.log('Web3 initialized!')
  })
  .catch(() => {
    console.log('Error in web3 initialization.')
  })

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Layout.Header>
              <Nav />
            </Layout.Header>
            <Layout.Content>
              <Switch>
                <Route component={Home} />
                <Route path="/dashboard" component={Dashboard} />
              </Switch>
            </Layout.Content>
          </Layout>
        </BrowserRouter>
      </Provider>
    )
  }

}
