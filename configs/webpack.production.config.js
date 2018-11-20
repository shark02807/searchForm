var webpack = require('webpack');
var path = require('path');

const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env){
  var config = webpackMerge(baseConfig(), {
    devtool: 'cheap-module-source-map',

    output: {
      path: path.resolve(__dirname + '/../../../../../../../../target/classes/etc/designs/'),
    },

    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /.*(constantsMock|checkoutMock|orderHistoryMock)/i,
        'Tools/testServer/mocks/emptyMock.js'
      ),

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      }),

      new ExtractTextPlugin({
        filename: 'ds-ecom/react-clientlib/styles.css',
        allChunks: true,
      })
    ],

    module: {
      loaders: [
        {
          test: /\.less$/,
          exclude: /node_modules\/(?!(react-jplayer)\/).*/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              "css-loader?localIdentName=[name]__[local]___[hash:base64:5]",
              "csso-loader?-restructure",
              "autoprefixer-loader?browsers=last 3 versions",
              "less-loader"
            ]
          })
        },
        {test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/, loader: "file-loader?name=[name].[ext]&outputPath=/ds-ecom/react-clientlib/assets/&publicPath=/etc/designs/ds-ecom/react-clientlib/assets/"},
      ]
    }
  });

  return config;
};