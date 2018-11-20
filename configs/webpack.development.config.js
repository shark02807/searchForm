const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const fs = require('fs');

module.exports = function(){
  const config = webpackMerge(baseConfig(), {
    devtool: 'inline-source-map', //https://medium.com/@rafaelideleon/webpack-your-chrome-devtools-workspaces-cb9cca8d50da#.ihihuypei

    devServer: {
      host: '0.0.0.0',
      port: 8080,
      hot: true,
      historyApiFallback: true,
      before(app){
        app.get('/index.html*', (req, res) => {
          fs.readFile(process.cwd()+'/public/index.html', 'utf8', (err, content) => {
          if(err) throw err;
        res.send(content, 200);
      });
      });
      }
    },

    entry: {
      'ds-ecom/react-clientlib': [
        'react-hot-loader/patch',
        path.resolve(__dirname + '/assets/fonts.css')
      ]
    },

    output: {
      publicPath: 'http://localhost:8080/public/'
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin()
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