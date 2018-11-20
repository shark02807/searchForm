const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.base.config.js');

module.exports = function(){
  const config = webpackMerge(baseConfig(), {
    devtool: 'inline-source-map', //https://medium.com/@rafaelideleon/webpack-your-chrome-devtools-workspaces-cb9cca8d50da#.ihihuypei

    devServer: {
      host: '0.0.0.0',
      port: 8090,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:4502',
        'Access-Control-Allow-Credentials': 'true'
      },
      historyApiFallback: true,
    },

    output: {
      publicPath: 'http://localhost:8090/public/'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('aem')
        }
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
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
        {test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/, exclude: /(node_modules)/, loader: "file-loader?name=public/assets/[name].[ext]"}
      ]
    }
  });

  return config;
};