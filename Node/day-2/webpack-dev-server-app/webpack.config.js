const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // Entry point for your JS
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,  // Cleans the dist folder before each build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html',  // Template for the generated HTML
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 9000,
    open: true,  // Automatically open the browser
  },
  mode: 'development',  // Set the mode to development
};
