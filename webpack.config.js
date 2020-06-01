const path = require('path');
const serverless = require('serverless-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: serverless.lib.entries,
    devtool: 'source-map-support',
    target: 'node',
    resolve: {
        plugins: [new TsconfigPathsPlugin({ configFile: 'tsconfig.json' })],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    },
    module: {
        rules: [{ test: /\.ts(x?)$/, loader: 'ts-loader' }]
    }
};
