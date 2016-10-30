var webpack = require('webpack'),
    path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

function isVendor(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  var parts = userRequest.split('!');
  var path = parts[parts.length - 1];

  return path.indexOf('node_modules') >= 0;
}

module.exports = {
  entry: './app/main.js',
  module: {
    loaders: [
      { test: /\.html$/, loader: 'underscore-template-loader' },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [ nodeModulesPath ],
        query: {
            presets: ['es2015']
        }
      },
      { test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  output: {
    path: __dirname + '/public/assets/js',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: isVendor
    }),
    new webpack.ProvidePlugin({
      _: 'underscore',
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  resolve: {
    modulesDirectories: [ nodeModulesPath ],
    root: __dirname + '/app'
  },
  resolveLoader: {
    root: __dirname + '/node_modules'
  }
};