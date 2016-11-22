const wp = require('webpack');
const config = require('./config.json').js;

const plugins = [
  new wp.optimize.UglifyJsPlugin(),
  new wp.optimize.AggressiveMergingPlugin(),
  new wp.ProvidePlugin({
    '$': 'jquery',
    'jQuery': 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
  }),
];


const webpackConfig = {
    output: {
        filename: '[name].js',
        sourceMapFilename: '[file].map',
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            loader: 'babel',
            query: {
              cacheDirectory: true,
              presets: ['es2015', 'stage-0', 'react'],
              plugins: ['transform-object-assign'],
            },
        }],
    },
    stats: {
        colors: true,
        reasons: true,
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: config.webpack.modulesDirectories,
        alias: {
            jquery: 'jquery/dist/jquery',
        },
    },
};

module.exports = webpackConfig;