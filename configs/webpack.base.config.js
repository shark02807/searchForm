var webpack = require('webpack');
var path = require('path');
var buildSightlyComponentsLess = require('../loadSightlyLess');

var reactAppFolder = __dirname + '/../';

buildSightlyComponentsLess();

module.exports = function(){
  return {
    entry: {
      'ds-ecom/react-clientlib/scripts.js': [ path.resolve(reactAppFolder + '/app/react/client/index.js') ]
    },

    externals: {
      moment: {
        var: "moment"
      },
      globals: {
        var: "globals"
      }
    },

    output: {
      filename: '[name]'
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        "node_modules"
      ],
      alias: {
        Views: path.resolve(reactAppFolder + '/app/react/views'),
        App: path.resolve(reactAppFolder + '/app/react'),
        State: path.resolve(reactAppFolder + '/app/react/state'),
        Utilities: path.resolve(reactAppFolder + '/app/react/utilities'),
        Mocks: path.resolve(reactAppFolder + '/tools/mock-server/mocks'),
      }
    },

    plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr|de|it|es/)
    ],
    module: {
      loaders: [
        {test: /\.(js|jsx)$/, exclude: /(node_modules)/, loaders: ['babel-loader']},
        {test: /\.css$/, loaders: ["style-loader", "css-loader?localIdentName=[name]__[local]___[hash:base64:5]", 'autoprefixer-loader?browsers=last 3 versions']}
      ]
    }
  }
};