const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const dev = process.env.NODE_ENV === 'dev';

const config = {
  entry: './src/index.js',
  watch: dev,
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: '.',
    hot: true,
  },
  devtool: dev ? 'cheap-module-eval-source-map' : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [],
};

// if (!dev) {
//   config.plugins.push(new UglifyJsPlugin());
// }

module.exports = config;

