const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const dev = process.env.NODE_ENV === 'development';
const config = {
  entry: {
    'dist/virtual-keyboard': path.join(__dirname, '/src/index.js'),
  },
  watch: dev,
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js',
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


const copyCssFiles = function copyCssFiles() {
  return new CopyWebpackPlugin([{
    from: path.resolve(__dirname, 'public/styles.css'),
    to: path.resolve(__dirname, 'dist/virtual-keyboard.css'),
  }]);
};

const uglifyJsPlugin = function uglifyJsPlugin() {
  return new UglifyJsPlugin();
};

if (!dev) {
  config.plugins.push(uglifyJsPlugin(), copyCssFiles());
}

module.exports = config;
