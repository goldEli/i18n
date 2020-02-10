const path = require('path');

module.exports = {
  entry: './src/index.js',
  // entry: '../src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: path.resolve('i18n_loader/index.js'),
      //     }
      //   ]
      // } 
    ]
  } 

};