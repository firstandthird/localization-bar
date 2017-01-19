module.exports = {
  entry: './example/app.js',
  output: {
    filename: 'example.js',
    path: './example'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
};
