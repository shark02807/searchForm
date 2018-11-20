var webpack = require('webpack');
var path = require('path');

const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

module.exports = function(env){
  var config = webpackMerge(baseConfig(), {
    devtool: 'cheap-module-source-map',

    output: {
      path: path.resolve(__dirname + '/../../../../target/classes/etc/designs/dentsply-sirona-app/clientlib-site/'),
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),
    ],

    module: {
      loaders: [
        {
          test: /\.less$/,
          exclude: /node_modules\/(?!(react-jplayer)\/).*/,
          loaders: [
            "style-loader",
            "css-loader?localIdentName=[name]__[local]___[hash:base64:5]",
            'autoprefixer-loader?browsers=last 3 versions',
            "less-loader"
          ]
        },
        {test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/, loader: "file-loader?name=[name].[ext]&outputPath=/assets/&publicPath=/etc/designs/dentsply-sirona-app/clientlib-site/assets/"}
      ]
    }
  });

  return config;
};