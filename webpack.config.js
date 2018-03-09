const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const copyCssFiles = function copyCssFiles() {
  return new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, 'public/styles.css'),
      to: path.resolve(__dirname, 'dist/virtual-keyboard.css')
    }
  ]);
};

const config = (env, argv) => ({
  entry: {
    'dist/virtual-keyboard.min': path.join(__dirname, '/src/index.js')
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    ]
  },
  devServer: {
    contentBase: '.',
    hot: true
  },
  plugins: argv.mode === 'production' ? [copyCssFiles()] : []
});

module.exports = config;
