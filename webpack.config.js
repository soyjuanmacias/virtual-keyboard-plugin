const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const dev = process.env.NODE_ENV === 'dev';

const config = {
  entry: {
    'dist/virtual-keyboard': path.join(__dirname, '/src/virtual-keyboard.js'),
    'public/script': path.join(__dirname, '/public/script-es-next.js'),
  },
  watch: dev,
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          'env',
        ],
      },
    }],
  },
  devServer: {
    contentBase: '.',
    hot: true,
  },
  plugins: [],
};

if (!dev) {
  config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
