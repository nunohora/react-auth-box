import CleanWebpackPlugin from 'clean-webpack-plugin'
import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './webpack.common'

const webpackProdConfig = merge(common, {
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin('PROD'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJSPlugin({
      parallel: true,
      uglifyOptions: {
        comments: false,
      },
    }),
    new HtmlWebpackPlugin(),
  ],
})

export default webpackProdConfig
