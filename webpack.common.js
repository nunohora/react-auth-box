import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'

const BUILD_BUNDLE_PATH = 'bundle'
const BUILD_PUBLIC_PATH = '/'
const BUILD_PUBLIC_BUNDLE_PATH = path.join(BUILD_PUBLIC_PATH, BUILD_BUNDLE_PATH, '/')

const paths = {
  bundlePath: BUILD_BUNDLE_PATH,
  publicPath: BUILD_PUBLIC_PATH,
  publicBundlePath: BUILD_PUBLIC_BUNDLE_PATH,
  outputPath: path.join(__dirname, 'dist', BUILD_PUBLIC_PATH),
}

const context = path.resolve(__dirname, 'src')

export default {
  context,

  entry: 'index.js',

  output: {
    path: paths.outputPath,
    publicPath: BUILD_PUBLIC_BUNDLE_PATH,
    filename: '[name].js',
    chunkFilename: '[id].js',
  },

  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        use: [
          "babel-loader",
          "eslint-loader",
        ],
        exclude: /node_modules/,
      },
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        },
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.woff$/,
          /\.woff2$/,
          /\.(ttf|svg|eot)$/
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              [
                'react-css-modules',
                {
                  context,
                }
              ]
            ],
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]___[local]',
              }
            },
            'postcss-loader'
          ],
          publicPath: BUILD_PUBLIC_BUNDLE_PATH,
        })
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }]
      }
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
