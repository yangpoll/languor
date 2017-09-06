const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './index.coffee'
  },

  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'index.js',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['*', '.js', '.vue', '.json']
  },

  module: {
    rules: [{
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.coffee/,
        use: 'coffee-loader'
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin()
  ]
};