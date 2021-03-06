/* eslint max-len: 0 */
import webpack from 'webpack';
import baseConfig from './webpack.config.base';
import {merge} from 'ramda';

// Import the plugin:
var DashboardPlugin = require('webpack-dashboard/plugin');

const config = {
    ...baseConfig,

    debug: true,

    devtool: 'cheap-module-eval-source-map',

    entry: [
        'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
        './app/index'
    ],

    output: {
        ...baseConfig.output,
        publicPath: 'http://localhost:3000/dist/'
    },

    module: {
        ...baseConfig.module,
        loaders: [
            ...baseConfig.module.loaders,

            {
                test: /\.global\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap'
                ]
            },

            {
                test: /^((?!\.global).)*\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                ]
            }
        ]
    },

    plugins: [
        ...baseConfig.plugins,
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

    target: 'electron-renderer'
};

export default config;
