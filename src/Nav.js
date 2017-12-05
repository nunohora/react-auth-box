import React, { Component } from 'react'
import { Button, Menu } from 'antd'

import './app.css'

export default class Nav extends Component {

  onLoginClick() {

  }

  render() {
    return (
      <div>
        <Menu>
        </Menu>
        <div styleName="bla">
          <Button>
            Login
          </Button>
        </div>
      </div>
    )
  }

}
