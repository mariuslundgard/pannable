module.exports = {
  devtool: 'eval',
  context: __dirname,
  entry: './index',
  output: {
    path: __dirname,
    filename: 'index.bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js?$/, loader: 'babel-loader'}
    ]
  }
}
