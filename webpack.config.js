var webpack = require('webpack'),
    path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');

// external deps should go in vendor.js instead of bundle.js
// this determines whether the source file is external or not
function isVendor(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  // handle paths like ... node_modules/some-loader.js!app.css
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
      // make jQuery available to the window object, since we are not
      // bundling bootstrap
      { test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      // require Markdown files right into templates as HTML ¯\_(ツ)_/¯
      { test: /\.md$/, loader: 'html!markdown-loader' }
    ]
  },
  output: {
    // builds go into the public directory which is the app root
    path: __dirname + '/public/assets/js',
    filename: 'bundle.js'
  },
  plugins: [
    // if isVendor is true, then put the output in vendor.js
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