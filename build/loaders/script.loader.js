const VueLoaderPlugin = require('vue-loader/lib/plugin');

exports.config = {
  module: {
    rules: [
      // Vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // ES6
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
