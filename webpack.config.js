const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  target: 'node',
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(htm|html|css)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: '/'
          }
        }
      }
    ]
  },
  mode: "development",
  plugins: [
    new Dotenv()
  ]
};
