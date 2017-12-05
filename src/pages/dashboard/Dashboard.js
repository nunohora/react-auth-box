import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IPFS from 'ipfs'
import { autobind } from 'core-decorators'

import {
  Button,
  Icon,
  Upload,
} from 'antd'
import { addCat } from './DashboardActions'

const mapStateToProps = (state) => ({
  cat: state.cats.cat,
})

const mapDispatchToProps = (dispatch) => ({
  addNewCat: (hash) => addCat(dispatch, hash)
})

let blob

@connect(mapStateToProps, mapDispatchToProps)
class Dashboard extends Component {

  static propTypes = {
    cat: PropTypes.string.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      files: null,
      catImg: null,
      img: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    const ipfs = this.ipfsNode

    if (nextProps.cat) {
      let buffer = []
      ipfs.files.cat(nextProps.cat).then((stream) => {
        stream.on('data', (file) => {
          const data = Array.prototype.slice.call(file)
          buffer = buffer.concat(data)
        })
        stream.on('end', () => {
          // garbage collect last blob
          if (typeof blob !== 'undefined') {
            window.URL.revokeObjectURL(blob)
          }

          buffer = ipfs.types.Buffer(buffer)
          blob = new Blob([buffer], { type: 'image/jpg' })
          const img = window.URL.createObjectURL(blob)
          this.setState({ img })
        })
      })
    }
  }

  componentDidMount() {
    this.ipfsNode = new IPFS({
      repo: String(Math.random() + Date.now())
    })

    this.ipfsNode.on('ready', () => {
      console.log('IPFS Node is ready')
    })

    this.ipfsNode.on('error', () => {
      console.log('oops')
    })
  }

  @autobind
  addCat(fileBuffer) {
    const { addNewCat } = this.props
    this.ipfsNode.files.add(fileBuffer, (err, res) => {
      if (err) {
        throw err
      }

      addNewCat(res[0].hash)
    })
  }

  @autobind
  beforeUpload(file) {
    const reader = new FileReader()
    reader.onload = ({ target }) => {
      const bufferedFile = this.ipfsNode.types.Buffer(target.result)
      this.addCat({
        path: '',
        content: bufferedFile,
      })
    }
    reader.readAsArrayBuffer(file)
  }

  render() {
    const { img } = this.state

    return (
      <main className="container">
        <Upload beforeUpload={this.beforeUpload}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        {this.state.files}
        {img && <img src={img} />}
      </main>
    )
  }

}

export default Dashboard
