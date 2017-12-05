import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './webpack.common'

const webpackDevConfig = merge(common, {
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
  },
  plugins: [
    new webpack.DefinePlugin('DEV'),
    new webpack.HotModuleReplacementPlugin(),
  ],
})

export default webpackDevConfig
